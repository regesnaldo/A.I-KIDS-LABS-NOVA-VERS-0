export type MissionModule = {
  id: string | number;
  titulo: string;
  title?: string;
  descricao?: string;
  description?: string;
  duracao?: string;
  completed?: boolean;
  locked?: boolean;
  thumb?: string;
  video_url?: string;
  videoUrl?: string;
  category?: string;
  thumbnailUrl?: string;
  duration?: string;
  difficulty?: string;
  state?: string;
  seasonId?: string;
};

export type Season = {
  id: string | number;
  titulo?: string;
  title?: string;
  descricao?: string;
  description?: string;
  imagem?: string;
  image?: string;
  ageRange?: string;
  missions?: MissionModule[];
  order?: number;
  phase?: number | string;
  status?: string;
  coverImage?: string;
  featured?: boolean;
};

export type PedagogicalPhase = 1 | 2 | 3 | 4 | 5;

export type SeasonModule = {
  id: string;
  seasonId: string | number;
  order: number;
  title: string;
};

export type Mission = {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  contentType: 'video' | 'interactive' | 'quiz';
  xp: number;
};

export type AIContext = {
  xp: number;
  difficultyPreference: 'easy' | 'medium' | 'hard';
  completedMissions: {
    missionId: string;
    score: number;
    attempts: number;
  }[];
};
