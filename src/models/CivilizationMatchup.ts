import mongoose, { Schema, Document } from 'mongoose';

// Interfaces para tipagem
interface Strategy {
  early: string[];
  mid: string[];
  late: string[];
  units: string[];
  technologies: string[];
  landmarks?: string[];
  strategyType?: 'Ataque' | 'Defesa' | 'Geral';
}

interface Strategies {
  civilization1Strategy: Strategy;
  civilization2Strategy: Strategy;
}

interface MapType {
  mapName: string;
  advantage: 'Civilization1' | 'Civilization2' | 'Neutral';
  strategies: Strategies;
}

interface CounterUnit {
  unit: string;
  counters: string[];
}

interface CounterUnits {
  civilization1Counters: CounterUnit[];
  civilization2Counters: CounterUnit[];
}

interface Tips {
  civilization1Tips: string[];
  civilization2Tips: string[];
}

interface ModStrategy {
  modName: string;
  civilization1Strategy: Strategy;
  civilization2Strategy: Strategy;
}

// Nova interface para estratégias em equipe
interface TeamStrategy {
  teamSize: '2v2' | '3v3' | '4v4';
  civilization1TeamRole: string;
  civilization2TeamRole: string;
  civilization1AllyRecommendations: string[];
  civilization2AllyRecommendations: string[];
  teamSynergies: {
    civilization1Synergies: {
      civilization: string;
      synergyDescription: string;
    }[];
    civilization2Synergies: {
      civilization: string;
      synergyDescription: string;
    }[];
  };
  teamTactics: string[];
}

// Nova interface para estratégias alternativas
interface AlternativeStrategy {
  name: string;
  description: string;
  civilization: string;
  early: string[];
  mid: string[];
  late: string[];
  units: string[];
  technologies: string[];
  strategyType: 'Ataque' | 'Defesa' | 'Geral';
}

// Interface para avaliações
interface Rating {
  userId: string;
  strategyType: string;
  civilization: string;
  rating: number;
  comment: string;
  effectiveness: 'Muito Alta' | 'Alta' | 'Média' | 'Baixa' | 'Muito Baixa';
  createdAt: Date;
  updatedAt: Date;
}

export interface ICivilizationMatchup extends Document {
  civilization1: string;
  civilization2: string;
  civilization1OffensiveStrategy: any; // Estratégia de ataque para civilização 1
  civilization1DefensiveStrategy: any; // Estratégia de defesa para civilização 1
  civilization1Tips: string[]; // Dicas gerais para civilização 1
  civilization2OffensiveStrategy: any; // Estratégia de ataque para civilização 2
  civilization2DefensiveStrategy: any; // Estratégia de defesa para civilização 2
  civilization2Tips: string[]; // Dicas gerais para civilização 2
  mapTypes: MapType[];
  generalTips: Tips;
  counterUnits: CounterUnits;
  modSpecificStrategies: ModStrategy[];
  teamStrategies?: TeamStrategy[]; // Propriedade para estratégias de equipe
  alternativeStrategies?: AlternativeStrategy[]; // Propriedade para estratégias alternativas
  ratings?: Rating[]; // Nova propriedade para avaliações
}

const civilizationMatchupSchema = new Schema<ICivilizationMatchup>({
  civilization1: { type: String, required: true },
  civilization2: { type: String, required: true },
  civilization1OffensiveStrategy: { type: Schema.Types.Mixed, default: {} },
  civilization1DefensiveStrategy: { type: Schema.Types.Mixed, default: {} },
  civilization1Tips: [{ type: String }],
  civilization2OffensiveStrategy: { type: Schema.Types.Mixed, default: {} },
  civilization2DefensiveStrategy: { type: Schema.Types.Mixed, default: {} },
  civilization2Tips: [{ type: String }],
  mapTypes: [
    {
      mapName: { type: String, required: true },
      advantage: { type: String, required: true, enum: ['Civilization1', 'Civilization2', 'Neutral'] },
      strategies: {
        civilization1Strategy: {
          early: [{ type: String }],
          mid: [{ type: String }],
          late: [{ type: String }],
          units: [{ type: String }],
          technologies: [{ type: String }],
          landmarks: [{ type: String }]
        },
        civilization2Strategy: {
          early: [{ type: String }],
          mid: [{ type: String }],
          late: [{ type: String }],
          units: [{ type: String }],
          technologies: [{ type: String }],
          landmarks: [{ type: String }]
        }
      }
    }
  ],
  generalTips: {
    civilization1Tips: [{ type: String }],
    civilization2Tips: [{ type: String }]
  },
  counterUnits: {
    civilization1Counters: [
      {
        unit: { type: String },
        counters: [{ type: String }]
      }
    ],
    civilization2Counters: [
      {
        unit: { type: String },
        counters: [{ type: String }]
      }
    ]
  },
  modSpecificStrategies: [
    {
      modName: { type: String },
      civilization1Strategy: {
        early: [{ type: String }],
        mid: [{ type: String }],
        late: [{ type: String }],
        units: [{ type: String }],
        technologies: [{ type: String }]
      },
      civilization2Strategy: {
        early: [{ type: String }],
        mid: [{ type: String }],
        late: [{ type: String }],
        units: [{ type: String }],
        technologies: [{ type: String }]
      }
    }
  ],
  // Novo campo para estratégias em equipe
  teamStrategies: [
    {
      teamSize: { type: String, enum: ['2v2', '3v3', '4v4'] },
      civilization1TeamRole: { type: String },
      civilization2TeamRole: { type: String },
      civilization1AllyRecommendations: [{ type: String }],
      civilization2AllyRecommendations: [{ type: String }],
      teamSynergies: {
        civilization1Synergies: [
          {
            civilization: { type: String },
            synergyDescription: { type: String }
          }
        ],
        civilization2Synergies: [
          {
            civilization: { type: String },
            synergyDescription: { type: String }
          }
        ]
      },
      teamTactics: [{ type: String }]
    }
  ],
  // Novo campo para estratégias alternativas
  alternativeStrategies: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      civilization: { type: String, required: true },
      early: [{ type: String }],
      mid: [{ type: String }],
      late: [{ type: String }],
      units: [{ type: String }],
      technologies: [{ type: String }],
      strategyType: { type: String, enum: ['Ataque', 'Defesa', 'Geral'], required: true }
    }
  ],
  // Novo campo para avaliações das estratégias
  ratings: [
    {
      userId: { type: String, required: true },
      strategyType: { type: String, required: true, enum: ['Ataque', 'Defesa', 'Geral'] },
      civilization: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, default: '' },
      effectiveness: { 
        type: String, 
        enum: ['Muito Alta', 'Alta', 'Média', 'Baixa', 'Muito Baixa'],
        default: 'Média'
      },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }
  ]
}, {
  timestamps: true,
  collection: 'civilizationmatchups'
});

// Remove o índice antigo e adiciona um novo
civilizationMatchupSchema.index({ civilization1: 1, civilization2: 1 }, { unique: true });

const CivilizationMatchup = mongoose.model<ICivilizationMatchup>('CivilizationMatchup', civilizationMatchupSchema);

export default CivilizationMatchup; 