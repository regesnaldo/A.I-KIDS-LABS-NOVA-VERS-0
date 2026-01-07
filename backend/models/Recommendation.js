const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: String, required: true },
  reason: { type: String, required: true },
  aiMessage: { type: String },
  type: { type: String, enum: ['next_up', 'continue_watching', 'similar'], default: 'next_up' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
