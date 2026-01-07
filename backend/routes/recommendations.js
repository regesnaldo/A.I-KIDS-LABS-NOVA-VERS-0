const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const auth = require('../middleware/auth');

// @route   GET /api/recommendations/:userId
// @desc    Get AI recommendations for a user
// @access  Private
router.get('/:userId', auth, moduleController.getRecommendations);

// @route   GET /api/recommendations
// @desc    Get AI recommendations (uses token user ID)
// @access  Private
router.get('/', auth, moduleController.getRecommendations);

module.exports = router;
