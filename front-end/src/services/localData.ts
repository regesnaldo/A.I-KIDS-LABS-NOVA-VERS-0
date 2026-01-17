import { seasons } from '../data/seasons';
import type { Season, MissionModule } from '../types';

// Local data service as fallback when Supabase is unavailable
export const localDataAPI = {
  getAllSeasons: async (): Promise<Season[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Transform seasons data to match API response format
    return seasons.map(season => ({
      id: season.id,
      title: season.title || '',
      description: season.description || '',
      image: season.coverImage || season.image || undefined,
      status: season.status || 'published',
      featured: season.featured || false,
      order: season.order,
      phase: season.phase,
      ageRange: season.ageRange
    })).filter(season => season.status === 'published');
  },

  getSeasonById: async (id: string): Promise<Season | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const season = seasons.find(s => s.id === id);
    if (!season) return null;
    
    return {
      id: season.id,
      title: season.title || '',
      description: season.description || '',
      image: season.coverImage || season.image || undefined,
      status: season.status || 'published',
      featured: season.featured || false,
      order: season.order,
      phase: season.phase,
      ageRange: season.ageRange
    };
  },

  getMissionsBySeason: async (seasonId: string): Promise<MissionModule[]> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    // Generate sample missions for the season
    const missions: MissionModule[] = [];
    for (let i = 1; i <= 5; i++) {
      missions.push({
        id: `${seasonId}-mission-${i}`,
        titulo: `Missão ${i}: ${seasons.find(s => s.id === seasonId)?.title || 'Aventura'}`,
        title: `Missão ${i}: ${seasons.find(s => s.id === seasonId)?.title || 'Aventura'}`,
        description: `Explore conceitos avançados de ${seasons.find(s => s.id === seasonId)?.title || 'tecnologia'}`,
        descricao: `Explore conceitos avançados de ${seasons.find(s => s.id === seasonId)?.title || 'tecnologia'}`,
        duration: '10 min',
        duracao: '10 min',
        difficulty: i <= 2 ? 'easy' : i <= 4 ? 'medium' : 'hard',
        locked: i > 3, // Lock advanced missions
        thumb: `https://picsum.photos/400/225?random=${seasonId}-${i}`,
        videoUrl: `https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4`,
        category: 'IA Education',
        seasonId: seasonId,
        state: i <= 3 ? 'available' : 'locked'
      });
    }
    
    return missions;
  },

  getAllModules: async (): Promise<MissionModule[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const allModules: MissionModule[] = [];
    
    // Get first 5 seasons and their missions
    const activeSeasons = seasons.slice(0, 5);
    
    for (const season of activeSeasons) {
      const missions = await localDataAPI.getMissionsBySeason(season.id as string);
      allModules.push(...missions);
    }
    
    return allModules;
  }
};