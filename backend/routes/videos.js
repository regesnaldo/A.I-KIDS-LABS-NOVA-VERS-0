const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const parentalControl = require('../middleware/parentalControl');

// @route   GET /api/videos
// @desc    Get all videos (modules)
// @access  Public (Parental Control applied)
router.get('/', parentalControl, moduleController.getAllModules);

// @route   GET /api/videos/:id
// @desc    Get video by ID
// @access  Public
router.get('/:id', parentalControl, moduleController.getModuleById);

module.exports = router;
