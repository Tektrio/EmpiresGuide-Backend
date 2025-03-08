import mongoose from 'mongoose';

const civilizationAdvantageSchema = new mongoose.Schema({
  civilization: String,
  advantage: String
});

const mapStrategySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['Naval', 'Land', 'Mixed', 'Closed', 'Open'],
    required: true
  },
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large', 'Gigantic'],
    required: true
  },
  generalStrategy: String,
  resourceControl: String,
  expansionPriorities: String,
  defensiveSetup: String,
  civilizationAdvantages: [civilizationAdvantageSchema],
  keyFeatures: [String],
  recommendedStrategies: {
    early: [String],
    mid: [String],
    late: [String]
  },
  resourceDistribution: {
    gold: String,
    stone: String,
    wood: String,
    food: String,
    relics: String
  },
  navalImportance: {
    type: String,
    enum: ['None', 'Low', 'Medium', 'High', 'Critical']
  }
});

export default mongoose.model('MapStrategy', mapStrategySchema); 