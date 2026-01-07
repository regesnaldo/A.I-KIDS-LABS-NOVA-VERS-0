const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const auth = require('../middleware/auth');
const parentalControl = require('../middleware/parentalControl');

// @route   GET /api/modules
// @desc    Get all modules with filters
// @access  Public (with parental control)
router.get('/', parentalControl, moduleController.getAllModules);

// @route   GET /api/modules/:id
// @desc    Get module by ID
// @access  Public (with parental control)
router.get('/:id', parentalControl, moduleController.getModuleById);

// @route   POST /api/modules/:id/progress
// @desc    Update module progress
// @access  Private (student only)
router.post('/:id/progress', auth, moduleController.updateProgress);

// @route   POST /api/modules/:id/quiz
// @desc    Submit quiz answers
// @access  Private (student only)
router.post('/:id/quiz', auth, moduleController.submitQuiz);

// @route   GET /api/modules/:id/quiz
// @desc    Get quiz for a module
// @access  Private (student only)
router.get('/:id/quiz', auth, moduleController.getQuiz);

// @route   GET /api/modules/:id/badges
// @desc    Get badges for a module
// @access  Private (student only)
router.get('/:id/badges', auth, moduleController.getBadges);

// @route   GET /api/modules/user/:userId
// @desc    Get modules for a specific user with progress
// @access  Private
router.get('/user/:userId', auth, moduleController.getModulesForUser);

// @route   GET /api/modules/progress/:userId
// @desc    Get user's overall progress
// @access  Private
router.get('/progress/:userId', auth, moduleController.getUserProgress);

// @route   GET /api/modules/recommendations
// @desc    Get smart recommendations (AI)
// @access  Private
router.get('/recommendations', auth, moduleController.getRecommendations);

module.exports = router;