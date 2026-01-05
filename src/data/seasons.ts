// BACKEND-READY DATA STRUCTURE
// 50 Seasons with proper CMS-friendly IDs

import { Season, SeasonModule, Mission } from '../types';

// SEASONS - 50 temporadas principais
export const seasons: Season[] = [
  {
    id: 'season-001',
    order: 1,
    title: 'Fundamentos de IA',
    phase: 1,
    description: 'Introdução aos conceitos básicos de Inteligência Artificial'
  },
  {
    id: 'season-002',
    order: 2,
    title: 'Criatividade com IA',
    phase: 1,
    description: 'Explorando a criatividade através da inteligência artificial'
  },
  {
    id: 'season-003',
    order: 3,
    title: 'IA no Cotidiano',
    phase: 2,
    description: 'Aplicações práticas de IA no dia a dia'
  },
  {
    id: 'season-004',
    order: 4,
    title: 'IA e Jogos',
    phase: 2,
    description: 'Inteligência artificial aplicada ao desenvolvimento de jogos'
  },
  {
    id: 'season-005',
    order: 5,
    title: 'IA Avançada e Ética',
    phase: 3,
    description: 'Tópicos avançados e considerações éticas sobre IA'
  },
  // Temporadas 6-50 (estrutura básica)
  ...Array.from({ length: 45 }, (_, i) => ({
    id: `season-${String(i + 6).padStart(3, '0')}`,
    order: i + 6,
    title: `Temporada ${(i + 6).toString().padStart(2, '0')}`,
    phase: Math.floor((i + 6 - 1) / 10) + 1,
    description: `Conteúdo educativo avançado ${(i + 6).toString().padStart(2, '0')}`
  }))
];

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