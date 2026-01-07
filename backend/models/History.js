const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  moduleId: { type: String, required: true },
  score: { type: Number, default: 0 },
  starsEarned: { type: Number, default: 0 },
  completedAt: { type: Date, default: Date.now }
});

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: String, required: true }, // Mapped from moduleId
  completed: { type: Boolean, default: false },
  watchedTime: { type: Number, default: 0 }, // In seconds
  totalDuration: { type: Number, default: 0 },
  quizAttempt: quizAttemptSchema,
  lastWatched: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);
