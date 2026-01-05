const Module = require('../models/Module');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// @desc    Get all modules with filters
// @route   GET /api/modules
// @access  Public
const getAllModules = async (req, res) => {
  try {
    const { phase, ageGroup, difficulty, seasonId } = req.query;
    
    let filter = { isActive: true };
    
    if (phase) filter.phase = phase;
    if (ageGroup) filter.ageGroup = ageGroup;
    if (difficulty) filter.difficulty = difficulty;
    if (seasonId) filter.seasonId = seasonId;
    
    const modules = await Module.find(filter).select('-quiz').sort({ phase: 1, id: 1 });
    
    res.json({
      success: true,
      count: modules.length,
      data: modules
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single module by ID
// @route   GET /api/modules/:id
// @access  Public
const getModuleById = async (req, res) => {
  try {
    const module = await Module.findOne({ id: req.params.id, isActive: true });
    
    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Module not found'
      });
    }
    
    res.json({
      success: true,
      data: module
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update module progress
// @route   POST /api/modules/:id/progress
// @access  Private
const updateProgress = async (req, res) => {
  try {
    const { progress, starsEarned, badgesEarned, isCompleted } = req.body;
    const userId = req.user.id;
    const moduleId = req.params.id;
    
    // Get the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Get the module
    const module = await Module.findOne({ id: moduleId });
    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Module not found'
      });
    }
    
    // Update user progress (in a real app, you would have a separate Progress model)
    // For simplicity, we're updating user progress directly
    if (isCompleted) {
      user.progress.completedModules += 1;
    }
    
    if (starsEarned) {
      user.progress.totalStars += starsEarned;
    }
    
    if (badgesEarned && badgesEarned.length > 0) {
      user.badges = [...user.badges, ...badgesEarned.map(badge => ({
        ...badge,
        earnedAt: new Date()
      }))];
    }
    
    // Calculate average progress
    if (user.progress.totalModules > 0) {
      user.progress.avgProgress = Math.round(
        (user.progress.completedModules / user.progress.totalModules) * 100
      );
    }
    
    await user.save();
    
    res.json({
      success: true,
      data: {
        progress,
        starsEarned,
        badgesEarned,
        isCompleted
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Submit quiz answers
// @route   POST /api/modules/:id/quiz
// @access  Private
const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user.id;
    const moduleId = req.params.id;
    
    // Get the module
    const module = await Module.findOne({ id: moduleId });
    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Module not found'
      });
    }
    
    // Grade the quiz
    let correctCount = 0;
    const totalQuestions = module.quiz.length;
    
    for (let i = 0; i < module.quiz.length; i++) {
      const question = module.quiz[i];
      const userAnswer = answers[i];
      
      if (question.type === 'multipleChoice') {
        if (userAnswer === question.answer) {
          correctCount++;
        }
      } else if (question.type === 'trueFalse') {
        if (userAnswer === question.correct) {
          correctCount++;
        }
      }
    }
    
    const score = Math.round((correctCount / totalQuestions) * 100);
    
    // Calculate stars based on score
    let starsEarned = 0;
    if (score >= 90) starsEarned = 3;
    else if (score >= 70) starsEarned = 2;
    else if (score >= 50) starsEarned = 1;
    
    // Update user progress
    const user = await User.findById(userId);
    if (user) {
      user.progress.totalStars += starsEarned;
      user.progress.completedModules += 1;
      
      if (user.progress.totalModules === 0) {
        user.progress.totalModules = 1;
      }
      
      // Calculate average progress
      user.progress.avgProgress = Math.round(
        (user.progress.completedModules / user.progress.totalModules) * 100
      );
      
      await user.save();
    }
    
    res.json({
      success: true,
      data: {
        score,
        correctCount,
        totalQuestions,
        starsEarned,
        passed: score >= 50
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get quiz for a module
// @route   GET /api/modules/:id/quiz
// @access  Private
const getQuiz = async (req, res) => {
  try {
    const moduleId = req.params.id;
    
    const module = await Module.findOne({ id: moduleId });
    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Module not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        moduleId: module.id,
        title: module.title,
        quiz: module.quiz
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get badges for a module
// @route   GET /api/modules/:id/badges
// @access  Private
const getBadges = async (req, res) => {
  try {
    const moduleId = req.params.id;
    
    const module = await Module.findOne({ id: moduleId });
    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Module not found'
      });
    }
    
    res.json({
      success: true,
      data: module.badges
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get modules for a specific user with progress
// @route   GET /api/modules/user/:userId
// @access  Private
const getModulesForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Verify user has permission to access this data
    if (req.user.id !== userId && req.user.role !== 'admin' && req.user.role !== 'parent') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this data'
      });
    }
    
    const modules = await Module.find({ isActive: true }).select('-quiz').sort({ phase: 1, id: 1 });
    
    // In a real app, you would fetch user progress from a separate Progress model
    // For simplicity, we're returning modules with placeholder progress data
    const modulesWithProgress = modules.map(module => ({
      ...module.toObject(),
      progress: Math.floor(Math.random() * 100), // Placeholder progress
      isCompleted: Math.random() > 0.5, // Placeholder completion
      starsEarned: Math.floor(Math.random() * 4) // Placeholder stars (0-3)
    }));
    
    res.json({
      success: true,
      count: modulesWithProgress.length,
      data: modulesWithProgress
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get user's overall progress
// @route   GET /api/modules/progress/:userId
// @access  Private
const getUserProgress = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Verify user has permission to access this data
    if (req.user.id !== userId && req.user.role !== 'admin' && req.user.role !== 'parent') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this data'
      });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        totalModules: user.progress.totalModules,
        completedModules: user.progress.completedModules,
        totalStars: user.progress.totalStars,
        avgProgress: user.progress.avgProgress,
        badges: user.badges
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

module.exports = {
  getAllModules,
  getModuleById,
  updateProgress,
  submitQuiz,
  getQuiz,
  getBadges,
  getModulesForUser,
  getUserProgress
};