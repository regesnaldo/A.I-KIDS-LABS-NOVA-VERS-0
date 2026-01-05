const express = require('express');
const jwt = require('jsonwebtoken');
const Module = require('../models/Module');

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

// @route   GET api/quizzes/module/:moduleId
// @desc    Get quiz for a module
// @access  Private
router.get('/module/:moduleId', auth, async (req, res) => {
  try {
    const module = await Module.findOne({ id: req.params.moduleId, isActive: true });
    
    if (!module) {
      return res.status(404).json({ msg: 'Module not found' });
    }
    
    res.json({
      moduleId: module.id,
      title: module.title,
      description: module.description,
      quizzes: module.quizzes
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/quizzes/grade
// @desc    Grade quiz answers
// @access  Private
router.post('/grade', auth, async (req, res) => {
  try {
    const { moduleId, answers } = req.body;
    
    // Get module with quiz questions
    const module = await Module.findOne({ id: moduleId, isActive: true });
    
    if (!module) {
      return res.status(404).json({ msg: 'Module not found' });
    }
    
    // Grade the quiz
    let correctCount = 0;
    let totalCount = module.quizzes.length;
    
    const gradedAnswers = answers.map((userAnswer, index) => {
      const question = module.quizzes[index];
      const isCorrect = question.options.some(
        option => option.text === userAnswer && option.isCorrect
      );
      
      if (isCorrect) {
        correctCount++;
      }
      
      return {
        questionId: question._id,
        selectedOption: userAnswer,
        isCorrect,
        correctAnswer: question.options.find(opt => opt.isCorrect)?.text
      };
    });
    
    const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    
    res.json({
      score,
      correctCount,
      totalCount,
      percentage: Math.round((correctCount / totalCount) * 100),
      answers: gradedAnswers
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/quizzes/module/:moduleId
// @desc    Add/update quiz questions for a module (Admin only)
// @access  Private
router.post('/module/:moduleId', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'User not authorized' });
  }
  
  try {
    const { quizzes } = req.body;
    
    const module = await Module.findOneAndUpdate(
      { id: req.params.moduleId },
      { $set: { quizzes } },
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

// @route   GET api/quizzes/recommendations
// @desc    Get quiz recommendations based on user progress
// @access  Private
router.get('/recommendations', auth, async (req, res) => {
  try {
    // This would typically analyze user progress and suggest modules
    // For now, return a simple recommendation based on difficulty
    const userId = req.user.id;
    
    // In a real implementation, this would query user progress and recommend modules
    // For now, return some sample recommendations
    const recommendations = [
      {
        moduleId: 'module-001',
        title: 'Introdução à Lógica',
        reason: 'Based on your progress in basic concepts',
        difficulty: 'easy'
      },
      {
        moduleId: 'module-005',
        title: 'Matemática Divertida',
        reason: 'You showed strong performance in math concepts',
        difficulty: 'medium'
      }
    ];
    
    res.json(recommendations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;