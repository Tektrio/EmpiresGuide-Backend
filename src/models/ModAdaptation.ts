import mongoose from 'mongoose';

const civilizationImpactSchema = new mongoose.Schema({
  civilization: String,
  impact: String,
  adjustedStrategy: String,
  unitChanges: [{
    unit: String,
    change: String,
    newUsage: String
  }],
  economyChanges: String,
  techTreeChanges: [String]
});

const modAdaptationSchema = new mongoose.Schema({
  modName: {
    type: String,
    required: true,
    unique: true
  },
  modDescription: String,
  version: String,
  generalChanges: String,
  strategyAdjustments: String,
  civilizationImpacts: [civilizationImpactSchema],
  newMechanics: [{
    name: String,
    description: String,
    strategicImplications: String
  }],
  balanceChanges: [{
    category: String,
    changes: [String],
    impact: String
  }],
  recommendedSettings: {
    gameSpeed: String,
    resources: String,
    mapSize: String,
    startingAge: String
  },
  compatibleMaps: [String],
  knownIssues: [String],
  communityTips: [String]
});

export default mongoose.model('ModAdaptation', modAdaptationSchema); 