import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export const malianCivilization = {
  name: 'Malianos',
  strengths: [
    'Economia baseada em ouro superior',
    'Infantaria rápida e eficiente',
    'Excelente mobilidade',
    'Forte comércio e mercados'
  ],
  weaknesses: [
    'Unidades menos resistentes',
    'Defesas fixas mais fracas',
    'Dependência de ouro',
    'Vulnerabilidade a unidades pesadas'
  ],
  recommendedPlaystyle: 'Economic',
  economyFocus: 'Produção de ouro e comércio',
  militaryStrength: 'Infantaria rápida e arqueiros',
  technologicalAdvantages: 'Melhorias para comércio e mobilidade',
  uniqueUnits: [
    {
      name: 'Donso',
      description: 'Caçador especializado com bônus contra unidades pesadas',
      strategicUse: 'Contra-ataque a unidades blindadas e caça',
      bestAgainst: ['Cavalaria pesada', 'Elefantes'],
      weakAgainst: ['Arqueiros', 'Infantaria leve']
    },
    {
      name: 'Musofadi',
      description: 'Guerreiro veloz com capacidade de raide',
      strategicUse: 'Ataques rápidos e assédio econômico',
      bestAgainst: ['Aldeões', 'Unidades lentas'],
      weakAgainst: ['Cavalaria pesada', 'Arqueiros']
    }
  ],
  uniqueTechnologies: [
    {
      name: 'Rotas do Ouro',
      effect: 'Aumenta significativamente a produção de ouro',
      strategicValue: 'Economia superior baseada em ouro'
    },
    {
      name: 'Táticas de Guerrilha',
      effect: 'Melhora a velocidade e eficiência de unidades em raide',
      strategicValue: 'Ataques rápidos mais efetivos'
    }
  ],
  eraStrategies: {
    eraI: {
      buildOrder: [
        'Construir casas e mercados',
        'Estabelecer rotas comerciais',
        'Treinar caçadores Donso',
        'Iniciar coleta de ouro'
      ],
      economicFocus: 'Estabelecer economia baseada em ouro',
      militaryFocus: 'Defesa inicial com Donso',
      keyUnits: ['Aldeão', 'Donso'],
      keyTechnologies: ['Comércio Eficiente']
    },
    eraII: {
      buildOrder: [
        'Construir Grande Mesquita',
        'Expandir rotas comerciais',
        'Desenvolver força Musofadi',
        'Fortificar posições-chave'
      ],
      economicFocus: 'Maximizar produção de ouro e comércio',
      militaryFocus: 'Musofadi e arqueiros',
      keyUnits: ['Musofadi', 'Arqueiro'],
      keyTechnologies: ['Táticas de Mobilidade'],
      recommendedLandmarks: [
        {
          name: 'Grande Mesquita',
          reason: 'Centro econômico e bônus de comércio'
        }
      ]
    },
    eraIII: {
      buildOrder: [
        'Construir Universidade de Sankore',
        'Maximizar produção militar',
        'Desenvolver rede de postos avançados',
        'Expandir influência comercial'
      ],
      economicFocus: 'Comércio internacional e produção de ouro',
      militaryFocus: 'Combinação de Donso e Musofadi',
      keyUnits: ['Donso de Elite', 'Musofadi Avançado'],
      keyTechnologies: ['Guerreiros do Deserto'],
      recommendedLandmarks: [
        {
          name: 'Universidade de Sankore',
          reason: 'Centro de pesquisa e desenvolvimento militar'
        }
      ]
    },
    eraIV: {
      buildOrder: [
        'Construir Império do Mali',
        'Maximizar produção de unidades de elite',
        'Estabelecer rede completa de comércio',
        'Preparar para domínio econômico'
      ],
      economicFocus: 'Domínio econômico total',
      militaryFocus: 'Unidades de elite e mobilidade máxima',
      keyUnits: ['Donso Supremo', 'Musofadi de Elite'],
      keyTechnologies: ['Império do Ouro'],
      recommendedLandmarks: [
        {
          name: 'Império do Mali',
          reason: 'Centro de poder econômico e militar'
        }
      ]
    }
  }
};

export async function seedMalian() {
  try {
    await Civilization.deleteOne({ name: 'Malianos' });
    const malian = new Civilization(malianCivilization);
    await malian.save();
    console.log('✅ Dados dos Malianos inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados dos Malianos:', error);
  }
} 