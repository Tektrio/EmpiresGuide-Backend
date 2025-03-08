import mongoose from 'mongoose';

const civilizationApproachSchema = new mongoose.Schema({
  civilization: String,
  approach: String,
  recommendedUnits: [String],
  buildOrder: [String],
  timingWindows: [String]
});

const victoryApproachSchema = new mongoose.Schema({
  condition: {
    type: String,
    enum: ['Landmarks', 'Sacred', 'Wonder', 'Conquest'],
    required: true
  },
  generalStrategy: String,
  civilizationSpecificApproaches: [civilizationApproachSchema],
  recommendedUnits: [String],
  timingConsiderations: String,
  mapConsiderations: [{
    mapType: String,
    considerations: String
  }],
  counterStrategies: [{
    strategy: String,
    howToDefend: String
  }],
  resourcePriorities: {
    food: Number,
    wood: Number,
    gold: Number,
    stone: Number
  },
  recommendedTeamComposition: String,
  lateGameTransitions: String,
  commonMistakes: [String],
  advancedTips: [String]
});

export default mongoose.model('VictoryApproach', victoryApproachSchema); 