import { Request, Response } from 'express';
import CivilizationMatchup from '../models/CivilizationMatchup';

// Interfaces para tipagem
interface RatedStrategy {
  matchupId: string;
  civilization1: string;
  civilization2: string;
  strategyType: string;
  civilization: string;
  ratings?: { rating: number }[];
  averageRating?: number;
  totalRatings?: number;
}

// @desc    Avaliar uma estratégia em um matchup
// @route   POST /api/matchups/:civ1/:civ2/rate
// @access  Private
export const rateStrategy = async (req: Request, res: Response) => {
  try {
    const { civ1, civ2 } = req.params;
    const { strategyType, civilization, rating, comment, effectiveness } = req.body;
    
    // Validação básica
    if (!strategyType || !civilization || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça tipo de estratégia, civilização e avaliação (1-5)'
      });
    }

    // Validar tipo de estratégia
    if (!['Ataque', 'Defesa', 'Geral'].includes(strategyType)) {
      return res.status(400).json({
        success: false,
        message: 'Tipo de estratégia inválido. Utilize: Ataque, Defesa ou Geral'
      });
    }

    // Buscar o matchup
    const matchup = await CivilizationMatchup.findOne({
      $or: [
        { civilization1: civ1, civilization2: civ2 },
        { civilization1: civ2, civilization2: civ1 }
      ]
    });

    // Verificar se o matchup existe
    if (!matchup) {
      return res.status(404).json({
        success: false,
        message: `Matchup entre ${civ1} e ${civ2} não encontrado`
      });
    }

    // Se o campo de ratings não existir, inicializá-lo
    if (!matchup.ratings) {
      matchup.ratings = [];
    }

    // Verificar se o usuário já avaliou esta estratégia
    const existingRatingIndex = matchup.ratings.findIndex(
      r => r.strategyType === strategyType && 
           r.civilization === civilization && 
           r.userId === req.user?.id
    );

    if (existingRatingIndex >= 0) {
      // Atualizar avaliação existente
      matchup.ratings[existingRatingIndex] = {
        ...matchup.ratings[existingRatingIndex],
        rating,
        comment: comment || matchup.ratings[existingRatingIndex].comment,
        effectiveness: effectiveness || matchup.ratings[existingRatingIndex].effectiveness,
        updatedAt: new Date()
      };
    } else {
      // Adicionar nova avaliação
      matchup.ratings.push({
        userId: req.user?.id || 'anonymous',
        strategyType,
        civilization,
        rating,
        comment: comment || '',
        effectiveness: effectiveness || 'Média',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Salvar as alterações
    await matchup.save();

    // Calcular a média de avaliações para esta estratégia
    const strategyRatings = matchup.ratings.filter(
      r => r.strategyType === strategyType && r.civilization === civilization
    );
    
    const averageRating = strategyRatings.reduce((sum, r) => sum + r.rating, 0) / strategyRatings.length;

    res.status(200).json({
      success: true,
      message: 'Avaliação registrada com sucesso',
      data: {
        averageRating,
        totalRatings: strategyRatings.length
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao avaliar estratégia',
      error: error.message
    });
  }
};

// @desc    Obter avaliações de uma estratégia
// @route   GET /api/matchups/:civ1/:civ2/ratings/:strategyType/:civilization
// @access  Public
export const getStrategyRatings = async (req: Request, res: Response) => {
  try {
    const { civ1, civ2, strategyType, civilization } = req.params;

    // Buscar o matchup
    const matchup = await CivilizationMatchup.findOne({
      $or: [
        { civilization1: civ1, civilization2: civ2 },
        { civilization1: civ2, civilization2: civ1 }
      ]
    });

    // Verificar se o matchup existe
    if (!matchup) {
      return res.status(404).json({
        success: false,
        message: `Matchup entre ${civ1} e ${civ2} não encontrado`
      });
    }

    // Verificar se há avaliações
    if (!matchup.ratings || matchup.ratings.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Nenhuma avaliação encontrada para este matchup'
      });
    }

    // Filtrar avaliações para a estratégia específica
    const strategyRatings = matchup.ratings.filter(
      r => r.strategyType === strategyType && r.civilization === civilization
    );

    if (strategyRatings.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Nenhuma avaliação encontrada para a estratégia ${strategyType} de ${civilization}`
      });
    }

    // Calcular estatísticas
    const averageRating = strategyRatings.reduce((sum, r) => sum + r.rating, 0) / strategyRatings.length;
    
    // Contar efetividades
    const effectivenessCount = {
      'Muito Alta': 0,
      'Alta': 0,
      'Média': 0,
      'Baixa': 0,
      'Muito Baixa': 0
    };
    
    strategyRatings.forEach(r => {
      if (r.effectiveness && effectivenessCount[r.effectiveness] !== undefined) {
        effectivenessCount[r.effectiveness]++;
      }
    });

    res.status(200).json({
      success: true,
      data: {
        averageRating,
        totalRatings: strategyRatings.length,
        effectivenessCount,
        ratings: strategyRatings.map(r => ({
          rating: r.rating,
          comment: r.comment,
          effectiveness: r.effectiveness,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt
        }))
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao obter avaliações',
      error: error.message
    });
  }
};

// @desc    Obter as estratégias mais bem avaliadas
// @route   GET /api/matchups/top-rated
// @access  Public
export const getTopRatedStrategies = async (req: Request, res: Response) => {
  try {
    const { limit = 10, strategyType } = req.query;
    
    // Buscar todos os matchups
    const allMatchups = await CivilizationMatchup.find({
      ratings: { $exists: true, $ne: [] }
    });
    
    // Extrair todas as estratégias avaliadas
    let ratedStrategies: RatedStrategy[] = [];
    
    for (const matchup of allMatchups) {
      if (!matchup.ratings || matchup.ratings.length === 0) continue;
      
      // Agrupar avaliações por estratégia
      interface StrategyGroup {
        matchupId: string;
        civilization1: string;
        civilization2: string;
        strategyType: string;
        civilization: string;
        ratings: { rating: number }[];
      }
      
      const strategyGroups: Record<string, StrategyGroup> = {};
      
      for (const rating of matchup.ratings) {
        const key = `${rating.strategyType}_${rating.civilization}`;
        
        if (strategyType && rating.strategyType !== strategyType) continue;
        
        if (!strategyGroups[key]) {
          strategyGroups[key] = {
            matchupId: String(matchup._id),
            civilization1: matchup.civilization1,
            civilization2: matchup.civilization2,
            strategyType: rating.strategyType,
            civilization: rating.civilization,
            ratings: []
          };
        }
        
        strategyGroups[key].ratings.push({ rating: rating.rating });
      }
      
      // Calcular média para cada grupo
      for (const key in strategyGroups) {
        const group = strategyGroups[key];
        const averageRating = group.ratings.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / group.ratings.length;
        
        ratedStrategies.push({
          ...group,
          averageRating,
          totalRatings: group.ratings.length
        });
      }
    }
    
    // Ordenar por avaliação média (decrescente)
    ratedStrategies.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    
    // Limitar resultados
    ratedStrategies = ratedStrategies.slice(0, parseInt(limit as string));
    
    // Remover arrays de avaliações para reduzir o tamanho da resposta
    const formattedStrategies = ratedStrategies.map(s => {
      // Usando desestruturação para criar um novo objeto sem a propriedade ratings
      const { ratings, ...strategyWithoutRatings } = s;
      return strategyWithoutRatings;
    });
    
    res.status(200).json({
      success: true,
      count: formattedStrategies.length,
      data: formattedStrategies
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao obter estratégias mais bem avaliadas',
      error: error.message
    });
  }
}; 