const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// @route   POST /api/users/register
// @desc    Register user (student or admin)
// @access  Public
router.post('/register', userController.register);

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', userController.login);

// @route   POST /api/users/forgot-password
// @desc    Forgot password
// @access  Public
router.post('/forgot-password', userController.forgotPassword);

// @route   POST /api/users/reset-password
// @desc    Reset password
// @access  Private (with reset token)
router.post('/reset-password', userController.resetPassword);

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, userController.getProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, userController.updateProfile);

// @route   DELETE /api/users/profile
// @desc    Delete user account
// @access  Private
router.delete('/profile', auth, userController.deleteAccount);

// @route   GET /api/users/children
// @desc    Get children for parent
// @access  Private (parent only)
router.get('/children', auth, userController.getChildren);

// @route   POST /api/users/children
// @desc    Add child for parent
// @access  Private (parent only)
router.post('/children', auth, userController.addChild);

// @route   GET /api/users/parents
// @desc    Get parent for child
// @access  Private (student only)
router.get('/parents', auth, userController.getParents);

module.exports = router;