export type PedagogicalPhase = 1 | 2 | 3 | 4 | 5;

export interface Season {
  id: string;          // UUID / CMS-friendly
  order: number;       // ordem da temporada
  title: string;
  phase: PedagogicalPhase;
  description: string;
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