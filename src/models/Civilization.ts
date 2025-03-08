import mongoose from 'mongoose';

const uniqueUnitSchema = new mongoose.Schema({
  name: String,
  description: String,
  strategicUse: String,
  bestAgainst: [String],
  weakAgainst: [String]
});

const uniqueTechnologySchema = new mongoose.Schema({
  name: String,
  effect: String,
  strategicValue: String
});

const civilizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  strengths: [String],
  weaknesses: [String],
  recommendedPlaystyle: {
    type: String,
    enum: ['Offensive', 'Defensive', 'Economic', 'Siege']
  },
  economyFocus: String,
  militaryStrength: String,
  technologicalAdvantages: String,
  uniqueUnits: [uniqueUnitSchema],
  uniqueTechnologies: [uniqueTechnologySchema],
  eraStrategies: {
    eraI: {
      buildOrder: [String],
      economicFocus: String,
      militaryFocus: String,
      keyUnits: [String],
      keyTechnologies: [String]
    },
    eraII: {
      buildOrder: [String],
      economicFocus: String,
      militaryFocus: String,
      keyUnits: [String],
      keyTechnologies: [String],
      recommendedLandmarks: [{
        name: String,
        reason: String
      }]
    },
    eraIII: {
      buildOrder: [String],
      economicFocus: String,
      militaryFocus: String,
      keyUnits: [String],
      keyTechnologies: [String],
      recommendedLandmarks: [{
        name: String,
        reason: String
      }]
    },
    eraIV: {
      buildOrder: [String],
      economicFocus: String,
      militaryFocus: String,
      keyUnits: [String],
      keyTechnologies: [String],
      recommendedLandmarks: [{
        name: String,
        reason: String
      }]
    }
  }
});

export default mongoose.model('Civilization', civilizationSchema); 