import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// ✅ Verdadeiro quando as variáveis existem
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// 🧸 Um “supabase de mentirinha” que NÃO quebra o site.
// Ele só devolve erro quando alguém tenta usar.
function makeSafeStub() {
  const fail = async () => ({
    data: null,
    error: new Error(
      'Supabase não está configurado no deploy. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no Vercel e faça Redeploy sem cache.'
    ),
  })

  return {
    // Tabelas: supabase.from('tabela').select(...)
    from: () => ({
      select: fail,
      insert: fail,
      update: fail,
      delete: fail,
      upsert: fail,
      eq: () => ({ select: fail }),
    }),

    // Edge Functions: supabase.functions.invoke('nome', {...})
    functions: {
      invoke: fail,
    },

    // Auth (se algo tentar usar)
    auth: {
      getSession: fail,
      signInWithPassword: fail,
      signOut: fail,
    },
  } as any
}

// ✅ Se tiver variáveis: cria Supabase normal.
// ✅ Se NÃO tiver: usa o stub (não quebra a tela).
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : makeSafeStub()
