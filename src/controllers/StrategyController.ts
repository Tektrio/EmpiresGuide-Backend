import { Request, Response } from 'express';
import Civilization from '../models/Civilization';
import Landmark from '../models/Landmark';
import MapStrategy from '../models/MapStrategy';
import CivilizationMatchup from '../models/CivilizationMatchup';

// Defina uma interface para o objeto civilizationExamples para evitar erros de tipo
interface CivilizationExample {
  name: string;
  strengths: string[];
  weaknesses: string[];
  uniqueUnits: Array<{
    name: string;
    description: string;
    strategicUse: string;
  }>;
  uniqueTechnologies: Array<{
    name: string;
    effect: string;
    strategicValue: string;
  }>;
}

interface CivilizationExamplesType {
  [key: string]: CivilizationExample;
}

// Dados de exemplo para demonstração
const civilizationExamples: CivilizationExamplesType = {
  'Chineses': {
    name: 'Chineses',
    strengths: [
      'Defesa excepcional com muralhas aprimoradas',
      'Grande quantidade de tecnologias únicas',
      'Forte economia baseada em impérios e comércio',
      'Unidades de pólvora poderosas na Era IV'
    ],
    weaknesses: [
      'Início de jogo mais lento',
      'Unidades geralmente mais caras',
      'Menor mobilidade em comparação a outras civilizações',
      'Tempo de construção mais longo para estruturas especiais'
    ],
    uniqueUnits: [
      { 
        name: 'Lanceiro de Fogo', 
        description: 'Infantaria anti-cavalaria com dano em área',
        strategicUse: 'Eficaz contra grupos de cavalaria'
      },
      { 
        name: 'Chu Ko Nu', 
        description: 'Besta que dispara múltiplas flechas',
        strategicUse: 'Excelente contra unidades agrupadas'
      }
    ],
    uniqueTechnologies: [
      {
        name: 'Pólvora Avançada',
        effect: 'Aumenta o dano das unidades de pólvora',
        strategicValue: 'Crítico para domínio tardio no jogo'
      },
      {
        name: 'Construção Imperial',
        effect: 'Aumenta a vida das estruturas defensivas',
        strategicValue: 'Fortalece significativamente suas defesas'
      }
    ]
  },
  'Mongóis': {
    name: 'Mongóis',
    strengths: [
      'Mobilidade excepcional com unidades montadas',
      'Forte economia baseada em ovelhas e comércio',
      'Arqueiros montados letais',
      'Capacidade de construir estruturas militares rapidamente'
    ],
    weaknesses: [
      'Dependência de unidades caras',
      'Vulnerabilidade a unidades anti-cavalaria',
      'Base inicial mais frágil',
      'Necessidade de microgerenciamento intenso'
    ],
    uniqueUnits: [
      { 
        name: 'Arqueiros Montados Mongóis', 
        description: 'Unidade de arqueiros a cavalo com alta mobilidade',
        strategicUse: 'Ataques rápidos e fuga, harass de aldeões'
      },
      { 
        name: 'Mangudai', 
        description: 'Arqueiros a cavalo de elite',
        strategicUse: 'Ataques rápidos contra unidades de cerco e à distância'
      }
    ],
    uniqueTechnologies: [
      {
        name: 'Mobilidade da Horda',
        effect: 'Aumenta a velocidade de movimento de todas as unidades montadas',
        strategicValue: 'Melhora significativamente a capacidade de raid e mobilidade no mapa'
      },
      {
        name: 'Táticas de Batida',
        effect: 'Arqueiros montados causam mais dano a aldeões',
        strategicValue: 'Essencial para estratégias de raid eficazes'
      }
    ]
  },
  'Ingleses': {
    name: 'Ingleses',
    strengths: [
      'Rede de fazendas eficiente para economia sustentável',
      'Arqueiros longbows com alcance superior',
      'Sistema de defesa com torres e postos avançados',
      'Infantaria de homens de armas resistente'
    ],
    weaknesses: [
      'Mobilidade relativamente baixa',
      'Vulnerabilidade a ataques rápidos no início',
      'Cavalaria limitada',
      'Dificuldade contra civilizações com unidades de cerco avançadas'
    ],
    uniqueUnits: [
      { 
        name: 'Arqueiro de Longa Distância',
        description: 'Arqueiro especializado com alcance superior',
        strategicUse: 'Excelente para defesa e combate à distância'
      },
      { 
        name: 'Homem de Armas',
        description: 'Infantaria pesada com armadura reforçada',
        strategicUse: 'Força principal de choque contra unidades inimigas'
      }
    ],
    uniqueTechnologies: [
      {
        name: 'Rede de Fazendas',
        effect: 'Aumenta a produção de alimento das fazendas',
        strategicValue: 'Essencial para sustentar uma economia forte a longo prazo'
      },
      {
        name: 'Treinamento de Arqueiros',
        effect: 'Melhora o alcance e precisão dos arqueiros longbows',
        strategicValue: 'Potencializa significativamente a eficácia dos arqueiros em combate'
      }
    ]
  }
};

// Função para gerar estratégia de exemplo com base na civilização
export const getExampleStrategy = async (req: Request, res: Response) => {
  try {
    const { playerCiv, enemyCivs = [], modPack = 'Padrão' } = req.body;
    
    // Se a civilização solicitada existe em nossos exemplos, use-a
    const civilizationData = civilizationExamples[playerCiv] || civilizationExamples['Ingleses'];
    const enemyCivData = enemyCivs.length > 0 && civilizationExamples[enemyCivs[0]] 
      ? civilizationExamples[enemyCivs[0]] 
      : civilizationExamples['Mongóis'];
    
    // Dados detalhados sobre os marcos dos Ingleses
    const landmarksData = civilizationData.name === 'Ingleses' ? [
      {
        name: 'Abadia de Westminster',
        era: 'Era II',
        effect: 'Produz ouro passivamente e permite pesquisar tecnologias religiosas exclusivas',
        recommendedAgainst: ['Mongóis', 'Rus'],
        strategicValue: 'Excelente para jogos longos onde a economia sustentável é crucial'
      },
      {
        name: 'Conselho do Burgo',
        era: 'Era II',
        effect: 'Reduz o custo de unidades de infantaria e permite tecnologias militares especiais',
        recommendedAgainst: ['Franceses', 'Delhi Sultanato'],
        strategicValue: 'Ótimo para estratégias de pressão militar no início do jogo'
      },
      {
        name: 'Abadia de São Albano',
        era: 'Era III',
        effect: 'Cura unidades próximas e fornece bônus defensivos',
        recommendedAgainst: ['Abássidas', 'Delhi Sultanato'],
        strategicValue: 'Excelente para sustentar batalhas prolongadas e manter suas unidades em campo'
      },
      {
        name: 'Castelo de Berkshire',
        era: 'Era III',
        effect: 'Produz unidades de cerco mais rapidamente e com custo reduzido',
        recommendedAgainst: ['Franceses', 'Rus'],
        strategicValue: 'Permite quebrar fortificações inimigas e preparar assaltos decisivos'
      },
      {
        name: 'Catedral de Winchester',
        era: 'Era IV',
        effect: 'Fornece bônus defensivos substanciais e permite táticas especiais de contraataque',
        recommendedAgainst: ['Franceses', 'Rus'],
        strategicValue: 'Extremamente poderoso para defesa e controle de território'
      },
      {
        name: 'Palácio de Westminster',
        era: 'Era IV',
        effect: 'Melhora significativamente a eficiência econômica e aumenta o limite populacional',
        recommendedAgainst: ['Mongóis', 'Chineses'],
        strategicValue: 'Permite sustentar um exército maior no fim de jogo'
      }
    ] : [
      // Marcos existentes para outras civilizações
      {
        name: 'Posto Comercial Tártaro',
        era: 'Era II',
        effect: 'Gera ouro passivamente e aumenta a eficiência do comércio'
      },
      {
        name: 'Estábulo da Horda',
        era: 'Era II',
        effect: 'Permite treinar unidades montadas com desconto'
      },
      {
        name: 'Acampamento da Horda',
        era: 'Era III',
        effect: 'Aumenta a velocidade de movimento de todas as unidades'
      }
    ];

    // Estratégias detalhadas para cada era
    const detailedPhases = civilizationData.name === 'Ingleses' ? {
      eraI: {
        earlyStrategy: 'Concentre-se em construir fazendas perto do Centro da Cidade para maximizar o bônus de alimento inglês. Priorize a coleta de ouro e pedra para avançar rapidamente para a Era II.',
        militaryFocus: 'Treine alguns arqueiros longbows para defesa inicial e lance um pequeno grupo de guerreiros para proteção contra raids.',
        landmarks: 'Planeje com antecedência qual marco escolher na Era II - Abadia de Westminster é melhor para jogos econômicos, enquanto Conselho do Burgo é superior para pressão militar.',
        timing: 'Avance para a Era II entre 5:00-6:30, dependendo da pressão inimiga.'
      },
      eraII: {
        earlyStrategy: 'Expanda sua rede de fazendas e construa um Mercado para melhorar sua economia. Comece a construir a rede de torres para proteger recursos críticos.',
        militaryFocus: 'Produza uma força equilibrada de arqueiros longbows e homens de armas. Adicione lanceiros se o inimigo utilizar cavalaria.',
        landmarks: 'Contra Mongóis, a Abadia de Westminster é preferível para compensar sua vantagem de mobilidade com economia sustentável. Contra civilizações mais defensivas, o Conselho do Burgo é mais eficaz.',
        timing: 'Avance para a Era III por volta dos 12:00-15:00, após estabelecer uma economia sólida e uma força militar básica.'
      },
      eraIII: {
        midStrategy: 'Fortaleça sua defesa com torres adicionais e muralhas em pontos estratégicos. Desenvolva sua economia com mais fazendas e postos comerciais.',
        militaryFocus: 'Adicione unidades de cerco às suas forças e continue melhorando seus arqueiros e infantaria. Comece a formar um exército para ataques coordenados.',
        landmarks: 'Escolha a Abadia de São Albano contra inimigos que favorecem ataques de desgaste, ou o Castelo de Berkshire se precisar brecar fortificações inimigas.',
        timing: 'Avance para a Era IV após 20:00-25:00, quando tiver uma presença militar significativa e economia estável.'
      },
      eraIV: {
        lateStrategy: 'Maximize sua produção econômica e militar. Fortifique todas as posições importantes e prepare-se para o confronto final.',
        militaryFocus: 'Forme um exército completo com todas as melhorias disponíveis. Inclua muitas unidades de cerco e arqueiros longbows totalmente aprimorados.',
        landmarks: 'A Catedral de Winchester é excelente para uma estratégia defensiva, enquanto o Palácio de Westminster permite sustentar um exército maior para um ataque decisivo.',
        victory: 'Use sua vantagem em defesa para desgastar o inimigo e então lance um ataque decisivo com força esmagadora.'
      }
    } : {
      // Fases genéricas para outras civilizações
      eraI: {
        strategy: 'Desenvolva sua economia e explore o mapa',
        militaryFocus: 'Unidades básicas para defesa e exploração',
        timing: 'Avance rapidamente para a Era II'
      },
      eraII: {
        strategy: 'Expanda território e fortaleça economia',
        militaryFocus: 'Comece a produzir um exército mais forte',
        timing: 'Prepare-se para o meio de jogo'
      },
      eraIII: {
        strategy: 'Controle recursos estratégicos e aumente produção',
        militaryFocus: 'Desenvolva composições de exército mais avançadas',
        timing: 'Posicione-se para o final do jogo'
      },
      eraIV: {
        strategy: 'Maximize produção e prepare-se para a vitória',
        militaryFocus: 'Unidades de elite e máquinas de cerco',
        victory: 'Execute sua condição de vitória preferida'
      }
    };

    // Análise detalhada de confrontos
    const detailedMatchups = [{
      playerCiv: civilizationData.name,
      enemyCiv: enemyCivData.name,
      overallStrategy: civilizationData.name === 'Ingleses' && enemyCivData.name === 'Mongóis' ?
        `Aproveite suas defesas fortes e arqueiros para contra-atacar a mobilidade mongol. Estabeleça uma linha defensiva sólida e force-os a enfrentar seus arqueiros.` :
        `Utilize a sua ${civilizationData.strengths[0].toLowerCase()} contra a ${enemyCivData.weaknesses[0].toLowerCase()} do inimigo.`,
      enemyStrengths: civilizationData.name === 'Ingleses' && enemyCivData.name === 'Mongóis' ? [
        'Mobilidade excepcional com unidades montadas',
        'Grande capacidade de realizar raids em múltiplos pontos',
        'Arqueiros montados eficazes contra unidades isoladas',
        'Capacidade de reposicionar acampamentos rapidamente'
      ] : ['Força principal do inimigo 1', 'Força principal do inimigo 2'],
      enemyWeaknesses: civilizationData.name === 'Ingleses' && enemyCivData.name === 'Mongóis' ? [
        'Unidades mais frágeis em combates diretos',
        'Vulnerabilidade à arqueiros em posições defensivas',
        'Base menos fortalecida e mais vulnerável a ataques diretos',
        'Dependência de uma economia baseada em ovelhas que pode ser atacada'
      ] : ['Fraqueza principal do inimigo 1', 'Fraqueza principal do inimigo 2'],
      unitsToFocus: civilizationData.name === 'Ingleses' ? 
        ['Arqueiros de Longa Distância', 'Homens de Armas', 'Piqueiros'] : 
        ['Arqueiros Montados', 'Cavalaria Pesada', 'Lanceiros'],
      unitsToAvoid: civilizationData.name === 'Ingleses' && enemyCivData.name === 'Mongóis' ? 
        ['Cavalaria Leve', 'Unidades isoladas fora do alcance das torres'] : 
        ['Piqueiros', 'Infantaria Pesada'],
      earlyGameStrategy: civilizationData.name === 'Ingleses' && enemyCivData.name === 'Mongóis' ? 
        'Construa uma rede defensiva com torres e arqueiros para se proteger dos ataques rápidos dos Mongóis. Fortaleça sua economia com fazendas agrupadas para resistir a raids.' : 
        'Faça raids constantes para pressionar a economia deles.',
      midGameStrategy: civilizationData.name === 'Ingleses' && enemyCivData.name === 'Mongóis' ? 
        'Mantenha suas unidades próximas às defesas. Use arqueiros para enfraquecer a cavalaria mongol antes que ela possa atacar. Expanda com cuidado, sempre protegendo novas expansões com torres.' : 
        'Mantenha a pressão com ataques rápidos em múltiplas frentes.',
      lateGameStrategy: civilizationData.name === 'Ingleses' && enemyCivData.name === 'Mongóis' ? 
        'Avance com um exército bem formado de infantaria pesada e arqueiros, apoiados por unidades de cerco para destruir as estruturas mongóis. Use sua infantaria para proteger arqueiros e unidades de cerco.' : 
        'Evite confrontos diretos, foque em mobilidade e controle de recursos.',
      landmarkPriorities: civilizationData.name === 'Ingleses' && enemyCivData.name === 'Mongóis' ? [
        'Era II: Abadia de Westminster para economia sustentável',
        'Era III: Castelo de Berkshire para produzir unidades de cerco',
        'Era IV: Palácio de Westminster para sustentar um exército maior'
      ] : ['Prioridade de marco 1', 'Prioridade de marco 2', 'Prioridade de marco 3'],
      criticalTechnologies: civilizationData.name === 'Ingleses' && enemyCivData.name === 'Mongóis' ? [
        'Aprimoramentos de Arqueiros de Longa Distância',
        'Fortificações Avançadas para torres',
        'Armadura Pesada para infantaria',
        'Tecnologias de produção de fazendas'
      ] : ['Tecnologia importante 1', 'Tecnologia importante 2']
    }];
    
    // Informações sobre o mod selecionado
    const modPackData = {
      name: modPack || 'Padrão',
      description: modPack === '400 Pop and Better Stats' 
        ? 'Aumenta o limite de população para 400 e melhora as estatísticas de unidades'
        : modPack === 'Enhanced Economics'
        ? 'Modifica as mecânicas econômicas para maior eficiência de coleta e comércio'
        : modPack === 'Advanced Game Settings'
        ? 'Permite configurações avançadas como aumento de recursos e velocidade de jogo'
        : modPack === 'Permanent Bodies'
        ? 'Faz com que os corpos de unidades permaneçam no campo de batalha'
        : modPack === 'Better Balance'
        ? 'Rebalanceia unidades e tecnologias para um jogo mais equilibrado'
        : 'Configurações padrão do jogo sem modificações',
      effects: modPack === '400 Pop and Better Stats' 
        ? [
            'Limite de população aumentado para 400',
            'Aumento de 15% nos pontos de vida de todas as unidades',
            'Velocidade de movimento de todas as unidades aumentada em 10%',
            'Taxa de produção de unidades melhorada em 20%'
          ]
        : modPack === 'Enhanced Economics'
        ? [
            'Coleta de recursos 25% mais eficiente',
            'Edifícios econômicos custam 20% menos',
            'Rotas comerciais geram 30% mais ouro',
            'Recurso bônus para cada mercado construído'
          ]
        : modPack === 'Advanced Game Settings'
        ? [
            'Controle sobre recursos iniciais',
            'Opções de velocidade de jogo personalizáveis',
            'Limite de população ajustável',
            'Personalização de condições de vitória'
          ]
        : modPack === 'Permanent Bodies'
        ? [
            'Corpos permanecem no campo de batalha',
            'Efeitos visuais de batalha aprimorados',
            'Rastros de sangue persistentes',
            'Impacto mínimo no desempenho do jogo'
          ]
        : modPack === 'Better Balance'
        ? [
            'Unidades mais fracas recebem buffs de balanceamento',
            'Unidades muito poderosas são ligeiramente enfraquecidas',
            'Tecnologias com baixa taxa de uso têm custo reduzido',
            'Civiliziações menos populares recebem melhorias específicas'
          ]
        : [
            'Balanceamento normal do jogo oficial',
            'Limite de população de 200',
            'Mecânicas padrão de recursos',
            'Regras oficiais sem modificações'
          ],
      strategicChanges: modPack === '400 Pop and Better Stats' 
        ? [
            'Construa mais edifícios de produção para aproveitar o limite maior de população',
            'Invista em unidades de cerco e formações massivas',
            'Considere construir mais aldeões que o normal para sustentar exércitos maiores',
            `Aproveite a estratégia de "superioridade numérica" com ${civilizationData.name}`
          ]
        : modPack === 'Enhanced Economics'
        ? [
            'Priorize ainda mais o desenvolvimento econômico desde o início',
            'Construa mais postos comerciais do que o normal',
            'Pesquise tecnologias econômicas mais cedo',
            'Aproveite a vantagem econômica para superar oponentes com unidades de elite'
          ]
        : modPack === 'Advanced Game Settings'
        ? [
            'Ajuste sua estratégia com base nas configurações específicas da partida',
            'Aumente sua produção de unidades se os recursos forem abundantes',
            'Em jogos mais rápidos, priorize desenvolvimento militar antecipado',
            'Considere estratégias não convencionais em configurações personalizadas'
          ]
        : modPack === 'Permanent Bodies'
        ? [
            'Use corpos como obstáculos táticos no campo de batalha',
            'Batalhas em áreas estreitas podem resultar em bloqueios pelo acúmulo de corpos',
            'Planeje rotas alternativas para movimentação de unidades',
            'Considere esta mecânica ao planejar defesas e emboscadas'
          ]
        : modPack === 'Better Balance'
        ? [
            'Experimente unidades anteriormente consideradas fracas',
            'Reavalie as hierarquias de unidades tradicionais',
            'Ajuste suas estratégias contra civilizações que receberam buffs',
            'Busque informações atualizadas sobre os balanceamentos específicos'
          ]
        : [
            'Siga as estratégias padrão para sua civilização',
            'Utilize as unidades com balanceamento oficial',
            'Respeite os limites padrões de população e recursos',
            'Mantenha-se atualizado com as mudanças oficiais de balanceamento'
          ],
      recommendedCivilizations: modPack === '400 Pop and Better Stats' 
        ? ['Delhi Sultanato', 'Franceses', 'Tártaros']
        : modPack === 'Enhanced Economics'
        ? ['Abássidas', 'Bizantinos', 'Ingleses']
        : modPack === 'Advanced Game Settings'
        ? ['Mongóis', 'Rus', 'Armênios']
        : modPack === 'Permanent Bodies'
        ? ['Ingleses', 'Chineses', 'Franceses']
        : modPack === 'Better Balance'
        ? ['Delhi Sultanato', 'Malianos', 'Gurjar Pratiharas']
        : ['Mongóis', 'Franceses', 'Rus']
    };

    // Informações sobre mods alternativos
    const modPackAlternatives = [
      {
        name: '400 Pop and Better Stats',
        description: 'Aumenta o limite de população e melhora estatísticas de unidades',
        effects: [
          'Limite de população aumentado para 400',
          'Aumento das estatísticas de algumas unidades',
          'Tempo de construção reduzido'
        ],
        recommendedUse: 'Ideal para partidas com foco em grandes exércitos e batalhas épicas'
      },
      {
        name: 'Enhanced Economics',
        description: 'Modifica as mecânicas econômicas do jogo',
        effects: [
          'Aldeões coletam recursos mais rapidamente',
          'Custos de tecnologias econômicas reduzidos',
          'Novas opções de mercado e comércio'
        ],
        recommendedUse: 'Ótimo para jogadores que preferem um jogo mais voltado à economia'
      },
      {
        name: 'Advanced Game Settings',
        description: 'Personalização avançada das configurações de jogo',
        effects: [
          'Controle sobre níveis de recursos',
          'Ajuste de velocidade do jogo',
          'Personalização de condições de vitória'
        ],
        recommendedUse: 'Perfeito para criar experiências de jogo personalizadas'
      }
    ].filter(mod => mod.name !== modPack);
    
    const exampleStrategy = {
      civilization: civilizationData,
      recommendations: {
        earlyGame: playerCiv === 'Ingleses' || civilizationData.name === 'Ingleses' ? [
          `Construa fazendas próximas ao centro da cidade para aproveitar o bônus agrícola`,
          `Treine alguns arqueiros para defesa inicial`,
          `Construa uma rede de torres defensivas em pontos estratégicos`,
          `Pesquise melhorias para arqueiros assim que possível`
        ] : [
          `Comece criando ovelhas para uma economia forte`,
          `Construa um posto comercial o mais cedo possível`,
          `Treine arqueiros montados para harass`,
          `Explore o mapa com sua cavalaria leve`
        ],
        midGame: playerCiv === 'Ingleses' || civilizationData.name === 'Ingleses' ? [
          `Expanda sua rede de fazendas para fortalecer sua economia`,
          `Produza uma combinação de arqueiros de longa distância e infantaria pesada`,
          `Estabeleça posições defensivas firmes com torres`,
          `Foque em pesquisas que melhorem suas unidades principais`
        ] : [
          `Expanda sua economia com novas vilas`,
          `Produza uma mistura de cavalaria e arqueiros montados`,
          `Foque em ataques rápidos e fuga`,
          `Evite confrontos diretos com infantaria pesada inimiga`
        ],
        lateGame: playerCiv === 'Ingleses' || civilizationData.name === 'Ingleses' ? [
          `Mantenha uma economia forte baseada em fazendas e comércio`,
          `Forme um exército equilibrado com foco em arqueiros de longa distância e infantaria`,
          `Use unidades de cerco para atacar fortificações inimigas`,
          `Aproveite suas defesas para desgastar o inimigo antes de contra-atacar`
        ] : [
          `Controle recursos-chave no mapa`,
          `Mantenha pressão constante com raids`,
          `Desenvolva cavalaria pesada para combates decisivos`,
          `Use a mobilidade para atacar pontos fracos do inimigo`
        ]
      },
      matchups: detailedMatchups,
      landmarks: landmarksData,
      phases: detailedPhases,
      map: {
        name: 'Pradaria Aberta',
        type: 'Terra',
        generalStrategy: 'Utilize a mobilidade das suas unidades montadas para controlar o mapa aberto.',
        resourceControl: 'Garanta o controle de pontos de recursos espalhados pelo mapa.',
        expansionPriorities: 'Expanda para áreas abertas onde sua mobilidade é mais vantajosa.',
        resourceDistribution: {
          food: 'Médio, principalmente de ovelhas e caça',
          gold: 'Limitado, concentrado no centro do mapa',
          wood: 'Abundante nas bordas do mapa',
          stone: 'Escasso, apenas em algumas áreas específicas'
        },
        recommendedStrategies: {
          early: [
            'Explore rapidamente o mapa',
            'Assegure recursos próximos à sua base',
            'Construa postos avançados para visibilidade'
          ],
          mid: [
            'Controle o centro do mapa',
            'Use a mobilidade para raids constantes',
            'Defenda rotas comerciais importantes'
          ],
          late: [
            'Mantenha o controle de recursos-chave',
            'Use formações de unidades espalhadas',
            'Ataque de múltiplas direções simultaneamente'
          ]
        }
      },
      victoryPath: {
        primary: civilizationData.name === 'Ingleses' ? 'Defesa Estratégica e Contra-ataque' : 'Destruição de Marcos',
        secondary: civilizationData.name === 'Ingleses' ? 'Superioridade Militar' : 'Domínio Econômico',
        requirements: civilizationData.name === 'Ingleses' ? 
          ['Economia agrícola forte', 'Rede de torres defensivas', 'Exército equilibrado'] : 
          ['Unidades de Cerco', 'Economia Forte', 'Mobilidade'],
        timing: civilizationData.name === 'Ingleses' ? 'Final de Jogo' : 'Meio/Final de Jogo',
        summary: civilizationData.name === 'Ingleses' && enemyCivData.name === 'Mongóis' ? 
          'Defenda-se dos ataques iniciais dos Mongóis, estabeleça uma economia forte baseada em fazendas, e então contra-ataque com uma força equilibrada de arqueiros de longa distância e infantaria pesada, apoiados por tecnologias avançadas.' : 
          'Use sua mobilidade e velocidade para dominar o mapa e atacar pontos fracos do inimigo.'
      },
      // Adicionar informações sobre mods
      modPack: modPackData,
      modPackAlternatives: modPackAlternatives
    };
    
    return res.status(200).json(exampleStrategy);
  } catch (error) {
    console.error('Erro ao gerar estratégia de exemplo:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Função para lidar com o banco de dados em memória
const getModelWithFallback = (modelName: any) => {
  // Se estamos usando o banco de dados em memória, retorna o modelo apropriado
  if ((global as any).mockMongooseEnabled) {
    // Usa o mongoose mockado global
    return modelName;
  }
  // Caso contrário, retorna o modelo normal
  return modelName;
};

export const getComprehensiveStrategy = async (req: Request, res: Response) => {
  try {
    const { 
      playerCivilization, 
      enemyCivilizations, 
      mapType, 
      gamePhase, 
      victoryFocus 
    } = req.body;

    if (!playerCivilization) {
      return res.status(400).json({ message: 'Civilização do jogador é obrigatória' });
    }

    // Busca informações da civilização do jogador
    const Civ = getModelWithFallback(Civilization);
    const civilization = await Civ.findOne({ name: playerCivilization }).exec();
    
    if (!civilization) {
      return res.status(404).json({ message: 'Civilização não encontrada' });
    }

    // Busca estratégias para o mapa
    const MapStrat = getModelWithFallback(MapStrategy);
    const mapStrategy = mapType ? await MapStrat.findOne({ name: mapType }).exec() : null;

    // Busca matchups com civilizações inimigas
    const CivMatch = getModelWithFallback(CivilizationMatchup);
    const matchups = enemyCivilizations && enemyCivilizations.length > 0 
      ? await Promise.all(enemyCivilizations.map(async (enemyCiv: string) => {
          const matchup = await CivMatch.findOne({ 
            playerCiv: playerCivilization, 
            enemyCiv 
          }).exec();
          return matchup;
        }))
      : [];

    // Filtra matchups nulos
    const validMatchups = matchups.filter(m => m !== null);

    // Busca landmarks recomendados
    const LandmarkModel = getModelWithFallback(Landmark);
    const landmarks = await LandmarkModel.find({ civilization: playerCivilization }).exec();

    // Constrói a resposta com a estratégia completa
    const response = {
      civilizationDetails: civilization,
      mapStrategy: mapStrategy,
      matchups: validMatchups,
      recommendedLandmarks: landmarks,
      gamePhaseStrategy: gamePhase ? generateGamePhaseStrategy(gamePhase, civilization, validMatchups) : null,
      victoryPath: victoryFocus ? determineVictoryPath(victoryFocus, civilization, mapStrategy) : null
    };

    res.json(response);
  } catch (error) {
    console.error('Erro ao gerar estratégia:', error);
    res.status(500).json({ message: 'Erro ao gerar estratégia' });
  }
};

export const getCivilizationDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Civ = getModelWithFallback(Civilization);
    const civilization = await Civ.findById(id).exec();
    
    if (!civilization) {
      return res.status(404).json({ message: 'Civilização não encontrada' });
    }
    
    res.json(civilization);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar detalhes da civilização' });
  }
};

export const getCivilizationLandmarks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Civ = getModelWithFallback(Civilization);
    const civilization = await Civ.findById(id).exec();
    
    if (!civilization) {
      return res.status(404).json({ message: 'Civilização não encontrada' });
    }
    
    const LandmarkModel = getModelWithFallback(Landmark);
    const landmarks = await LandmarkModel.find({ civilization: civilization.name }).exec();
    
    res.json(landmarks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar landmarks da civilização' });
  }
};

export const getEraStrategy = async (req: Request, res: Response) => {
  try {
    const { civId, era } = req.params;
    const Civ = getModelWithFallback(Civilization);
    const civilization = await Civ.findById(civId).exec();
    
    if (!civilization) {
      return res.status(404).json({ message: 'Civilização não encontrada' });
    }
    
    // Usamos type assertion para acessar a propriedade eraStrategies
    const civData = civilization as any;
    const eraStrategy = civData.eraStrategies && civData.eraStrategies[era];
    
    if (!eraStrategy) {
      return res.status(404).json({ message: 'Estratégia para esta Era não encontrada' });
    }
    
    res.json(eraStrategy);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar estratégia da Era' });
  }
};

export const getMatchupStrategy = async (req: Request, res: Response) => {
  try {
    const { playerCiv, enemyCiv } = req.query;
    
    if (!playerCiv || !enemyCiv) {
      return res.status(400).json({ 
        success: false,
        message: 'Parâmetros obrigatórios: playerCiv e enemyCiv'
      });
    }

    const CivMatch = getModelWithFallback(CivilizationMatchup);
    const matchup = await CivMatch.findOne({ 
      $or: [
        { playerCiv, enemyCiv },
        // Tentativa alternativa caso os campos tenham outros nomes
        { civilization1: playerCiv, civilization2: enemyCiv },
        { civilization1: enemyCiv, civilization2: playerCiv }
      ]
    }).exec();
    
    if (!matchup) {
      // Se não encontrar um matchup específico, criar uma estratégia personalizada
      const strategy = createMockStrategy(playerCiv.toString(), enemyCiv.toString());
      return res.json({ 
        success: true,
        strategy,
        message: 'Estratégia gerada dinamicamente'
      });
    }
    
    res.json({
      success: true,
      strategy: matchup,
      message: 'Estratégia encontrada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao buscar estratégia de matchup:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro ao buscar estratégia de matchup',
      error: (error as Error).message
    });
  }
};

// Função auxiliar para criar uma estratégia personalizada quando não há matchup específico
function createMockStrategy(playerCiv: string, enemyCiv: string) {
  return {
    playerCiv,
    enemyCiv,
    summary: `Estratégia para ${playerCiv} contra ${enemyCiv}`,
    early_game: {
      build_order: [
        "Centro da Cidade",
        "Casas",
        "Fazendas",
        "Quartel"
      ],
      tips: [
        "Foque em desenvolver sua economia primeiro",
        "Explore o mapa para encontrar recursos",
        "Construa unidades de defesa básicas"
      ]
    },
    mid_game: {
      build_order: [
        "Mercado",
        "Muralhas",
        "Estábulo",
        "Torre de Vigília"
      ],
      tips: [
        "Fortaleça suas defesas",
        "Expanda seu território",
        "Desenvolva tecnologias para melhorar suas unidades"
      ]
    },
    late_game: {
      build_order: [
        "Oficina de Cerco",
        "Universidade",
        "Postos Avançados"
      ],
      tips: [
        "Produza unidades de elite",
        "Utilize máquinas de cerco para destruir estruturas inimigas",
        "Controle recursos estratégicos no mapa"
      ]
    },
    mapTypes: [
      {
        mapName: "Qualquer",
        advantage: "Neutral",
        strategies: {
          civilization1Strategy: {
            early: ["Desenvolver economia", "Construir defesas básicas"],
            mid: ["Expandir território", "Treinar exército diversificado"],
            late: ["Atacar pontos fracos", "Controlar recursos chave"]
          },
          civilization2Strategy: {
            early: ["Explorar rapidamente", "Focar em tecnologias iniciais"],
            mid: ["Construir unidades especializadas", "Defender pontos estratégicos"],
            late: ["Lançar ataques coordenados", "Investir em tecnologias avançadas"]
          }
        }
      }
    ]
  };
}

export const getMapStrategy = async (req: Request, res: Response) => {
  try {
    const { mapId } = req.params;
    const MapStrat = getModelWithFallback(MapStrategy);
    const mapStrategy = await MapStrat.findById(mapId).exec();
    
    if (!mapStrategy) {
      return res.status(404).json({ message: 'Estratégia para este mapa não encontrada' });
    }
    
    res.json(mapStrategy);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar estratégia do mapa' });
  }
};

// Funções auxiliares
function generateGamePhaseStrategy(gamePhase: string, civilization: any, matchups: any[]) {
  // Implementação básica - pode ser expandida com lógica mais complexa
  if (!civilization) return null;
  
  let baseStrategy;
  const civData = civilization as any;
  
  switch (gamePhase) {
    case 'early':
      baseStrategy = civData.eraStrategies && civData.eraStrategies.eraI
        ? civData.eraStrategies.eraI
        : { recommendation: 'Foque em desenvolvimento econômico e exploração.' };
      break;
    case 'mid':
      baseStrategy = civData.eraStrategies && civData.eraStrategies.eraII
        ? civData.eraStrategies.eraII
        : { recommendation: 'Expanda sua economia e construa um exército.' };
      break;
    case 'late':
      baseStrategy = civData.eraStrategies && civData.eraStrategies.eraIII
        ? civData.eraStrategies.eraIII
        : { recommendation: 'Maximize sua produção e ataque pontos estratégicos.' };
      break;
    default:
      baseStrategy = { recommendation: 'Adapte sua estratégia com base na situação do jogo.' };
  }
  
  // Adiciona recomendações com base nos matchups
  if (matchups && matchups.length > 0) {
    const matchupRecommendations = matchups.map(matchup => {
      if (gamePhase === 'early') return matchup.earlyGameStrategy;
      if (gamePhase === 'mid') return matchup.midGameStrategy;
      if (gamePhase === 'late') return matchup.lateGameStrategy;
      return 'Adapte-se às forças e fraquezas do inimigo.';
    });
    
    baseStrategy.matchupRecommendations = matchupRecommendations;
  }
  
  return baseStrategy;
}

function determineVictoryPath(victoryFocus: string, civilization: any, mapStrategy: any) {
  // Implementação básica para recomendações de caminho para vitória
  type StrategyType = {
    recommendation: string;
    buildingPriority: string[];
    unitFocus: string[];
    civilizationSpecific?: string;
    mapSpecific?: string;
  };

  const strategies: Record<string, StrategyType> = {
    sacred: {
      recommendation: 'Controle locais sagrados para acumular pontos de vitória.',
      buildingPriority: ['Templos', 'Torres de Vigia', 'Fortificações'],
      unitFocus: ['Infantaria Pesada', 'Tropas de Suporte'],
      civilizationSpecific: '',
      mapSpecific: ''
    },
    wonder: {
      recommendation: 'Construa uma maravilha e defenda-a até que o tempo se esgote.',
      buildingPriority: ['Maravilha', 'Muralhas', 'Torres'],
      unitFocus: ['Unidades Defensivas', 'Arqueiros', 'Unidades de Cerco'],
      civilizationSpecific: '',
      mapSpecific: ''
    },
    conquest: {
      recommendation: 'Destrua as principais estruturas dos inimigos.',
      buildingPriority: ['Estruturas Militares', 'Postos Avançados', 'Oficinas de Cerco'],
      unitFocus: ['Unidades Ofensivas', 'Máquinas de Cerco', 'Cavalaria'],
      civilizationSpecific: '',
      mapSpecific: ''
    },
    trade: {
      recommendation: 'Desenvolva rotas comerciais e maximize sua economia.',
      buildingPriority: ['Mercados', 'Postos Comerciais', 'Docas'],
      unitFocus: ['Comerciantes', 'Caravanas', 'Navios Mercantes'],
      civilizationSpecific: '',
      mapSpecific: ''
    }
  };
  
  const defaultStrategy: StrategyType = {
    recommendation: 'Adapte sua estratégia com base nos recursos disponíveis e nas fraquezas do inimigo.',
    buildingPriority: ['Estruturas Militares', 'Estruturas Econômicas'],
    unitFocus: ['Unidades Balanceadas'],
    civilizationSpecific: '',
    mapSpecific: ''
  };

  const baseStrategy: StrategyType = strategies[victoryFocus as keyof typeof strategies] || defaultStrategy;
    
  // Adiciona informações específicas da civilização quando disponíveis
  if (civilization) {
    const civName = typeof civilization === 'string' ? civilization : (civilization as any).name;
    baseStrategy.civilizationSpecific = `Use os pontos fortes dos ${civName} para este caminho de vitória.`;
  }
  
  // Adiciona informações específicas do mapa quando disponíveis
  if (mapStrategy) {
    baseStrategy.mapSpecific = `Considere as características do mapa ${mapStrategy.name} para este caminho de vitória.`;
  }
  
  return baseStrategy;
} 