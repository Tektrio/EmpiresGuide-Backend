import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export const hreEmpireCivilization = {
  name: 'Sacro Império Romano-Germânico',
  strengths: [
    'Infantaria pesada poderosa',
    'Defesas fortificadas',
    'Bônus religiosos significativos',
    'Economia baseada em recursos diversos'
  ],
  weaknesses: [
    'Mobilidade reduzida',
    'Alto custo de unidades de elite',
    'Desenvolvimento inicial mais lento',
    'Vulnerabilidade a ataques rápidos'
  ],
  recommendedPlaystyle: 'Defensive',
  economyFocus: 'Recursos diversificados e relíquias',
  militaryStrength: 'Infantaria pesada e unidades religiosas',
  technologicalAdvantages: 'Melhorias para infantaria e estruturas defensivas',
  uniqueUnits: [
    {
      name: 'Prelado',
      description: 'Unidade religiosa com capacidade de inspirar tropas',
      strategicUse: 'Suporte de tropas e coleta de relíquias',
      bestAgainst: ['Unidades sem buff', 'Economia inimiga'],
      weakAgainst: ['Unidades de ataque à distância', 'Cavalaria']
    },
    {
      name: 'Landsknecht',
      description: 'Infantaria de elite com dano em área',
      strategicUse: 'Combate contra grupos de unidades e quebra de formações',
      bestAgainst: ['Grupos de infantaria', 'Unidades leves'],
      weakAgainst: ['Arqueiros', 'Cavalaria pesada']
    }
  ],
  uniqueTechnologies: [
    {
      name: 'Inspiração Divina',
      effect: 'Aumenta o poder de buff dos Prelados',
      strategicValue: 'Melhora significativa da eficiência das tropas'
    },
    {
      name: 'Fortificações Imperiais',
      effect: 'Melhora a resistência das estruturas defensivas',
      strategicValue: 'Defesa territorial superior'
    }
  ],
  eraStrategies: {
    eraI: {
      buildOrder: [
        'Construir casas e depósitos',
        'Treinar Prelados iniciais',
        'Estabelecer coleta de recursos',
        'Iniciar construção de muralhas'
      ],
      economicFocus: 'Estabelecer base econômica diversificada',
      militaryFocus: 'Defesa inicial e suporte religioso',
      keyUnits: ['Aldeão', 'Prelado'],
      keyTechnologies: ['Inspiração Inicial']
    },
    eraII: {
      buildOrder: [
        'Construir Catedral de Aachen',
        'Expandir defesas',
        'Desenvolver produção militar',
        'Coletar relíquias'
      ],
      economicFocus: 'Expansão econômica e coleta de relíquias',
      militaryFocus: 'Infantaria pesada e Prelados',
      keyUnits: ['Man-at-Arms', 'Prelado'],
      keyTechnologies: ['Armaduras Pesadas'],
      recommendedLandmarks: [
        {
          name: 'Catedral de Aachen',
          reason: 'Centro religioso e bônus de inspiração'
        }
      ]
    },
    eraIII: {
      buildOrder: [
        'Construir Palácio de Burgrave',
        'Maximizar produção militar',
        'Desenvolver rede de castelos',
        'Expandir influência religiosa'
      ],
      economicFocus: 'Economia de guerra e relíquias',
      militaryFocus: 'Landsknechts e infantaria pesada',
      keyUnits: ['Landsknecht', 'Man-at-Arms Pesado'],
      keyTechnologies: ['Táticas de Formação'],
      recommendedLandmarks: [
        {
          name: 'Palácio de Burgrave',
          reason: 'Produção militar avançada e pesquisas'
        }
      ]
    },
    eraIV: {
      buildOrder: [
        'Construir Elzbach Palace',
        'Maximizar produção de unidades de elite',
        'Estabelecer rede completa de defesas',
        'Preparar para batalha final'
      ],
      economicFocus: 'Sustentar produção de elite',
      militaryFocus: 'Landsknechts de elite e cerco',
      keyUnits: ['Landsknecht de Elite', 'Trebuchet'],
      keyTechnologies: ['Inspiração Suprema'],
      recommendedLandmarks: [
        {
          name: 'Elzbach Palace',
          reason: 'Fortaleza final e centro de comando supremo'
        }
      ]
    }
  }
};

export async function seedHreEmpire() {
  try {
    await Civilization.deleteOne({ name: 'Sacro Império Romano-Germânico' });
    const hreEmpire = new Civilization(hreEmpireCivilization);
    await hreEmpire.save();
    console.log('✅ Dados do Sacro Império Romano-Germânico inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados do Sacro Império Romano-Germânico:', error);
  }
} 