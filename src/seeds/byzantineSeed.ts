import mongoose from 'mongoose';
import Civilization from '../models/Civilization';

export const byzantineCivilization = {
  name: 'Bizantinos',
  strengths: [
    'Defesas superiores',
    'Unidades versáteis',
    'Tecnologia militar avançada',
    'Economia balanceada'
  ],
  weaknesses: [
    'Alto custo de unidades de elite',
    'Desenvolvimento inicial mais lento',
    'Dependência de recursos diversos',
    'Mobilidade reduzida'
  ],
  recommendedPlaystyle: 'Defensive',
  economyFocus: 'Recursos diversificados e comércio',
  militaryStrength: 'Infantaria pesada e cavalaria catafracta',
  technologicalAdvantages: 'Melhorias defensivas e militares avançadas',
  uniqueUnits: [
    {
      name: 'Catafracto',
      description: 'Cavalaria pesada com armadura completa',
      strategicUse: 'Combate pesado e quebra de linhas inimigas',
      bestAgainst: ['Infantaria', 'Arqueiros'],
      weakAgainst: ['Lanceiros', 'Unidades anti-cavalaria']
    },
    {
      name: 'Varangiano',
      description: 'Guarda de elite com machados de duas mãos',
      strategicUse: 'Combate corpo a corpo e defesa de pontos-chave',
      bestAgainst: ['Infantaria pesada', 'Cavalaria'],
      weakAgainst: ['Arqueiros', 'Unidades de cerco']
    }
  ],
  uniqueTechnologies: [
    {
      name: 'Fogo Grego',
      effect: 'Arma de cerco única que causa dano em área',
      strategicValue: 'Defesa naval e terrestre superior'
    },
    {
      name: 'Legado Romano',
      effect: 'Melhora a resistência de todas as unidades',
      strategicValue: 'Maior durabilidade em combate'
    }
  ],
  eraStrategies: {
    eraI: {
      buildOrder: [
        'Construir muralhas iniciais',
        'Estabelecer economia básica',
        'Treinar infantaria básica',
        'Iniciar desenvolvimento tecnológico'
      ],
      economicFocus: 'Base econômica diversificada',
      militaryFocus: 'Defesa inicial e infantaria',
      keyUnits: ['Aldeão', 'Spearman'],
      keyTechnologies: ['Fortificações Básicas']
    },
    eraII: {
      buildOrder: [
        'Construir Hagia Sophia',
        'Expandir defesas',
        'Desenvolver Catafractos',
        'Estabelecer rotas comerciais'
      ],
      economicFocus: 'Expansão econômica e comércio',
      militaryFocus: 'Catafractos e infantaria pesada',
      keyUnits: ['Catafracto', 'Man-at-Arms'],
      keyTechnologies: ['Armaduras Pesadas'],
      recommendedLandmarks: [
        {
          name: 'Hagia Sophia',
          reason: 'Centro religioso e bônus de pesquisa'
        }
      ]
    },
    eraIII: {
      buildOrder: [
        'Construir Muralhas de Teodósio',
        'Maximizar defesas',
        'Desenvolver exército completo',
        'Expandir rede comercial'
      ],
      economicFocus: 'Economia de guerra sustentável',
      militaryFocus: 'Catafractos e Varangianos',
      keyUnits: ['Catafracto Pesado', 'Varangiano'],
      keyTechnologies: ['Fogo Grego'],
      recommendedLandmarks: [
        {
          name: 'Muralhas de Teodósio',
          reason: 'Defesas supremas e bônus militares'
        }
      ]
    },
    eraIV: {
      buildOrder: [
        'Construir Grande Palácio',
        'Maximizar produção militar',
        'Estabelecer rede completa de defesas',
        'Preparar para domínio militar'
      ],
      economicFocus: 'Sustentar exército de elite',
      militaryFocus: 'Unidades de elite e cerco avançado',
      keyUnits: ['Catafracto de Elite', 'Varangiano de Elite'],
      keyTechnologies: ['Legado Imperial'],
      recommendedLandmarks: [
        {
          name: 'Grande Palácio',
          reason: 'Centro de comando supremo e produção militar'
        }
      ]
    }
  }
};

export async function seedByzantine() {
  try {
    await Civilization.deleteOne({ name: 'Bizantinos' });
    const byzantine = new Civilization(byzantineCivilization);
    await byzantine.save();
    console.log('✅ Dados dos Bizantinos inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados dos Bizantinos:', error);
  }
} 