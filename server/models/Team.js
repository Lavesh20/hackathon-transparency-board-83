
const mongoose = require('mongoose');

const ScoreCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  maxScore: { type: Number, default: 20 }
});

const TeamScoreSchema = new mongoose.Schema({
  judgeName: { type: String, required: true },
  round: { type: String, required: true },
  categories: [ScoreCategorySchema],
  totalScore: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const FeedbackSchema = new mongoose.Schema({
  judgeName: { type: String, required: true },
  round: { type: String, required: true },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const MemberSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true }
});

const TeamSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  members: [MemberSchema],
  scores: [TeamScoreSchema],
  feedback: [FeedbackSchema]
});

module.exports = mongoose.model('Team', TeamSchema);
