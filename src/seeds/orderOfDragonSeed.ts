import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export async function seedOrderOfDragon() {
  try {
    // Verificar se já existe
    const existingCiv = await Civilization.findOne({ name: 'Order of the Dragon' });
    if (existingCiv) {
      console.log('⚠️ Dados da Order of the Dragon já existem no banco de dados.');
      return;
    }

    const orderOfDragonData = {
      name: 'Order of the Dragon',
      strengths: [
        'Infantaria de elite extremamente resistente',
        'Bônus contra unidades não-cristãs',
        'Capacidade de construir estruturas defensivas rapidamente',
        'Tecnologias únicas de resistência e contra-ataque'
      ],
      weaknesses: [
        'Mobilidade reduzida',
        'Economia inicial mais lenta',
        'Custo elevado de unidades de elite',
        'Vulnerabilidade a ataques à distância'
      ],
      recommendedPlaystyle: 'Defensive',
      economyFocus: 'Mineração e produção de pedra',
      militaryStrength: 'Infantaria pesada e cavalaria blindada',
      technologicalAdvantages: 'Tecnologias de resistência e fortificação',
      uniqueUnits: [
        {
          name: 'Cavaleiro do Dragão',
          description: 'Cavalaria pesada com armadura completa',
          strategicUse: 'Combate contra infantaria e unidades à distância',
          bestAgainst: ['Infantaria', 'Arqueiros'],
          weakAgainst: ['Lanceiros', 'Unidades anti-cavalaria']
        },
        {
          name: 'Guarda Vlad',
          description: 'Infantaria de elite com lanças longas',
          strategicUse: 'Defesa contra cavalaria e infantaria',
          bestAgainst: ['Cavalaria', 'Infantaria leve'],
          weakAgainst: ['Arqueiros', 'Unidades de cerco']
        }
      ],
      uniqueTechnologies: [
        {
          name: 'Juramento do Dragão',
          effect: 'Unidades militares recebem +20% de pontos de vida',
          strategicValue: 'Torna as unidades extremamente resistentes em batalha'
        },
        {
          name: 'Fortificação Rápida',
          effect: 'Estruturas defensivas são construídas 50% mais rápido',
          strategicValue: 'Permite rápida fortificação e defesa'
        }
      ],
      eraStrategies: {
        eraI: {
          buildOrder: [
            'Construir muralhas iniciais',
            'Treinar aldeões até 15-20',
            'Coletar pedra e madeira',
            'Construir estruturas defensivas básicas'
          ],
          economicFocus: 'Crescimento populacional e coleta de pedra',
          militaryFocus: 'Defesa básica com lanceiros',
          keyUnits: ['Aldeão', 'Lanceiro', 'Arqueiro'],
          keyTechnologies: ['Fortificação Rápida', 'Ferramentas Aprimoradas']
        },
        eraII: {
          buildOrder: [
            'Expandir defesas com torres e muralhas',
            'Treinar primeiros Guardas Vlad',
            'Desenvolver economia baseada em mineração',
            'Focar em tecnologias defensivas'
          ],
          economicFocus: 'Expandir produção de recursos para sustentar exército',
          militaryFocus: 'Guardas Vlad e arqueiros',
          keyUnits: ['Guarda Vlad', 'Arqueiro', 'Cavaleiro'],
          keyTechnologies: ['Juramento do Dragão', 'Armaduras de Malha'],
          recommendedLandmarks: [
            {
              name: 'Castelo de Poenari',
              reason: 'Fortalece defesas e fornece bônus para infantaria'
            }
          ]
        },
        eraIII: {
          buildOrder: [
            'Fortalecer defesas com estruturas avançadas',
            'Expandir produção de Cavaleiros do Dragão',
            'Desenvolver exército misto',
            'Pesquisar tecnologias avançadas'
          ],
          economicFocus: 'Maximizar produção de recursos para unidades de elite',
          militaryFocus: 'Cavaleiros do Dragão e Guardas Vlad',
          keyUnits: ['Cavaleiro do Dragão', 'Guarda Vlad', 'Besta'],
          keyTechnologies: ['Juramento do Dragão Avançado', 'Armaduras Pesadas'],
          recommendedLandmarks: [
            {
              name: 'Monastério de Snagov',
              reason: 'Fornece bônus espirituais e de resistência'
            }
          ]
        },
        eraIV: {
          buildOrder: [
            'Maximizar defesas com estruturas avançadas',
            'Desenvolver exército completo de unidades de elite',
            'Preparar contra-ataques estratégicos',
            'Pesquisar todas as tecnologias disponíveis'
          ],
          economicFocus: 'Sustentar produção de unidades de elite',
          militaryFocus: 'Cavaleiros do Dragão de elite e máquinas de cerco',
          keyUnits: ['Cavaleiro do Dragão de Elite', 'Guarda Vlad de Elite', 'Trebuchet'],
          keyTechnologies: ['Juramento Supremo', 'Armaduras de Placas'],
          recommendedLandmarks: [
            {
              name: 'Palácio de Târgoviște',
              reason: 'Fornece recursos adicionais e melhora todas as unidades'
            }
          ]
        }
      }
    };

    await Civilization.create(orderOfDragonData);
    console.log('✅ Dados da Order of the Dragon inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados da Order of the Dragon:', error);
  }
} 