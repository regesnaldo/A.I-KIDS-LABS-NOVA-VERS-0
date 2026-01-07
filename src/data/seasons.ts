// BACKEND-READY DATA STRUCTURE
// 50 Seasons with proper CMS-friendly IDs

import { Season, SeasonModule, Mission, PedagogicalPhase } from '../types';

// SEASONS - 50 temporadas principais
export const seasons: Season[] = [
  {
    id: 'season-001',
    order: 1, // Explicitly set to 1 as requested
    title: 'Fundamentos de IA',
    phase: 1,
    description: 'Introdução aos conceitos básicos de Inteligência Artificial',
    ageRange: '7+',
    status: 'published', // Set to published as requested
    coverImage: '/images/season-001-cover.jpg',
    featured: true
  },
  {
    id: 'season-002',
    order: 2,
    title: 'Criatividade com IA',
    phase: 1,
    description: 'Explorando a criatividade através da inteligência artificial',
    ageRange: '7+',
    status: 'published',
    coverImage: '/images/season-002-cover.jpg',
    featured: false
  },
  {
    id: 'season-003',
    order: 3,
    title: 'IA no Cotidiano',
    phase: 2,
    description: 'Aplicações práticas de IA no dia a dia',
    ageRange: '7+',
    status: 'published',
    coverImage: '/images/season-003-cover.jpg',
    featured: false
  },
  {
    id: 'season-004',
    order: 4,
    title: 'IA e Jogos',
    phase: 2,
    description: 'Inteligência artificial aplicada ao desenvolvimento de jogos',
    ageRange: '7+',
    status: 'published',
    coverImage: '/images/season-004-cover.jpg',
    featured: false
  },
  {
    id: 'season-005',
    order: 5,
    title: 'IA Avançada e Ética',
    phase: 3,
    description: 'Tópicos avançados e considerações éticas sobre IA',
    ageRange: '9+',
    status: 'published',
    coverImage: '/images/season-005-cover.jpg',
    featured: false
  }
];

// Add seasons 6-50 programmatically
for (let i = 5; i < 49; i++) { // i = 5 to 49 corresponds to seasons 6-50
  const seasonIndex = i + 1; // This will be 6-50
  const phaseValue = Math.floor((seasonIndex - 1) / 10) + 1;
  const validPhase = Math.min(Math.max(phaseValue, 1), 5) as PedagogicalPhase;
  
  seasons.push({
    id: `season-${String(seasonIndex).padStart(3, '0')}`,
    order: seasonIndex,
    title: `Temporada ${seasonIndex.toString().padStart(2, '0')}`,
    phase: validPhase,
    description: `Conteúdo educativo avançado ${seasonIndex.toString().padStart(2, '0')}`,
    ageRange: seasonIndex > 30 ? '12+' : '9+',
    status: 'published',
    coverImage: `/images/season-${String(seasonIndex).padStart(3, '0')}-cover.jpg`,
    featured: false
  });
}

// SEASON MODULES - 10 módulos por temporada (500 total)
export const seasonModules: SeasonModule[] = [];

// Generate modules for each season
seasons.forEach(season => {
  for (let i = 1; i <= 10; i++) {
    seasonModules.push({
      id: `${season.id}-mod-${String(i).padStart(2, '0')}`,
      seasonId: season.id,
      order: i,
      title: `Módulo ${String.fromCharCode(64 + i)}`
    });
  }
});

// MISSIONS - Conteúdo educativo com gamificação
export const missions: Mission[] = [];

// Generate missions for each module
seasonModules.forEach(module => {
  // 5 missions per module (2500 total missions)
  for (let i = 1; i <= 5; i++) {
    const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
    const contentTypes: Array<'video' | 'interactive' | 'quiz'> = ['video', 'interactive', 'quiz'];
    
    missions.push({
      id: `${module.id}-mission-${String(i).padStart(2, '0')}`,
      moduleId: module.id,
      order: i,
      title: `Missão ${String.fromCharCode(64 + i)} - ${module.title}`,
      difficulty: difficulties[(i - 1) % 3],
      contentType: contentTypes[(i - 1) % 3],
      xp: 100 + (i * 50) // XP increases with mission number
    });
  }
});