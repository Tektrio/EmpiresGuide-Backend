import { Request, Response } from 'express';
import CivilizationMatchup from '../models/CivilizationMatchup';

// @desc    Obter todos os matchups
// @route   GET /api/matchups
// @access  Public
export const getMatchups = async (req: Request, res: Response) => {
  try {
    // Parâmetros de paginação
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skipIndex = (page - 1) * limit;

    // Filtros
    const filters: any = {};
    
    // Filtro por civilização (civ1 ou civ2)
    if (req.query.civilization) {
      filters.$or = [
        { civilization1: req.query.civilization },
        { civilization2: req.query.civilization }
      ];
    }
    
    // Filtro por mapType
    if (req.query.mapType) {
      filters['mapTypes.mapName'] = req.query.mapType;
    }
    
    // Filtro por tipo de estratégia
    if (req.query.strategyType) {
      filters['alternativeStrategies.strategyType'] = req.query.strategyType;
    }

    // Buscar matchups com paginação
    const matchups = await CivilizationMatchup.find(filters)
      .sort({ civilization1: 1, civilization2: 1 })
      .limit(limit)
      .skip(skipIndex);

    // Contar total de documentos para paginação
    const totalMatchups = await CivilizationMatchup.countDocuments(filters);
    
    // Verificar se há matchups
    if (matchups.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Nenhum matchup encontrado'
      });
    }

    res.status(200).json({
      success: true,
      count: matchups.length,
      total: totalMatchups,
      page,
      pages: Math.ceil(totalMatchups / limit),
      data: matchups
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar matchups',
      error: error.message
    });
  }
};

// @desc    Obter matchup específico entre duas civilizações
// @route   GET /api/matchups/:civ1/:civ2
// @access  Public
export const getMatchupByCivs = async (req: Request, res: Response) => {
  try {
    const { civ1, civ2 } = req.params;

    // Verificar se os parâmetros foram fornecidos
    if (!civ1 || !civ2) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça ambas as civilizações'
      });
    }

    // Buscar o matchup direto e reverso (porque a ordem pode ser diferente)
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

    res.status(200).json({
      success: true,
      data: matchup
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar matchup específico',
      error: error.message
    });
  }
};

// @desc    Obter todos os matchups de uma civilização
// @route   GET /api/matchups/civilization/:civ
// @access  Public
export const getMatchupsByCiv = async (req: Request, res: Response) => {
  try {
    const { civ } = req.params;

    // Verificar se o parâmetro foi fornecido
    if (!civ) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça uma civilização'
      });
    }

    // Buscar todos os matchups relacionados à civilização
    const matchups = await CivilizationMatchup.find({
      $or: [
        { civilization1: civ },
        { civilization2: civ }
      ]
    }).sort({ civilization1: 1, civilization2: 1 });

    // Verificar se há matchups
    if (matchups.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Nenhum matchup encontrado para a civilização ${civ}`
      });
    }

    res.status(200).json({
      success: true,
      count: matchups.length,
      data: matchups
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar matchups por civilização',
      error: error.message
    });
  }
};

// @desc    Obter estratégias alternativas por tipo (ataque/defesa)
// @route   GET /api/matchups/strategies/:type
// @access  Public
export const getStrategiesByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const { civilization } = req.query;

    // Verificar se o tipo é válido
    if (!['Ataque', 'Defesa', 'Geral'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Tipo de estratégia inválido. Utilize: Ataque, Defesa ou Geral'
      });
    }

    // Filtros
    const filters: any = {};
    filters['alternativeStrategies.strategyType'] = type;

    // Filtro adicional por civilização
    if (civilization) {
      filters['alternativeStrategies.civilization'] = civilization;
    }

    // Buscar matchups com estratégias do tipo especificado
    const matchups = await CivilizationMatchup.find(filters);

    // Extrair apenas as estratégias relevantes
    const strategies = matchups.flatMap(matchup => 
      matchup.alternativeStrategies?.filter(strat => 
        strat.strategyType === type && 
        (!civilization || strat.civilization === civilization)
      ) || []
    );

    // Verificar se há estratégias
    if (strategies.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Nenhuma estratégia do tipo ${type} encontrada${civilization ? ` para a civilização ${civilization}` : ''}`
      });
    }

    res.status(200).json({
      success: true,
      count: strategies.length,
      data: strategies
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estratégias por tipo',
      error: error.message
    });
  }
};

// @desc    Obter estatísticas dos matchups
// @route   GET /api/matchups/stats
// @access  Public
export const getMatchupStats = async (req: Request, res: Response) => {
  try {
    // Contar total de matchups
    const totalMatchups = await CivilizationMatchup.countDocuments();
    
    // Contar civilizações únicas
    const civilizations = await CivilizationMatchup.distinct('civilization1');
    civilizations.push(...await CivilizationMatchup.distinct('civilization2'));
    const uniqueCivilizations = [...new Set(civilizations)];
    
    // Contar matchups com estratégias de ataque/defesa
    const matchupsWithAttackStrategies = await CivilizationMatchup.countDocuments({
      'alternativeStrategies.strategyType': 'Ataque'
    });
    
    const matchupsWithDefenseStrategies = await CivilizationMatchup.countDocuments({
      'alternativeStrategies.strategyType': 'Defesa'
    });
    
    // Contar matchups com estratégias de equipe
    const matchupsWithTeamStrategies = await CivilizationMatchup.countDocuments({
      teamStrategies: { $exists: true, $ne: [] }
    });
    
    // Estatísticas dos tipos de mapa
    const mapTypes = await CivilizationMatchup.aggregate([
      { $unwind: '$mapTypes' },
      { $group: { _id: '$mapTypes.mapName', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalMatchups,
        uniqueCivilizations: {
          count: uniqueCivilizations.length,
          list: uniqueCivilizations
        },
        strategiesStats: {
          attack: matchupsWithAttackStrategies,
          defense: matchupsWithDefenseStrategies,
          team: matchupsWithTeamStrategies
        },
        mapTypes
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estatísticas dos matchups',
      error: error.message
    });
  }
};

// @desc    Obter matchups por tipo de mapa
// @route   GET /api/matchups/maps/:mapType
// @access  Public
export const getMatchupsByMapType = async (req: Request, res: Response) => {
  try {
    const { mapType } = req.params;

    // Verificar se o parâmetro foi fornecido
    if (!mapType) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça um tipo de mapa'
      });
    }

    // Buscar matchups com o tipo de mapa especificado
    const matchups = await CivilizationMatchup.find({
      'mapTypes.mapName': mapType
    });

    // Verificar se há matchups
    if (matchups.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Nenhum matchup encontrado para o mapa ${mapType}`
      });
    }

    res.status(200).json({
      success: true,
      count: matchups.length,
      data: matchups
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar matchups por tipo de mapa',
      error: error.message
    });
  }
};

// @desc    Atualizar um matchup existente
// @route   PUT /api/matchups/:civ1/:civ2
// @access  Public
export const updateMatchup = async (req: Request, res: Response) => {
  try {
    const { civ1, civ2 } = req.params;
    const updateData = req.body;

    // Verificar se os parâmetros foram fornecidos
    if (!civ1 || !civ2) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça ambas as civilizações'
      });
    }

    // Buscar o matchup existente
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

    // Atualizar campos específicos
    if (updateData.mapTypes) {
      // Para cada tipo de mapa na atualização
      for (const updatedMapType of updateData.mapTypes) {
        // Verificar se este tipo de mapa já existe
        const existingMapTypeIndex = matchup.mapTypes.findIndex(
          (mt) => mt.mapName === updatedMapType.mapName
        );

        if (existingMapTypeIndex >= 0) {
          // Atualizar o tipo de mapa existente
          matchup.mapTypes[existingMapTypeIndex] = {
            ...matchup.mapTypes[existingMapTypeIndex],
            ...updatedMapType
          };
        } else {
          // Adicionar o novo tipo de mapa
          matchup.mapTypes.push(updatedMapType);
        }
      }
    }

    // Atualizar estratégias alternativas
    if (updateData.alternativeStrategies) {
      // Se o campo não existir, inicializá-lo
      if (!matchup.alternativeStrategies) {
        matchup.alternativeStrategies = [];
      }

      // Para cada estratégia alternativa na atualização
      for (const updatedStrategy of updateData.alternativeStrategies) {
        // Verificar se esta estratégia já existe para a civilização e tipo
        const existingStrategyIndex = matchup.alternativeStrategies.findIndex(
          (s) => s.civilization === updatedStrategy.civilization && 
                 s.strategyType === updatedStrategy.strategyType
        );

        if (existingStrategyIndex >= 0) {
          // Atualizar a estratégia existente
          matchup.alternativeStrategies[existingStrategyIndex] = {
            ...matchup.alternativeStrategies[existingStrategyIndex],
            ...updatedStrategy
          };
        } else {
          // Adicionar a nova estratégia
          matchup.alternativeStrategies.push(updatedStrategy);
        }
      }
    }

    // Atualizar estratégias de equipe
    if (updateData.teamStrategies) {
      // Se o campo não existir, inicializá-lo
      if (!matchup.teamStrategies) {
        matchup.teamStrategies = [];
      }

      // Para cada estratégia de equipe na atualização
      for (const updatedTeamStrategy of updateData.teamStrategies) {
        // Verificar se esta estratégia de equipe já existe para o tamanho
        const existingTeamStrategyIndex = matchup.teamStrategies.findIndex(
          (ts) => ts.teamSize === updatedTeamStrategy.teamSize
        );

        if (existingTeamStrategyIndex >= 0) {
          // Atualizar a estratégia de equipe existente
          matchup.teamStrategies[existingTeamStrategyIndex] = {
            ...matchup.teamStrategies[existingTeamStrategyIndex],
            ...updatedTeamStrategy
          };
        } else {
          // Adicionar a nova estratégia de equipe
          matchup.teamStrategies.push(updatedTeamStrategy);
        }
      }
    }

    // Atualizar generalTips se fornecido
    if (updateData.generalTips) {
      matchup.generalTips = {
        ...matchup.generalTips,
        ...updateData.generalTips
      };
    }

    // Atualizar counterUnits se fornecido
    if (updateData.counterUnits) {
      matchup.counterUnits = {
        ...matchup.counterUnits,
        ...updateData.counterUnits
      };
    }

    // Atualizar modSpecificStrategies se fornecido
    if (updateData.modSpecificStrategies) {
      // Para cada estratégia específica de mod na atualização
      for (const updatedModStrategy of updateData.modSpecificStrategies) {
        // Verificar se esta estratégia de mod já existe
        const existingModStrategyIndex = matchup.modSpecificStrategies.findIndex(
          (ms) => ms.modName === updatedModStrategy.modName
        );

        if (existingModStrategyIndex >= 0) {
          // Atualizar a estratégia de mod existente
          matchup.modSpecificStrategies[existingModStrategyIndex] = {
            ...matchup.modSpecificStrategies[existingModStrategyIndex],
            ...updatedModStrategy
          };
        } else {
          // Adicionar a nova estratégia de mod
          matchup.modSpecificStrategies.push(updatedModStrategy);
        }
      }
    }

    // Salvar o matchup atualizado
    await matchup.save();

    res.status(200).json({
      success: true,
      message: `Matchup entre ${civ1} e ${civ2} atualizado com sucesso`,
      data: matchup
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar matchup',
      error: error.message
    });
  }
};

// @desc    Adicionar um novo matchup
// @route   POST /api/matchups
// @access  Public
export const addMatchup = async (req: Request, res: Response) => {
  try {
    const { civilization1, civilization2 } = req.body;

    // Verificar se ambas as civilizações foram fornecidas
    if (!civilization1 || !civilization2) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça ambas as civilizações'
      });
    }

    // Verificar se o matchup já existe
    const existingMatchup = await CivilizationMatchup.findOne({
      $or: [
        { civilization1, civilization2 },
        { civilization1: civilization2, civilization2: civilization1 }
      ]
    });

    if (existingMatchup) {
      return res.status(400).json({
        success: false,
        message: `Matchup entre ${civilization1} e ${civilization2} já existe`
      });
    }

    // Criar o novo matchup
    const newMatchup = new CivilizationMatchup(req.body);
    await newMatchup.save();

    res.status(201).json({
      success: true,
      message: `Matchup entre ${civilization1} e ${civilization2} criado com sucesso`,
      data: newMatchup
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao adicionar matchup',
      error: error.message
    });
  }
};

// @desc    Excluir um matchup específico
// @route   DELETE /api/matchups/:civ1/:civ2
// @access  Private
export const deleteMatchup = async (req: Request, res: Response) => {
  try {
    const { civ1, civ2 } = req.params;

    // Verificar se os parâmetros foram fornecidos
    if (!civ1 || !civ2) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça ambas as civilizações'
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

    // Excluir o matchup
    await CivilizationMatchup.deleteOne({
      _id: matchup._id
    });

    res.status(200).json({
      success: true,
      message: `Matchup entre ${civ1} e ${civ2} excluído com sucesso`
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao excluir matchup',
      error: error.message
    });
  }
};

// @desc    Excluir um tipo de mapa específico de um matchup
// @route   DELETE /api/matchups/:civ1/:civ2/maps/:mapName
// @access  Private
export const deleteMapType = async (req: Request, res: Response) => {
  try {
    const { civ1, civ2, mapName } = req.params;

    // Verificar se os parâmetros foram fornecidos
    if (!civ1 || !civ2 || !mapName) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça ambas as civilizações e o nome do mapa'
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

    // Verificar se o tipo de mapa existe
    const mapTypeIndex = matchup.mapTypes.findIndex(map => map.mapName === mapName);
    
    if (mapTypeIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Tipo de mapa ${mapName} não encontrado no matchup entre ${civ1} e ${civ2}`
      });
    }

    // Remover o tipo de mapa
    matchup.mapTypes.splice(mapTypeIndex, 1);

    // Salvar as alterações
    await matchup.save();

    res.status(200).json({
      success: true,
      message: `Tipo de mapa ${mapName} removido com sucesso do matchup entre ${civ1} e ${civ2}`,
      data: matchup
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao excluir tipo de mapa',
      error: error.message
    });
  }
};

// @desc    Excluir uma estratégia alternativa específica
// @route   DELETE /api/matchups/:civ1/:civ2/strategies/:strategyType/:civilization
// @access  Private
export const deleteStrategy = async (req: Request, res: Response) => {
  try {
    const { civ1, civ2, strategyType, civilization } = req.params;

    // Verificar se os parâmetros foram fornecidos
    if (!civ1 || !civ2 || !strategyType || !civilization) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça todos os parâmetros necessários'
      });
    }

    // Verificar se o tipo de estratégia é válido
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

    // Verificar se existem estratégias alternativas
    if (!matchup.alternativeStrategies || matchup.alternativeStrategies.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Nenhuma estratégia alternativa encontrada no matchup entre ${civ1} e ${civ2}`
      });
    }

    // Verificar se a estratégia específica existe
    const strategyIndex = matchup.alternativeStrategies.findIndex(
      s => s.strategyType === strategyType && s.civilization === civilization
    );

    if (strategyIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Estratégia do tipo ${strategyType} para ${civilization} não encontrada no matchup entre ${civ1} e ${civ2}`
      });
    }

    // Remover a estratégia
    matchup.alternativeStrategies.splice(strategyIndex, 1);

    // Salvar as alterações
    await matchup.save();

    res.status(200).json({
      success: true,
      message: `Estratégia do tipo ${strategyType} para ${civilization} removida com sucesso do matchup entre ${civ1} e ${civ2}`,
      data: matchup
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao excluir estratégia',
      error: error.message
    });
  }
};

// @desc    Busca avançada de matchups
// @route   POST /api/matchups/search
// @access  Public
export const searchMatchups = async (req: Request, res: Response) => {
  try {
    const {
      civilizations,
      mapTypes,
      strategyTypes,
      units,
      technologies,
      modNames,
      teamSizes,
      page = 1,
      limit = 10
    } = req.body;

    const query: any = {};
    
    // Filtrar por civilizações (pode ser uma ou mais)
    if (civilizations && civilizations.length > 0) {
      query.$or = [
        { civilization1: { $in: civilizations } },
        { civilization2: { $in: civilizations } }
      ];
    }
    
    // Filtrar por tipos de mapa
    if (mapTypes && mapTypes.length > 0) {
      query['mapTypes.mapName'] = { $in: mapTypes };
    }
    
    // Filtrar por tipos de estratégia
    if (strategyTypes && strategyTypes.length > 0) {
      query['alternativeStrategies.strategyType'] = { $in: strategyTypes };
    }
    
    // Filtrar por unidades recomendadas
    if (units && units.length > 0) {
      query.$or = query.$or || [];
      query.$or.push(
        { 'mapTypes.strategies.civilization1Strategy.units': { $in: units } },
        { 'mapTypes.strategies.civilization2Strategy.units': { $in: units } },
        { 'alternativeStrategies.units': { $in: units } }
      );
    }
    
    // Filtrar por tecnologias recomendadas
    if (technologies && technologies.length > 0) {
      query.$or = query.$or || [];
      query.$or.push(
        { 'mapTypes.strategies.civilization1Strategy.technologies': { $in: technologies } },
        { 'mapTypes.strategies.civilization2Strategy.technologies': { $in: technologies } },
        { 'alternativeStrategies.technologies': { $in: technologies } }
      );
    }
    
    // Filtrar por modos de jogo específicos
    if (modNames && modNames.length > 0) {
      query['modSpecificStrategies.modName'] = { $in: modNames };
    }
    
    // Filtrar por tamanhos de equipe
    if (teamSizes && teamSizes.length > 0) {
      query['teamStrategies.teamSize'] = { $in: teamSizes };
    }
    
    // Calcular valores para paginação
    const skipIndex = (parseInt(page.toString()) - 1) * parseInt(limit.toString());
    
    // Executar a consulta com paginação
    const matchups = await CivilizationMatchup.find(query)
      .sort({ civilization1: 1, civilization2: 1 })
      .limit(parseInt(limit.toString()))
      .skip(skipIndex);
    
    // Contar total de documentos para paginação
    const totalMatchups = await CivilizationMatchup.countDocuments(query);
    
    // Verificar se há matchups
    if (matchups.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Nenhum matchup encontrado com os critérios especificados'
      });
    }
    
    res.status(200).json({
      success: true,
      count: matchups.length,
      total: totalMatchups,
      page: parseInt(page.toString()),
      pages: Math.ceil(totalMatchups / parseInt(limit.toString())),
      data: matchups
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar matchups',
      error: error.message
    });
  }
}; 