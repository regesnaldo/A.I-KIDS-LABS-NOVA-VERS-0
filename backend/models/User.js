const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['student', 'parent', 'admin'],
    default: 'student'
  },
  age: {
    type: Number,
    min: [3, 'Age must be at least 3 years'],
    max: [18, 'Age must be at most 18 years']
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  profilePicture: {
    type: String,
    default: '/images/default-avatar.png'
  },
  preferences: {
    parentalPin: {
      type: String,
      default: '0000'
    },
    maxDailyTime: {
      type: Number,
      default: 60 // minutes
    },
    maxDifficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    },
    allowedHours: {
      start: { type: String, default: '08:00' },
      end: { type: String, default: '20:00' }
    }
  },
  progress: {
    totalModules: { type: Number, default: 0 },
    completedModules: { type: Number, default: 0 },
    totalStars: { type: Number, default: 0 },
    avgProgress: { type: Number, default: 0 },
    // Netflix-style Resume Capability
    history: [{
      moduleId: String,
      stoppedAt: { type: Number, default: 0 }, // Timestamp in seconds
      completed: { type: Boolean, default: false },
      lastWatched: { type: Date, default: Date.now },
      stars: { type: Number, default: 0 }
    }]
  },
  badges: [{
    badgeId: String,
    name: String,
    earnedAt: { type: Date, default: Date.now }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  subscription: {
    status: {
      type: String,
      enum: ['INACTIVE', 'PENDING', 'ACTIVE', 'CANCELLED', 'EXPIRED'],
      default: 'INACTIVE'
    },
    planId: String,
    subscriptionId: String,
    startDate: Date,
    nextBillingDate: Date,
    endDate: Date,
    amount: Number,
    cancellationDate: Date,
    cancellationReason: String,
    paymentMethod: String
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Check if user can access content based on age
userSchema.methods.canAccessContent = function(contentAgeGroup) {
  if (this.role === 'admin') return true;
  
  const userAge = this.age || 0;
  
  if (contentAgeGroup === '5-7') return userAge >= 5;
  if (contentAgeGroup === '8-10') return userAge >= 8;
  if (contentAgeGroup === '11-12') return userAge >= 11;
  
  return false;
};

module.exports = mongoose.model('User', userSchema);