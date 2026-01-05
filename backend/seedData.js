const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Module = require('./models/Module');

dotenv.config();

const modulesData = [];

// Generate 50 modules with different phases and age ranges
for (let i = 1; i <= 50; i++) {
  // Determine phase based on module number
  const phase = Math.floor((i - 1) / 10) + 1;
  
  // Determine age range based on phase
  let ageRange = '5-7';
  if (phase >= 3) ageRange = '8-10';
  if (phase >= 5) ageRange = '11-12';
  
  // Determine difficulty based on phase
  let difficulty = 'easy';
  if (phase >= 3) difficulty = 'medium';
  if (phase >= 5) difficulty = 'hard';
  
  // Generate quiz questions for each module
  const quizzes = [];
  for (let q = 1; q <= 5; q++) {
    const questionType = Math.random() > 0.5 ? 'multiple-choice' : 'true-false';
    const difficultyLevel = Math.random() > 0.7 ? 'hard' : Math.random() > 0.5 ? 'medium' : 'easy';
    
    if (questionType === 'multiple-choice') {
      quizzes.push({
        question: `Pergunta ${q} do módulo ${i}: Qual é a resposta correta?`,
        options: [
          { text: 'Opção A', isCorrect: false },
          { text: 'Opção B', isCorrect: false },
          { text: 'Opção C', isCorrect: Math.random() > 0.5 },
          { text: 'Opção D', isCorrect: false }
        ],
        type: 'multiple-choice',
        difficulty: difficultyLevel
      });
    } else {
      // True/false question
      quizzes.push({
        question: `Pergunta ${q} do módulo ${i}: Esta afirmação é verdadeira ou falsa?`,
        options: [
          { text: 'Verdadeiro', isCorrect: Math.random() > 0.5 },
          { text: 'Falso', isCorrect: Math.random() < 0.5 }
        ],
        type: 'true-false',
        difficulty: difficultyLevel
      });
    }
  }
  
  // Define skills based on phase
  const skills = [];
  if (phase <= 2) {
    skills.push('Lógica Básica', 'Matemática Simples', 'Leitura Inicial');
  } else if (phase <= 4) {
    skills.push('Raciocínio Lógico', 'Matemática Intermediária', 'Compreensão Leitura');
  } else {
    skills.push('Pensamento Crítico', 'Matemática Avançada', 'Resolução Problemas');
  }
  
  // Define tags based on content
  const tags = ['educacional', 'interativo', 'aprendizado'];
  if (phase <= 2) tags.push('iniciante', 'básico');
  if (phase >= 3 && phase <= 4) tags.push('intermediário');
  if (phase >= 5) tags.push('avançado', 'desafio');
  
  modulesData.push({
    id: `module-${String(i).padStart(3, '0')}`,
    title: `Módulo ${i}: ${getModuleTitle(i, phase)}`,
    description: `Conteúdo educativo para a fase ${phase} - ${getModuleDescription(i, phase)}`,
    ageRange,
    difficulty,
    duration: `${Math.floor(Math.random() * 10) + 5} min`,
    videoUrl: `/videos/module-${String(i).padStart(3, '0')}.mp4`,
    thumbnailUrl: `/images/module-${String(i).padStart(3, '0')}-thumb.jpg`,
    phase,
    seasonId: `season-${String(Math.floor((i-1)/5) + 1).padStart(2, '0')}`,
    quizzes,
    skills,
    tags,
    isActive: true
  });
}

function getModuleTitle(moduleNumber, phase) {
  const titles = [
    'Introdução à Lógica',
    'Matemática Básica',
    'Raciocínio Lógico',
    'Geometria Simples',
    'Álgebra Inicial',
    'Ciências da Natureza',
    'História Divertida',
    'Geografia Interativa',
    'Português Criativo',
    'Inglês Prático'
  ];
  
  const baseTitle = titles[phase - 1] || 'Conteúdo Educacional';
  return `${baseTitle} - Parte ${moduleNumber}`;
}

function getModuleDescription(moduleNumber, phase) {
  const descriptions = [
    'Introdução aos conceitos básicos de lógica e raciocínio',
    'Fundamentos da matemática para crianças',
    'Exercícios de raciocínio lógico e matemático',
    'Formas, figuras e conceitos geométricos',
    'Introdução à álgebra e padrões matemáticos',
    'Explorando o mundo natural e científico',
    'Aventuras históricas para jovens aprendizes',
    'Conhecendo nosso planeta e continentes',
    'Desenvolvimento da linguagem e leitura',
    'Primeiros passos no idioma inglês'
  ];
  
  const baseDesc = descriptions[phase - 1] || 'Conteúdo educativo interativo';
  return `${baseDesc} - Módulo ${moduleNumber} da Fase ${phase}`;
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-kids-labs', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedModules = async () => {
  try {
    // Clear existing modules
    await Module.deleteMany({});
    console.log('Cleared existing modules');
    
    // Insert new modules
    await Module.insertMany(modulesData);
    console.log(`Inserted ${modulesData.length} modules`);
    
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB().then(seedModules);