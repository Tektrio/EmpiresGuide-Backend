import mongoose from 'mongoose';
import CivilizationMatchup from '../models/CivilizationMatchup';

const matchups = [
  // Mongóis vs Chineses
  {
    civilization1: 'Mongóis',
    civilization2: 'Chineses',
    mapTypes: [
      {
        mapName: 'Planícies Abertas',
        advantage: 'Civilization1',
        strategies: {
          civilization1Strategy: {
            early: [
              'Focar em raides com cavalaria leve',
              'Pressionar recursos de ouro e madeira',
              'Evitar confrontos diretos com defesas chinesas'
            ],
            mid: [
              'Desenvolver Mangudais para assédio',
              'Manter pressão constante em múltiplos pontos',
              'Impedir expansão territorial chinesa'
            ],
            late: [
              'Usar mobilidade para escolher engajamentos favoráveis',
              'Focar em destruir economia chinesa',
              'Evitar batalhas diretas contra unidades de pólvora'
            ],
            units: ['Mangudai', 'Cavalaria Leve', 'Lanceiro Montado'],
            technologies: ['Táticas de Raide', 'Mobilidade Superior'],
            landmarks: ['Kurultai', 'Palácio do Steppe']
          },
          civilization2Strategy: {
            early: [
              'Priorizar defesas iniciais',
              'Desenvolver economia protegida',
              'Construir torres em recursos chave'
            ],
            mid: [
              'Produzir Zhuge Nu para defesa',
              'Desenvolver tecnologias defensivas',
              'Estabelecer linha de defesa com muralhas'
            ],
            late: [
              'Investir em unidades de pólvora',
              'Manter exército unido para defesa',
              'Usar Oficiais Imperiais para eficiência máxima'
            ],
            units: ['Zhuge Nu', 'Lanceiro', 'Handcannoneer'],
            technologies: ['Grande Muralha', 'Dinastia Song'],
            landmarks: ['Imperial Palace', 'Spirit Way']
          }
        }
      },
      {
        mapName: 'Floresta Negra',
        advantage: 'Civilization2',
        strategies: {
          civilization1Strategy: {
            early: [
              'Focar em exploração rápida',
              'Estabelecer controle de recursos chave',
              'Usar mobilidade para encontrar pontos fracos'
            ],
            mid: [
              'Utilizar pequenos grupos de Mangudais',
              'Criar múltiplos caminhos de ataque',
              'Evitar áreas muito fortificadas'
            ],
            late: [
              'Manter pressão em pontos múltiplos',
              'Usar unidades de cerco para abrir caminhos',
              'Focar em mobilidade e ataques surpresa'
            ],
            units: ['Mangudai', 'Cavalaria Leve', 'Trebuchet'],
            technologies: ['Táticas de Floresta', 'Mobilidade em Terreno Difícil'],
            landmarks: ['Torre de Vigia', 'Kurultai']
          },
          civilization2Strategy: {
            early: [
              'Aproveitar terreno para defesas naturais',
              'Estabelecer posições defensivas fortes',
              'Desenvolver economia protegida'
            ],
            mid: [
              'Criar rede de postos avançados',
              'Utilizar Zhuge Nu em posições elevadas',
              'Controlar pontos de estrangulamento'
            ],
            late: [
              'Estabelecer defesa em profundidade',
              'Usar unidades de pólvora em posições chave',
              'Manter controle de recursos estratégicos'
            ],
            units: ['Zhuge Nu', 'Lanceiro', 'Bombard'],
            technologies: ['Defesas Avançadas', 'Pólvora Aprimorada'],
            landmarks: ['Astronomic Clocktower', 'Imperial Palace']
          }
        }
      }
    ],
    generalTips: {
      civilization1Tips: [
        'Mantenha pressão constante em múltiplos pontos',
        'Use mobilidade para evitar confrontos desfavoráveis',
        'Foque em destruir a economia inimiga',
        'Evite batalhas diretas contra unidades de pólvora chinesas'
      ],
      civilization2Tips: [
        'Priorize defesas em recursos importantes',
        'Mantenha unidades agrupadas para proteção mútua',
        'Desenvolva economia protegida por muralhas',
        'Use Oficiais Imperiais para maximizar eficiência'
      ]
    },
    counterUnits: {
      civilization1Counters: [
        {
          unit: 'Mangudai',
          counters: ['Zhuge Nu', 'Lanceiro']
        },
        {
          unit: 'Cavalaria Leve',
          counters: ['Lanceiro', 'Arqueiro']
        }
      ],
      civilization2Counters: [
        {
          unit: 'Zhuge Nu',
          counters: ['Cavalaria Pesada', 'Infantaria Blindada']
        },
        {
          unit: 'Handcannoneer',
          counters: ['Cavalaria Leve', 'Infantaria']
        }
      ]
    },
    modSpecificStrategies: [
      {
        modName: '400 Pop and Better Stats',
        civilization1Strategy: {
          early: [
            'Expandir rapidamente com múltiplos Ovoos',
            'Criar grande força de cavalaria inicial',
            'Estabelecer controle de mapa amplo'
          ],
          mid: [
            'Manter pressão constante com grupos maiores',
            'Desenvolver economia em múltiplas bases',
            'Maximizar produção de unidades móveis'
          ],
          late: [
            'Usar números superiores para ataques simultâneos',
            'Manter mobilidade mesmo com exército maior',
            'Focar em destruição de economia em larga escala'
          ],
          units: ['Mangudai', 'Cavalaria Leve', 'Lanceiro Montado'],
          technologies: ['Táticas de Horda', 'Mobilidade Superior']
        },
        civilization2Strategy: {
          early: [
            'Construir defesas mais extensas',
            'Desenvolver múltiplas bases fortificadas',
            'Maximizar produção de recursos'
          ],
          mid: [
            'Criar linhas de defesa em profundidade',
            'Desenvolver força militar diversificada',
            'Estabelecer rede de postos avançados'
          ],
          late: [
            'Manter exército numeroso e diversificado',
            'Usar unidades de pólvora em massa',
            'Defender múltiplas bases de recursos'
          ],
          units: ['Zhuge Nu', 'Handcannoneer', 'Bombard'],
          technologies: ['Defesas em Massa', 'Produção Avançada']
        }
      }
    ]
  },
  
  // Ingleses vs Franceses
  {
    civilization1: 'Ingleses',
    civilization2: 'Franceses',
    mapTypes: [
      {
        mapName: 'Planícies Abertas',
        advantage: 'Civilization2',
        strategies: {
          civilization1Strategy: {
            early: [
              'Estabelecer linha de arqueiros Longbow',
              'Proteger recursos com torres',
              'Desenvolver economia agrícola'
            ],
            mid: [
              'Manter distância da cavalaria francesa',
              'Criar formações defensivas com Longbows e lanceiros',
              'Fortalecer posições com muralhas'
            ],
            late: [
              'Usar Trebuchets para destruir bases francesas',
              'Manter formação compacta de Longbows Elite',
              'Proteger unidades de cerco com infantaria pesada'
            ],
            units: ['Longbow', 'Man-at-Arms', 'Lanceiro'],
            technologies: ['Rede de Fazendas', 'Treinamento de Arqueiros'],
            landmarks: ['Conselho do Reino', 'Abadia de São Albano']
          },
          civilization2Strategy: {
            early: [
              'Desenvolver Royal Knights rapidamente',
              'Estabelecer rotas comerciais',
              'Pressionar arqueiros ingleses com cavalaria'
            ],
            mid: [
              'Usar cargas de Royal Knights contra formações',
              'Desenvolver Arbalétriers para contra-atacar',
              'Expandir controle do mapa com cavalaria'
            ],
            late: [
              'Manter pressão com Royal Knights de Elite',
              'Usar Arbalétriers de Elite contra infantaria',
              'Desenvolver força de cerco móvel'
            ],
            units: ['Royal Knight', 'Arbalétrier', 'Cavalaria Leve'],
            technologies: ['Escola de Cavalaria', 'Guildas Comerciais'],
            landmarks: ['Escola de Cavalaria', 'Catedral de São Luís']
          }
        }
      },
      {
        mapName: 'Floresta Negra',
        advantage: 'Civilization1',
        strategies: {
          civilization1Strategy: {
            early: [
              'Usar cobertura da floresta para arqueiros',
              'Estabelecer posições defensivas em pontos altos',
              'Controlar passagens estreitas'
            ],
            mid: [
              'Criar emboscadas com Longbows',
              'Fortificar pontos estratégicos',
              'Desenvolver rede de postos avançados'
            ],
            late: [
              'Dominar pontos de estrangulamento',
              'Usar terreno para maximizar eficiência dos arqueiros',
              'Manter controle de recursos chave'
            ],
            units: ['Longbow', 'Man-at-Arms', 'Trebuchet'],
            technologies: ['Táticas de Floresta', 'Defesas Avançadas'],
            landmarks: ['Castelo de Berkshire', 'Torre de Guarda']
          },
          civilization2Strategy: {
            early: [
              'Buscar rotas alternativas para cavalaria',
              'Desenvolver economia defensiva',
              'Estabelecer postos avançados'
            ],
            mid: [
              'Usar Arbalétriers em terreno elevado',
              'Criar múltiplos grupos de ataque',
              'Focar em mobilidade e flanqueamento'
            ],
            late: [
              'Abrir caminhos com unidades de cerco',
              'Manter pressão em múltiplos pontos',
              'Usar cavalaria para ataques rápidos'
            ],
            units: ['Royal Knight', 'Arbalétrier', 'Mangonel'],
            technologies: ['Táticas de Mobilidade', 'Armaduras Pesadas'],
            landmarks: ['Câmara Real', 'Fortaleza Real']
          }
        }
      }
    ],
    generalTips: {
      civilization1Tips: [
        'Mantenha formações compactas de arqueiros',
        'Use o alcance superior dos Longbows',
        'Proteja os flancos contra cavalaria',
        'Desenvolva economia defensiva forte'
      ],
      civilization2Tips: [
        'Evite engajamentos frontais com grupos de Longbows',
        'Use a mobilidade da cavalaria para flanquear',
        'Mantenha pressão constante em múltiplos pontos',
        'Desenvolva economia comercial forte'
      ]
    },
    counterUnits: {
      civilization1Counters: [
        {
          unit: 'Longbow',
          counters: ['Arbalétrier', 'Cavalaria Leve']
        },
        {
          unit: 'Man-at-Arms',
          counters: ['Royal Knight', 'Cavalaria Pesada']
        }
      ],
      civilization2Counters: [
        {
          unit: 'Royal Knight',
          counters: ['Longbow', 'Man-at-Arms']
        },
        {
          unit: 'Arbalétrier',
          counters: ['Infantaria', 'Arqueiros']
        }
      ]
    },
    modSpecificStrategies: [
      {
        modName: 'Empire Wars',
        civilization1Strategy: {
          early: [
            'Desenvolver linha de Longbows rapidamente',
            'Estabelecer defesas iniciais',
            'Maximizar produção de recursos'
          ],
          mid: [
            'Criar rede defensiva forte',
            'Desenvolver força militar diversificada',
            'Controlar pontos estratégicos'
          ],
          late: [
            'Manter superioridade numérica de arqueiros',
            'Usar unidades de cerco para pressão',
            'Defender recursos importantes'
          ],
          units: ['Longbow', 'Man-at-Arms', 'Trebuchet'],
          technologies: ['Melhorias de Arqueiros', 'Fortificações']
        },
        civilization2Strategy: {
          early: [
            'Produzir Royal Knights desde o início',
            'Estabelecer presença no mapa',
            'Desenvolver economia comercial'
          ],
          mid: [
            'Manter pressão constante com cavalaria',
            'Desenvolver contra-unidades',
            'Expandir controle territorial'
          ],
          late: [
            'Usar cavalaria de elite para ataques decisivos',
            'Manter mobilidade superior',
            'Dominar economia com comércio'
          ],
          units: ['Royal Knight', 'Arbalétrier', 'Cavalaria Pesada'],
          technologies: ['Melhorias de Cavalaria', 'Economia Avançada']
        }
      }
    ],
    teamStrategies: [
      {
        teamSize: '2v2',
        civilization1TeamRole: 'Suporte/Arqueiros',
        civilization2TeamRole: 'Tanque/Cavalaria',
        civilization1AllyRecommendations: [
          'Abássidas (infantaria e tecnologia)',
          'Russos (cavalaria e unidades anti-arqueiros)',
          'Sacro Império Romano-Germânico (suporte religioso)'
        ],
        civilization2AllyRecommendations: [
          'Chineses (infantaria e cerco)',
          'Mongóis (mobilidade e cerco)',
          'Sultanato de Delhi (elefantes e tecnologia)'
        ],
        teamSynergies: {
          civilization1Synergies: [
            {
              civilization: 'Abássidas',
              synergyDescription: 'Longbows ingleses cobrem a infantaria Abássida enquanto avançam. A infantaria Abássida protege os Longbows de ataques de cavalaria.'
            },
            {
              civilization: 'Russos',
              synergyDescription: 'A cavalaria russa compensa a falta de mobilidade inglesa, enquanto os Longbows fornecem poder de fogo à distância que os russos não têm.'
            }
          ],
          civilization2Synergies: [
            {
              civilization: 'Mongóis',
              synergyDescription: 'A cavalaria francesa e a mobilidade mongol criam uma combinação perfeita para ataques rápidos. Mangudais mongóis complementam os Cavaleiros franceses.'
            },
            {
              civilization: 'Otomanos',
              synergyDescription: 'Janissários otomanos fornecem suporte à distância para a cavalaria francesa, enquanto os Cavaleiros franceses protegem as unidades otomanas de ataques.'
            }
          ]
        },
        teamTactics: [
          'Ingleses podem formar uma linha defensiva com Longbows enquanto os aliados atacam com unidades móveis',
          'Franceses devem liderar os ataques frontais com Cavaleiros, enquanto os aliados fornecem suporte',
          'Coordenar ataques em pontos diferentes do mapa para dividir as forças inimigas',
          'Ingleses fornecem economia forte (fazendas) enquanto franceses agressão militar (descontos)'
        ]
      },
      {
        teamSize: '3v3',
        civilization1TeamRole: 'Controle/Defesa',
        civilization2TeamRole: 'Agressão/Raides',
        civilization1AllyRecommendations: [
          'Bizantinos (defesa e versatilidade)',
          'Chineses (economia e cerco)',
          'Sultanato de Delhi (tecnologia e controle de mapa)'
        ],
        civilization2AllyRecommendations: [
          'Mongóis (agressão e mobilidade)',
          'Russos (economia de recursos e flexibilidade)',
          'Otomanos (poder militar tardio)'
        ],
        teamSynergies: {
          civilization1Synergies: [
            {
              civilization: 'Bizantinos',
              synergyDescription: 'Defesas bizantinas e arqueiros ingleses criam uma fortaleza quase impenetrável. Catafractos bizantinos fornecem a cavalaria que os ingleses não têm.'
            },
            {
              civilization: 'Chineses',
              synergyDescription: 'Economia chinesa e inglesa juntas criam um boom econômico inigualável. O poder de cerco chinês complementa os arqueiros ingleses.'
            }
          ],
          civilization2Synergies: [
            {
              civilization: 'Mongóis',
              synergyDescription: 'Combinação de cavalaria francesa e mongol cria pressão militar impossível de defender. Mobilidade mongol e poder econômico francês são complementares.'
            },
            {
              civilization: 'Russos',
              synergyDescription: 'Cavalaria pesada francesa e arqueiros a cavalo russos criam ataques devastadores. Ambas civilizações têm economia forte que se complementa.'
            }
          ]
        },
        teamTactics: [
          'Distribuir funções econômicas: ingleses (comida), chineses/russos (madeira/ouro), franceses (expansão territorial)',
          'Coordenar timings de ataque: franceses atacam primeiro para pressionar, enquanto aliados desenvolvem economia e tecnologia',
          'Criar defesas em camadas: muralhas frontais, torres, castelos e postos avançados',
          'Um jogador deve focar em unidades anti-cerco para proteger as defesas da equipe'
        ]
      },
      {
        teamSize: '4v4',
        civilization1TeamRole: 'Economia/Arqueiros',
        civilization2TeamRole: 'Cavalaria/Controle de Mapa',
        civilization1AllyRecommendations: [
          'Abássidas (infantaria e tecnologia)',
          'Bizantinos (defesa e versatilidade)',
          'Chineses (cerco e economia)',
          'Sultanato de Delhi (tecnologia e elefantes)'
        ],
        civilization2AllyRecommendations: [
          'Mongóis (mobilidade e agressão)',
          'Sacro Império Romano-Germânico (economia e infantaria)',
          'Russos (recursos e flexibilidade)',
          'Otomanos (artilharia e janissários)'
        ],
        teamSynergies: {
          civilization1Synergies: [
            {
              civilization: 'Abássidas',
              synergyDescription: 'Infantaria abássida protege os longbows ingleses. Os ingleses fornecem produção de comida superior enquanto os abássidas ouro e tecnologia.'
            },
            {
              civilization: 'Bizantinos',
              synergyDescription: 'Os ingleses fornecem poder ofensivo de longo alcance enquanto os bizantinos defesa robusta. Catafractos bizantinos complementam a falta de cavalaria inglesa.'
            }
          ],
          civilization2Synergies: [
            {
              civilization: 'Mongóis',
              synergyDescription: 'Mangudais mongóis e cavaleiros franceses formam uma combinação imbatível. Franceses fornecem estabilidade econômica enquanto mongóis pressão constante.'
            },
            {
              civilization: 'Sacro Império Romano-Germânico',
              synergyDescription: 'Prelados do império e cavaleiros franceses criam unidades inspiradas extremamente poderosas. Ambas civilizações têm economia complementar.'
            }
          ]
        },
        teamTactics: [
          'Especialização clara: um jogador defesa, um economia, um controle de mapa e um agressão direta',
          'Coordenar ataques em múltiplas frentes para dispersar as defesas inimigas',
          'Proteger recursos estratégicos em grupo com torres, castelos e postos avançados',
          'Manter controle de relíquias, pontos sagrados e locais de comércio',
          'Compartilhar recursos entre jogadores: excesso de comida para quem precisa de cavalaria, ouro para quem precisa de unidades especiais'
        ]
      }
    ]
  },

  // Bizantinos vs Abássidas
  {
    civilization1: 'Bizantinos',
    civilization2: 'Abássidas',
    mapTypes: [
      {
        mapName: 'Planícies Abertas',
        advantage: 'Neutral',
        strategies: {
          civilization1Strategy: {
            early: [
              'Estabelecer defesas iniciais sólidas',
              'Desenvolver economia diversificada',
              'Treinar infantaria básica para defesa'
            ],
            mid: [
              'Produzir Catafractos para contra-ataques',
              'Desenvolver tecnologias defensivas',
              'Criar linha de defesa com Varangianos'
            ],
            late: [
              'Usar Fogo Grego para controle de área',
              'Manter formação defensiva forte',
              'Lançar contra-ataques com Catafractos de Elite'
            ],
            units: ['Catafracto', 'Varangiano', 'Lanceiro'],
            technologies: ['Fogo Grego', 'Legado Romano'],
            landmarks: ['Hagia Sophia', 'Muralhas de Teodósio']
          },
          civilization2Strategy: {
            early: [
              'Desenvolver Casa da Sabedoria rapidamente',
              'Treinar unidades de camelo iniciais',
              'Estabelecer economia tecnológica'
            ],
            mid: [
              'Usar Camelos Arqueiros para assédio',
              'Pesquisar tecnologias na Casa da Sabedoria',
              'Expandir presença no mapa'
            ],
            late: [
              'Manter pressão com unidades de camelo de elite',
              'Usar superioridade tecnológica',
              'Cercar posições bizantinas'
            ],
            units: ['Camelo Arqueiro', 'Lanceiro de Camelo', 'Manganela'],
            technologies: ['Melhorias de Camelo', 'Pesquisas Avançadas'],
            landmarks: ['Casa da Sabedoria', 'Palácio dos Sultões']
          }
        }
      },
      {
        mapName: 'Deserto',
        advantage: 'Civilization2',
        strategies: {
          civilization1Strategy: {
            early: [
              'Proteger recursos de água',
              'Construir defesas próximas a oásis',
              'Desenvolver economia eficiente'
            ],
            mid: [
              'Manter unidades próximas a fontes de água',
              'Usar Varangianos para defesa de recursos',
              'Desenvolver rede de postos defensivos'
            ],
            late: [
              'Controlar pontos de água estratégicos',
              'Usar Fogo Grego para defesa de área',
              'Manter exército compacto e bem suprido'
            ],
            units: ['Catafracto', 'Varangiano', 'Arqueiro'],
            technologies: ['Resistência ao Calor', 'Defesas Aprimoradas'],
            landmarks: ['Grande Palácio', 'Muralhas de Teodósio']
          },
          civilization2Strategy: {
            early: [
              'Aproveitar conhecimento do terreno',
              'Desenvolver economia do deserto',
              'Estabelecer rotas comerciais'
            ],
            mid: [
              'Usar mobilidade superior',
              'Controlar recursos vitais',
              'Expandir influência comercial'
            ],
            late: [
              'Dominar com unidades adaptadas',
              'Manter superioridade econômica',
              'Controlar rotas estratégicas'
            ],
            units: ['Mamluk de Elite', 'Arqueiro a Camelo', 'Lanceiro'],
            technologies: ['Supremacia do Deserto', 'Rotas da Seda'],
            landmarks: ['Fortaleza do Deserto', 'Mercado de Especiarias']
          }
        }
      }
    ],
    generalTips: {
      civilization1Tips: [
        'Mantenha formação defensiva sólida',
        'Use Fogo Grego para controle de área',
        'Proteja recursos vitais com estruturas defensivas',
        'Aproveite a versatilidade das unidades bizantinas'
      ],
      civilization2Tips: [
        'Explore a vantagem tecnológica da Casa da Sabedoria',
        'Use unidades de camelo para contra-atacar cavalaria',
        'Mantenha pressão constante em múltiplos pontos',
        'Aproveite a mobilidade superior no deserto'
      ]
    },
    counterUnits: {
      civilization1Counters: [
        {
          unit: 'Catafracto',
          counters: ['Lanceiro de Camelo', 'Infantaria']
        },
        {
          unit: 'Varangiano',
          counters: ['Camelo Arqueiro', 'Unidades de Cerco']
        }
      ],
      civilization2Counters: [
        {
          unit: 'Camelo Arqueiro',
          counters: ['Catafracto', 'Cavalaria']
        },
        {
          unit: 'Lanceiro de Camelo',
          counters: ['Cavalaria Pesada', 'Catafracto']
        }
      ]
    },
    modSpecificStrategies: [
      {
        modName: 'Deathmatch',
        civilization1Strategy: {
          early: [
            'Construir defesas rápidas',
            'Produzir Catafractos em massa',
            'Estabelecer linha defensiva'
          ],
          mid: [
            'Manter pressão com unidades de elite',
            'Desenvolver economia de guerra',
            'Fortalecer posições estratégicas'
          ],
          late: [
            'Lançar contra-ataques decisivos',
            'Usar superioridade numérica',
            'Dominar pontos estratégicos'
          ],
          units: ['Catafracto de Elite', 'Varangiano de Elite', 'Trebuchet'],
          technologies: ['Táticas Imperiais', 'Defesas Máximas']
        },
        civilization2Strategy: {
          early: [
            'Desenvolver tecnologias rapidamente',
            'Produzir unidades de camelo em massa',
            'Estabelecer presença no mapa'
          ],
          mid: [
            'Manter pressão constante',
            'Pesquisar todas as tecnologias possíveis',
            'Controlar recursos estratégicos'
          ],
          late: [
            'Usar superioridade tecnológica',
            'Manter mobilidade e pressão',
            'Cercar e eliminar bases inimigas'
          ],
          units: ['Camelo Arqueiro de Elite', 'Lanceiro de Camelo de Elite', 'Bombarda'],
          technologies: ['Pesquisas Supremas', 'Engenharia de Cerco']
        }
      }
    ]
  },

  // Japoneses vs Mongóis
  {
    civilization1: 'Japoneses',
    civilization2: 'Mongóis',
    mapTypes: [
      {
        mapName: 'Planícies Abertas',
        advantage: 'Civilization2',
        strategies: {
          civilization1Strategy: {
            early: [
              'Estabelecer defesas iniciais fortes',
              'Desenvolver economia protegida',
              'Treinar Samurais para defesa'
            ],
            mid: [
              'Usar Yabusames para contra-atacar Mangudais',
              'Manter linha defensiva sólida',
              'Desenvolver economia interna'
            ],
            late: [
              'Lançar contra-ataques coordenados',
              'Usar Samurais de Elite para combate direto',
              'Proteger recursos com castelos'
            ],
            units: ['Samurai', 'Yabusame', 'Lanceiro'],
            technologies: ['Bushido', 'Armaduras de Samurai'],
            landmarks: ['Santuário Ise', 'Castelo Himeji']
          },
          civilization2Strategy: {
            early: [
              'Realizar raides iniciais com cavalaria',
              'Controlar recursos externos',
              'Desenvolver Mangudais rapidamente'
            ],
            mid: [
              'Manter pressão constante com Mangudais',
              'Evitar confrontos diretos com Samurais',
              'Controlar mobilidade do mapa'
            ],
            late: [
              'Usar mobilidade para escolher batalhas',
              'Atacar pontos fracos da economia',
              'Manter superioridade em campo aberto'
            ],
            units: ['Mangudai', 'Lanceiro Montado', 'Cavalaria Pesada'],
            technologies: ['Táticas Nômades', 'Arqueria Montada'],
            landmarks: ['Kurultai', 'Torre de Vigia']
          }
        }
      },
      {
        mapName: 'Montanha',
        advantage: 'Civilization1',
        strategies: {
          civilization1Strategy: {
            early: [
              'Fortificar posições elevadas',
              'Desenvolver economia em áreas seguras',
              'Controlar passagens estratégicas'
            ],
            mid: [
              'Usar terreno para emboscadas',
              'Posicionar Yabusames em pontos altos',
              'Construir rede de castelos'
            ],
            late: [
              'Dominar pontos estratégicos',
              'Usar vantagem do terreno para defesa',
              'Lançar ataques coordenados'
            ],
            units: ['Samurai', 'Yabusame', 'Arqueiro'],
            technologies: ['Táticas de Montanha', 'Castelos Fortificados'],
            landmarks: ['Palácio Imperial', 'Grande Santuário']
          },
          civilization2Strategy: {
            early: [
              'Explorar rotas alternativas',
              'Estabelecer postos avançados',
              'Desenvolver economia móvel'
            ],
            mid: [
              'Usar mobilidade para contornar defesas',
              'Atacar rotas de suprimento',
              'Manter presença em múltiplas frentes'
            ],
            late: [
              'Buscar batalhas em campo aberto',
              'Usar cerco para abrir caminhos',
              'Manter pressão constante'
            ],
            units: ['Mangudai', 'Cavalaria Pesada', 'Trebuchet'],
            technologies: ['Mobilidade em Terreno Difícil', 'Cerco Avançado'],
            landmarks: ['Palácio do Steppe', 'Torre de Vigia']
          }
        }
      }
    ],
    generalTips: {
      civilization1Tips: [
        'Use o terreno para maximizar eficiência dos Samurais',
        'Mantenha unidades agrupadas para proteção mútua',
        'Desenvolva economia bem protegida',
        'Aproveite a força superior em combate direto'
      ],
      civilization2Tips: [
        'Evite combate direto com Samurais',
        'Mantenha mobilidade e pressão constante',
        'Ataque recursos desprotegidos',
        'Use táticas de hit-and-run'
      ]
    },
    counterUnits: {
      civilization1Counters: [
        {
          unit: 'Samurai',
          counters: ['Cavalaria', 'Infantaria']
        },
        {
          unit: 'Yabusame',
          counters: ['Mangudai', 'Arqueiros']
        }
      ],
      civilization2Counters: [
        {
          unit: 'Mangudai',
          counters: ['Arqueiros', 'Unidades lentas']
        },
        {
          unit: 'Lanceiro Montado',
          counters: ['Cavalaria', 'Infantaria leve']
        }
      ]
    },
    modSpecificStrategies: [
      {
        modName: 'Empire Wars',
        civilization1Strategy: {
          early: [
            'Desenvolver força militar rapidamente',
            'Estabelecer defesas iniciais',
            'Controlar recursos próximos'
          ],
          mid: [
            'Expandir território de forma segura',
            'Desenvolver força militar completa',
            'Manter linha defensiva forte'
          ],
          late: [
            'Lançar ataques coordenados',
            'Manter controle de recursos',
            'Usar unidades de elite para vantagem'
          ],
          units: ['Samurai de Elite', 'Yabusame', 'Lanceiro Pesado'],
          technologies: ['Bushido Avançado', 'Fortificações Supremas']
        },
        civilization2Strategy: {
          early: [
            'Estabelecer presença no mapa',
            'Iniciar raides imediatamente',
            'Desenvolver economia móvel'
          ],
          mid: [
            'Manter pressão constante',
            'Desenvolver força de Mangudais',
            'Controlar recursos externos'
          ],
          late: [
            'Dominar mobilidade do mapa',
            'Usar táticas de cerco avançadas',
            'Manter superioridade em campo aberto'
          ],
          units: ['Mangudai de Elite', 'Cavalaria Pesada', 'Lanceiro Montado'],
          technologies: ['Táticas de Horda', 'Mobilidade Suprema']
        }
      }
    ],
    teamStrategies: [
      {
        teamSize: '2v2',
        civilization1TeamRole: 'Defesa/Infantaria de Elite',
        civilization2TeamRole: 'Mobilidade/Raides',
        civilization1AllyRecommendations: [
          'Ingleses (arqueiros e economia)',
          'Bizantinos (defesa e versatilidade)',
          'Chineses (economia e cerco)'
        ],
        civilization2AllyRecommendations: [
          'Russos (recursos e flexibilidade)',
          'Franceses (cavalaria pesada)',
          'Otomanos (poder de fogo e artilharia)'
        ],
        teamSynergies: {
          civilization1Synergies: [
            {
              civilization: 'Ingleses',
              synergyDescription: 'Samurais japoneses protegem os Longbows ingleses de ataques de cavalaria, enquanto os Longbows fornecem cobertura à distância.'
            },
            {
              civilization: 'Chineses',
              synergyDescription: 'Infantaria japonesa combina perfeitamente com o poder de cerco chinês. Economia chinesa complementa a força militar japonesa.'
            }
          ],
          civilization2Synergies: [
            {
              civilization: 'Russos',
              synergyDescription: 'Mangudais mongóis e arqueiros a cavalo russos criam uma força móvel letal. Ambas civilizações têm forte pressão early game.'
            },
            {
              civilization: 'Franceses',
              synergyDescription: 'Cavaleiros franceses fornecem poder de choque enquanto Mangudais mongóis oferecem apoio à distância, criando uma combinação devastadora.'
            }
          ]
        },
        teamTactics: [
          'Japoneses devem focar em defesa e controle de pontos estratégicos enquanto mongóis realizam raides',
          'Coordenar defesas em camadas: infantaria japonesa na frente com arqueiros aliados atrás',
          'Mongóis devem manter constante pressão nas linhas de recursos inimigos',
          'Proteger os flancos da base aliada contra contra-ataques inimigos',
          'Japoneses devem desenvolver tecnologia e economia enquanto mongóis mantêm agressão'
        ]
      },
      {
        teamSize: '3v3',
        civilization1TeamRole: 'Infantaria de Elite/Tecnologia',
        civilization2TeamRole: 'Raides/Controle de Mapa',
        civilization1AllyRecommendations: [
          'Ingleses (arqueiros e economia)',
          'Bizantinos (defesa e versatilidade)',
          'Franceses (cavalaria e economia)',
          'Sacro Império Romano-Germânico (suporte e relíquias)'
        ],
        civilization2AllyRecommendations: [
          'Russos (recursos e flexibilidade)',
          'Chineses (cerco e infantaria)',
          'Otomanos (artilharia e janissários)',
          'Sultanato de Delhi (elefantes e tecnologia)'
        ],
        teamSynergies: {
          civilization1Synergies: [
            {
              civilization: 'Bizantinos',
              synergyDescription: 'A elite japonesa combinada com a versatilidade bizantina cria uma defesa sólida. Os japoneses fornecem poder ofensivo enquanto os bizantinos defesa.'
            },
            {
              civilization: 'Sacro Império Romano-Germânico',
              synergyDescription: 'Prelados do império inspiram samurais japoneses, tornando-os ainda mais letais. O controle de relíquias fornece economia consistente.'
            }
          ],
          civilization2Synergies: [
            {
              civilization: 'Chineses',
              synergyDescription: 'Mangudais mongóis fornecem mobilidade enquanto as unidades de cerco chinesas dominam em batalhas diretas.'
            },
            {
              civilization: 'Sultanato de Delhi',
              synergyDescription: 'Elefantes de Delhi fornecem um tanque perfeito enquanto a mobilidade mongol permite controlar o mapa e realizar ataques precisos.'
            }
          ]
        },
        teamTactics: [
          'Distribuir funções econômicas: um jogador foca em boom, um em tecnologia e um em produção militar',
          'Manter controle do mapa com postos mongóis em pontos estratégicos',
          'Realizar ataques coordenados: mongóis iniciam com raides, seguidos por japoneses e o terceiro aliado',
          'Proteger recursos estratégicos em grupo',
          'Japoneses devem desenvolver linha de defesa principal enquanto aliados controlam o mapa'
        ]
      },
      {
        teamSize: '4v4',
        civilization1TeamRole: 'Infantaria/Tecnologia',
        civilization2TeamRole: 'Mobilidade/Raides',
        civilization1AllyRecommendations: [
          'Ingleses (arqueiros e economia)',
          'Bizantinos (defesa e versatilidade)',
          'Chineses (cerco e economia)',
          'Franceses (cavalaria pesada)'
        ],
        civilization2AllyRecommendations: [
          'Russos (recursos e flexibilidade)',
          'Otomanos (artilharia e janissários)',
          'Sultanato de Delhi (elefantes e tecnologia)',
          'Sacro Império Romano-Germânico (infantaria e relíquias)'
        ],
        teamSynergies: {
          civilization1Synergies: [
            {
              civilization: 'Ingleses',
              synergyDescription: 'Samurais japoneses e Longbows ingleses formam uma combinação defensiva perfeita. Os japoneses protegem a linha de frente enquanto ingleses fornecem poder à distância.'
            },
            {
              civilization: 'Chineses',
              synergyDescription: 'Samurais japoneses protegem as unidades de cerco chinesas. A combinação de tecnologias avançadas de ambas civilizações cria superioridade militar.'
            }
          ],
          civilization2Synergies: [
            {
              civilization: 'Russos',
              synergyDescription: 'A mobilidade mongol combinada com a flexibilidade russa permite controlar vastas áreas do mapa. Ambas civilizações têm excelente early game.'
            },
            {
              civilization: 'Otomanos',
              synergyDescription: 'Mangudais mongóis fornecem mobilidade enquanto Janissários e artilharia otomana proporcionam poder de fogo devastador à distância.'
            }
          ]
        },
        teamTactics: [
          'Especialização clara: um jogador defesa, um economia, um controle de mapa e um agressão direta',
          'Japoneses devem proteger a linha de frente enquanto mongóis realizam raides constantes',
          'Coordenar ataques em múltiplas frentes para dispersar as defesas inimigas',
          'Manter controle de recursos estratégicos, relíquias e pontos sagrados',
          'Compartilhar excedentes de recursos entre aliados para maximizar produção',
          'Desenvolver uma força militar balanceada: infantaria, cavalaria, arqueiros e unidades de cerco'
        ]
      }
    ]
  },

  // Russos vs Otomanos
  {
    civilization1: 'Russos',
    civilization2: 'Otomanos',
    mapTypes: [
      {
        mapName: 'Planícies Abertas',
        advantage: 'Civilization2',
        strategies: {
          civilization1Strategy: {
            early: [
              'Estabelecer rede de caça com Caçadores',
              'Desenvolver economia baseada em recursos',
              'Construir Torres de Madeira para defesa'
            ],
            mid: [
              'Produzir Cavaleiros Rus para contra-ataques',
              'Desenvolver linha de Arqueiros a Cavalo',
              'Fortalecer economia com Bounty dourado'
            ],
            late: [
              'Usar Streltsy para combate à distância',
              'Manter pressão com cavalaria pesada',
              'Desenvolver tecnologias únicas russas'
            ],
            units: ['Cavaleiro Rus', 'Streltsy', 'Arqueiro a Cavalo'],
            technologies: ['Bounty Dourado', 'Táticas de Caça'],
            landmarks: ['Abadia da Trindade', 'Kremlin']
          },
          civilization2Strategy: {
            early: [
              'Treinar Janízaros iniciais',
              'Desenvolver economia militar',
              'Estabelecer presença militar forte'
            ],
            mid: [
              'Usar Janízaros para pressão constante',
              'Desenvolver força de Sipahi',
              'Expandir controle territorial'
            ],
            late: [
              'Dominar com artilharia otomana',
              'Manter exército profissional forte',
              'Usar tecnologias militares avançadas'
            ],
            units: ['Janízaro', 'Sipahi', 'Grande Bombarda'],
            technologies: ['Exército Profissional', 'Pólvora Avançada'],
            landmarks: ['Topkapi', 'Academia Militar']
          }
        }
      },
      {
        mapName: 'Floresta',
        advantage: 'Civilization1',
        strategies: {
          civilization1Strategy: {
            early: [
              'Maximizar caça na floresta',
              'Estabelecer postos avançados',
              'Usar cobertura natural para defesa'
            ],
            mid: [
              'Emboscar com Streltsy na floresta',
              'Controlar recursos estratégicos',
              'Desenvolver rede de torres'
            ],
            late: [
              'Usar terreno para vantagem tática',
              'Manter controle de recursos',
              'Lançar ataques coordenados'
            ],
            units: ['Streltsy', 'Cavaleiro Rus', 'Arqueiro'],
            technologies: ['Táticas Florestais', 'Caça Avançada'],
            landmarks: ['Fortaleza de Madeira', 'Igreja de São Basílio']
          },
          civilization2Strategy: {
            early: [
              'Adaptar táticas para terreno florestal',
              'Estabelecer bases defensivas',
              'Desenvolver rotas de suprimento'
            ],
            mid: [
              'Usar Janízaros em posições elevadas',
              'Criar caminhos para artilharia',
              'Manter pressão constante'
            ],
            late: [
              'Posicionar artilharia estrategicamente',
              'Usar Sipahi para mobilidade',
              'Cercar posições russas'
            ],
            units: ['Janízaro', 'Sipahi', 'Bombarda'],
            technologies: ['Táticas de Cerco', 'Formação Militar'],
            landmarks: ['Forte Otomano', 'Grande Mesquita']
          }
        }
      }
    ],
    generalTips: {
      civilization1Tips: [
        'Aproveite os bônus de caça',
        'Use o terreno para emboscadas',
        'Mantenha economia forte com Bounty',
        'Combine unidades de cavalaria e arqueiros'
      ],
      civilization2Tips: [
        'Mantenha produção constante de Janízaros',
        'Use artilharia para quebrar defesas',
        'Desenvolva economia militar forte',
        'Aproveite a versatilidade das unidades otomanas'
      ]
    },
    counterUnits: {
      civilization1Counters: [
        {
          unit: 'Streltsy',
          counters: ['Cavalaria', 'Infantaria']
        },
        {
          unit: 'Cavaleiro Rus',
          counters: ['Arqueiros', 'Artilharia']
        }
      ],
      civilization2Counters: [
        {
          unit: 'Janízaro',
          counters: ['Cavalaria', 'Infantaria leve']
        },
        {
          unit: 'Sipahi',
          counters: ['Arqueiros', 'Unidades de cerco']
        }
      ]
    },
    modSpecificStrategies: [
      {
        modName: 'Empire Wars',
        civilization1Strategy: {
          early: [
            'Desenvolver força militar rapidamente',
            'Estabelecer controle de recursos',
            'Iniciar caça intensiva'
          ],
          mid: [
            'Manter pressão com cavalaria',
            'Desenvolver economia forte',
            'Controlar pontos estratégicos'
          ],
          late: [
            'Usar combinação de unidades de elite',
            'Manter controle de recursos',
            'Lançar ataques decisivos'
          ],
          units: ['Streltsy de Elite', 'Cavaleiro Rus de Elite', 'Arqueiro a Cavalo'],
          technologies: ['Táticas Avançadas', 'Economia de Guerra']
        },
        civilization2Strategy: {
          early: [
            'Produzir Longbows rapidamente',
            'Estabelecer presença militar',
            'Desenvolver economia de guerra'
          ],
          mid: [
            'Manter pressão constante',
            'Desenvolver força militar completa',
            'Controlar pontos estratégicos'
          ],
          late: [
            'Usar artilharia para vantagem decisiva',
            'Manter exército profissional forte',
            'Dominar batalhas importantes'
          ],
          units: ['Longbow de Elite', 'Man-at-Arms de Elite', 'Arbalétrier'],
          technologies: ['Supremacia Militar', 'Táticas de Caça']
        }
      },
      {
        modName: 'Regicide',
        civilization1Strategy: {
          early: [
            'Proteger o Rei com torres de madeira',
            'Desenvolver economia baseada em caça',
            'Construir posto militar avançado para defesa'
          ],
          mid: [
            'Manter o Rei em uma posição segura e fortificada',
            'Desenvolver arqueiros a cavalo para mobilidade',
            'Expandir controle territorial para proteger recursos'
          ],
          late: [
            'Usar Streltsy para proteger o Rei',
            'Manter unidades cavalaria pesada para contra-ataques',
            'Construir fortaleza para o Rei com defesas em camadas'
          ],
          units: ['Streltsy', 'Cavaleiro Rus', 'Arqueiro a Cavalo'],
          technologies: ['Fortificação Avançada', 'Táticas Defensivas']
        },
        civilization2Strategy: {
          early: [
            'Esconder o Sultão em uma base secundária',
            'Desenvolver Janissários para proteção',
            'Estabelecer postos militares estratégicos'
          ],
          mid: [
            'Manter o Sultão em movimento entre bases fortificadas',
            'Desenvolver Sipahi para mobilidade e proteção',
            'Expandir controle territorial'
          ],
          late: [
            'Usar artilharia para atacar o Rei inimigo a distância',
            'Manter Janissários de elite para proteção do Sultão',
            'Construir fortaleza imperial com múltiplas camadas de defesa'
          ],
          units: ['Janissário', 'Sipahi', 'Grande Bombarda'],
          technologies: ['Proteção Imperial', 'Fortificação Otomana']
        }
      }
    ]
  },

  // Jeanne d'Arc vs Abássidas
  {
    civilization1: 'Jeanne d\'Arc',
    civilization2: 'Abássidas',
    mapTypes: [
      {
        mapName: 'Planícies Abertas',
        advantage: 'Civilization1',
        strategies: {
          civilization1Strategy: {
            early: [
              'Desenvolver Cavaleiros Inspirados',
              'Estabelecer economia divina',
              'Construir Santuários estratégicos'
            ],
            mid: [
              'Usar Cavaleiros para ataques divinos',
              'Desenvolver tecnologias sagradas',
              'Expandir influência religiosa'
            ],
            late: [
              'Dominar com Cavalaria Sagrada',
              'Manter inspiração divina',
              'Usar poder dos Milagres'
            ],
            units: ['Cavaleiro Sagrado', 'Lanceiro Divino', 'Arqueiro Abençoado'],
            technologies: ['Bênçãos Divinas', 'Inspiração Sagrada'],
            landmarks: ['Catedral de Reims', 'Santuário Sagrado']
          },
          civilization2Strategy: {
            early: [
              'Desenvolver Casa da Sabedoria',
              'Treinar Camelos iniciais',
              'Estabelecer economia científica'
            ],
            mid: [
              'Usar Camelos contra Cavalaria',
              'Desenvolver tecnologias avançadas',
              'Expandir território controlado'
            ],
            late: [
              'Manter força de Camelos de Elite',
              'Usar superioridade tecnológica',
              'Dominar com unidades especiais'
            ],
            units: ['Camelo de Guerra', 'Ghulam', 'Arqueiro a Cavalo'],
            technologies: ['Ciência Avançada', 'Táticas do Deserto'],
            landmarks: ['Casa da Sabedoria', 'Grande Mesquita']
          }
        }
      },
      {
        mapName: 'Montanha Sagrada',
        advantage: 'Civilization1',
        strategies: {
          civilization1Strategy: {
            early: [
              'Controlar pontos sagrados',
              'Estabelecer santuários defensivos',
              'Desenvolver economia protegida'
            ],
            mid: [
              'Usar terreno para vantagem divina',
              'Manter controle de relíquias',
              'Expandir influência religiosa'
            ],
            late: [
              'Dominar com poder divino',
              'Usar Milagres em pontos-chave',
              'Controlar recursos estratégicos'
            ],
            units: ['Cavaleiro Sagrado', 'Monge Guerreiro', 'Besteiro Divino'],
            technologies: ['Poder Sagrado', 'Bênçãos da Montanha'],
            landmarks: ['Altar Divino', 'Fortaleza Sagrada']
          },
          civilization2Strategy: {
            early: [
              'Adaptar para terreno montanhoso',
              'Desenvolver postos científicos',
              'Estabelecer rotas de suprimento'
            ],
            mid: [
              'Usar mobilidade em terreno difícil',
              'Desenvolver tecnologias específicas',
              'Manter presença em pontos-chave'
            ],
            late: [
              'Cercar posições inimigas',
              'Usar superioridade tecnológica',
              'Controlar recursos vitais'
            ],
            units: ['Camelo de Guerra', 'Arqueiro Montado', 'Lanceiro'],
            technologies: ['Táticas de Montanha', 'Ciência da Guerra'],
            landmarks: ['Observatório', 'Forte da Sabedoria']
          }
        }
      }
    ],
    generalTips: {
      civilization1Tips: [
        'Use o poder divino em momentos críticos',
        'Mantenha inspiração nas unidades',
        'Combine poder religioso e militar',
        'Proteja seus santuários'
      ],
      civilization2Tips: [
        'Aproveite a superioridade tecnológica',
        'Use Camelos contra Cavalaria Sagrada',
        'Desenvolva economia científica forte',
        'Mantenha pesquisas constantes'
      ]
    },
    counterUnits: {
      civilization1Counters: [
        {
          unit: 'Cavaleiro Sagrado',
          counters: ['Infantaria', 'Arqueiros']
        },
        {
          unit: 'Monge Guerreiro',
          counters: ['Unidades leves', 'Arqueiros']
        }
      ],
      civilization2Counters: [
        {
          unit: 'Camelo de Guerra',
          counters: ['Cavalaria', 'Unidades leves']
        },
        {
          unit: 'Ghulam',
          counters: ['Infantaria', 'Arqueiros']
        }
      ]
    },
    modSpecificStrategies: [
      {
        modName: 'Empire Wars',
        civilization1Strategy: {
          early: [
            'Desenvolver força divina rapidamente',
            'Estabelecer presença religiosa',
            'Controlar pontos sagrados'
          ],
          mid: [
            'Manter pressão com unidades sagradas',
            'Desenvolver poder divino',
            'Expandir território'
          ],
          late: [
            'Usar força máxima dos Milagres',
            'Dominar com poder sagrado',
            'Controlar recursos-chave'
          ],
          units: ['Cavaleiro Sagrado de Elite', 'Monge Guerreiro', 'Besteiro Divino'],
          technologies: ['Supremacia Divina', 'Táticas Sagradas']
        },
        civilization2Strategy: {
          early: [
            'Desenvolver tecnologias rapidamente',
            'Estabelecer força militar',
            'Controlar recursos estratégicos'
          ],
          mid: [
            'Manter pressão com Camelos',
            'Desenvolver tecnologias avançadas',
            'Expandir influência'
          ],
          late: [
            'Dominar com unidades de elite',
            'Usar superioridade científica',
            'Controlar pontos vitais'
          ],
          units: ['Camelo de Guerra de Elite', 'Ghulam de Elite', 'Arqueiro Montado'],
          technologies: ['Ciência Suprema', 'Guerra Avançada']
        }
      }
    ]
  },

  // Ordem dos Dragões vs Zhu Xi's Legacy
  {
    civilization1: 'Ordem dos Dragões',
    civilization2: 'Zhu Xi\'s Legacy',
    mapTypes: [
      {
        mapName: 'Montanha',
        advantage: 'Civilization1',
        strategies: {
          civilization1Strategy: {
            early: [
              'Desenvolver Voivodes rapidamente',
              'Estabelecer postos avançados nas montanhas',
              'Construir Castelos estratégicos'
            ],
            mid: [
              'Usar Voivodes para controlar pontos altos',
              'Desenvolver tecnologias de cerco',
              'Expandir controle territorial com Castelos'
            ],
            late: [
              'Dominar com Cavalaria Pesada e Voivodes',
              'Manter superioridade posicional',
              'Usar poder dos Castelos para controle de área'
            ],
            units: ['Voivode', 'Cavalaria Pesada', 'Monge'],
            technologies: ['Táticas Montanhosas', 'Fortificação Avançada'],
            landmarks: ['Castelo de Bran', 'Monastério de Tismana']
          },
          civilization2Strategy: {
            early: [
              'Desenvolver Village Granaries',
              'Estabelecer economia baseada em arroz',
              'Construir defesas em pontos estratégicos'
            ],
            mid: [
              'Usar Imperial Palace Guards para contra-ataques',
              'Desenvolver tecnologias de infantaria',
              'Expandir influência econômica'
            ],
            late: [
              'Dominar com infantaria de elite e arqueiros',
              'Manter superioridade econômica',
              'Usar poder da infantaria em formação'
            ],
            units: ['Imperial Palace Guard', 'Fire Lancer', 'Nest of Bees'],
            technologies: ['Formação de Infantaria', 'Cultivo Avançado'],
            landmarks: ['Imperial Academy', 'White Pagoda']
          }
        }
      },
      {
        mapName: 'Planícies Abertas',
        advantage: 'Civilization2',
        strategies: {
          civilization1Strategy: {
            early: [
              'Estabelecer defesas móveis',
              'Desenvolver economia baseada em caça',
              'Construir postos avançados'
            ],
            mid: [
              'Usar cavalaria para mobilidade',
              'Desenvolver tecnologias defensivas',
              'Expandir território gradualmente'
            ],
            late: [
              'Lançar ataques coordenados',
              'Usar Voivodes para romper linhas',
              'Controlar pontos estratégicos'
            ],
            units: ['Voivode', 'Arqueiro a Cavalo', 'Monge'],
            technologies: ['Táticas de Mobilidade', 'Defesa Territorial'],
            landmarks: ['Fortaleza de Târgoviște', 'Academia Militar']
          },
          civilization2Strategy: {
            early: [
              'Estabelecer Village Granaries em locais estratégicos',
              'Desenvolver economia agrícola superior',
              'Construir postos militares avançados'
            ],
            mid: [
              'Usar Fire Lancers para mobilidade',
              'Desenvolver formações de infantaria',
              'Expandir território rapidamente'
            ],
            late: [
              'Dominar com unidades de elite em formação',
              'Manter superioridade numérica',
              'Controlar recursos vitais'
            ],
            units: ['Imperial Palace Guard', 'Fire Lancer', 'Zhuge Nu'],
            technologies: ['Formações Avançadas', 'Agricultura Imperial'],
            landmarks: ['Astronomical Clocktower', 'Spirit Way']
          }
        }
      }
    ],
    generalTips: {
      civilization1Tips: [
        'Use a força dos Voivodes em combate',
        'Aproveite os Castelos para controle territorial',
        'Considere táticas de guerrilha com cavalaria',
        'Desenvolva economia defensiva'
      ],
      civilization2Tips: [
        'Aproveite o poder econômico da agricultura',
        'Use formações de infantaria para maximizar eficiência',
        'Desenvolva Village Granaries estrategicamente',
        'Mantenha superioridade numérica'
      ]
    },
    counterUnits: {
      civilization1Counters: [
        {
          unit: 'Voivode',
          counters: ['Infantaria', 'Arqueiros']
        },
        {
          unit: 'Cavalaria Pesada',
          counters: ['Arqueiros', 'Unidades de cerco']
        }
      ],
      civilization2Counters: [
        {
          unit: 'Imperial Palace Guard',
          counters: ['Cavalaria', 'Unidades leves']
        },
        {
          unit: 'Fire Lancer',
          counters: ['Arqueiros', 'Unidades de cerco']
        }
      ]
    },
    modSpecificStrategies: [
      {
        modName: 'Empire Wars',
        civilization1Strategy: {
          early: [
            'Desenvolver força militar rapidamente',
            'Estabelecer controle de recursos',
            'Iniciar produção de Voivodes'
          ],
          mid: [
            'Manter pressão com cavalaria',
            'Desenvolver rede de Castelos',
            'Expandir território'
          ],
          late: [
            'Usar unidades de elite',
            'Dominar com controle territorial',
            'Controlar pontos estratégicos'
          ],
          units: ['Voivode de Elite', 'Cavalaria Pesada de Elite', 'Monge'],
          technologies: ['Supremacia Montanhosa', 'Táticas Avançadas de Castelo']
        },
        civilization2Strategy: {
          early: [
            'Produzir Imperial Palace Guards rapidamente',
            'Estabelecer Village Granaries',
            'Desenvolver formações'
          ],
          mid: [
            'Manter pressão com infantaria em formação',
            'Desenvolver economia agrícola',
            'Expandir território'
          ],
          late: [
            'Dominar com unidades de elite em formação',
            'Usar poder econômico superior',
            'Controlar pontos vitais'
          ],
          units: ['Imperial Palace Guard de Elite', 'Fire Lancer de Elite', 'Nest of Bees'],
          technologies: ['Formações Imperiais', 'Táticas Agrícolas Avançadas']
        }
      }
    ]
  },

  // Malianos vs Ayyubids
  {
    civilization1: 'Malianos',
    civilization2: 'Ayyubids',
    mapTypes: [
      {
        mapName: 'Planícies Abertas',
        advantage: 'Civilization1',
        strategies: {
          civilization1Strategy: {
            early: [
              'Desenvolver Donso rapidamente',
              'Estabelecer minas de ouro',
              'Construir Pit Mines estratégicas'
            ],
            mid: [
              'Usar Musofadi Warriors para pressão',
              'Desenvolver economia de ouro forte',
              'Expandir território com Cattle Farms'
            ],
            late: [
              'Dominar com Sofa e Donso de Elite',
              'Manter superioridade econômica',
              'Usar poder das unidades únicas'
            ],
            units: ['Donso', 'Musofadi Warrior', 'Sofa'],
            technologies: ['Pit Mining', 'Farimba'],
            landmarks: ['Grande Mesquita de Djenne', 'Mansaya']
          },
          civilization2Strategy: {
            early: [
              'Desenvolver Mamluk iniciais',
              'Estabelecer economia comercial',
              'Construir postos militares'
            ],
            mid: [
              'Usar Mamluks para contra-ataques',
              'Desenvolver tecnologias militares',
              'Expandir rotas comerciais'
            ],
            late: [
              'Dominar com cavalaria Mamluk',
              'Manter pressão econômica',
              'Usar poder do comércio'
            ],
            units: ['Mamluk', 'Arqueiro a Camelo', 'Ghulam'],
            technologies: ['Comércio do Deserto', 'Táticas Mamluk'],
            landmarks: ['Cidadela do Cairo', 'Grande Bazar']
          }
        }
      },
      {
        mapName: 'Deserto',
        advantage: 'Civilization2',
        strategies: {
          civilization1Strategy: {
            early: [
              'Proteger recursos de água',
              'Desenvolver Cattle Farms próximas',
              'Estabelecer defesas iniciais'
            ],
            mid: [
              'Usar Musofadi para defesa de recursos',
              'Desenvolver economia adaptada',
              'Manter controle de oásis'
            ],
            late: [
              'Lançar ataques coordenados',
              'Usar mobilidade das unidades',
              'Controlar pontos de água'
            ],
            units: ['Sofa', 'Donso', 'Arqueiro'],
            technologies: ['Adaptação ao Deserto', 'Táticas de Oásis'],
            landmarks: ['Forte do Sahel', 'Centro Comercial']
          },
          civilization2Strategy: {
            early: [
              'Aproveitar conhecimento do terreno',
              'Desenvolver economia do deserto',
              'Estabelecer rotas comerciais'
            ],
            mid: [
              'Usar mobilidade superior',
              'Controlar recursos vitais',
              'Expandir influência comercial'
            ],
            late: [
              'Dominar com unidades adaptadas',
              'Manter superioridade econômica',
              'Controlar rotas estratégicas'
            ],
            units: ['Mamluk de Elite', 'Arqueiro a Camelo', 'Lanceiro'],
            technologies: ['Supremacia do Deserto', 'Rotas da Seda'],
            landmarks: ['Fortaleza do Deserto', 'Mercado de Especiarias']
          }
        }
      }
    ],
    generalTips: {
      civilization1Tips: [
        'Use a força econômica do ouro',
        'Mantenha produção de unidades únicas',
        'Proteja suas Pit Mines',
        'Desenvolva Cattle Farms estrategicamente'
      ],
      civilization2Tips: [
        'Aproveite a mobilidade no deserto',
        'Mantenha rotas comerciais ativas',
        'Use Mamluks para controle de território',
        'Desenvolva economia diversificada'
      ]
    },
    counterUnits: {
      civilization1Counters: [
        {
          unit: 'Musofadi Warrior',
          counters: ['Cavalaria', 'Unidades leves']
        },
        {
          unit: 'Sofa',
          counters: ['Arqueiros', 'Unidades de cerco']
        }
      ],
      civilization2Counters: [
        {
          unit: 'Mamluk',
          counters: ['Infantaria', 'Arqueiros']
        },
        {
          unit: 'Arqueiro a Camelo',
          counters: ['Cavalaria', 'Unidades lentas']
        }
      ]
    },
    modSpecificStrategies: [
      {
        modName: 'Empire Wars',
        civilization1Strategy: {
          early: [
            'Desenvolver força militar rapidamente',
            'Estabelecer controle de ouro',
            'Iniciar produção de unidades únicas'
          ],
          mid: [
            'Manter pressão econômica',
            'Desenvolver força militar completa',
            'Expandir território'
          ],
          late: [
            'Usar unidades de elite',
            'Dominar economia de ouro',
            'Controlar pontos estratégicos'
          ],
          units: ['Sofa de Elite', 'Donso de Elite', 'Musofadi Warrior'],
          technologies: ['Supremacia do Ouro', 'Táticas Avançadas']
        },
        civilization2Strategy: {
          early: [
            'Produzir Mamluks rapidamente',
            'Estabelecer rotas comerciais',
            'Controlar recursos-chave'
          ],
          mid: [
            'Manter pressão com cavalaria',
            'Desenvolver economia comercial',
            'Expandir território'
          ],
          late: [
            'Dominar com unidades de elite',
            'Usar poder econômico',
            'Controlar pontos vitais'
          ],
          units: ['Mamluk de Elite', 'Arqueiro a Camelo de Elite', 'Ghulam'],
          technologies: ['Comércio Supremo', 'Táticas do Deserto']
        }
      }
    ]
  },

  // Sultanato de Delhi vs Otomanos
  {
    civilization1: 'Sultanato de Delhi',
    civilization2: 'Otomanos',
    mapTypes: [
      {
        mapName: 'Estepes',
        advantage: 'Civilization2',
        strategies: {
          civilization1Strategy: {
            early: [
              'Desenvolver Scholars para pesquisas gratuitas',
              'Construir Sacred Sites para pressão religiosa',
              'Estabelecer economia defensiva'
            ],
            mid: [
              'Usar Tower Elephants para defesa',
              'Desenvolver tecnologias defensivas',
              'Expandir controle territorial com Sacred Sites'
            ],
            late: [
              'Dominar com War Elephants e Tower Elephants',
              'Manter superioridade tecnológica',
              'Usar poder religioso para vitória alternativa'
            ],
            units: ['Tower Elephant', 'War Elephant', 'Spearman'],
            technologies: ['Sanctity', 'Efficient Production'],
            landmarks: ['Tower of Victory', 'Dome of Faith']
          },
          civilization2Strategy: {
            early: [
              'Desenvolver Janissários rapidamente',
              'Estabelecer economia militar',
              'Construir Grande Mesquita de Edirne'
            ],
            mid: [
              'Usar Janissários e Sipahi para ataques rápidos',
              'Desenvolver tecnologias militares',
              'Expandir influência militar'
            ],
            late: [
              'Dominar com artilharia otomana e Janissários',
              'Manter superioridade militar',
              'Usar poder dos Mehter para inspirar tropas'
            ],
            units: ['Janissário', 'Sipahi', 'Grande Bombarda'],
            technologies: ['Reforma Militar', 'Pólvora Avançada'],
            landmarks: ['Topkapi Palace', 'Grande Mesquita de Edirne']
          }
        }
      },
      {
        mapName: 'Deserto',
        advantage: 'Civilization1',
        strategies: {
          civilization1Strategy: {
            early: [
              'Controlar oásis',
              'Desenvolver economia baseada em Sacred Sites',
              'Estabelecer posições defensivas'
            ],
            mid: [
              'Usar Tower Elephants para controlar pontos de água',
              'Desenvolver tecnologias de resistência',
              'Manter controle de recursos vitais'
            ],
            late: [
              'Lançar ataques coordenados com elefantes',
              'Usar War Elephants para romper defesas',
              'Controlar pontos estratégicos'
            ],
            units: ['War Elephant', 'Tower Elephant', 'Archer'],
            technologies: ['Domínio do Deserto', 'Táticas de Oásis'],
            landmarks: ['Hisar Academy', 'Delhi Sultanate Palace']
          },
          civilization2Strategy: {
            early: [
              'Estabelecer postos militares',
              'Desenvolver economia baseada em comércio',
              'Construir defesas em pontos de água'
            ],
            mid: [
              'Usar Sipahi para mobilidade no deserto',
              'Desenvolver tecnologias de adaptação',
              'Expandir território gradualmente'
            ],
            late: [
              'Dominar com artilharia em pontos estratégicos',
              'Manter superioridade de fogo',
              'Controlar rotas comerciais'
            ],
            units: ['Janissário', 'Sipahi', 'Grande Bombarda'],
            technologies: ['Rotas Comerciais', 'Adaptação ao Deserto'],
            landmarks: ['Imperial Arsenal', 'Merchant Guild']
          }
        }
      }
    ],
    generalTips: {
      civilization1Tips: [
        'Use a força dos elefantes em combate',
        'Aproveite as pesquisas gratuitas dos Scholars',
        'Considere vitória religiosa com Sacred Sites',
        'Desenvolva economia defensiva'
      ],
      civilization2Tips: [
        'Aproveite o poder militar dos Janissários',
        'Use Mehter para inspirar unidades em combate',
        'Desenvolva artilharia avançada',
        'Mantenha mobilidade com Sipahi'
      ]
    },
    counterUnits: {
      civilization1Counters: [
        {
          unit: 'Tower Elephant',
          counters: ['Arqueiros', 'Unidades leves']
        },
        {
          unit: 'War Elephant',
          counters: ['Cavalaria', 'Unidades de cerco']
        }
      ],
      civilization2Counters: [
        {
          unit: 'Janissário',
          counters: ['Infantaria', 'Elefantes']
        },
        {
          unit: 'Grande Bombarda',
          counters: ['Unidades agrupadas', 'Edifícios']
        }
      ]
    },
    modSpecificStrategies: [
      {
        modName: 'Empire Wars',
        civilization1Strategy: {
          early: [
            'Desenvolver força militar rapidamente',
            'Estabelecer controle de Sacred Sites',
            'Iniciar produção de Scholars'
          ],
          mid: [
            'Manter pressão religiosa',
            'Desenvolver força de elefantes',
            'Expandir território'
          ],
          late: [
            'Usar elefantes de elite',
            'Dominar tecnologicamente',
            'Controlar pontos estratégicos'
          ],
          units: ['War Elephant de Elite', 'Tower Elephant de Elite', 'Scholar'],
          technologies: ['Supremacia Religiosa', 'Táticas Avançadas de Elefantes']
        },
        civilization2Strategy: {
          early: [
            'Produzir Janissários rapidamente',
            'Estabelecer postos militares',
            'Desenvolver artilharia inicial'
          ],
          mid: [
            'Manter pressão com unidades de pólvora',
            'Desenvolver economia militar',
            'Expandir território'
          ],
          late: [
            'Dominar com artilharia avançada',
            'Usar poder militar superior',
            'Controlar pontos vitais'
          ],
          units: ['Janissário de Elite', 'Grande Bombarda Avançada', 'Mehter'],
          technologies: ['Supremacia Militar', 'Pólvora Imperial']
        }
      }
    ]
  },

  // Russos vs Ingleses
  {
    civilization1: 'Russos',
    civilization2: 'Ingleses',
    mapTypes: [
      {
        mapName: 'Planícies Abertas',
        advantage: 'Civilization2',
        strategies: {
          civilization1Strategy: {
            early: [
              'Estabelecer rede de caça com Caçadores',
              'Desenvolver economia baseada em recursos',
              'Construir Torres de Madeira para defesa'
            ],
            mid: [
              'Produzir Cavaleiros Rus para contra-ataques',
              'Desenvolver linha de Arqueiros a Cavalo',
              'Fortalecer economia com Bounty dourado'
            ],
            late: [
              'Usar Streltsy para combate à distância',
              'Manter pressão com cavalaria pesada',
              'Desenvolver tecnologias únicas russas'
            ],
            units: ['Cavaleiro Rus', 'Streltsy', 'Arqueiro a Cavalo'],
            technologies: ['Bounty Dourado', 'Táticas de Caça'],
            landmarks: ['Abadia da Trindade', 'Kremlin']
          },
          civilization2Strategy: {
            early: [
              'Estabelecer linha de arqueiros Longbow',
              'Proteger recursos com torres',
              'Desenvolver economia agrícola'
            ],
            mid: [
              'Manter distância da cavalaria francesa',
              'Criar formações defensivas com Longbows e lanceiros',
              'Fortalecer posições com muralhas'
            ],
            late: [
              'Usar Trebuchets para destruir bases francesas',
              'Manter formação compacta de Longbows Elite',
              'Proteger unidades de cerco com infantaria pesada'
            ],
            units: ['Longbow', 'Man-at-Arms', 'Lanceiro'],
            technologies: ['Rede de Fazendas', 'Treinamento de Arqueiros'],
            landmarks: ['Conselho do Reino', 'Abadia de São Albano']
          }
        }
      },
      {
        mapName: 'Floresta',
        advantage: 'Civilization1',
        strategies: {
          civilization1Strategy: {
            early: [
              'Maximizar caça na floresta',
              'Estabelecer postos avançados',
              'Usar cobertura natural para defesa'
            ],
            mid: [
              'Emboscar com Streltsy na floresta',
              'Controlar recursos estratégicos',
              'Desenvolver rede de torres'
            ],
            late: [
              'Usar terreno para vantagem tática',
              'Manter controle de recursos',
              'Lançar ataques coordenados'
            ],
            units: ['Streltsy', 'Cavaleiro Rus', 'Arqueiro'],
            technologies: ['Táticas Florestais', 'Caça Avançada'],
            landmarks: ['Fortaleza de Madeira', 'Igreja de São Basílio']
          },
          civilization2Strategy: {
            early: [
              'Adaptar táticas para terreno florestal',
              'Estabelecer bases defensivas',
              'Desenvolver rotas de suprimento'
            ],
            mid: [
              'Usar Janízaros em posições elevadas',
              'Criar caminhos para artilharia',
              'Manter pressão constante'
            ],
            late: [
              'Posicionar artilharia estrategicamente',
              'Usar Sipahi para mobilidade',
              'Cercar posições russas'
            ],
            units: ['Janízaro', 'Sipahi', 'Bombarda'],
            technologies: ['Táticas de Cerco', 'Formação Militar'],
            landmarks: ['Forte Otomano', 'Grande Mesquita']
          }
        }
      }
    ],
    generalTips: {
      civilization1Tips: [
        'Aproveite os bônus de caça',
        'Use o terreno para emboscadas',
        'Mantenha economia forte com Bounty',
        'Combine unidades de cavalaria e arqueiros'
      ],
      civilization2Tips: [
        'Mantenha produção constante de Longbows',
        'Use o alcance superior dos Longbows',
        'Desenvolva economia defensiva forte',
        'Proteja os flancos contra cavalaria'
      ]
    },
    counterUnits: {
      civilization1Counters: [
        {
          unit: 'Streltsy',
          counters: ['Cavalaria', 'Infantaria']
        },
        {
          unit: 'Cavaleiro Rus',
          counters: ['Arqueiros', 'Artilharia']
        }
      ],
      civilization2Counters: [
        {
          unit: 'Longbow',
          counters: ['Arbalétrier', 'Cavalaria Leve']
        },
        {
          unit: 'Man-at-Arms',
          counters: ['Cavalaria', 'Infantaria leve']
        }
      ]
    },
    modSpecificStrategies: [
      {
        modName: 'Empire Wars',
        civilization1Strategy: {
          early: [
            'Desenvolver força militar rapidamente',
            'Estabelecer controle de recursos',
            'Iniciar caça intensiva'
          ],
          mid: [
            'Manter pressão com cavalaria',
            'Desenvolver economia forte',
            'Controlar pontos estratégicos'
          ],
          late: [
            'Usar combinação de unidades de elite',
            'Manter controle de recursos',
            'Lançar ataques decisivos'
          ],
          units: ['Streltsy de Elite', 'Cavaleiro Rus de Elite', 'Arqueiro a Cavalo'],
          technologies: ['Táticas Avançadas', 'Economia de Guerra']
        },
        civilization2Strategy: {
          early: [
            'Produzir Longbows rapidamente',
            'Estabelecer presença militar',
            'Desenvolver economia de guerra'
          ],
          mid: [
            'Manter pressão constante',
            'Desenvolver força militar completa',
            'Controlar pontos estratégicos'
          ],
          late: [
            'Usar artilharia para vantagem decisiva',
            'Manter exército profissional forte',
            'Dominar batalhas importantes'
          ],
          units: ['Longbow de Elite', 'Man-at-Arms de Elite', 'Arbalétrier'],
          technologies: ['Supremacia Militar', 'Táticas de Caça']
        }
      }
    ]
  },

  // Jeanne d'Arc vs Ordem do Dragão
  {
    civilization1: 'Jeanne d\'Arc',
    civilization2: 'Ordem do Dragão',
    mapTypes: [
      {
        mapName: 'Castelo',
        advantage: 'Civilization1',
        strategies: {
          civilization1Strategy: {
            early: [
              'Estabelecer rede de aldeões inspirados',
              'Desenvolver economia baseada em devoção',
              'Construir fortalezas iniciais'
            ],
            mid: [
              'Usar Cavaleiros Sagrados para ataques frontais',
              'Desenvolver rede de Postos Avançados',
              'Fortalecer economia com Relíquias'
            ],
            late: [
              'Usar unidades inspiradas por Jeanne',
              'Manter pressão com cavalaria sagrada',
              'Desenvolver tecnologias de aura'
            ],
            units: ['Cavaleiro Sagrado', 'Cruzado', 'Monge Guerreiro'],
            technologies: ['Bênção Divina', 'Inspiração de Jeanne'],
            landmarks: ['Catedral de Reims', 'Pátio Real']
          },
          civilization2Strategy: {
            early: [
              'Estabelecer rede de Voivodes',
              'Proteger recursos com torres',
              'Desenvolver economia baseada em ouro'
            ],
            mid: [
              'Usar Cavaleiros do Dragão para contra-ataques',
              'Criar formações defensivas com infantaria pesada',
              'Fortalecer posições com Castelos'
            ],
            late: [
              'Usar Voivodes para destruir formações inimigas',
              'Manter controle de território com Castelos',
              'Proteger unidades de elite com infantaria'
            ],
            units: ['Voivode', 'Cavaleiro do Dragão', 'Berserk'],
            technologies: ['Pacto Dracônico', 'Fortificação Avançada'],
            landmarks: ['Castelo de Bran', 'Monastério do Dragão']
          }
        }
      },
      {
        mapName: 'Floresta Francesa',
        advantage: 'Civilization1',
        strategies: {
          civilization1Strategy: {
            early: [
              'Usar conhecimento do terreno',
              'Estabelecer postos de resistência',
              'Desenvolver economia defensiva'
            ],
            mid: [
              'Emboscar com Cavaleiros Sagrados',
              'Controlar pontos estratégicos',
              'Desenvolver rede de postos avançados'
            ],
            late: [
              'Usar terreno para vantagem tática',
              'Manter controle de Relíquias',
              'Lançar ataques inspirados'
            ],
            units: ['Cavaleiro Sagrado', 'Besta', 'Monge'],
            technologies: ['Táticas Florestais', 'Devoção Extrema'],
            landmarks: ['Fortaleza de Orleans', 'Sainte-Chapelle']
          },
          civilization2Strategy: {
            early: [
              'Adaptar táticas para terreno desconhecido',
              'Estabelecer bases defensivas',
              'Desenvolver rotas comerciais'
            ],
            mid: [
              'Usar Voivodes em caminhos estreitos',
              'Criar rotas de incursão',
              'Manter pressão constante'
            ],
            late: [
              'Posicionar Cavaleiros do Dragão estrategicamente',
              'Usar Berserks para infiltração',
              'Cercar posições francesas'
            ],
            units: ['Voivode', 'Cavalaria Pesada', 'Berserk'],
            technologies: ['Pacto Sombrio', 'Táticas de Infiltração'],
            landmarks: ['Torre Negra', 'Sala do Trono']
          }
        }
      }
    ],
    generalTips: {
      civilization1Tips: [
        'Aproveite a inspiração de Jeanne',
        'Use auras para fortalecer unidades',
        'Mantenha controle de Relíquias',
        'Combine unidades inspiradas para máxima eficiência'
      ],
      civilization2Tips: [
        'Mantenha rede de Castelos estratégicos',
        'Use o poder dos Voivodes em formação',
        'Desenvolva economia baseada em ouro',
        'Proteja seus Cavaleiros do Dragão contra lanceiros'
      ]
    },
    counterUnits: {
      civilization1Counters: [
        {
          unit: 'Cavaleiro Sagrado',
          counters: ['Infantaria', 'Arqueiros']
        },
        {
          unit: 'Monge Guerreiro',
          counters: ['Unidades à distância', 'Suporte']
        }
      ],
      civilization2Counters: [
        {
          unit: 'Voivode',
          counters: ['Infantaria', 'Cavalaria Leve']
        },
        {
          unit: 'Berserk',
          counters: ['Arqueiros', 'Unidades de suporte']
        }
      ]
    },
    modSpecificStrategies: [
      {
        modName: 'Empire Wars',
        civilization1Strategy: {
          early: [
            'Desenvolver força militar rapidamente',
            'Estabelecer controle de Relíquias',
            'Iniciar inspiração de unidades'
          ],
          mid: [
            'Manter pressão com cavalaria',
            'Desenvolver auras de combate',
            'Controlar pontos estratégicos'
          ],
          late: [
            'Usar unidades de elite inspiradas',
            'Manter controle de recursos',
            'Lançar ataques decisivos'
          ],
          units: ['Cavaleiro Sagrado de Elite', 'Cruzado de Elite', 'Monge Inspirado'],
          technologies: ['Aura Suprema', 'Devoção Total']
        },
        civilization2Strategy: {
          early: [
            'Produzir Voivodes rapidamente',
            'Estabelecer presença militar',
            'Desenvolver economia de guerra'
          ],
          mid: [
            'Manter pressão com Cavalariros do Dragão',
            'Desenvolver rede de Castelos',
            'Controlar pontos estratégicos'
          ],
          late: [
            'Dominar com unidades de elite',
            'Usar poder econômico',
            'Controlar pontos vitais'
          ],
          units: ['Voivode de Elite', 'Cavaleiro do Dragão de Elite', 'Berserk'],
          technologies: ['Pacto Dracônico Supremo', 'Táticas das Sombras']
        }
      }
    ]
  },

  // Sacro Império Romano-Germânico vs Bizantinos
  {
    civilization1: 'Sacro Império Romano-Germânico',
    civilization2: 'Bizantinos',
    mapTypes: [
      {
        mapName: 'Colinas',
        advantage: 'Civilization1',
        strategies: {
          civilization1Strategy: {
            early: [
              'Desenvolver Prelados rapidamente',
              'Estabelecer economia baseada em Relíquias',
              'Construir Regnitz Cathedral estrategicamente'
            ],
            mid: [
              'Usar Landsknechts em terreno elevado',
              'Desenvolver tecnologias militares',
              'Expandir influência religiosa'
            ],
            late: [
              'Dominar com infantaria pesada e Landsknechts',
              'Manter superioridade econômica com Relíquias',
              'Usar poder dos Prelados para inspirar tropas'
            ],
            units: ['Landsknecht', 'Knight', 'Prelado'],
            technologies: ['Inspiração', 'Marcha Forçada'],
            landmarks: ['Regnitz Cathedral', 'Elzbach Palace']
          },
          civilization2Strategy: {
            early: [
              'Desenvolver defesas de muralhas',
              'Estabelecer economia diversificada',
              'Construir Hagia Sophia'
            ],
            mid: [
              'Usar Catafractos para contra-ataques',
              'Desenvolver linha de Varangian Guard',
              'Expandir rede defensiva'
            ],
            late: [
              'Usar combinação de Catafractos e Varangian Guard',
              'Manter defesas fortes',
              'Utilizar superioridade tecnológica'
            ],
            units: ['Catafracto', 'Varangian Guard', 'Fogo Grego'],
            technologies: ['Defesa Bizantina', 'Arquitetura Avançada'],
            landmarks: ['Hagia Sophia', 'Grande Palácio']
          }
        }
      },
      {
        mapName: 'Península',
        advantage: 'Civilization2',
        strategies: {
          civilization1Strategy: {
            early: [
              'Controlar centro da península',
              'Desenvolver economia defensiva',
              'Estabelecer postos avançados'
            ],
            mid: [
              'Usar Cavalaria para mobilidade limitada',
              'Desenvolver tecnologias defensivas',
              'Manter controle de Relíquias'
            ],
            late: [
              'Lançar ataques coordenados',
              'Usar Landsknechts para romper linhas',
              'Controlar pontos estratégicos'
            ],
            units: ['Landsknecht', 'Knight', 'Crossbowman'],
            technologies: ['Táticas Peninsulares', 'Defesa Religiosa'],
            landmarks: ['Aachen Chapel', 'Burgrave Palace']
          },
          civilization2Strategy: {
            early: [
              'Aproveitar conhecimento do terreno costeiro',
              'Desenvolver economia naval e terrestre',
              'Estabelecer controle de águas próximas'
            ],
            mid: [
              'Usar navios de Fogo Grego para controle costeiro',
              'Dominar com Catafractos em espaços abertos',
              'Expandir fortificações'
            ],
            late: [
              'Dominar com combinação de forças navais e terrestres',
              'Manter superioridade tecnológica',
              'Controlar pontos estratégicos com Varangian Guard'
            ],
            units: ['Catafracto', 'Varangian Guard', 'Dromon com Fogo Grego'],
            technologies: ['Supremacia Naval', 'Fortificação Costeira'],
            landmarks: ['Hipódromo', 'Portão Dourado']
          }
        }
      }
    ],
    generalTips: {
      civilization1Tips: [
        'Aproveite o poder econômico das Relíquias',
        'Use Prelados para inspirar unidades em combate',
        'Desenvolva Landsknechts contra cavalaria',
        'Mantenha controle religioso'
      ],
      civilization2Tips: [
        'Utilize as fortes defesas bizantinas',
        'Combine Catafractos com infantaria pesada',
        'Aproveite a versatilidade do Fogo Grego',
        'Desenvolva tecnologias defensivas avançadas'
      ]
    },
    counterUnits: {
      civilization1Counters: [
        {
          unit: 'Landsknecht',
          counters: ['Cavalaria', 'Infantaria leve']
        },
        {
          unit: 'Prelado',
          counters: ['Suporte', 'Inspiração de unidades']
        }
      ],
      civilization2Counters: [
        {
          unit: 'Catafracto',
          counters: ['Infantaria', 'Arqueiros']
        },
        {
          unit: 'Varangian Guard',
          counters: ['Cavalaria', 'Unidades leves']
        }
      ]
    },
    modSpecificStrategies: [
      {
        modName: 'Empire Wars',
        civilization1Strategy: {
          early: [
            'Desenvolver força militar rapidamente',
            'Estabelecer controle de Relíquias',
            'Iniciar produção de Prelados'
          ],
          mid: [
            'Manter pressão com infantaria inspirada',
            'Desenvolver economia religiosa',
            'Expandir território'
          ],
          late: [
            'Usar unidades de elite inspiradas',
            'Manter superioridade econômica com Relíquias',
            'Controlar pontos estratégicos'
          ],
          units: ['Landsknecht de Elite', 'Knight de Elite', 'Prelado'],
          technologies: ['Inspiração Suprema', 'Táticas Imperiais']
        },
        civilization2Strategy: {
          early: [
            'Estabelecer defesas imediatas',
            'Desenvolver Catafractos rapidamente',
            'Construir postos avançados'
          ],
          mid: [
            'Manter pressão com Catafractos',
            'Desenvolver tecnologias defensivas avançadas',
            'Expandir controle territorial'
          ],
          late: [
            'Usar combinação de unidades de elite',
            'Manter superioridade defensiva',
            'Dominar pontos estratégicos'
          ],
          units: ['Catafracto de Elite', 'Varangian Guard de Elite', 'Fogo Grego Avançado'],
          technologies: ['Fortificação Suprema', 'Táticas Bizantinas Avançadas']
        }
      }
    ]
  }
];

export { matchups };

export async function seedMatchups() {
  try {
    // Remover a coleção existente
    if (mongoose.connection.collections['civilizationmatchups']) {
      await mongoose.connection.collections['civilizationmatchups'].drop();
      console.log('🗑️ Coleção de matchups removida com sucesso!');
    }

    // Inserir novos matchups
    for (const matchup of matchups) {
      const newMatchup = new CivilizationMatchup(matchup);
      await newMatchup.save();
      console.log(`✅ Matchup ${matchup.civilization1} vs ${matchup.civilization2} inserido com sucesso!`);
    }

    console.log('✅ Todos os matchups foram inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir matchups:', error);
  }
} 