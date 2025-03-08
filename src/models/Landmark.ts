import mongoose from 'mongoose';

const landmarkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  civilization: {
    type: String,
    required: true
  },
  era: {
    type: String,
    enum: ['Era II', 'Era III', 'Era IV'],
    required: true
  },
  effect: String,
  economicValue: String,
  militaryValue: String,
  technologicalValue: String,
  recommendedFor: String,
  alternativeTo: String,
  strategicConsiderations: String,
  buildTime: Number,
  resourceCost: {
    food: Number,
    wood: Number,
    gold: Number,
    stone: Number
  }
});

export default mongoose.model('Landmark', landmarkSchema); 