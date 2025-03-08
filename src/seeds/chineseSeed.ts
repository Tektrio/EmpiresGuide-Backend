import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export const chineseCivilization = {
  name: 'Chineses',
  strengths: [
    'Economia avançada',
    'Tecnologia superior',
    'Defesas poderosas',
    'Unidades de cerco eficientes'
  ],
  weaknesses: [
    'Início de jogo mais lento',
    'Custo alto de tecnologias',
    'Unidades especializadas caras'
  ],
  recommendedPlaystyle: 'Economic',
  economyFocus: 'Tecnologia e produção diversificada',
  militaryStrength: 'Pólvora e unidades de cerco',
  technologicalAdvantages: 'Acesso antecipado à pólvora e melhorias únicas',
  uniqueUnits: [
    {
      name: 'Zhuge Nu',
      description: 'Besta repetidora com alta taxa de disparo',
      strategicUse: 'Supressão e combate contra unidades levemente blindadas',
      bestAgainst: ['Infantaria leve', 'Arqueiros'],
      weakAgainst: ['Cavalaria pesada', 'Infantaria blindada']
    },
    {
      name: 'Imperial Official',
      description: 'Unidade administrativa que melhora a economia',
      strategicUse: 'Supervisão de construções e coleta de impostos',
      bestAgainst: ['Economia ineficiente'],
      weakAgainst: ['Qualquer unidade militar']
    }
  ],
  uniqueTechnologies: [
    {
      name: 'Grande Muralha',
      effect: 'Fortalece significativamente as estruturas defensivas',
      strategicValue: 'Defesa territorial superior'
    },
    {
      name: 'Dinastia Song',
      effect: 'Melhora a eficiência de produção e pesquisa',
      strategicValue: 'Avanço tecnológico mais rápido'
    }
  ],
  eraStrategies: {
    eraI: {
      buildOrder: [
        'Construir casas e depósitos',
        'Estabelecer produção de alimentos',
        'Construir Oficial Imperial',
        'Iniciar pesquisas básicas'
      ],
      economicFocus: 'Estabelecer base econômica sólida',
      militaryFocus: 'Defesa básica e desenvolvimento',
      keyUnits: ['Aldeão', 'Oficial Imperial'],
      keyTechnologies: ['Agricultura Eficiente']
    },
    eraII: {
      buildOrder: [
        'Construir Astronomic Clocktower',
        'Desenvolver economia diversificada',
        'Iniciar produção militar'
      ],
      economicFocus: 'Expansão econômica e tecnológica',
      militaryFocus: 'Zhuge Nu e infantaria',
      keyUnits: ['Zhuge Nu', 'Lanceiro'],
      keyTechnologies: ['Melhorias de Produção'],
      recommendedLandmarks: [
        {
          name: 'Astronomic Clocktower',
          reason: 'Acelera o desenvolvimento tecnológico'
        }
      ]
    },
    eraIII: {
      buildOrder: [
        'Construir Imperial Palace',
        'Maximizar produção de recursos',
        'Desenvolver força militar diversificada'
      ],
      economicFocus: 'Economia avançada e pesquisa',
      militaryFocus: 'Unidades de pólvora e cerco',
      keyUnits: ['Handcannoneer', 'Trebuchet'],
      keyTechnologies: ['Pólvora Avançada'],
      recommendedLandmarks: [
        {
          name: 'Imperial Palace',
          reason: 'Centro de comando e pesquisa avançada'
        }
      ]
    },
    eraIV: {
      buildOrder: [
        'Construir Spirit Way',
        'Maximizar produção militar',
        'Estabelecer rede de defesas'
      ],
      economicFocus: 'Manter produção de elite',
      militaryFocus: 'Unidades avançadas de pólvora',
      keyUnits: ['Bombard', 'Elite Grenadier'],
      keyTechnologies: ['Dinastia Imperial'],
      recommendedLandmarks: [
        {
          name: 'Spirit Way',
          reason: 'Produção de unidades de elite e pesquisas finais'
        }
      ]
    }
  }
};

export async function seedChinese() {
  try {
    await Civilization.deleteOne({ name: 'Chineses' });
    const chinese = new Civilization(chineseCivilization);
    await chinese.save();
    console.log('✅ Dados dos Chineses inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados dos Chineses:', error);
  }
} 