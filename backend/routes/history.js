const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const auth = require('../middleware/auth');

// @route   GET /api/history/:userId
// @desc    Get user watch history
// @access  Private
router.get('/:userId', auth, moduleController.getUserProgress);

// @route   POST /api/history
// @desc    Update history/progress
// @access  Private
router.post('/', auth, moduleController.updateProgress);

module.exports = router;
