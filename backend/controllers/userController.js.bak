const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
const register = async (req, res) => {
  try {
    const { username, email, password, role, age, parentId } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }
    
    // Create new user
    user = new User({
      username,
      email,
      password,
      role,
      age: role === 'student' ? age : undefined,
      parentId: role === 'student' ? parentId : undefined
    });
    
    // Save user
    await user.save();
    
    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'defaultSecretKey',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      token,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        age: user.age
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

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Update last login
    user.lastLogin = Date.now();
    await user.save();
    
    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'defaultSecretKey',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        age: user.age
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

// @desc    Forgot password
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Email not found'
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Hash token and save to user
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    await user.save();
    
    // In a real app, you would send an email with the reset token
    // For now, we'll just return the token for demonstration
    res.json({
      success: true,
      message: 'Password reset token sent',
      resetToken
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Reset password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // Hash the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Find user with matching token and check if it's not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }
    
    // Set new password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { username, email, age, preferences } = req.body;
    
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (age && user.role === 'student') user.age = age;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };
    
    await user.save();
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/profile
// @access  Private
const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    await user.remove();
    
    res.json({
      success: true,
      message: 'User account deleted'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get children for parent
// @route   GET /api/users/children
// @access  Private (parent only)
const getChildren = async (req, res) => {
  try {
    const parent = await User.findById(req.user.userId);
    
    if (!parent) {
      return res.status(404).json({
        success: false,
        error: 'Parent not found'
      });
    }
    
    if (parent.role !== 'parent') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized as parent'
      });
    }
    
    const children = await User.find({ parentId: parent._id });
    
    res.json({
      success: true,
      count: children.length,
      data: children
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Add child for parent
// @route   POST /api/users/children
// @access  Private (parent only)
const addChild = async (req, res) => {
  try {
    const { username, email, password, age } = req.body;
    
    const parent = await User.findById(req.user.userId);
    
    if (!parent) {
      return res.status(404).json({
        success: false,
        error: 'Parent not found'
      });
    }
    
    if (parent.role !== 'parent') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized as parent'
      });
    }
    
    // Check if child already exists
    let child = await User.findOne({ email });
    if (child) {
      return res.status(400).json({
        success: false,
        error: 'Child with this email already exists'
      });
    }
    
    // Create new child
    child = new User({
      username,
      email,
      password,
      role: 'student',
      age,
      parentId: parent._id
    });
    
    await child.save();
    
    // Add child to parent's children array
    parent.children.push(child._id);
    await parent.save();
    
    res.status(201).json({
      success: true,
      data: {
        id: child._id,
        username: child.username,
        email: child.email,
        age: child.age
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

// @desc    Get parents for child
// @route   GET /api/users/parents
// @access  Private (student only)
const getParents = async (req, res) => {
  try {
    const child = await User.findById(req.user.userId).populate('parentId', 'username email');
    
    if (!child) {
      return res.status(404).json({
        success: false,
        error: 'Child not found'
      });
    }
    
    if (child.role !== 'student') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized as student'
      });
    }
    
    res.json({
      success: true,
      data: child.parentId
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
  register,
  login,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  deleteAccount,
  getChildren,
  addChild,
  getParents
};