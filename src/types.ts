export interface Season {
  id: string;          // UUID / CMS-friendly
  order: number;       // ordem da temporada
  title: string;
  phase: number;
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