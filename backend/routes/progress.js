const express = require('express');
const jwt = require('jsonwebtoken');
const Progress = require('../models/Progress');
const Module = require('../models/Module');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify token
const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// @route   GET api/progress/user/:userId
// @desc    Get progress for a user
// @access  Private
router.get('/user/:userId', auth, async (req, res) => {
  try {
    // Check if user has permission to access this data
    if (req.user.id !== req.params.userId && req.user.role !== 'admin' && req.user.role !== 'parent') {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    const progress = await Progress.find({ userId: req.params.userId })
      .populate('moduleId', 'title description difficulty duration')
      .sort({ updatedAt: -1 });
    
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/progress/user/:userId/module/:moduleId
// @desc    Get progress for a specific module
// @access  Private
router.get('/user/:userId/module/:moduleId', auth, async (req, res) => {
  try {
    // Check if user has permission to access this data
    if (req.user.id !== req.params.userId && req.user.role !== 'admin' && req.user.role !== 'parent') {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    const progress = await Progress.findOne({
      userId: req.params.userId,
      moduleId: req.params.moduleId
    });
    
    if (!progress) {
      return res.json({ progress: null });
    }
    
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/progress
// @desc    Update progress for a module
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { userId, moduleId, videoWatched, progressPercentage, isCompleted } = req.body;
    
    // Check if user has permission to update this data
    if (req.user.id !== userId && req.user.role !== 'admin' && req.user.role !== 'parent') {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    // Find or create progress record
    let progress = await Progress.findOne({ userId, moduleId });
    
    if (progress) {
      // Update existing progress
      progress = await Progress.findOneAndUpdate(
        { userId, moduleId },
        { 
          videoWatched: videoWatched || progress.videoWatched,
          progressPercentage: progressPercentage || progress.progressPercentage,
          isCompleted: isCompleted || progress.isCompleted,
          lastAccessed: Date.now(),
          updatedAt: Date.now()
        },
        { new: true }
      );
    } else {
      // Create new progress
      progress = new Progress({
        userId,
        moduleId,
        videoWatched: videoWatched || false,
        progressPercentage: progressPercentage || 0,
        isCompleted: isCompleted || false
      });
      
      await progress.save();
    }
    
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/progress/quiz
// @desc    Submit quiz and update progress with stars
// @access  Private
router.post('/quiz', auth, async (req, res) => {
  try {
    const { userId, moduleId, answers, score } = req.body;
    
    // Check if user has permission to update this data
    if (req.user.id !== userId && req.user.role !== 'admin' && req.user.role !== 'parent') {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    // Calculate stars based on score
    let starsEarned = 0;
    if (score >= 90) {
      starsEarned = 3;
    } else if (score >= 70) {
      starsEarned = 2;
    } else if (score >= 50) {
      starsEarned = 1;
    }
    
    // Find or update progress record
    let progress = await Progress.findOne({ userId, moduleId });
    
    if (progress) {
      progress.quizAttempt = {
        moduleId,
        userId,
        answers,
        score,
        starsEarned,
        completedAt: Date.now()
      };
      
      progress.isCompleted = true;
      progress.progressPercentage = 100;
      progress.updatedAt = Date.now();
      
      await progress.save();
    } else {
      progress = new Progress({
        userId,
        moduleId,
        isCompleted: true,
        videoWatched: true,
        progressPercentage: 100,
        quizAttempt: {
          moduleId,
          userId,
          answers,
          score,
          starsEarned,
          completedAt: Date.now()
        }
      });
      
      await progress.save();
    }
    
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/progress/user/:userId/stats
// @desc    Get user statistics
// @access  Private
router.get('/user/:userId/stats', auth, async (req, res) => {
  try {
    // Check if user has permission to access this data
    if (req.user.id !== req.params.userId && req.user.role !== 'admin' && req.user.role !== 'parent') {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    const progress = await Progress.find({ userId: req.params.userId });
    
    // Calculate statistics
    const totalModules = progress.length;
    const completedModules = progress.filter(p => p.isCompleted).length;
    const totalStars = progress.reduce((sum, p) => sum + (p.quizAttempt ? p.quizAttempt.starsEarned : 0), 0);
    const avgProgress = progress.length > 0 
      ? Math.round(progress.reduce((sum, p) => sum + p.progressPercentage, 0) / progress.length)
      : 0;
    
    res.json({
      totalModules,
      completedModules,
      totalStars,
      avgProgress,
      completionRate: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;