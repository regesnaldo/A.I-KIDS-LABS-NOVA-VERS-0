const User = require('../models/User');
// Pre-load modules data for performance (cached by require)
const modulesData = require('../data/modules.json');

// Function to get modules (returns cached data)
const getModulesFromJson = () => {
  return modulesData;
};

// Helper: Get AI Persona Message
const getPersonaMessage = (age, context) => {
  let ageGroup = 'adult';
  if (age >= 7 && age <= 10) ageGroup = 'child';
  else if (age >= 11 && age <= 16) ageGroup = 'youth';

  const messages = {
    child: {
      continue: "Olá explorador! Vamos continuar nossa aventura?",
      reinforce: "Vamos rever isso com calma para você ficar craque!",
      challenge: "Uau! Você é incrível! Que tal um desafio especial?",
      starter: "Bem-vindo! Vamos começar nossa jornada espacial?"
    },
    youth: {
      continue: "Bem-vindo de volta. Pronto para o próximo nível?",
      reinforce: "Detectamos uma dificuldade. Que tal reforçar a base?",
      challenge: "Desempenho excelente. Desbloqueando desafio avançado.",
      starter: "Iniciando sistema. Escolha sua primeira missão."
    },
    adult: {
      continue: "Olá. Vamos retomar seu progresso?",
      reinforce: "Sugiro revisar este conceito para consolidar o aprendizado.",
      challenge: "Excelente domínio. Recomendamos avançar para tópicos complexos.",
      starter: "Bem-vindo. Comece pelos fundamentos da IA."
    }
  };

  return messages[ageGroup][context] || messages['adult'][context];
};

// @desc    Get all modules with filters
// @route   GET /api/modules
// @access  Public
const getAllModules = async (req, res) => {
  try {
    const { phase, ageGroup, difficulty, seasonId } = req.query;
    
    // Read modules from JSON file
    let modules = getModulesFromJson();
    
    // Apply filters
    if (phase) modules = modules.filter(m => m.phase == phase);
    if (ageGroup) modules = modules.filter(m => m.ageGroup === ageGroup);
    if (difficulty) modules = modules.filter(m => m.difficulty === difficulty);
    if (seasonId) modules = modules.filter(m => m.seasonId === seasonId);
    
    // Remove quiz data for performance when getting all modules
    const modulesWithoutQuiz = modules.map(m => {
      const { quiz, ...moduleWithoutQuiz } = m;
      return moduleWithoutQuiz;
    });
    
    res.json({
      success: true,
      count: modulesWithoutQuiz.length,
      data: modulesWithoutQuiz
    });
  } catch (error) {
    console.error('Error in getAllModules:', error);
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
    const { id } = req.params;
    
    // Read modules from JSON file
    const modules = getModulesFromJson();
    const module = modules.find(m => m.id === id);
    
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
    console.error('Error in getModuleById:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update module progress (Netflix-style Resume)
// @route   POST /api/modules/:id/progress
// @access  Private
const updateProgress = async (req, res) => {
  try {
    const { progress, starsEarned, badgesEarned, isCompleted, stoppedAt } = req.body;
    const userId = req.user.id;
    const moduleId = req.params.id;
    
    // Get the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    // Find existing progress for this module
    const historyIndex = user.progress.history.findIndex(h => h.moduleId === moduleId);
    
    if (historyIndex > -1) {
      // Update existing
      user.progress.history[historyIndex].lastWatched = new Date();
      if (stoppedAt !== undefined) user.progress.history[historyIndex].stoppedAt = stoppedAt;
      if (isCompleted) user.progress.history[historyIndex].completed = true;
      if (starsEarned) user.progress.history[historyIndex].stars = Math.max(user.progress.history[historyIndex].stars, starsEarned);
    } else {
      // Add new
      user.progress.history.push({
        moduleId,
        stoppedAt: stoppedAt || 0,
        completed: isCompleted || false,
        lastWatched: new Date(),
        stars: starsEarned || 0
      });
    }

    // Update global stats
    if (isCompleted) {
       // Recalculate totals based on history to ensure accuracy
       user.progress.completedModules = user.progress.history.filter(h => h.completed).length;
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
    
    await user.save();
    
    res.json({
      success: true,
      data: {
        moduleId,
        stoppedAt,
        isCompleted
      }
    });
  } catch (error) {
    console.error('Error in updateProgress:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get AI Recommendations
// @route   GET /api/modules/recommendations
// @access  Private
const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const modules = getModulesFromJson();

    // 1. Find last watched module
    const lastWatched = user.progress.history.sort((a, b) => b.lastWatched - a.lastWatched)[0];

    let recommendations = [];
    const userAge = user.age || 10; // Default to child if not set

    if (lastWatched) {
      // Recommendation Logic 1: Continue watching (if not finished)
      if (!lastWatched.completed && lastWatched.stoppedAt > 0) {
         const currentModule = modules.find(m => m.id === lastWatched.moduleId);
         if (currentModule) {
            recommendations.push({
               type: 'continue_watching',
               reason: 'Continue de onde parou',
               aiMessage: getPersonaMessage(userAge, 'continue'),
               module: currentModule,
               stoppedAt: lastWatched.stoppedAt
            });
         }
      }

      // Recommendation Logic 2: Adaptive Path based on Performance
      const currentModule = modules.find(m => m.id === lastWatched.moduleId);
      
      if (currentModule) {
         let nextModule = null;
         let context = 'continue';

         // Performance Logic
         if (lastWatched.stars <= 1 && lastWatched.completed) {
            // Difficulty detected: Recommend easier or reinforcement
            context = 'reinforce';
            nextModule = modules.find(m => 
               m.phase === currentModule.phase && 
               m.difficulty === 'easy' && 
               m.id !== currentModule.id &&
               !user.progress.history.some(h => h.moduleId === m.id)
            );
         } else if (lastWatched.stars === 3 && lastWatched.completed) {
            // High performance: Recommend challenge or next phase
            context = 'challenge';
            nextModule = modules.find(m => 
               (m.phase === currentModule.phase + 1) || 
               (m.phase === currentModule.phase && m.difficulty === 'hard' && !user.progress.history.some(h => h.moduleId === m.id))
            );
         }

         // Fallback to standard sequence if no specific adaptation found
         if (!nextModule) {
            nextModule = modules.find(m => 
               m.phase === currentModule.phase && 
               m.id !== currentModule.id && 
               !user.progress.history.some(h => h.moduleId === m.id)
            );
            // Try next phase if current phase finished
            if (!nextModule) {
               nextModule = modules.find(m => m.phase === currentModule.phase + 1);
            }
         }

         if (nextModule) {
            recommendations.push({
               type: 'next_up',
               reason: 'Próximo da sua jornada',
               aiMessage: getPersonaMessage(userAge, context),
               module: nextModule
            });
         }
      }
    }

    // Recommendation Logic 3: Popular / New (Fallback for new users)
    if (recommendations.length === 0) {
       const starterModule = modules.find(m => m.phase === 1);
       recommendations.push({
          type: 'starter',
          reason: 'Comece por aqui',
          aiMessage: getPersonaMessage(userAge, 'starter'),
          module: starterModule
       });
    }

    res.json({ success: true, data: recommendations });
  } catch (error) {
    console.error('Error in recommendations:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
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
    
    // Read modules from JSON file to get quiz data
    const modules = getModulesFromJson();
    const module = modules.find(m => m.id === moduleId);
    
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
    console.error('Error in submitQuiz:', error);
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
    
    // Read modules from JSON file to get quiz data
    const modules = getModulesFromJson();
    const module = modules.find(m => m.id === moduleId);
    
    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Module not found'
      });
    }
    
    res.json({
      success: true,
      data: module.quiz
    });
  } catch (error) {
    console.error('Error in getQuiz:', error);
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
    
    // Read modules from JSON file to get badges
    const modules = getModulesFromJson();
    const module = modules.find(m => m.id === moduleId);
    
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
    console.error('Error in getBadges:', error);
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
    const requestingUserId = req.user.id;
    
    // Only allow users to access their own data
    if (userId !== requestingUserId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }
    
    // Read modules from JSON file
    const modules = getModulesFromJson();
    
    // In a real implementation, you would fetch user's progress
    // For now, return all modules with placeholder progress
    const modulesWithProgress = modules.map(m => ({
      ...m,
      progress: 0, // Placeholder
      isCompleted: false, // Placeholder
      starsEarned: 0 // Placeholder
    }));
    
    res.json({
      success: true,
      data: modulesWithProgress
    });
  } catch (error) {
    console.error('Error in getModulesForUser:', error);
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
    const requestingUserId = req.user.id;
    
    // Only allow users to access their own data
    if (userId !== requestingUserId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }
    
    // Get user from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user.progress
    });
  } catch (error) {
    console.error('Error in getUserProgress:', error);
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
  getUserProgress,
  getRecommendations // Exporting this explicitly though it was implicit in logic
};