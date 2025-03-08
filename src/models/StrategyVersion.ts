import mongoose, { Schema, Document } from 'mongoose';

export interface IStrategyVersion extends Document {
  matchupId: mongoose.Types.ObjectId;
  strategyType: string;
  civilization: string;
  originalStrategy: any;
  proposedChanges: any;
  contributorId: string;
  reason: string;
  status: 'Pendente' | 'Aprovada' | 'Rejeitada';
  feedback?: string;
  reviewerId?: string;
  createdAt: Date;
  reviewedAt?: Date;
}

const strategyVersionSchema = new Schema<IStrategyVersion>({
  matchupId: { 
    type: Schema.Types.ObjectId, 
    ref: 'CivilizationMatchup', 
    required: true 
  },
  strategyType: { 
    type: String, 
    required: true,
    enum: ['Ataque', 'Defesa', 'Geral'] 
  },
  civilization: { 
    type: String, 
    required: true 
  },
  originalStrategy: { 
    type: Schema.Types.Mixed, 
    required: true 
  },
  proposedChanges: { 
    type: Schema.Types.Mixed, 
    required: true 
  },
  contributorId: { 
    type: String, 
    required: true 
  },
  reason: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    required: true,
    enum: ['Pendente', 'Aprovada', 'Rejeitada'],
    default: 'Pendente'
  },
  feedback: { 
    type: String,
    default: ''
  },
  reviewerId: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  reviewedAt: { 
    type: Date 
  }
}, {
  timestamps: true,
  collection: 'strategyversions'
});

const StrategyVersion = mongoose.model<IStrategyVersion>('StrategyVersion', strategyVersionSchema);

export default StrategyVersion; 