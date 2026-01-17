import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

type AuthResponse =
  | { success: true; token: string; user: { id: string; email: string; name?: string | null } }
  | { success: false; error: string };

const toAuthUser = (user: User) => ({
  id: user.id,
  email: user.email ?? '',
  name: (user.user_metadata?.name as string | undefined) ?? null,
});

export const authAPI = {
  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error || !data.session || !data.user) {
      return { success: false, error: error?.message ?? 'Falha no login' };
    }
    return { success: true, token: data.session.access_token, user: toAuthUser(data.user) };
  },
  register: async (userData: { name?: string; email: string; password: string }): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: { data: { name: userData.name } },
    });
    if (error || !data.user) {
      return { success: false, error: error?.message ?? 'Falha no cadastro' };
    }
    const token = data.session?.access_token ?? '';
    return { success: true, token, user: toAuthUser(data.user) };
  },
  logout: async (): Promise<{ success: true } | { success: false; error: string }> => {
    const { error } = await supabase.auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  getSession: async (): Promise<Session | null> => {
    const { data } = await supabase.auth.getSession();
    return data.session ?? null;
  },
};

type SeasonRow = {
  id: string;
  title: string;
  description: string;
  image: string | null;
};

type MissionRow = {
  id: string;
  season_id: string;
  numero: number;
  titulo: string;
  description: string;
  thumb: string | null;
  locked: boolean;
};

export const seasonsAPI = {
  getAll: async (): Promise<SeasonRow[]> => {
    const { data, error } = await supabase
      .from('seasons')
      .select('id,title,description,image')
      .order('id', { ascending: true });
    if (error) throw error;
    return data ?? [];
  },
  getSeasonWithMissions: async (
    seasonId: string
  ): Promise<{ season: SeasonRow; missions: MissionRow[] }> => {
    const { data: season, error: seasonError } = await supabase
      .from('seasons')
      .select('id,title,description,image')
      .eq('id', seasonId)
      .single();
    if (seasonError || !season) throw seasonError ?? new Error('Temporada não encontrada');

    const { data: missions, error: missionsError } = await supabase
      .from('missions')
      .select('id,season_id,numero,titulo,description,thumb,locked')
      .eq('season_id', seasonId)
      .order('numero', { ascending: true });
    if (missionsError) throw missionsError;

    return { season, missions: missions ?? [] };
  },
};

export const recommendationsAPI = {
  getRecommendations: async (): Promise<MissionRow[]> => {
    const { data, error } = await supabase
      .from('missions')
      .select('id,season_id,numero,titulo,description,thumb,locked')
      .eq('locked', false)
      .order('numero', { ascending: true })
      .limit(12);
    if (error) throw error;
    return data ?? [];
  },
};

export const modulesAPI = {
  getAllModules: async (): Promise<MissionRow[]> => {
    const { data, error } = await supabase
      .from('missions')
      .select('id,season_id,numero,titulo,description,thumb,locked')
      .order('season_id', { ascending: true })
      .order('numero', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },
  getModuleById: async (id: string): Promise<MissionRow | null> => {
    const { data, error } = await supabase
      .from('missions')
      .select('id,season_id,numero,titulo,description,thumb,locked')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ?? null;
  },
  getRecommendations: async (): Promise<{ success: true; data: unknown[] } | { success: false; error: string }> => {
    try {
      const data = await recommendationsAPI.getRecommendations();
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : 'Falha ao buscar recomendações' };
    }
  },
};

export const chatAPI = {
  sendMessage: async (
    message: string,
    context: Record<string, unknown> = {}
  ): Promise<{ success: true; data: { message: string; timestamp: string } } | { success: false; error: string }> => {
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { message, context },
    });
    if (error) return { success: false, error: error.message };
    if (!data || typeof data !== 'object') return { success: false, error: 'Resposta inválida' };
    const dataObj = data as { message?: unknown; timestamp?: unknown };
    if (typeof dataObj.message !== 'string') return { success: false, error: 'Resposta inválida' };
    return {
      success: true,
      data: {
        message: dataObj.message,
        timestamp: typeof dataObj.timestamp === 'string' ? dataObj.timestamp : new Date().toISOString(),
      },
    };
  },
};
