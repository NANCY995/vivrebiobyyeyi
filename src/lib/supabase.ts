let client: any = null;

export async function getSupabase() {
  if (!client) {
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
}
