import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export async function seedRus() {
  try {
    // Verificar se já existe
    const existingCiv = await Civilization.findOne({ name: 'Rus' });
    if (existingCiv) {
      console.log('⚠️ Dados dos Rus já existem no banco de dados.');
      return;
    }

    const rusData = {
      name: 'Rus',
      strengths: [
        'Economia baseada em caça e coleta',
        'Cavalaria forte e versátil',
        'Bônus de ouro pela caça',
        'Unidades de arqueiros de elite'
      ],
      weaknesses: [
        'Dependência de florestas e animais selvagens',
        'Vulnerabilidade em mapas com poucos recursos naturais',
        'Custo elevado de unidades de elite',
        'Defesa inicial mais fraca'
      ],
      recommendedPlaystyle: 'Offensive',
      economyFocus: 'Caça, coleta e comércio fluvial',
      militaryStrength: 'Cavalaria e arqueiros de elite',
      technologicalAdvantages: 'Tecnologias de caça e coleta aprimoradas',
      uniqueUnits: [
        {
          name: 'Guerreiro com Machado',
          description: 'Infantaria de elite com machados de duas mãos',
          strategicUse: 'Eficaz contra infantaria e estruturas',
          bestAgainst: ['Infantaria', 'Estruturas'],
          weakAgainst: ['Cavalaria', 'Arqueiros']
        },
        {
          name: 'Cavaleiro Streltsy',
          description: 'Arqueiro de elite com mosquete',
          strategicUse: 'Ataque à distância poderoso',
          bestAgainst: ['Infantaria', 'Cavalaria leve'],
          weakAgainst: ['Cavalaria pesada', 'Unidades de cerco']
        }
      ],
      uniqueTechnologies: [
        {
          name: 'Técnicas de Caça',
          effect: 'Aumenta o ouro obtido pela caça em 20%',
          strategicValue: 'Fortalece a economia baseada em recursos naturais'
        },
        {
          name: 'Ortodoxia',
          effect: 'Monges curam unidades 30% mais rápido',
          strategicValue: 'Melhora a sustentabilidade do exército em batalhas'
        }
      ],
      eraStrategies: {
        eraI: {
          buildOrder: [
            'Construir Cabana de Caçadores',
            'Treinar aldeões até 15-20',
            'Focar em caça e coleta de recursos',
            'Construir Posto Avançado perto de florestas'
          ],
          economicFocus: 'Caça e coleta de recursos naturais',
          militaryFocus: 'Defesa básica com lanceiros',
          keyUnits: ['Aldeão', 'Caçador', 'Lanceiro'],
          keyTechnologies: ['Técnicas de Caça']
        },
        eraII: {
          buildOrder: [
            'Expandir para áreas com mais animais',
            'Construir Mercado e iniciar comércio',
            'Treinar cavalaria para mobilidade',
            'Desenvolver economia baseada em caça'
          ],
          economicFocus: 'Maximizar ouro da caça e estabelecer comércio',
          militaryFocus: 'Cavalaria e arqueiros',
          keyUnits: ['Arqueiro', 'Cavaleiro'],
          keyTechnologies: ['Montaria Aprimorada', 'Arcos Compostos'],
          recommendedLandmarks: [
            {
              name: 'Kremlin Dourado',
              reason: 'Fortalece defesas e produz unidades mais resistentes'
            }
          ]
        },
        eraIII: {
          buildOrder: [
            'Construir estruturas militares adicionais',
            'Expandir economia com mais aldeões',
            'Desenvolver exército misto de cavalaria e arqueiros',
            'Pesquisar tecnologias avançadas'
          ],
          economicFocus: 'Balancear recursos para produção militar',
          militaryFocus: 'Cavalaria pesada e arqueiros de elite',
          keyUnits: ['Cavaleiro', 'Streltsy', 'Guerreiro com Machado'],
          keyTechnologies: ['Ortodoxia', 'Armaduras Pesadas'],
          recommendedLandmarks: [
            {
              name: 'Abadia da Trindade',
              reason: 'Melhora a eficácia dos monges e fornece bônus de cura'
            }
          ]
        },
        eraIV: {
          buildOrder: [
            'Maximizar produção militar',
            'Construir estruturas defensivas avançadas',
            'Preparar exército para ataque final',
            'Pesquisar todas as tecnologias disponíveis'
          ],
          economicFocus: 'Sustentar produção de unidades de elite',
          militaryFocus: 'Streltsy e cavalaria pesada',
          keyUnits: ['Streltsy de Elite', 'Cavaleiro Pesado', 'Trebuchet'],
          keyTechnologies: ['Pólvora Avançada', 'Armaduras de Placas'],
          recommendedLandmarks: [
            {
              name: 'Fortaleza de Moscou',
              reason: 'Produz unidades de elite mais rapidamente e com menor custo'
            }
          ]
        }
      }
    };

    await Civilization.create(rusData);
    console.log('✅ Dados dos Rus inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados dos Rus:', error);
  }
} 