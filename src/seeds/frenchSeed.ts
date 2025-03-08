import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export const frenchCivilization = {
  name: 'Franceses',
  strengths: [
    'Cavalaria poderosa',
    'Economia comercial forte',
    'Bônus de influência',
    'Unidades versáteis'
  ],
  weaknesses: [
    'Alto custo de unidades de elite',
    'Desenvolvimento inicial mais lento',
    'Vulnerabilidade a unidades anti-cavalaria'
  ],
  recommendedPlaystyle: 'Offensive',
  economyFocus: 'Comércio e coleta de recursos diversificada',
  militaryStrength: 'Cavalaria pesada e arqueiros montados',
  technologicalAdvantages: 'Melhorias para cavalaria e economia comercial',
  uniqueUnits: [
    {
      name: 'Royal Knight',
      description: 'Cavalaria pesada com habilidade de carga',
      strategicUse: 'Ataques rápidos e quebra de linhas inimigas',
      bestAgainst: ['Arqueiros', 'Unidades leves', 'Cerco'],
      weakAgainst: ['Lanceiros', 'Unidades anti-cavalaria']
    },
    {
      name: 'Arbaletrier',
      description: 'Besta de elite com alto poder de penetração',
      strategicUse: 'Combate à distância e contra unidades blindadas',
      bestAgainst: ['Infantaria pesada', 'Cavalaria pesada'],
      weakAgainst: ['Cavalaria leve', 'Arqueiros de longo alcance']
    }
  ],
  uniqueTechnologies: [
    {
      name: 'Escola de Cavalaria',
      effect: 'Melhora o desempenho e resistência da cavalaria',
      strategicValue: 'Fortalece a principal força militar francesa'
    },
    {
      name: 'Guildas Comerciais',
      effect: 'Aumenta a eficiência do comércio e produção de ouro',
      strategicValue: 'Potencializa a economia baseada em comércio'
    }
  ],
  eraStrategies: {
    eraI: {
      buildOrder: [
        'Construir 2-3 casas',
        'Focar em coleta de recursos básicos',
        'Construir estábulo',
        'Iniciar produção de cavalaria'
      ],
      economicFocus: 'Estabelecer base econômica diversificada',
      militaryFocus: 'Cavalaria básica para reconhecimento',
      keyUnits: ['Aldeão', 'Scout Cavalry'],
      keyTechnologies: ['Melhorias de Coleta']
    },
    eraII: {
      buildOrder: [
        'Construir Escola de Cavalaria',
        'Estabelecer rotas comerciais',
        'Produzir Royal Knights'
      ],
      economicFocus: 'Desenvolver comércio e mineração',
      militaryFocus: 'Royal Knights e arqueiros',
      keyUnits: ['Royal Knight', 'Archer'],
      keyTechnologies: ['Táticas de Cavalaria'],
      recommendedLandmarks: [
        {
          name: 'Escola de Cavalaria',
          reason: 'Fortalece a produção e eficiência da cavalaria'
        }
      ]
    },
    eraIII: {
      buildOrder: [
        'Construir Catedral de São Luís',
        'Expandir rede comercial',
        'Desenvolver força militar diversificada'
      ],
      economicFocus: 'Maximizar comércio e produção de ouro',
      militaryFocus: 'Cavalaria pesada e unidades de apoio',
      keyUnits: ['Royal Knight Elite', 'Arbaletrier'],
      keyTechnologies: ['Armadura Pesada'],
      recommendedLandmarks: [
        {
          name: 'Catedral de São Luís',
          reason: 'Fornece bônus religiosos e econômicos'
        }
      ]
    },
    eraIV: {
      buildOrder: [
        'Construir Câmara Real',
        'Maximizar produção militar',
        'Estabelecer presença militar em pontos-chave'
      ],
      economicFocus: 'Manter economia forte para suporte militar',
      militaryFocus: 'Combinação de unidades de elite',
      keyUnits: ['Royal Knight Elite', 'Arbaletrier Elite'],
      keyTechnologies: ['Táticas Avançadas de Cavalaria'],
      recommendedLandmarks: [
        {
          name: 'Câmara Real',
          reason: 'Permite produção avançada e pesquisas especiais'
        }
      ]
    }
  }
};

export async function seedFrench() {
  try {
    await Civilization.deleteOne({ name: 'Franceses' });
    const french = new Civilization(frenchCivilization);
    await french.save();
    console.log('✅ Dados dos Franceses inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados dos Franceses:', error);
  }
} 