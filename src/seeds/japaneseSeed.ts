import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export async function seedJapanese() {
  try {
    // Verificar se já existe
    const existingCiv = await Civilization.findOne({ name: 'Japoneses' });
    if (existingCiv) {
      console.log('⚠️ Dados dos Japoneses já existem no banco de dados.');
      return;
    }

    const japaneseData = {
      name: 'Japoneses',
      strengths: [
        'Infantaria de elite extremamente poderosa',
        'Unidades com alta velocidade de ataque',
        'Capacidade de construir estruturas defensivas rapidamente',
        'Tecnologias únicas de combate corpo a corpo'
      ],
      weaknesses: [
        'Economia inicial mais lenta',
        'Vulnerabilidade a ataques à distância',
        'Custo elevado de unidades de elite',
        'Dependência de recursos específicos para unidades avançadas'
      ],
      recommendedPlaystyle: 'Offensive',
      economyFocus: 'Produção de alimentos e madeira',
      militaryStrength: 'Infantaria de elite e arqueiros montados',
      technologicalAdvantages: 'Tecnologias de combate corpo a corpo e velocidade de ataque',
      uniqueUnits: [
        {
          name: 'Samurai',
          description: 'Infantaria de elite com katanas',
          strategicUse: 'Combate corpo a corpo contra qualquer unidade',
          bestAgainst: ['Infantaria', 'Unidades únicas'],
          weakAgainst: ['Arqueiros', 'Unidades de cerco']
        },
        {
          name: 'Yabusame',
          description: 'Arqueiro montado especializado',
          strategicUse: 'Ataques rápidos e mobilidade',
          bestAgainst: ['Infantaria', 'Unidades lentas'],
          weakAgainst: ['Lanceiros', 'Cavalaria pesada']
        }
      ],
      uniqueTechnologies: [
        {
          name: 'Bushido',
          effect: 'Infantaria ataca 20% mais rápido',
          strategicValue: 'Torna a infantaria japonesa extremamente letal'
        },
        {
          name: 'Castelos de Pedra',
          effect: 'Estruturas defensivas são construídas 40% mais rápido',
          strategicValue: 'Permite rápida fortificação e defesa'
        }
      ],
      eraStrategies: {
        eraI: {
          buildOrder: [
            'Construir casas e celeiros',
            'Treinar aldeões até 15-20',
            'Coletar alimentos e madeira',
            'Construir Quartel para infantaria básica'
          ],
          economicFocus: 'Crescimento populacional e coleta de recursos',
          militaryFocus: 'Infantaria básica',
          keyUnits: ['Aldeão', 'Lanceiro', 'Arqueiro'],
          keyTechnologies: ['Ferramentas Aprimoradas', 'Técnicas de Caça']
        },
        eraII: {
          buildOrder: [
            'Construir estruturas militares adicionais',
            'Treinar primeiros Samurais',
            'Expandir economia com mais aldeões',
            'Desenvolver tecnologias de combate'
          ],
          economicFocus: 'Expandir produção de recursos para sustentar exército',
          militaryFocus: 'Samurais e arqueiros',
          keyUnits: ['Samurai', 'Arqueiro', 'Lanceiro'],
          keyTechnologies: ['Bushido', 'Armaduras de Malha'],
          recommendedLandmarks: [
            {
              name: 'Castelo de Himeji',
              reason: 'Fortalece defesas e fornece bônus para infantaria'
            }
          ]
        },
        eraIII: {
          buildOrder: [
            'Expandir produção de Samurais',
            'Desenvolver Yabusames',
            'Construir estruturas defensivas',
            'Pesquisar tecnologias avançadas'
          ],
          economicFocus: 'Maximizar produção de recursos para unidades de elite',
          militaryFocus: 'Samurais e Yabusames',
          keyUnits: ['Samurai', 'Yabusame', 'Lanceiro Pesado'],
          keyTechnologies: ['Bushido Avançado', 'Castelos de Pedra'],
          recommendedLandmarks: [
            {
              name: 'Santuário Ise',
              reason: 'Fornece bônus espirituais para todas as unidades'
            }
          ]
        },
        eraIV: {
          buildOrder: [
            'Maximizar produção de unidades de elite',
            'Construir estruturas defensivas avançadas',
            'Preparar exército para ataque final',
            'Pesquisar todas as tecnologias disponíveis'
          ],
          economicFocus: 'Sustentar produção de unidades de elite',
          militaryFocus: 'Samurais de elite e máquinas de cerco',
          keyUnits: ['Samurai de Elite', 'Yabusame de Elite', 'Trebuchet'],
          keyTechnologies: ['Caminho do Guerreiro', 'Armaduras de Placas'],
          recommendedLandmarks: [
            {
              name: 'Palácio Imperial',
              reason: 'Fornece recursos adicionais e melhora todas as unidades'
            }
          ]
        }
      }
    };

    await Civilization.create(japaneseData);
    console.log('✅ Dados dos Japoneses inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados dos Japoneses:', error);
  }
} 