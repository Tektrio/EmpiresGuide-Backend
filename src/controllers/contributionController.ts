import { Request, Response } from 'express';
import CivilizationMatchup from '../models/CivilizationMatchup';
import StrategyVersion from '../models/StrategyVersion';

/**
 * @desc    Contribuir com uma estratégia
 * @route   POST /api/contributions
 * @access  Privado
 */
export const contributeStrategy = async (req: Request, res: Response) => {
  try {
    const { 
      matchupId, 
      strategyType, 
      civilization, 
      proposedChanges, 
      reason 
    } = req.body;

    // Validar entrada
    if (!matchupId || !strategyType || !civilization || !proposedChanges || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    // Verificar se o matchup existe
    const matchup = await CivilizationMatchup.findById(matchupId);
    if (!matchup) {
      return res.status(404).json({
        success: false,
        message: 'Matchup não encontrado'
      });
    }

    // Obter a estratégia original
    let originalStrategy;
    if (civilization === matchup.civilization1) {
      if (strategyType === 'Ataque') {
        originalStrategy = matchup.civilization1OffensiveStrategy;
      } else if (strategyType === 'Defesa') {
        originalStrategy = matchup.civilization1DefensiveStrategy;
      } else {
        originalStrategy = matchup.civilization1Tips;
      }
    } else if (civilization === matchup.civilization2) {
      if (strategyType === 'Ataque') {
        originalStrategy = matchup.civilization2OffensiveStrategy;
      } else if (strategyType === 'Defesa') {
        originalStrategy = matchup.civilization2DefensiveStrategy;
      } else {
        originalStrategy = matchup.civilization2Tips;
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'A civilização não faz parte deste matchup'
      });
    }

    // Criar uma nova versão
    const strategyVersion = new StrategyVersion({
      matchupId,
      strategyType,
      civilization,
      originalStrategy,
      proposedChanges,
      reason,
      contributorId: req.user?.id || 'anônimo',
      status: 'Pendente'
    });

    await strategyVersion.save();

    res.status(201).json({
      success: true,
      message: 'Contribuição enviada com sucesso e aguardando revisão',
      data: strategyVersion
    });
  } catch (error: any) {
    console.error('Erro ao contribuir com estratégia:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao processar a contribuição',
      error: error.message
    });
  }
};

/**
 * @desc    Revisar uma contribuição (aprovar/rejeitar)
 * @route   PUT /api/contributions/:id
 * @access  Admin
 */
export const reviewContribution = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, feedback } = req.body;

    if (!['Aprovada', 'Rejeitada'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status inválido: deve ser "Aprovada" ou "Rejeitada"'
      });
    }

    const contribution = await StrategyVersion.findById(id);
    if (!contribution) {
      return res.status(404).json({
        success: false,
        message: 'Contribuição não encontrada'
      });
    }

    // Se a contribuição já foi revisada
    if (contribution.status !== 'Pendente') {
      return res.status(400).json({
        success: false,
        message: 'Esta contribuição já foi revisada'
      });
    }

    // Atualizar a contribuição
    contribution.status = status;
    contribution.feedback = feedback || '';
    contribution.reviewerId = req.user?.id || 'admin';
    contribution.reviewedAt = new Date();

    await contribution.save();

    // Se aprovada, atualizar a estratégia no matchup
    if (status === 'Aprovada') {
      const matchup = await CivilizationMatchup.findById(contribution.matchupId);
      
      if (!matchup) {
        return res.status(404).json({
          success: false,
          message: 'Matchup não encontrado'
        });
      }

      // Atualizar a estratégia apropriada
      if (contribution.civilization === matchup.civilization1) {
        if (contribution.strategyType === 'Ataque') {
          matchup.civilization1OffensiveStrategy = contribution.proposedChanges;
        } else if (contribution.strategyType === 'Defesa') {
          matchup.civilization1DefensiveStrategy = contribution.proposedChanges;
        } else {
          matchup.civilization1Tips = contribution.proposedChanges;
        }
      } else if (contribution.civilization === matchup.civilization2) {
        if (contribution.strategyType === 'Ataque') {
          matchup.civilization2OffensiveStrategy = contribution.proposedChanges;
        } else if (contribution.strategyType === 'Defesa') {
          matchup.civilization2DefensiveStrategy = contribution.proposedChanges;
        } else {
          matchup.civilization2Tips = contribution.proposedChanges;
        }
      }

      await matchup.save();
    }

    res.status(200).json({
      success: true,
      message: `Contribuição ${status === 'Aprovada' ? 'aprovada' : 'rejeitada'} com sucesso`,
      data: contribution
    });
  } catch (error: any) {
    console.error('Erro ao revisar contribuição:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao processar a revisão da contribuição',
      error: error.message
    });
  }
};

/**
 * @desc    Obter todas as contribuições pendentes
 * @route   GET /api/contributions/pending
 * @access  Admin
 */
export const getPendingContributions = async (_req: Request, res: Response) => {
  try {
    const pendingContributions = await StrategyVersion.find({ status: 'Pendente' })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pendingContributions.length,
      data: pendingContributions
    });
  } catch (error: any) {
    console.error('Erro ao buscar contribuições pendentes:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar contribuições pendentes',
      error: error.message
    });
  }
};

/**
 * @desc    Obter histórico de versões de uma estratégia
 * @route   GET /api/contributions/history/:matchupId
 * @access  Público
 */
export const getStrategyHistory = async (req: Request, res: Response) => {
  try {
    const { matchupId } = req.params;
    const { civilization, strategyType } = req.query;

    // Construir o filtro
    const filter: any = {
      matchupId,
      status: 'Aprovada'
    };

    if (civilization) {
      filter.civilization = civilization;
    }

    if (strategyType) {
      filter.strategyType = strategyType;
    }

    const contributions = await StrategyVersion.find(filter)
      .sort({ reviewedAt: -1 });

    res.status(200).json({
      success: true,
      count: contributions.length,
      data: contributions
    });
  } catch (error: any) {
    console.error('Erro ao buscar histórico de estratégias:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar histórico de estratégias',
      error: error.message
    });
  }
}; 