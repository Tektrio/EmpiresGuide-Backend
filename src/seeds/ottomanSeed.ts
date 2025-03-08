import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export async function seedOttoman() {
  try {
    // Verificar se já existe
    const existingCiv = await Civilization.findOne({ name: 'Otomanos' });
    if (existingCiv) {
      console.log('⚠️ Dados dos Otomanos já existem no banco de dados.');
      return;
    }

    const ottomanData = {
      name: 'Otomanos',
      strengths: [
        'Artilharia poderosa e avançada',
        'Unidades militares produzidas automaticamente',
        'Economia forte baseada em comércio',
        'Grande variedade de unidades especializadas'
      ],
      weaknesses: [
        'Início de jogo mais lento',
        'Dependência de ouro para unidades avançadas',
        'Vulnerabilidade antes de desenvolver artilharia',
        'Unidades especializadas mais caras'
      ],
      recommendedPlaystyle: 'Offensive',
      economyFocus: 'Comércio e produção de ouro',
      militaryStrength: 'Artilharia avançada e janízaros',
      technologicalAdvantages: 'Tecnologias militares avançadas e artilharia superior',
      uniqueUnits: [
        {
          name: 'Janízaro',
          description: 'Infantaria de elite com mosquetes',
          strategicUse: 'Ataque à distância poderoso',
          bestAgainst: ['Infantaria', 'Cavalaria leve'],
          weakAgainst: ['Cavalaria pesada', 'Artilharia']
        },
        {
          name: 'Grande Bombarda',
          description: 'Artilharia de cerco avançada',
          strategicUse: 'Destruição de estruturas e unidades agrupadas',
          bestAgainst: ['Estruturas', 'Unidades agrupadas'],
          weakAgainst: ['Cavalaria rápida', 'Unidades à distância']
        }
      ],
      uniqueTechnologies: [
        {
          name: 'Artilharia Imperial',
          effect: 'Unidades de artilharia causam 20% mais dano',
          strategicValue: 'Torna a artilharia otomana extremamente poderosa'
        },
        {
          name: 'Treinamento Militar',
          effect: 'Quartéis produzem unidades militares automaticamente',
          strategicValue: 'Fornece fluxo constante de unidades sem custo de população'
        }
      ],
      eraStrategies: {
        eraI: {
          buildOrder: [
            'Construir Casa Militar',
            'Treinar aldeões até 15-20',
            'Coletar alimentos e madeira',
            'Aproveitar produção automática de unidades'
          ],
          economicFocus: 'Crescimento populacional e coleta de recursos',
          militaryFocus: 'Unidades básicas produzidas automaticamente',
          keyUnits: ['Aldeão', 'Lanceiro', 'Arqueiro'],
          keyTechnologies: ['Produção Automática', 'Ferramentas Aprimoradas']
        },
        eraII: {
          buildOrder: [
            'Construir Mercado e iniciar comércio',
            'Expandir economia',
            'Desenvolver primeiras unidades especializadas',
            'Focar em produção de ouro'
          ],
          economicFocus: 'Estabelecer rotas comerciais e produção de ouro',
          militaryFocus: 'Janízaros iniciais e cavalaria',
          keyUnits: ['Janízaro', 'Cavalaria Sipahi', 'Arqueiro'],
          keyTechnologies: ['Treinamento Militar', 'Comércio Aprimorado'],
          recommendedLandmarks: [
            {
              name: 'Escola Militar',
              reason: 'Melhora a produção automática de unidades militares'
            }
          ]
        },
        eraIII: {
          buildOrder: [
            'Construir fundição de artilharia',
            'Expandir produção de Janízaros',
            'Desenvolver primeiras unidades de artilharia',
            'Continuar expansão econômica'
          ],
          economicFocus: 'Maximizar produção de ouro para unidades avançadas',
          militaryFocus: 'Janízaros e artilharia inicial',
          keyUnits: ['Janízaro', 'Bombarda', 'Cavalaria Sipahi'],
          keyTechnologies: ['Pólvora Aprimorada', 'Artilharia Imperial'],
          recommendedLandmarks: [
            {
              name: 'Fundição Imperial',
              reason: 'Permite produção mais rápida e barata de unidades de artilharia'
            }
          ]
        },
        eraIV: {
          buildOrder: [
            'Maximizar produção de artilharia avançada',
            'Desenvolver Grande Bombarda',
            'Preparar exército misto para ataque final',
            'Pesquisar todas as tecnologias disponíveis'
          ],
          economicFocus: 'Sustentar produção de unidades de elite e artilharia',
          militaryFocus: 'Grande Bombarda e Janízaros de elite',
          keyUnits: ['Janízaro de Elite', 'Grande Bombarda', 'Cavalaria Sipahi de Elite'],
          keyTechnologies: ['Artilharia Imperial Avançada', 'Táticas de Cerco'],
          recommendedLandmarks: [
            {
              name: 'Palácio Topkapi',
              reason: 'Fornece recursos adicionais e melhora a eficiência do exército'
            }
          ]
        }
      }
    };

    await Civilization.create(ottomanData);
    console.log('✅ Dados dos Otomanos inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados dos Otomanos:', error);
  }
} 