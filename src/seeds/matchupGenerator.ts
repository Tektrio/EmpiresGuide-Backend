import mongoose from 'mongoose';
import CivilizationMatchup from '../models/CivilizationMatchup';
import { matchups } from './matchupSeeds';

// Lista completa de civilizações no jogo
const allCivilizations = [
  'Ingleses',
  'Franceses',
  'Russos',
  'Mongóis',
  'Chineses',
  'Abássidas',
  'Sultanato de Delhi',
  'Sacro Império Romano-Germânico',
  'Otomanos',
  'Bizantinos',
  'Japoneses',
  'Malianos',
  'Ordem do Dragão',
  'Zhu Xi\'s Legacy',
  'Jeanne d\'Arc',
  'Ayyubids',
  'Dinastia Qarahanid', // Possível civilização futura
  'Normandos'           // Possível civilização futura
];

// Modelo básico para novos matchups
const createBasicMatchup = (civ1: string, civ2: string) => {
  return {
    civilization1: civ1,
    civilization2: civ2,
    mapTypes: [
      {
        mapName: 'Planícies Abertas',
        advantage: 'Neutral',
        strategies: {
          civilization1Strategy: {
            early: [
              `Desenvolver economia baseada nos pontos fortes de ${civ1}`,
              'Construir postos avançados para visão',
              'Adaptar para o jogo contra pontos fortes específicos do oponente'
            ],
            mid: [
              'Expandir controle de território',
              'Desenvolver combinação de unidades efetiva',
              'Focar em tecnologias-chave para vantagem militar'
            ],
            late: [
              'Usar composição de exército completa',
              'Controlar pontos estratégicos do mapa',
              'Adaptar táticas baseadas na composição do exército inimigo'
            ],
            units: ['Unidades específicas serão detalhadas em atualizações futuras'],
            technologies: ['Tecnologias específicas serão detalhadas em atualizações futuras'],
            landmarks: ['Landmarks específicos serão detalhados em atualizações futuras'],
            strategyType: 'Geral'
          },
          civilization2Strategy: {
            early: [
              `Desenvolver economia baseada nos pontos fortes de ${civ2}`,
              'Construir postos avançados para visão',
              'Adaptar para o jogo contra pontos fortes específicos do oponente'
            ],
            mid: [
              'Expandir controle de território',
              'Desenvolver combinação de unidades efetiva',
              'Focar em tecnologias-chave para vantagem militar'
            ],
            late: [
              'Usar composição de exército completa',
              'Controlar pontos estratégicos do mapa',
              'Adaptar táticas baseadas na composição do exército inimigo'
            ],
            units: ['Unidades específicas serão detalhadas em atualizações futuras'],
            technologies: ['Tecnologias específicas serão detalhadas em atualizações futuras'],
            landmarks: ['Landmarks específicos serão detalhados em atualizações futuras'],
            strategyType: 'Geral'
          }
        }
      }
    ],
    alternativeStrategies: [
      {
        name: `Estratégia de Ataque para ${civ1}`,
        description: `Uma abordagem ofensiva focada em pressão early game usando os pontos fortes de ${civ1}`,
        civilization: civ1,
        early: [
          'Construir ordem militar otimizada para agressão',
          'Identificar pontos fracos na defesa inimiga',
          'Aplicar pressão constante'
        ],
        mid: [
          'Manter controle de recursos estratégicos',
          'Negar expansão inimiga',
          'Desenvolver táticas de cerco eficientes'
        ],
        late: [
          'Atacar de múltiplos ângulos',
          'Focar em pontos fracos da economia inimiga',
          'Manter superioridade militar'
        ],
        units: ['Será detalhado em atualizações futuras'],
        technologies: ['Será detalhado em atualizações futuras'],
        strategyType: 'Ataque'
      },
      {
        name: `Estratégia de Defesa para ${civ1}`,
        description: `Uma abordagem defensiva focada em boom econômico e vantagem no late game com ${civ1}`,
        civilization: civ1,
        early: [
          'Construir muralhas e torres estratégicas',
          'Focar em desenvolvimento econômico seguro',
          'Scouts para detectar ataques antecipadamente'
        ],
        mid: [
          'Expandir economia protegida',
          'Desenvolver tecnologias defensivas',
          'Preparar transição para fase ofensiva'
        ],
        late: [
          'Converter vantagem econômica em poder militar',
          'Lançar contra-ataques decisivos',
          'Utilizar superioridade tecnológica'
        ],
        units: ['Será detalhado em atualizações futuras'],
        technologies: ['Será detalhado em atualizações futuras'],
        strategyType: 'Defesa'
      },
      {
        name: `Estratégia de Ataque para ${civ2}`,
        description: `Uma abordagem ofensiva focada em pressão early game usando os pontos fortes de ${civ2}`,
        civilization: civ2,
        early: [
          'Construir ordem militar otimizada para agressão',
          'Identificar pontos fracos na defesa inimiga',
          'Aplicar pressão constante'
        ],
        mid: [
          'Manter controle de recursos estratégicos',
          'Negar expansão inimiga',
          'Desenvolver táticas de cerco eficientes'
        ],
        late: [
          'Atacar de múltiplos ângulos',
          'Focar em pontos fracos da economia inimiga',
          'Manter superioridade militar'
        ],
        units: ['Será detalhado em atualizações futuras'],
        technologies: ['Será detalhado em atualizações futuras'],
        strategyType: 'Ataque'
      },
      {
        name: `Estratégia de Defesa para ${civ2}`,
        description: `Uma abordagem defensiva focada em boom econômico e vantagem no late game com ${civ2}`,
        civilization: civ2,
        early: [
          'Construir muralhas e torres estratégicas',
          'Focar em desenvolvimento econômico seguro',
          'Scouts para detectar ataques antecipadamente'
        ],
        mid: [
          'Expandir economia protegida',
          'Desenvolver tecnologias defensivas',
          'Preparar transição para fase ofensiva'
        ],
        late: [
          'Converter vantagem econômica em poder militar',
          'Lançar contra-ataques decisivos',
          'Utilizar superioridade tecnológica'
        ],
        units: ['Será detalhado em atualizações futuras'],
        technologies: ['Será detalhado em atualizações futuras'],
        strategyType: 'Defesa'
      }
    ],
    generalTips: {
      civilization1Tips: [
        `Aproveite os pontos fortes únicos de ${civ1}`,
        `Esteja atento às unidades contra de ${civ2}`,
        'Adapte sua estratégia baseada no mapa e na situação'
      ],
      civilization2Tips: [
        `Aproveite os pontos fortes únicos de ${civ2}`,
        `Esteja atento às unidades contra de ${civ1}`,
        'Adapte sua estratégia baseada no mapa e na situação'
      ]
    },
    counterUnits: {
      civilization1Counters: [
        {
          unit: 'Será detalhado em atualizações futuras',
          counters: ['Será detalhado em atualizações futuras']
        }
      ],
      civilization2Counters: [
        {
          unit: 'Será detalhado em atualizações futuras',
          counters: ['Será detalhado em atualizações futuras']
        }
      ]
    },
    modSpecificStrategies: [
      {
        modName: 'Empire Wars',
        civilization1Strategy: {
          early: [
            'Transição rápida para pressão militar',
            'Aproveitar economia inicial para vantagem',
            'Estabelecer controle de território'
          ],
          mid: [
            'Expandir controle de recursos',
            'Desenvolver combinação de unidades ideal',
            'Aplicar pressão constante'
          ],
          late: [
            'Maximizar eficiência de recursos',
            'Utilizar unidades de elite e tecnologias',
            'Controlar pontos estratégicos'
          ],
          units: ['Será detalhado em atualizações futuras'],
          technologies: ['Será detalhado em atualizações futuras']
        },
        civilization2Strategy: {
          early: [
            'Transição rápida para pressão militar',
            'Aproveitar economia inicial para vantagem',
            'Estabelecer controle de território'
          ],
          mid: [
            'Expandir controle de recursos',
            'Desenvolver combinação de unidades ideal',
            'Aplicar pressão constante'
          ],
          late: [
            'Maximizar eficiência de recursos',
            'Utilizar unidades de elite e tecnologias',
            'Controlar pontos estratégicos'
          ],
          units: ['Será detalhado em atualizações futuras'],
          technologies: ['Será detalhado em atualizações futuras']
        }
      }
    ]
  };
};

// Função para gerar todos os matchups
export async function generateAllMatchups() {
  try {
    console.log('🔄 Iniciando geração de matchups...');
    
    // Criando todos os matchups possíveis
    const allPossibleMatchups = [];
    
    // Mapeamento para verificar matchups existentes
    const existingMatchupsMap = new Map();
    
    // Popular o mapa com matchups existentes
    for (const matchup of matchups) {
      const key = `${matchup.civilization1}-${matchup.civilization2}`;
      existingMatchupsMap.set(key, true);
      allPossibleMatchups.push(matchup);
    }
    
    console.log(`✅ Encontrados ${existingMatchupsMap.size} matchups existentes`);
    
    // Gerar novos matchups para combinações faltantes
    let newMatchupsCount = 0;
    
    for (const civ1 of allCivilizations) {
      for (const civ2 of allCivilizations) {
        const key = `${civ1}-${civ2}`;
        
        // Se este matchup não existe ainda, crie-o
        if (!existingMatchupsMap.has(key)) {
          const newMatchup = createBasicMatchup(civ1, civ2);
          allPossibleMatchups.push(newMatchup);
          newMatchupsCount++;
        }
      }
    }
    
    console.log(`✅ Criados ${newMatchupsCount} novos matchups básicos`);
    console.log(`✅ Total de ${allPossibleMatchups.length} matchups disponíveis`);
    
    return allPossibleMatchups;
  } catch (error) {
    console.error('❌ Erro ao gerar matchups:', error);
    throw error;
  }
}

// Função para salvar matchups no banco de dados
export async function saveAllMatchups() {
  try {
    // Remover a coleção existente
    if (mongoose.connection.collections['civilizationmatchups']) {
      await mongoose.connection.collections['civilizationmatchups'].drop();
      console.log('🗑️ Coleção de matchups removida com sucesso!');
    }
    
    const allMatchups = await generateAllMatchups();
    
    // Inserir todos os matchups
    for (const matchup of allMatchups) {
      const newMatchup = new CivilizationMatchup(matchup);
      await newMatchup.save();
      console.log(`✅ Matchup ${matchup.civilization1} vs ${matchup.civilization2} inserido com sucesso!`);
    }
    
    console.log('✅ Todos os matchups foram inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao salvar matchups:', error);
    throw error;
  }
} 