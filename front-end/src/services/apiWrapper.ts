import { seasonsAPI, modulesAPI, authAPI, recommendationsAPI, chatAPI } from './api';
import { localDataAPI } from './localData';
import type { Season, MissionModule } from '../types';

// Enhanced API wrapper with fallback mechanism
class APIService {
  private useFallback = false;

  constructor() {
    this.detectSupabaseAvailability();
  }

  private async detectSupabaseAvailability() {
    try {
      // Test Supabase connectivity with a simple query
      await Promise.race([
        seasonsAPI.getAll().then(() => {
          this.useFallback = false;
          console.log('✅ Supabase connection successful');
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('timeout')), 3000)
        )
      ]);
    } catch (error) {
      console.warn('⚠️ Supabase unavailable, switching to local data mode:', error);
      this.useFallback = true;
    }
  }

  // Seasons API with fallback
  async getAllSeasons(): Promise<Season[]> {
    try {
      if (this.useFallback) {
        return await localDataAPI.getAllSeasons();
      }
      
      const supabaseData = await seasonsAPI.getAll();
      return supabaseData.map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
        image: row.image ?? undefined,
        status: 'published'
      }));
    } catch (error) {
      console.error('Failed to fetch seasons, using local data:', error);
      return await localDataAPI.getAllSeasons();
    }
  }

  async getSeasonWithMissions(seasonId: string): Promise<{ season: Season; missions: MissionModule[] }> {
    try {
      if (this.useFallback) {
        const season = await localDataAPI.getSeasonById(seasonId);
        if (!season) throw new Error('Season not found');
        
        const missions = await localDataAPI.getMissionsBySeason(seasonId);
        return { season, missions };
      }

      const result = await seasonsAPI.getSeasonWithMissions(seasonId);
      const season: Season = {
        id: result.season.id,
        title: result.season.title,
        description: result.season.description,
        image: result.season.image ?? undefined,
        status: 'published'
      };
      
      const missions: MissionModule[] = result.missions.map(m => ({
        id: m.id,
        titulo: m.titulo,
        title: m.titulo,
        description: m.description,
        descricao: m.description,
        thumb: m.thumb ?? undefined,
        locked: m.locked,
        seasonId: m.season_id
      }));

      return { season, missions };
    } catch (error) {
      console.error('Failed to fetch season data, using local fallback:', error);
      const season = await localDataAPI.getSeasonById(seasonId);
      if (!season) throw new Error('Season not found');
      
      const missions = await localDataAPI.getMissionsBySeason(seasonId);
      return { season, missions };
    }
  }

  // Modules/Missions API with fallback
  async getAllModules(): Promise<MissionModule[]> {
    try {
      if (this.useFallback) {
        return await localDataAPI.getAllModules();
      }
      
      const modules = await modulesAPI.getAllModules();
      return modules.map(m => ({
        id: m.id,
        titulo: m.titulo,
        title: m.titulo,
        description: m.description,
        descricao: m.description,
        thumb: m.thumb ?? undefined,
        locked: m.locked,
        seasonId: m.season_id
      }));
    } catch (error) {
      console.error('Failed to fetch modules, using local data:', error);
      return await localDataAPI.getAllModules();
    }
  }

  async getModuleById(id: string): Promise<MissionModule | null> {
    try {
      if (this.useFallback) {
        // In local mode, we'd need to search through all modules
        const allModules = await this.getAllModules();
        return allModules.find(m => m.id === id) ?? null;
      }
      
      const module = await modulesAPI.getModuleById(id);
      if (!module) return null;
      
      return {
        id: module.id,
        titulo: module.titulo,
        title: module.titulo,
        description: module.description,
        descricao: module.description,
        thumb: module.thumb ?? undefined,
        locked: module.locked,
        seasonId: module.season_id
      };
    } catch (error) {
      console.error('Failed to fetch module, using local search:', error);
      const allModules = await this.getAllModules();
      return allModules.find(m => m.id === id) ?? null;
    }
  }

  // Auth API (no fallback needed - auth should work or fail)
  get auth() {
    return authAPI;
  }

  // Recommendations API with fallback
  async getRecommendations(): Promise<MissionModule[]> {
    try {
      if (this.useFallback) {
        // Return some sample modules as recommendations
        const allModules = await this.getAllModules();
        return allModules.slice(0, 12);
      }
      
      const result = await recommendationsAPI.getRecommendations();
      // Type guard to check if result has success property
      if (Array.isArray(result)) {
        return result as MissionModule[];
      }
      throw new Error('Failed to fetch recommendations');
    } catch (error) {
      console.error('Failed to fetch recommendations, using local data:', error);
      const allModules = await this.getAllModules();
      return allModules.slice(0, 12);
    }
  }

  // Chat API with graceful degradation
  async sendMessage(message: string, context: Record<string, unknown> = {}) {
    try {
      if (this.useFallback) {
        // Simulate AI response in local mode
        return {
          success: true,
          data: {
            message: `Olá! Eu sou o assistente do A.I. KIDS LABS. Você perguntou: "${message}". Como posso ajudar você hoje?`,
            timestamp: new Date().toISOString()
          }
        };
      }
      
      return await chatAPI.sendMessage(message, context);
    } catch (error) {
      console.error('Chat API failed, using simulated response:', error);
      return {
        success: true,
        data: {
          message: `Olá! Eu sou o assistente do A.I. KIDS LABS. Você perguntou: "${message}". Como posso ajudar você hoje?`,
          timestamp: new Date().toISOString()
        }
      };
    }
  }

  // Utility method to check current mode
  getCurrentMode(): 'supabase' | 'local' {
    return this.useFallback ? 'local' : 'supabase';
  }

  // Force mode switching for testing
  setMode(mode: 'supabase' | 'local') {
    this.useFallback = mode === 'local';
  }
}

// Export singleton instance
export const apiService = new APIService();

// Re-export individual APIs for backward compatibility
export { authAPI, seasonsAPI, modulesAPI, recommendationsAPI, chatAPI };