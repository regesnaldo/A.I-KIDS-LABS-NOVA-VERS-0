const mongoose = require('mongoose');

// Quiz question schema
const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  type: { type: String, enum: ['multipleChoice', 'trueFalse'], required: true },
  options: [{ text: String, isCorrect: Boolean }],
  answer: { type: String }, // For simple check
  correct: { type: Boolean }, // For True/False
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }
});

// Badge schema
const badgeSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  icon: String,
  earnedAt: { type: Date, default: Date.now }
});

const videoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  ageGroup: { type: String, enum: ['5-7', '8-10', '11-12'], required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  videoUrl: { type: String, default: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  thumbnail: { type: String, default: '/assets/modules/default.jpg' },
  description: { type: String, required: true },
  duration: { type: String, default: '10 min' },
  category: { type: String, default: 'Science' },
  phase: { type: Number, min: 1, max: 5, default: 1 },
  seasonId: { type: String, required: true },
  quiz: [quizQuestionSchema],
  badges: [badgeSchema],
  skills: [String],
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);
