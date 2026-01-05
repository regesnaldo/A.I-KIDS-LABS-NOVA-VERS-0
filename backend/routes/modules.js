const express = require('express');
const jwt = require('jsonwebtoken');
const Module = require('../models/Module');
const User = require('../models/User');
const Progress = require('../models/Progress');

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

// @route   GET api/modules
// @desc    Get all modules
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { phase, ageRange, difficulty, seasonId } = req.query;
    
    let query = { isActive: true };
    
    if (phase) query.phase = phase;
    if (ageRange) query.ageRange = ageRange;
    if (difficulty) query.difficulty = difficulty;
    if (seasonId) query.seasonId = seasonId;
    
    const modules = await Module.find(query).sort({ createdAt: 1 });
    res.json(modules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/modules/:id
// @desc    Get module by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const module = await Module.findOne({ id: req.params.id, isActive: true });
    
    if (!module) {
      return res.status(404).json({ msg: 'Module not found' });
    }
    
    res.json(module);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/modules/season/:seasonId
// @desc    Get modules by season
// @access  Public
router.get('/season/:seasonId', async (req, res) => {
  try {
    const modules = await Module.find({ 
      seasonId: req.params.seasonId, 
      isActive: true 
    }).sort({ createdAt: 1 });
    
    res.json(modules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/modules/user/:userId
// @desc    Get modules with progress for a user
// @access  Private
router.get('/user/:userId', auth, async (req, res) => {
  try {
    // Check if user has permission to access this data
    if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    const modules = await Module.find({ isActive: true }).sort({ createdAt: 1 });
    const progress = await Progress.find({ userId: req.params.userId });
    
    // Combine modules with progress data
    const modulesWithProgress = modules.map(module => {
      const userProgress = progress.find(p => p.moduleId === module.id);
      
      return {
        ...module.toObject(),
        progress: userProgress ? userProgress.progressPercentage : 0,
        isCompleted: userProgress ? userProgress.isCompleted : false,
        videoWatched: userProgress ? userProgress.videoWatched : false,
        starsEarned: userProgress && userProgress.quizAttempt ? userProgress.quizAttempt.starsEarned : 0
      };
    });
    
    res.json(modulesWithProgress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/modules
// @desc    Create a new module (Admin only)
// @access  Private
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'User not authorized' });
  }
  
  try {
    const newModule = new Module(req.body);
    const module = await newModule.save();
    res.json(module);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/modules/:id
// @desc    Update a module (Admin only)
// @access  Private
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'User not authorized' });
  }
  
  try {
    const module = await Module.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    
    if (!module) {
      return res.status(404).json({ msg: 'Module not found' });
    }
    
    res.json(module);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/modules/:id
// @desc    Delete a module (Admin only)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'User not authorized' });
  }
  
  try {
    const module = await Module.findOneAndDelete({ id: req.params.id });
    
    if (!module) {
      return res.status(404).json({ msg: 'Module not found' });
    }
    
    res.json({ msg: 'Module removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;