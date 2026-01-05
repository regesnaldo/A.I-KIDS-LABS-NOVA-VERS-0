const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Path to users JSON file
const usersPath = path.join(__dirname, '../data/users.json');

// Initialize users file if it doesn't exist
const initializeUsersFile = () => {
  if (!fs.existsSync(usersPath)) {
    fs.writeFileSync(usersPath, JSON.stringify([]));
  }
};

// Read users from JSON file
const readUsers = () => {
  initializeUsersFile();
  const usersData = fs.readFileSync(usersPath, 'utf8');
  return JSON.parse(usersData);
};

// Write users to JSON file
const writeUsers = (users) => {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

// Generate a unique ID
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
const register = async (req, res) => {
  try {
    const { username, email, password, role = 'student', age, parentId } = req.body;

    // Read existing users
    const users = readUsers();

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      id: generateId(),
      username,
      email,
      password: hashedPassword,
      role,
      age: role === 'student' ? age : undefined,
      parentId: role === 'student' ? parentId : undefined,
      profilePicture: '/images/default-avatar.png',
      preferences: {
        parentalPin: '0000',
        maxDailyTime: 60,
        maxDifficulty: 'medium',
        allowedHours: { start: '08:00', end: '20:00' }
      },
      progress: {
        totalModules: 0,
        completedModules: 0,
        totalStars: 0,
        avgProgress: 0
      },
      badges: [],
      isActive: true,
      lastLogin: null,
      createdAt: new Date().toISOString(),
      subscription: {
        status: 'INACTIVE',
        planId: null,
        subscriptionId: null,
        startDate: null,
        nextBillingDate: null,
        endDate: null,
        amount: null,
        cancellationDate: null,
        cancellationReason: null,
        paymentMethod: null
      }
    };

    // Add user to array
    users.push(newUser);
    writeUsers(users);

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || 'defaultSecretKey',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        age: newUser.age
      }
    });
  } catch (error) {
    console.error('Error in register:', error);
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

    // Read users from JSON file
    const users = readUsers();

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    writeUsers(users);

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'defaultSecretKey',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        age: user.age
      }
    });
  } catch (error) {
    console.error('Error in login:', error);
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

    // Read users from JSON file
    const users = readUsers();

    // Find user by email
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) {
      return res.status(400).json({
        success: false,
        error: 'Email not found'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and save to user
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Update user with reset token and expiration
    users[userIndex].resetPasswordToken = hashedToken;
    users[userIndex].resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    writeUsers(users);

    // In a real app, you would send an email with the reset token
    // For now, we'll just return the token for demonstration
    res.json({
      success: true,
      message: 'Password reset token sent',
      resetToken
    });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
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

    // Read users from JSON file
    const users = readUsers();

    // Find user with matching token and check if it's not expired
    const userIndex = users.findIndex(u => 
      u.resetPasswordToken === hashedToken && 
      u.resetPasswordExpire > Date.now()
    );

    if (userIndex === -1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user with new password
    users[userIndex].password = hashedPassword;
    users[userIndex].resetPasswordToken = undefined;
    users[userIndex].resetPasswordExpire = undefined;

    writeUsers(users);

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Error in resetPassword:', error);
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
    const userId = req.user.id;

    // Read users from JSON file
    const users = readUsers();

    // Find user by ID
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Return user profile (excluding sensitive information)
    const { password, resetPasswordToken, resetPasswordExpire, ...profile } = user;

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error in getProfile:', error);
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
    const userId = req.user.id;
    const updateData = req.body;

    // Read users from JSON file
    const users = readUsers();

    // Find user by ID
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Update user profile (excluding sensitive fields)
    const allowedUpdates = ['username', 'email', 'age', 'preferences', 'profilePicture'];
    const updates = Object.keys(updateData);

    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        error: 'Invalid updates'
      });
    }

    // Apply updates
    updates.forEach(update => {
      users[userIndex][update] = updateData[update];
    });

    writeUsers(users);

    // Return updated user (excluding sensitive information)
    const { password, resetPasswordToken, resetPasswordExpire, ...updatedUser } = users[userIndex];

    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error('Error in updateProfile:', error);
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
    const userId = req.user.id;

    // Read users from JSON file
    let users = readUsers();

    // Find user by ID
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Remove user from array
    users = users.filter(u => u.id !== userId);
    writeUsers(users);

    res.json({
      success: true,
      message: 'User account deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteAccount:', error);
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
    const parentId = req.user.id;

    // Read users from JSON file
    const users = readUsers();

    // Find children with this parent ID
    const children = users.filter(user => user.parentId === parentId);

    res.json({
      success: true,
      data: children
    });
  } catch (error) {
    console.error('Error in getChildren:', error);
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
    const parentId = req.user.id;
    const { username, email, password, age } = req.body;

    // Read users from JSON file
    const users = readUsers();

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new child user
    const newChild = {
      id: generateId(),
      username,
      email,
      password: hashedPassword,
      role: 'student',
      age,
      parentId,
      profilePicture: '/images/default-avatar.png',
      preferences: {
        parentalPin: '0000',
        maxDailyTime: 60,
        maxDifficulty: 'medium',
        allowedHours: { start: '08:00', end: '20:00' }
      },
      progress: {
        totalModules: 0,
        completedModules: 0,
        totalStars: 0,
        avgProgress: 0
      },
      badges: [],
      isActive: true,
      lastLogin: null,
      createdAt: new Date().toISOString(),
      subscription: {
        status: 'INACTIVE',
        planId: null,
        subscriptionId: null,
        startDate: null,
        nextBillingDate: null,
        endDate: null,
        amount: null,
        cancellationDate: null,
        cancellationReason: null,
        paymentMethod: null
      }
    };

    // Add child to array
    users.push(newChild);
    writeUsers(users);

    res.status(201).json({
      success: true,
      data: {
        id: newChild.id,
        username: newChild.username,
        email: newChild.email,
        role: newChild.role,
        age: newChild.age
      }
    });
  } catch (error) {
    console.error('Error in addChild:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get parent for child
// @route   GET /api/users/parents
// @access  Private (student only)
const getParents = async (req, res) => {
  try {
    const childId = req.user.id;

    // Read users from JSON file
    const users = readUsers();

    // Find user
    const childUser = users.find(user => user.id === childId);
    if (!childUser || !childUser.parentId) {
      return res.status(404).json({
        success: false,
        error: 'Parent not found'
      });
    }

    // Find parent by ID
    const parent = users.find(user => user.id === childUser.parentId);
    if (!parent) {
      return res.status(404).json({
        success: false,
        error: 'Parent not found'
      });
    }

    res.json({
      success: true,
      data: parent
    });
  } catch (error) {
    console.error('Error in getParents:', error);
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