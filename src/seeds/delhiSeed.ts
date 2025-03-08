import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export async function seedDelhi() {
  try {
    // Verificar se já existe
    const existingCiv = await Civilization.findOne({ name: 'Sultanato de Delhi' });
    if (existingCiv) {
      console.log('⚠️ Dados do Sultanato de Delhi já existem no banco de dados.');
      return;
    }

    const delhiData = {
      name: 'Sultanato de Delhi',
      strengths: [
        'Pesquisas gratuitas (mas mais lentas)',
        'Elefantes de guerra poderosos',
        'Economia forte com bônus de coleta',
        'Estruturas defensivas com guarnição de arqueiros'
      ],
      weaknesses: [
        'Tempo de pesquisa mais lento',
        'Unidades de elite caras',
        'Vulnerabilidade no início do jogo',
        'Elefantes lentos e vulneráveis a contra-ataques'
      ],
      recommendedPlaystyle: 'Siege',
      economyFocus: 'Agricultura avançada e coleta eficiente',
      militaryStrength: 'Elefantes de guerra e infantaria especializada',
      technologicalAdvantages: 'Pesquisas gratuitas e tecnologias exclusivas',
      uniqueUnits: [
        {
          name: 'Elefante de Guerra',
          description: 'Unidade massiva com grande poder de ataque',
          strategicUse: 'Quebrar linhas inimigas e destruir estruturas',
          bestAgainst: ['Infantaria', 'Estruturas'],
          weakAgainst: ['Lanceiros', 'Unidades anti-elefante']
        },
        {
          name: 'Torre de Guerra',
          description: 'Elefante com torre de arqueiros',
          strategicUse: 'Suporte à distância e ataque em área',
          bestAgainst: ['Infantaria', 'Unidades agrupadas'],
          weakAgainst: ['Lanceiros', 'Unidades de cerco']
        }
      ],
      uniqueTechnologies: [
        {
          name: 'Erudição',
          effect: 'Todas as pesquisas são gratuitas, mas levam mais tempo',
          strategicValue: 'Economia significativa de recursos para tecnologias'
        },
        {
          name: 'Armadura de Elefante',
          effect: 'Elefantes recebem 20% menos dano',
          strategicValue: 'Torna os elefantes ainda mais resistentes em batalha'
        }
      ],
      eraStrategies: {
        eraI: {
          buildOrder: [
            'Construir Mesquita',
            'Treinar aldeões até 15-20',
            'Coletar alimentos e madeira',
            'Iniciar pesquisas gratuitas'
          ],
          economicFocus: 'Crescimento populacional e coleta eficiente',
          militaryFocus: 'Defesa básica com lanceiros',
          keyUnits: ['Aldeão', 'Lanceiro'],
          keyTechnologies: ['Agricultura Eficiente', 'Ferramentas Aprimoradas']
        },
        eraII: {
          buildOrder: [
            'Expandir economia',
            'Construir Estábulo de Elefantes',
            'Treinar primeiros Elefantes de Guerra',
            'Continuar pesquisas gratuitas'
          ],
          economicFocus: 'Expandir produção de recursos e eficiência',
          militaryFocus: 'Elefantes de Guerra e infantaria de suporte',
          keyUnits: ['Elefante de Guerra', 'Arqueiro', 'Lanceiro'],
          keyTechnologies: ['Armadura de Elefante', 'Flechas Flamejantes'],
          recommendedLandmarks: [
            {
              name: 'Torre do Sultão',
              reason: 'Fornece visão e defesa adicional contra ataques iniciais'
            }
          ]
        },
        eraIII: {
          buildOrder: [
            'Expandir produção de Elefantes',
            'Construir estruturas militares adicionais',
            'Desenvolver exército misto',
            'Continuar pesquisas gratuitas'
          ],
          economicFocus: 'Maximizar produção de recursos para sustentar elefantes',
          militaryFocus: 'Elefantes de Guerra e Torre de Guerra',
          keyUnits: ['Elefante de Guerra', 'Torre de Guerra', 'Cavaleiro'],
          keyTechnologies: ['Armadura Pesada de Elefante', 'Táticas de Cerco'],
          recommendedLandmarks: [
            {
              name: 'Palácio de Hisar',
              reason: 'Produz elefantes mais rapidamente e com menor custo'
            }
          ]
        },
        eraIV: {
          buildOrder: [
            'Maximizar produção de Elefantes de elite',
            'Construir estruturas defensivas avançadas',
            'Preparar exército para ataque final',
            'Completar todas as pesquisas gratuitas'
          ],
          economicFocus: 'Sustentar produção de unidades de elite',
          militaryFocus: 'Elefantes de elite e máquinas de cerco',
          keyUnits: ['Elefante de Guerra de Elite', 'Torre de Guerra de Elite', 'Trebuchet'],
          keyTechnologies: ['Táticas Avançadas de Elefante', 'Engenharia de Cerco'],
          recommendedLandmarks: [
            {
              name: 'Domo da Fé',
              reason: 'Acelera significativamente as pesquisas gratuitas'
            }
          ]
        }
      }
    };

    await Civilization.create(delhiData);
    console.log('✅ Dados do Sultanato de Delhi inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados do Sultanato de Delhi:', error);
  }
} 