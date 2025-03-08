import { Request, Response } from 'express';
import Civilization from '../models/Civilization';
import Landmark from '../models/Landmark';
import MapStrategy from '../models/MapStrategy';
import CivilizationMatchup from '../models/CivilizationMatchup';
import VictoryApproach from '../models/VictoryApproach';
import ModAdaptation from '../models/ModAdaptation';
import { Document } from 'mongoose';

interface EraStrategy {
  buildOrder: string[];
  keyUnits: string[];
  keyTechnologies: string[];
  economicFocus?: string;
  militaryFocus?: string;
}

interface CivilizationDocument extends Document {
  name: string;
  strengths: string[];
  weaknesses: string[];
  eraStrategies: {
    eraI?: EraStrategy;
    eraII?: EraStrategy;
    eraIII?: EraStrategy;
    eraIV?: EraStrategy;
  };
  uniqueUnits: any[];
  uniqueTechnologies: any[];
}

interface MapStrategyDocument extends Document {
  name: string;
  type: string;
  generalStrategy: string;
  resourceControl: string;
  expansionPriorities: string;
  civilizationAdvantages: Array<{ civilization: string; advantage: string }>;
  recommendedStrategies: {
    early: string[];
    mid: string[];
    late: string[];
  };
  resourceDistribution: Record<string, string>;
}

export const generateComprehensiveStrategy = async (req: Request, res: Response) => {
  try {
    const {
      playerCiv,
      enemyCivs,
      mapType,
      mapSize,
      gameMode,
      victoryConditions,
      resources,
      startingAge,
      modPack
    } = req.body;

    // Buscar informações da civilização do jogador
    const civilization = await Civilization.findOne({ name: playerCiv }) as CivilizationDocument | null;
    if (!civilization) {
      return res.status(404).json({ error: 'Civilização não encontrada' });
    }

    // Buscar estratégia do mapa
    const mapStrategy = await MapStrategy.findOne({ name: mapType }) as MapStrategyDocument | null;
    if (!mapStrategy) {
      return res.status(404).json({ error: 'Estratégia do mapa não encontrada' });
    }

    // Buscar confrontos com civilizações inimigas
    const matchups = await Promise.all(
      enemyCivs.map(async (enemyCiv: string) => {
        const matchup = await CivilizationMatchup.findOne({
          playerCiv,
          enemyCiv
        });
        return matchup;
      })
    );

    // Buscar marcos recomendados
    const landmarks = await Landmark.find({ civilization: playerCiv });

    // Buscar estratégias de condição de vitória
    const victoryStrategies = await Promise.all(
      Object.entries(victoryConditions)
        .filter(([_, isActive]) => isActive)
        .map(async ([condition]) => {
          const strategy = await VictoryApproach.findOne({ condition });
          return strategy;
        })
    );

    // Buscar adaptações do mod se aplicável
    let modAdaptation = null;
    if (modPack && modPack !== 'Padrão') {
      modAdaptation = await ModAdaptation.findOne({ modName: modPack });
    }

    // Obter estratégia da era atual
    const currentEraStrategy = civilization.eraStrategies[startingAge as keyof typeof civilization.eraStrategies] || {};

    // Construir estratégia completa
    const strategy = {
      civilization: {
        ...civilization.toObject(),
        currentEraStrategy
      },
      map: mapStrategy,
      matchups: matchups.filter(Boolean),
      landmarks,
      victoryStrategies: victoryStrategies.filter(Boolean),
      modAdaptation,
      recommendations: {
        earlyGame: generateEarlyGameStrategy(civilization, mapStrategy, resources),
        midGame: generateMidGameStrategy(civilization, matchups, mapStrategy),
        lateGame: generateLateGameStrategy(civilization, victoryConditions)
      },
      victoryPath: generateVictoryPath(victoryConditions, civilization, mapStrategy)
    };

    res.json(strategy);
  } catch (error) {
    console.error('Erro ao gerar estratégia:', error);
    res.status(500).json({ error: 'Erro ao gerar estratégia' });
  }
};

export const getCivilizationGuide = async (req: Request, res: Response) => {
  try {
    const { civId } = req.params;
    const civilization = await Civilization.findById(civId);
    if (!civilization) {
      return res.status(404).json({ error: 'Civilização não encontrada' });
    }

    const landmarks = await Landmark.find({ civilization: civilization.name });
    
    const guide = {
      civilization,
      landmarks,
      eraProgression: civilization.eraStrategies,
      uniqueUnits: civilization.uniqueUnits,
      technologies: civilization.uniqueTechnologies
    };

    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar guia da civilização' });
  }
};

export const getEraGuide = async (req: Request, res: Response) => {
  try {
    const { civId, era } = req.params;
    const civilization = await Civilization.findById(civId) as CivilizationDocument | null;
    if (!civilization) {
      return res.status(404).json({ error: 'Civilização não encontrada' });
    }

    const eraStrategy = civilization.eraStrategies[era as keyof typeof civilization.eraStrategies];
    if (!eraStrategy) {
      return res.status(404).json({ error: 'Estratégia da era não encontrada' });
    }

    const landmarks = await Landmark.find({
      civilization: civilization.name,
      era
    });

    const guide = {
      eraStrategy,
      landmarks,
      recommendedUnits: eraStrategy.keyUnits,
      buildOrder: eraStrategy.buildOrder,
      technologies: eraStrategy.keyTechnologies
    };

    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar guia da era' });
  }
};

export const getMatchupGuide = async (req: Request, res: Response) => {
  try {
    const { playerCiv, enemyCiv } = req.params;
    const matchup = await CivilizationMatchup.findOne({
      playerCiv,
      enemyCiv
    });

    if (!matchup) {
      return res.status(404).json({ error: 'Guia de confronto não encontrado' });
    }

    const playerCivData = await Civilization.findOne({ name: playerCiv });
    const enemyCivData = await Civilization.findOne({ name: enemyCiv });

    const guide = {
      matchup,
      playerCivUnits: playerCivData?.uniqueUnits,
      enemyCivUnits: enemyCivData?.uniqueUnits,
      recommendations: {
        early: matchup.mapTypes && matchup.mapTypes.length > 0 ? matchup.mapTypes[0].strategies.civilization1Strategy.early : [],
        mid: matchup.mapTypes && matchup.mapTypes.length > 0 ? matchup.mapTypes[0].strategies.civilization1Strategy.mid : [],
        late: matchup.mapTypes && matchup.mapTypes.length > 0 ? matchup.mapTypes[0].strategies.civilization1Strategy.late : []
      }
    };

    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar guia de confronto' });
  }
};

export const getMapGuide = async (req: Request, res: Response) => {
  try {
    const { mapId, civId } = req.params;
    const mapStrategy = await MapStrategy.findById(mapId) as MapStrategyDocument | null;
    if (!mapStrategy) {
      return res.status(404).json({ error: 'Estratégia do mapa não encontrada' });
    }

    const civilization = await Civilization.findById(civId);
    const civSpecificTips = mapStrategy.civilizationAdvantages.find(
      adv => adv.civilization === civilization?.name
    );

    const recommendedStrategies = mapStrategy.recommendedStrategies || { early: [], mid: [], late: [] };

    const guide = {
      mapStrategy,
      civilizationSpecific: civSpecificTips,
      generalStrategy: mapStrategy.generalStrategy,
      resourceControl: mapStrategy.resourceControl,
      recommendations: {
        early: recommendedStrategies.early || [],
        mid: recommendedStrategies.mid || [],
        late: recommendedStrategies.late || []
      }
    };

    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar guia do mapa' });
  }
};

export const getVictoryGuide = async (req: Request, res: Response) => {
  try {
    const { conditionId, civId } = req.params;
    const victoryApproach = await VictoryApproach.findById(conditionId);
    if (!victoryApproach) {
      return res.status(404).json({ error: 'Estratégia de vitória não encontrada' });
    }

    const civilization = await Civilization.findById(civId);
    const civSpecificApproach = victoryApproach.civilizationSpecificApproaches?.find(
      app => app.civilization === civilization?.name
    );

    const guide = {
      victoryApproach,
      civilizationSpecific: civSpecificApproach,
      generalStrategy: victoryApproach.generalStrategy,
      recommendations: {
        units: victoryApproach.recommendedUnits || [],
        timing: victoryApproach.timingConsiderations,
        mistakes: victoryApproach.commonMistakes || []
      }
    };

    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar guia de condição de vitória' });
  }
};

export const getModGuide = async (req: Request, res: Response) => {
  try {
    const { modId, civId } = req.params;
    const modAdaptation = await ModAdaptation.findById(modId);
    if (!modAdaptation) {
      return res.status(404).json({ error: 'Adaptação do mod não encontrada' });
    }

    const civilization = await Civilization.findById(civId);
    const civImpact = modAdaptation.civilizationImpacts?.find(
      imp => imp.civilization === civilization?.name
    );

    const guide = {
      modAdaptation,
      civilizationImpact: civImpact,
      generalChanges: modAdaptation.generalChanges,
      recommendations: {
        settings: modAdaptation.recommendedSettings,
        maps: modAdaptation.compatibleMaps || [],
        tips: modAdaptation.communityTips || []
      }
    };

    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar guia do mod' });
  }
};

// Funções auxiliares para geração de estratégias
const generateEarlyGameStrategy = (civilization: CivilizationDocument, mapStrategy: MapStrategyDocument, resources: string) => {
  const strategies: string[] = [];

  // Adicionar estratégias baseadas nos recursos iniciais
  if (resources === 'Baixo') {
    strategies.push('Foque em expandir sua economia rapidamente');
    strategies.push('Priorize recursos escassos');
  } else if (resources === 'Alto') {
    strategies.push('Invista em desenvolvimento militar precoce');
    strategies.push('Considere estratégias agressivas');
  }

  // Adicionar estratégias baseadas no mapa
  if (mapStrategy.type === 'Naval') {
    strategies.push('Estabeleça controle naval desde cedo');
    strategies.push('Garanta pontos de pesca');
  }

  // Adicionar estratégias específicas da civilização
  const eraI = civilization.eraStrategies.eraI;
  if (eraI && eraI.buildOrder) {
    strategies.push(...eraI.buildOrder);
  }

  return strategies;
};

const generateMidGameStrategy = (civilization: CivilizationDocument, matchups: any[], mapStrategy: MapStrategyDocument) => {
  const strategies: string[] = [];

  // Adicionar estratégias baseadas nos confrontos
  matchups.forEach(matchup => {
    if (matchup && matchup.midGameStrategy) {
      strategies.push(matchup.midGameStrategy);
    }
  });

  // Adicionar estratégias baseadas no mapa
  if (mapStrategy.recommendedStrategies && mapStrategy.recommendedStrategies.mid) {
    strategies.push(...mapStrategy.recommendedStrategies.mid);
  }

  // Adicionar estratégias específicas da civilização
  const eraII = civilization.eraStrategies.eraII;
  if (eraII && eraII.buildOrder) {
    strategies.push(...eraII.buildOrder);
  }

  return strategies.filter(Boolean);
};

const generateLateGameStrategy = (civilization: CivilizationDocument, victoryConditions: Record<string, boolean>) => {
  const strategies: string[] = [];

  // Adicionar estratégias baseadas nas condições de vitória
  if (victoryConditions.landmarks) {
    strategies.push('Prepare unidades de cerco para destruir marcos');
    strategies.push('Fortifique seus próprios marcos');
  }

  if (victoryConditions.sacred) {
    strategies.push('Mantenha controle dos pontos sagrados');
    strategies.push('Posicione unidades defensivas nos pontos');
  }

  // Adicionar estratégias específicas da civilização
  const eraIV = civilization.eraStrategies.eraIV;
  if (eraIV && eraIV.buildOrder) {
    strategies.push(...eraIV.buildOrder);
  }

  return strategies;
};

const generateVictoryPath = (victoryConditions: Record<string, boolean>, civilization: CivilizationDocument, mapStrategy: MapStrategyDocument) => {
  const path = {
    primary: '',
    secondary: '',
    requirements: [] as string[],
    timing: ''
  };

  // Determinar o caminho principal de vitória
  if (victoryConditions.landmarks) {
    path.primary = 'Destruição de Marcos';
    path.requirements = ['Unidades de Cerco', 'Economia Forte'];
    path.timing = 'Meio/Final de Jogo';
  } else if (victoryConditions.sacred) {
    path.primary = 'Controle Sagrado';
    path.requirements = ['Mobilidade', 'Controle de Mapa'];
    path.timing = 'Início/Meio de Jogo';
  }

  // Adicionar considerações específicas do mapa
  if (mapStrategy.type === 'Naval') {
    path.requirements.push('Controle Naval');
  }

  return path;
}; 