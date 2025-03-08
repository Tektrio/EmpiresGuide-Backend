import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export async function seedAbbasid() {
  try {
    // Verificar se já existe
    const existingCiv = await Civilization.findOne({ name: 'Abássidas' });
    if (existingCiv) {
      console.log('⚠️ Dados dos Abássidas já existem no banco de dados.');
      return;
    }

    const abbasidData = {
      name: 'Abássidas',
      strengths: [
        'Economia forte baseada em tecnologia',
        'Unidades de camelo eficazes contra cavalaria',
        'Casa da Sabedoria oferece tecnologias únicas',
        'Capacidade de construir estruturas defensivas rapidamente'
      ],
      weaknesses: [
        'Início de jogo mais lento',
        'Dependência de tecnologias para atingir potencial máximo',
        'Vulnerabilidade a ataques rápidos no início do jogo',
        'Unidades de infantaria menos eficazes que outras civilizações'
      ],
      recommendedPlaystyle: 'Economic',
      economyFocus: 'Tecnologia e comércio, com forte ênfase em fazendas e minas de ouro',
      militaryStrength: 'Unidades de camelo e tecnologias avançadas',
      technologicalAdvantages: 'Casa da Sabedoria oferece acesso a tecnologias exclusivas em cada era',
      uniqueUnits: [
        {
          name: 'Camelo Arqueiro',
          description: 'Unidade montada que atira flechas à distância',
          strategicUse: 'Eficaz contra unidades de infantaria e cavalaria',
          bestAgainst: ['Cavalaria', 'Arqueiros'],
          weakAgainst: ['Lanceiros', 'Unidades de cerco']
        },
        {
          name: 'Lanceiro de Camelo',
          description: 'Unidade montada com lanças longas',
          strategicUse: 'Especialista em combate contra cavalaria',
          bestAgainst: ['Cavalaria', 'Cavalaria pesada'],
          weakAgainst: ['Arqueiros', 'Infantaria']
        }
      ],
      uniqueTechnologies: [
        {
          name: 'Agricultura Avançada',
          effect: 'Aumenta a produção de alimentos das fazendas em 15%',
          strategicValue: 'Melhora significativamente a economia no meio do jogo'
        },
        {
          name: 'Caravanas Comerciais',
          effect: 'Mercados geram 20% mais ouro',
          strategicValue: 'Fortalece a economia baseada em comércio'
        }
      ],
      eraStrategies: {
        eraI: {
          buildOrder: [
            'Construir Casa da Sabedoria',
            'Treinar aldeões até 15-20',
            'Coletar alimentos e madeira',
            'Pesquisar tecnologias iniciais na Casa da Sabedoria'
          ],
          economicFocus: 'Crescimento populacional e coleta de recursos',
          militaryFocus: 'Defesa básica com lanceiros',
          keyUnits: ['Aldeão', 'Lanceiro'],
          keyTechnologies: ['Agricultura Avançada']
        },
        eraII: {
          buildOrder: [
            'Expandir para segundo local de recursos',
            'Construir Mercado e iniciar comércio',
            'Treinar unidades de camelo para defesa',
            'Continuar desenvolvimento tecnológico'
          ],
          economicFocus: 'Estabelecer rotas comerciais e expandir produção de recursos',
          militaryFocus: 'Unidades de camelo e defesa',
          keyUnits: ['Camelo Arqueiro', 'Lanceiro de Camelo'],
          keyTechnologies: ['Caravanas Comerciais', 'Armaduras de Camelo'],
          recommendedLandmarks: [
            {
              name: 'Escola de Infantaria',
              reason: 'Reduz o custo de infantaria e melhora sua eficácia'
            }
          ]
        },
        eraIII: {
          buildOrder: [
            'Construir estruturas militares adicionais',
            'Expandir economia com mais aldeões',
            'Desenvolver exército misto de unidades',
            'Pesquisar tecnologias avançadas'
          ],
          economicFocus: 'Maximizar produção de recursos e comércio',
          militaryFocus: 'Exército equilibrado com foco em unidades de camelo',
          keyUnits: ['Camelo Arqueiro', 'Lanceiro de Camelo', 'Manganela'],
          keyTechnologies: ['Armaduras Pesadas', 'Engenharia Militar'],
          recommendedLandmarks: [
            {
              name: 'Palácio dos Sultões',
              reason: 'Gera ouro passivamente e melhora a economia'
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
          economicFocus: 'Manter produção de recursos para sustentar exército',
          militaryFocus: 'Unidades de elite e máquinas de cerco',
          keyUnits: ['Camelo Arqueiro de Elite', 'Lanceiro de Camelo de Elite', 'Trebuchet'],
          keyTechnologies: ['Engenharia de Cerco', 'Armaduras de Placas'],
          recommendedLandmarks: [
            {
              name: 'Casa da Sabedoria Suprema',
              reason: 'Oferece acesso a tecnologias exclusivas da Era IV'
            }
          ]
        }
      }
    };

    await Civilization.create(abbasidData);
    console.log('✅ Dados dos Abássidas inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados dos Abássidas:', error);
  }
} 