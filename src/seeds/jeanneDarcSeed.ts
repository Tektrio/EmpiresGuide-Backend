import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export async function seedJeanneDarc() {
  try {
    // Verificar se já existe
    const existingCiv = await Civilization.findOne({ name: "Jeanne d'Arc" });
    if (existingCiv) {
      console.log("⚠️ Dados de Jeanne d'Arc já existem no banco de dados.");
      return;
    }

    const jeanneDarcData = {
      name: "Jeanne d'Arc",
      strengths: [
        'Unidades religiosas extremamente poderosas',
        'Cavalaria pesada com bônus de inspiração',
        'Bônus defensivos para aldeões e estruturas',
        'Tecnologias únicas de fé e resistência'
      ],
      weaknesses: [
        'Economia inicial mais lenta',
        'Dependência de unidades religiosas para eficácia máxima',
        'Vulnerabilidade a ataques rápidos no início do jogo',
        'Custo elevado de unidades de elite'
      ],
      recommendedPlaystyle: 'Defensive',
      economyFocus: 'Agricultura e produção de pedra',
      militaryStrength: 'Cavalaria pesada e unidades religiosas',
      technologicalAdvantages: 'Tecnologias de fé e inspiração',
      uniqueUnits: [
        {
          name: 'Donzela de Orléans',
          description: 'Unidade religiosa montada com aura de inspiração',
          strategicUse: 'Suporte para tropas e conversão de inimigos',
          bestAgainst: ['Unidades inimigas isoladas', 'Grupos pequenos'],
          weakAgainst: ['Arqueiros', 'Unidades de cerco']
        },
        {
          name: 'Cavaleiro Real',
          description: 'Cavalaria pesada com armadura completa',
          strategicUse: 'Combate contra infantaria e unidades à distância',
          bestAgainst: ['Infantaria', 'Arqueiros'],
          weakAgainst: ['Lanceiros', 'Unidades anti-cavalaria']
        }
      ],
      uniqueTechnologies: [
        {
          name: 'Inspiração Divina',
          effect: 'Unidades próximas a unidades religiosas recebem +25% de velocidade de ataque',
          strategicValue: 'Melhora significativamente a eficácia do exército em batalhas'
        },
        {
          name: 'Fervor Religioso',
          effect: 'Unidades religiosas convertem 50% mais rápido',
          strategicValue: 'Torna as unidades religiosas extremamente eficazes'
        }
      ],
      eraStrategies: {
        eraI: {
          buildOrder: [
            'Construir Igreja inicial',
            'Treinar aldeões até 15-20',
            'Coletar alimentos e madeira',
            'Construir estruturas defensivas básicas'
          ],
          economicFocus: 'Crescimento populacional e agricultura',
          militaryFocus: 'Defesa básica com lanceiros e monges',
          keyUnits: ['Aldeão', 'Lanceiro', 'Monge'],
          keyTechnologies: ['Fervor Religioso', 'Ferramentas Aprimoradas']
        },
        eraII: {
          buildOrder: [
            'Expandir produção agrícola',
            'Treinar primeiras Donzelas de Orléans',
            'Desenvolver cavalaria básica',
            'Focar em tecnologias religiosas'
          ],
          economicFocus: 'Expandir produção de recursos para sustentar exército',
          militaryFocus: 'Donzelas de Orléans e cavalaria',
          keyUnits: ['Donzela de Orléans', 'Cavaleiro', 'Lanceiro'],
          keyTechnologies: ['Inspiração Divina', 'Armaduras de Cavalaria'],
          recommendedLandmarks: [
            {
              name: 'Catedral de Reims',
              reason: 'Fortalece unidades religiosas e fornece bônus de conversão'
            }
          ]
        },
        eraIII: {
          buildOrder: [
            'Expandir produção de Donzelas de Orléans',
            'Desenvolver Cavaleiros Reais',
            'Construir estruturas defensivas avançadas',
            'Pesquisar tecnologias avançadas'
          ],
          economicFocus: 'Maximizar produção de recursos para unidades de elite',
          militaryFocus: 'Donzelas de Orléans e Cavaleiros Reais',
          keyUnits: ['Donzela de Orléans', 'Cavaleiro Real', 'Besta'],
          keyTechnologies: ['Fervor Religioso Avançado', 'Armaduras Pesadas'],
          recommendedLandmarks: [
            {
              name: 'Fortaleza de Chinon',
              reason: 'Melhora significativamente a cavalaria e fornece bônus defensivos'
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
          militaryFocus: 'Donzelas de Orléans de elite e Cavaleiros Reais',
          keyUnits: ['Donzela de Orléans de Elite', 'Cavaleiro Real de Elite', 'Trebuchet'],
          keyTechnologies: ['Bênção Divina', 'Armaduras de Placas'],
          recommendedLandmarks: [
            {
              name: 'Basílica de Saint-Denis',
              reason: 'Fornece recursos adicionais e melhora todas as unidades'
            }
          ]
        }
      }
    };

    await Civilization.create(jeanneDarcData);
    console.log("✅ Dados de Jeanne d'Arc inseridos com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inserir dados de Jeanne d'Arc:", error);
  }
} 