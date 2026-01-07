export type PedagogicalPhase = 1 | 2 | 3 | 4 | 5;

export interface Season {
  id: string;          // ID seguro para CMS (ex: 'season-01')
  order: number;       // Ordem de exibição Netflix-style
  title: string;       // Título da Temporada
  phase: PedagogicalPhase; // Fase pedagógica (1 a 5)
  description: string; // Descrição lúdica para crianças e leigos
  ageRange: string;    // Faixa etária (ex: '7+')
  status: 'draft' | 'published' | 'archived'; // Controle de publicação
  coverImage?: string; // Campo opcional para capa (Netflix style)
  featured?: boolean;  // Campo para destaque (curadoria / IA)
}

export interface SeasonModule {
  id: string;
  seasonId: string;
  order: number;
  title: string;
}

export interface Mission {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  contentType: 'video' | 'interactive' | 'quiz';
  xp: number;
}

export interface CompletedMission {
  missionId: string;
  completedAt: string; // ISO date
  score: number;
  attempts: number;
}

export interface AIContext {
  xp: number; // base real de progressão
  completedMissions: CompletedMission[];
  difficultyPreference: 'easy' | 'medium' | 'hard';
}

export interface MissionModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  seasonId: string;
  state: 'locked' | 'available' | 'completed';
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
}