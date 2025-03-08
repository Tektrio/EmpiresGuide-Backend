import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export const mongolCivilization = {
  name: 'Mongóis',
  strengths: [
    'Mobilidade excepcional',
    'Arqueiros montados letais',
    'Capacidade de raide',
    'Flexibilidade tática'
  ],
  weaknesses: [
    'Construções menos resistentes',
    'Economia mais vulnerável',
    'Dependência de micro-gerenciamento'
  ],
  recommendedPlaystyle: 'Offensive',
  economyFocus: 'Pastoreio e mobilidade de recursos',
  militaryStrength: 'Cavalaria leve e arqueiros montados',
  technologicalAdvantages: 'Melhorias para mobilidade e arqueiros montados',
  uniqueUnits: [
    {
      name: 'Mangudai',
      description: 'Arqueiro montado especializado em assédio',
      strategicUse: 'Ataques de hit-and-run e assédio',
      bestAgainst: ['Infantaria', 'Unidades de cerco'],
      weakAgainst: ['Cavalaria pesada', 'Arqueiros de longo alcance']
    },
    {
      name: 'The Khan',
      description: 'Líder montado com habilidades de suporte',
      strategicUse: 'Buffs de unidade e controle de grupo',
      bestAgainst: ['Unidades sem buff', 'Formações dispersas'],
      weakAgainst: ['Unidades anti-cavalaria', 'Defesas fortificadas']
    }
  ],
  uniqueTechnologies: [
    {
      name: 'Táticas Nômades',
      effect: 'Aumenta a velocidade de movimento e eficiência do raide',
      strategicValue: 'Melhora a mobilidade característica dos Mongóis'
    },
    {
      name: 'Arqueria Montada',
      effect: 'Melhora o desempenho dos arqueiros montados',
      strategicValue: 'Fortalece as unidades principais dos Mongóis'
    }
  ],
  eraStrategies: {
    eraI: {
      buildOrder: [
        'Estabelecer Ovoo',
        'Construir Ger (tendas)',
        'Treinar pastores',
        'Iniciar produção de cavalaria leve'
      ],
      economicFocus: 'Estabelecer economia móvel',
      militaryFocus: 'Cavalaria leve para exploração',
      keyUnits: ['Pastor', 'Scout Cavalry'],
      keyTechnologies: ['Pastoreio Eficiente']
    },
    eraII: {
      buildOrder: [
        'Construir Kurultai',
        'Desenvolver produção militar',
        'Treinar Mangudai'
      ],
      economicFocus: 'Expandir pastoreio e recursos',
      militaryFocus: 'Mangudai e cavalaria leve',
      keyUnits: ['Mangudai', 'Lanceiro Montado'],
      keyTechnologies: ['Táticas de Raide'],
      recommendedLandmarks: [
        {
          name: 'Kurultai',
          reason: 'Centro de comando móvel e produção militar'
        }
      ]
    },
    eraIII: {
      buildOrder: [
        'Construir Palácio do Steppe',
        'Maximizar produção de unidades montadas',
        'Estabelecer postos avançados'
      ],
      economicFocus: 'Economia de guerra móvel',
      militaryFocus: 'Combinação de unidades montadas',
      keyUnits: ['Mangudai Elite', 'Cavalaria Pesada'],
      keyTechnologies: ['Formações de Batalha'],
      recommendedLandmarks: [
        {
          name: 'Palácio do Steppe',
          reason: 'Melhora a produção e pesquisa militar'
        }
      ]
    },
    eraIV: {
      buildOrder: [
        'Construir Torre de Vigia',
        'Maximizar exército móvel',
        'Estabelecer rede de postos avançados'
      ],
      economicFocus: 'Sustentar produção militar máxima',
      militaryFocus: 'Exército móvel diversificado',
      keyUnits: ['Mangudai Elite', 'Trebuchet'],
      keyTechnologies: ['Táticas Avançadas de Cerco'],
      recommendedLandmarks: [
        {
          name: 'Torre de Vigia',
          reason: 'Fornece visão estratégica e defesa móvel'
        }
      ]
    }
  }
};

export async function seedMongol() {
  try {
    await Civilization.deleteOne({ name: 'Mongóis' });
    const mongol = new Civilization(mongolCivilization);
    await mongol.save();
    console.log('✅ Dados dos Mongóis inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados dos Mongóis:', error);
  }
} 