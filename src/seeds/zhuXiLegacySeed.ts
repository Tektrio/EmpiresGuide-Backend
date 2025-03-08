import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export async function seedZhuXiLegacy() {
  try {
    // Verificar se já existe
    const existingCiv = await Civilization.findOne({ name: "Zhu Xi's Legacy" });
    if (existingCiv) {
      console.log("⚠️ Dados de Zhu Xi's Legacy já existem no banco de dados.");
      return;
    }

    const zhuXiLegacyData = {
      name: "Zhu Xi's Legacy",
      strengths: [
        'Economia avançada baseada em agricultura e comércio',
        'Tecnologias únicas de eficiência e produção',
        'Unidades versáteis com bônus contra vários tipos de inimigos',
        'Capacidade de construir estruturas rapidamente'
      ],
      weaknesses: [
        'Unidades militares iniciais mais fracas',
        'Dependência de tecnologias para eficácia máxima',
        'Vulnerabilidade a ataques rápidos no início do jogo',
        'Custo elevado de tecnologias avançadas'
      ],
      recommendedPlaystyle: 'Economic',
      economyFocus: 'Agricultura avançada e comércio',
      militaryStrength: 'Unidades versáteis e tecnologias avançadas',
      technologicalAdvantages: 'Tecnologias de eficiência e produção',
      uniqueUnits: [
        {
          name: 'Oficial Imperial',
          description: 'Unidade administrativa que melhora a economia',
          strategicUse: 'Aumenta a eficiência de coleta de recursos',
          bestAgainst: ['Nenhuma unidade específica'],
          weakAgainst: ['Todas as unidades militares']
        },
        {
          name: 'Arqueiro Chu Ko Nu',
          description: 'Arqueiro com besta de repetição',
          strategicUse: 'Ataque rápido à distância contra grupos',
          bestAgainst: ['Infantaria', 'Unidades agrupadas'],
          weakAgainst: ['Cavalaria', 'Unidades de cerco']
        }
      ],
      uniqueTechnologies: [
        {
          name: 'Filosofia Neo-Confucionista',
          effect: 'Todas as tecnologias são pesquisadas 25% mais rápido',
          strategicValue: 'Acelera significativamente o desenvolvimento tecnológico'
        },
        {
          name: 'Grande Harmonia',
          effect: 'Aldeões trabalham 15% mais rápido',
          strategicValue: 'Melhora significativamente a eficiência econômica'
        }
      ],
      eraStrategies: {
        eraI: {
          buildOrder: [
            'Construir fazendas iniciais',
            'Treinar aldeões até 20-25',
            'Coletar alimentos e madeira',
            'Treinar Oficiais Imperiais'
          ],
          economicFocus: 'Crescimento populacional e agricultura',
          militaryFocus: 'Defesa básica com lanceiros',
          keyUnits: ['Aldeão', 'Oficial Imperial', 'Lanceiro'],
          keyTechnologies: ['Grande Harmonia', 'Ferramentas Aprimoradas']
        },
        eraII: {
          buildOrder: [
            'Expandir produção agrícola',
            'Construir Mercado e iniciar comércio',
            'Desenvolver primeiros Arqueiros Chu Ko Nu',
            'Focar em tecnologias econômicas'
          ],
          economicFocus: 'Maximizar produção de recursos com Oficiais Imperiais',
          militaryFocus: 'Arqueiros Chu Ko Nu e infantaria',
          keyUnits: ['Oficial Imperial', 'Arqueiro Chu Ko Nu', 'Lanceiro'],
          keyTechnologies: ['Filosofia Neo-Confucionista', 'Agricultura Avançada'],
          recommendedLandmarks: [
            {
              name: 'Academia Imperial',
              reason: 'Acelera pesquisas e fornece bônus tecnológicos'
            }
          ]
        },
        eraIII: {
          buildOrder: [
            'Expandir rede comercial',
            'Desenvolver exército misto',
            'Maximizar produção de Oficiais Imperiais',
            'Pesquisar tecnologias avançadas'
          ],
          economicFocus: 'Comércio internacional e produção eficiente',
          militaryFocus: 'Arqueiros Chu Ko Nu e cavalaria',
          keyUnits: ['Arqueiro Chu Ko Nu', 'Cavaleiro', 'Oficial Imperial'],
          keyTechnologies: ['Grande Harmonia Avançada', 'Táticas de Formação'],
          recommendedLandmarks: [
            {
              name: 'Cidade Proibida',
              reason: 'Fornece bônus econômicos significativos'
            }
          ]
        },
        eraIV: {
          buildOrder: [
            'Maximizar produção de unidades de elite',
            'Expandir rede comercial ao máximo',
            'Preparar exército para ataque final',
            'Pesquisar todas as tecnologias disponíveis'
          ],
          economicFocus: 'Sustentar produção de unidades de elite com economia avançada',
          militaryFocus: 'Arqueiros Chu Ko Nu de elite e máquinas de cerco',
          keyUnits: ['Arqueiro Chu Ko Nu de Elite', 'Cavaleiro de Elite', 'Trebuchet'],
          keyTechnologies: ['Harmonia Suprema', 'Engenharia Avançada'],
          recommendedLandmarks: [
            {
              name: 'Templo do Céu',
              reason: 'Fornece recursos adicionais e melhora todas as unidades'
            }
          ]
        }
      }
    };

    await Civilization.create(zhuXiLegacyData);
    console.log("✅ Dados de Zhu Xi's Legacy inseridos com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inserir dados de Zhu Xi's Legacy:", error);
  }
} 