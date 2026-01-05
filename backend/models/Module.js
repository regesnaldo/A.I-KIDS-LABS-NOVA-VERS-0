const mongoose = require('mongoose');

// Quiz question schema
const quizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  type: {
    type: String,
    enum: ['multipleChoice', 'trueFalse'],
    required: true
  },
  options: [{
    text: String,
    isCorrect: Boolean
  }],
  answer: {
    type: String,
    required: function() {
      return this.type === 'multipleChoice';
    }
  },
  correct: {
    type: Boolean,
    required: function() {
      return this.type === 'trueFalse';
    }
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  }
});

// Badge schema
const badgeSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  icon: String,
  earnedAt: { type: Date, default: Date.now }
});

const moduleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Module ID is required'],
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  ageGroup: {
    type: String,
    enum: ['5-7', '8-10', '11-12'],
    required: [true, 'Age group is required']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: [true, 'Difficulty is required']
  },
  videoPlaceholder: {
    type: String,
    default: '/videos/placeholder.mp4'
  },
  thumbnail: {
    type: String,
    default: '/images/module-thumbnail.jpg'
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  duration: {
    type: String,
    default: '10 min'
  },
  phase: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Phase is required']
  },
  seasonId: {
    type: String,
    required: [true, 'Season ID is required']
  },
  quiz: [quizQuestionSchema],
  badges: [badgeSchema],
  skills: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  prerequisites: [{
    type: String
  }],
  learningObjectives: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updated at field before saving
moduleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to check if user can access this module
moduleSchema.methods.canAccess = function(user) {
  if (user.role === 'admin') return true;
  
  // Check age group compatibility
  if (!user.canAccessContent(this.ageGroup)) {
    return false;
  }
  
  // Check difficulty
  if (user.preferences?.maxDifficulty === 'easy' && this.difficulty !== 'easy') {
    return false;
  }
  if (user.preferences?.maxDifficulty === 'medium' && this.difficulty === 'hard') {
    return false;
  }
  
  return true;
};

module.exports = mongoose.model('Module', moduleSchema);