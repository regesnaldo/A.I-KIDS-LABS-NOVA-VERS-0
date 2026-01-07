const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Protect routes
const auth = async (req, res, next) => {
  let token;
  
  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey');
      
      // Get user from token
      req.user = await User.findById(decoded.userId).select('-password');
      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Token is not valid'
        });
      }
      
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        success: false,
        error: 'Token is not valid'
      });
    }
  }
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token, authorization denied'
    });
  }
};

module.exports = auth;