import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

type AuthState = {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  supabase?: SupabaseClient | undefined;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseClient = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : undefined;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseClient) {
      setUser(null);
      setLoading(false);
      return;
    }

    let mounted = true;

    supabaseClient.auth.getSession().then((res) => {
      if (!mounted) return;
      setUser(res.data?.session?.user ?? null);
      setLoading(false);
    }).catch(() => {
      if (!mounted) return;
      setUser(null);
      setLoading(false);
    });

    const subscription = supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      try {
        (subscription as any)?.data?.subscription?.unsubscribe?.();
      } catch {
        try { (subscription as any)?.unsubscribe?.(); } catch { /* ignore */ }
      }
    };
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), loading, supabase: supabaseClient }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
