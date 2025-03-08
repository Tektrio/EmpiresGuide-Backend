import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export const englishCivilization = {
  name: 'Ingleses',
  strengths: [
    'Arqueiros de longo alcance',
    'Economia agrícola forte',
    'Defesas poderosas',
    'Infantaria resistente'
  ],
  weaknesses: [
    'Mobilidade limitada',
    'Custo alto de unidades especializadas',
    'Dependência de posicionamento'
  ],
  recommendedPlaystyle: 'Defensive',
  economyFocus: 'Agricultura e produção de alimentos',
  militaryStrength: 'Arqueiros e infantaria pesada',
  technologicalAdvantages: 'Melhorias para arqueiros e fazendas',
  uniqueUnits: [
    {
      name: 'Longbowman',
      description: 'Arqueiro especializado com alcance superior',
      strategicUse: 'Combate à distância e controle de área',
      bestAgainst: ['Infantaria leve', 'Cavalaria leve'],
      weakAgainst: ['Cavalaria pesada', 'Unidades de cerco']
    },
    {
      name: 'Man-at-Arms',
      description: 'Infantaria pesada com armadura reforçada',
      strategicUse: 'Linha de frente e defesa',
      bestAgainst: ['Cavalaria leve', 'Infantaria leve'],
      weakAgainst: ['Arqueiros', 'Unidades de cerco']
    }
  ],
  uniqueTechnologies: [
    {
      name: 'Rede de Fazendas',
      effect: 'Aumenta a produção de alimentos das fazendas',
      strategicValue: 'Melhora significativa na economia inicial'
    },
    {
      name: 'Treinamento de Arqueiros',
      effect: 'Aumenta o alcance e dano dos arqueiros',
      strategicValue: 'Fortalece a principal unidade dos Ingleses'
    }
  ],
  eraStrategies: {
    eraI: {
      buildOrder: [
        'Construir 2-3 casas',
        'Treinar aldeões para coleta de comida',
        'Construir quartel',
        'Produzir arqueiros'
      ],
      economicFocus: 'Foco em produção de comida e madeira',
      militaryFocus: 'Arqueiros para defesa inicial',
      keyUnits: ['Aldeão', 'Arqueiro'],
      keyTechnologies: ['Aprimoramento de Fazendas']
    },
    eraII: {
      buildOrder: [
        'Construir Conselho do Reino',
        'Estabelecer segunda base de recursos',
        'Produzir Longbowmen'
      ],
      economicFocus: 'Expandir produção agrícola',
      militaryFocus: 'Longbowmen e infantaria básica',
      keyUnits: ['Longbowman', 'Man-at-Arms'],
      keyTechnologies: ['Melhorias de Arqueiros'],
      recommendedLandmarks: [
        {
          name: 'Conselho do Reino',
          reason: 'Melhora a produção de recursos e oferece proteção'
        }
      ]
    },
    eraIII: {
      buildOrder: [
        'Construir Abadia de São Albano',
        'Estabelecer postos avançados',
        'Desenvolver economia terciária'
      ],
      economicFocus: 'Comércio e produção militar',
      militaryFocus: 'Formações mistas de arqueiros e infantaria',
      keyUnits: ['Longbowman Elite', 'Man-at-Arms Pesado'],
      keyTechnologies: ['Táticas de Formação'],
      recommendedLandmarks: [
        {
          name: 'Abadia de São Albano',
          reason: 'Fornece bônus de pesquisa e produção militar'
        }
      ]
    },
    eraIV: {
      buildOrder: [
        'Construir Castelo de Berkshire',
        'Maximizar produção militar',
        'Fortificar posições estratégicas'
      ],
      economicFocus: 'Sustentação de exército grande',
      militaryFocus: 'Unidades de elite e cerco',
      keyUnits: ['Trebuchet', 'Longbowman Elite'],
      keyTechnologies: ['Táticas Avançadas de Cerco'],
      recommendedLandmarks: [
        {
          name: 'Castelo de Berkshire',
          reason: 'Fortalece defesas e permite produção militar avançada'
        }
      ]
    }
  }
};

export async function seedEnglish() {
  try {
    await Civilization.deleteOne({ name: 'Ingleses' });
    const english = new Civilization(englishCivilization);
    await english.save();
    console.log('✅ Dados dos Ingleses inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados dos Ingleses:', error);
  }
} 