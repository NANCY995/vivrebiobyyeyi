import { getSupabase } from './supabase';

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  email_confirmed_at: string | null;
  created_at: string;
  updated_at: string;
  role: string;
  // Profile fields
  full_name?: string;
  avatar_url?: string;
}

// Auth state
export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  session: any; // Supabase session
}

// Auth context initial state
export const initialAuthState: AuthState = {
  user: null,
  loading: true,
  session: null
};

// Sign up with email/password
export async function signUp(email: string, password: string, options: { full_name?: string } = {}) {
  const supabase = await getSupabase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: options.full_name || ''
      }
    }
  });
  
  if (error) throw error;
  return data;
}

// Sign in with email/password
export async function signIn(email: string, password: string) {
  const supabase = await getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
}

// Sign out
export async function signOut() {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Reset password
export async function resetPassword(email: string) {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });
  
  if (error) throw error;
}

// Update password
export async function updatePassword(password: string) {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}

// Update user profile
export async function updateProfile(updates: { 
  full_name?: string;
  avatar_url?: string;
}) {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', (await supabase.auth.getUser()).data.user?.id);
  
  if (error) throw error;
  return data;
}

// Get current user profile
export async function getProfile(userId: string) {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 means no rows found
  return data;
}

// Initialize auth state listener
export function setupAuthListener(callback: (state: AuthState) => void) {
  let subscription: { unsubscribe: () => void } | null = null;

  const init = async () => {
    const supabase = await getSupabase();
    const { data: { session } } = await supabase.auth.getSession();

    const initialState: AuthState = {
      user: session?.user ? {
        id: session.user.id,
        email: session.user.email!,
        email_confirmed_at: session.user.email_confirmed_at,
        created_at: session.user.created_at,
        updated_at: session.user.updated_at,
        role: session.user.role!,
        full_name: session.user.user_metadata?.full_name,
        avatar_url: session.user.user_metadata?.avatar_url
      } : null,
      loading: false,
      session
    };

    callback(initialState);

    const { data: { subscription: sub } } = supabase.auth.onAuthStateChange((_event: string, session: unknown) => {
      const s = session as any;
      const newState: AuthState = {
        user: s?.user ? {
          id: s.user.id,
          email: s.user.email!,
          email_confirmed_at: s.user.email_confirmed_at,
          created_at: s.user.created_at,
          updated_at: s.user.updated_at,
          role: s.user.role!,
          full_name: s.user.user_metadata?.full_name,
          avatar_url: s.user.user_metadata?.avatar_url
        } : null,
        loading: false,
        session: s
      };
      callback(newState);
    });

    subscription = sub;
  };

  init();

  return () => {
    subscription?.unsubscribe();
  };
}