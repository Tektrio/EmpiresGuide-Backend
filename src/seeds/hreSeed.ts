import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export async function seedHRE() {
  try {
    // Verificar se já existe
    const existingCiv = await Civilization.findOne({ name: 'Sacro Império Romano-Germânico' });
    if (existingCiv) {
      console.log('⚠️ Dados do Sacro Império Romano-Germânico já existem no banco de dados.');
      return;
    }

    const hreData = {
      name: 'Sacro Império Romano-Germânico',
      strengths: [
        'Infantaria extremamente poderosa',
        'Bônus de inspiração de prelados',
        'Economia baseada em recursos e relíquias',
        'Estruturas defensivas robustas'
      ],
      weaknesses: [
        'Mobilidade reduzida',
        'Dependência de relíquias para economia tardia',
        'Vulnerabilidade a ataques rápidos',
        'Custo elevado de unidades de elite'
      ],
      recommendedPlaystyle: 'Defensive',
      economyFocus: 'Coleta de recursos e relíquias',
      militaryStrength: 'Infantaria pesada e cavalaria blindada',
      technologicalAdvantages: 'Tecnologias de inspiração e armaduras aprimoradas',
      uniqueUnits: [
        {
          name: 'Lanceiro com Escudo',
          description: 'Infantaria pesada com escudo e lança',
          strategicUse: 'Defesa contra cavalaria e infantaria',
          bestAgainst: ['Cavalaria', 'Infantaria leve'],
          weakAgainst: ['Arqueiros', 'Unidades de cerco']
        },
        {
          name: 'Prelado',
          description: 'Unidade religiosa que inspira outras unidades',
          strategicUse: 'Suporte para tropas e coleta de relíquias',
          bestAgainst: ['Nenhuma unidade específica'],
          weakAgainst: ['Todas as unidades militares']
        }
      ],
      uniqueTechnologies: [
        {
          name: 'Inspiração Divina',
          effect: 'Prelados inspiram unidades próximas, aumentando sua velocidade de ataque em 15%',
          strategicValue: 'Melhora significativamente a eficácia do exército em batalhas'
        },
        {
          name: 'Armaduras Pesadas',
          effect: 'Infantaria recebe 20% menos dano',
          strategicValue: 'Torna a infantaria extremamente resistente'
        }
      ],
      eraStrategies: {
        eraI: {
          buildOrder: [
            'Construir Mina de Ouro',
            'Treinar aldeões até 15-20',
            'Coletar alimentos e madeira',
            'Construir Quartel para infantaria básica'
          ],
          economicFocus: 'Crescimento populacional e coleta de recursos',
          militaryFocus: 'Defesa básica com lanceiros',
          keyUnits: ['Aldeão', 'Lanceiro'],
          keyTechnologies: ['Ferramentas Aprimoradas']
        },
        eraII: {
          buildOrder: [
            'Construir Capela',
            'Treinar Prelados',
            'Expandir economia com mais aldeões',
            'Desenvolver infantaria básica'
          ],
          economicFocus: 'Expandir produção de recursos e iniciar inspiração',
          militaryFocus: 'Infantaria pesada e suporte de Prelados',
          keyUnits: ['Lanceiro com Escudo', 'Homem de Armas', 'Prelado'],
          keyTechnologies: ['Inspiração Divina', 'Armaduras de Malha'],
          recommendedLandmarks: [
            {
              name: 'Catedral de Aachen',
              reason: 'Aumenta a eficácia dos Prelados e fornece inspiração passiva'
            }
          ]
        },
        eraIII: {
          buildOrder: [
            'Construir Monastério',
            'Coletar relíquias com Prelados',
            'Expandir produção militar',
            'Desenvolver infantaria pesada'
          ],
          economicFocus: 'Coleta de relíquias e produção de recursos',
          militaryFocus: 'Infantaria pesada e cavalaria',
          keyUnits: ['Homem de Armas', 'Cavaleiro', 'Besta'],
          keyTechnologies: ['Armaduras Pesadas', 'Inspiração Aprimorada'],
          recommendedLandmarks: [
            {
              name: 'Burgrave Palace',
              reason: 'Permite produção rápida de infantaria em lotes'
            }
          ]
        },
        eraIV: {
          buildOrder: [
            'Maximizar coleta de relíquias',
            'Construir estruturas defensivas avançadas',
            'Desenvolver exército completo',
            'Pesquisar todas as tecnologias disponíveis'
          ],
          economicFocus: 'Relíquias e produção de recursos para sustentar exército',
          militaryFocus: 'Infantaria de elite e máquinas de cerco',
          keyUnits: ['Homem de Armas de Elite', 'Cavaleiro de Elite', 'Trebuchet'],
          keyTechnologies: ['Inspiração Divina Suprema', 'Armaduras de Placas'],
          recommendedLandmarks: [
            {
              name: 'Elzbach Palace',
              reason: 'Fortalece significativamente as defesas e fornece guarnição para unidades'
            }
          ]
        }
      }
    };

    await Civilization.create(hreData);
    console.log('✅ Dados do Sacro Império Romano-Germânico inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados do Sacro Império Romano-Germânico:', error);
  }
} 