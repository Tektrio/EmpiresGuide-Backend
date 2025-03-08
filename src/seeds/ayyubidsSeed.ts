import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export async function seedAyyubids() {
  try {
    // Verificar se já existe
    const existingCiv = await Civilization.findOne({ name: 'Ayyubids' });
    if (existingCiv) {
      console.log('⚠️ Dados dos Ayyubids já existem no banco de dados.');
      return;
    }

    const ayyubidsData = {
      name: 'Ayyubids',
      strengths: [
        'Cavalaria de elite extremamente poderosa',
        'Economia baseada em comércio e mercados',
        'Unidades com bônus contra infiéis (outras civilizações)',
        'Tecnologias avançadas de cerco e defesa'
      ],
      weaknesses: [
        'Custo elevado de unidades de elite',
        'Dependência de ouro para unidades avançadas',
        'Vulnerabilidade a ataques rápidos no início do jogo',
        'Infantaria menos eficaz que outras civilizações'
      ],
      recommendedPlaystyle: 'Offensive',
      economyFocus: 'Comércio e produção de ouro',
      militaryStrength: 'Cavalaria pesada e unidades de cerco',
      technologicalAdvantages: 'Tecnologias de cavalaria e cerco avançadas',
      uniqueUnits: [
        {
          name: 'Mameluco',
          description: 'Cavalaria de elite com armas à distância',
          strategicUse: 'Combate contra cavalaria e infantaria à distância',
          bestAgainst: ['Cavalaria', 'Infantaria lenta'],
          weakAgainst: ['Arqueiros', 'Lanceiros']
        },
        {
          name: 'Ghulam',
          description: 'Infantaria de elite com arco e espada',
          strategicUse: 'Unidade versátil para combate à distância e corpo a corpo',
          bestAgainst: ['Arqueiros', 'Infantaria leve'],
          weakAgainst: ['Cavalaria pesada', 'Unidades de cerco']
        }
      ],
      uniqueTechnologies: [
        {
          name: 'Jihad',
          effect: 'Unidades militares causam 15% mais dano contra outras civilizações',
          strategicValue: 'Melhora significativamente a eficácia em batalha'
        },
        {
          name: 'Comércio Avançado',
          effect: 'Mercados geram 25% mais ouro',
          strategicValue: 'Fortalece a economia baseada em comércio'
        }
      ],
      eraStrategies: {
        eraI: {
          buildOrder: [
            'Construir Mercado inicial',
            'Treinar aldeões até 15-20',
            'Coletar alimentos e ouro',
            'Construir estruturas militares básicas'
          ],
          economicFocus: 'Crescimento populacional e comércio inicial',
          militaryFocus: 'Defesa básica com lanceiros e arqueiros',
          keyUnits: ['Aldeão', 'Lanceiro', 'Arqueiro'],
          keyTechnologies: ['Comércio Avançado', 'Ferramentas Aprimoradas']
        },
        eraII: {
          buildOrder: [
            'Expandir rede de Mercados',
            'Treinar primeiros Mamelucos',
            'Desenvolver economia baseada em comércio',
            'Focar em tecnologias de cavalaria'
          ],
          economicFocus: 'Estabelecer rotas comerciais e produção de ouro',
          militaryFocus: 'Mamelucos e arqueiros',
          keyUnits: ['Mameluco', 'Arqueiro', 'Ghulam'],
          keyTechnologies: ['Jihad', 'Armaduras de Cavalaria'],
          recommendedLandmarks: [
            {
              name: 'Cidadela do Cairo',
              reason: 'Fortalece defesas e fornece bônus para cavalaria'
            }
          ]
        },
        eraIII: {
          buildOrder: [
            'Expandir produção de Mamelucos',
            'Desenvolver unidades de cerco',
            'Maximizar comércio e produção de ouro',
            'Pesquisar tecnologias avançadas'
          ],
          economicFocus: 'Maximizar comércio e produção de ouro',
          militaryFocus: 'Mamelucos e máquinas de cerco',
          keyUnits: ['Mameluco', 'Ghulam', 'Manganela'],
          keyTechnologies: ['Táticas de Cavalaria', 'Engenharia de Cerco'],
          recommendedLandmarks: [
            {
              name: 'Mesquita de Al-Azhar',
              reason: 'Fornece bônus espirituais e tecnológicos'
            }
          ]
        },
        eraIV: {
          buildOrder: [
            'Maximizar produção de unidades de elite',
            'Desenvolver exército completo com cavalaria e cerco',
            'Preparar ataque final',
            'Pesquisar todas as tecnologias disponíveis'
          ],
          economicFocus: 'Sustentar produção de unidades de elite com ouro',
          militaryFocus: 'Mamelucos de elite e máquinas de cerco avançadas',
          keyUnits: ['Mameluco de Elite', 'Ghulam de Elite', 'Trebuchet'],
          keyTechnologies: ['Jihad Supremo', 'Engenharia Militar Avançada'],
          recommendedLandmarks: [
            {
              name: 'Palácio de Saladino',
              reason: 'Fornece recursos adicionais e melhora todas as unidades'
            }
          ]
        }
      }
    };

    await Civilization.create(ayyubidsData);
    console.log('✅ Dados dos Ayyubids inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados dos Ayyubids:', error);
  }
} 