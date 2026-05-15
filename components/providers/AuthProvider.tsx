"use client";
import React, { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useUser } from "@/lib/store/user";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUser((state) => state.setUser);
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          // Fetch full user profile from our DB
          const res = await fetch("/api/user");
          const dbUser = await res.json();
          
          if (dbUser && !dbUser.error) {
            setUser({
              id: dbUser.id,
              email: dbUser.email,
              display_name: dbUser.profile?.firstName 
                ? `${dbUser.profile.firstName} ${dbUser.profile.lastName || ""}` 
                : session.user.user_metadata.display_name || session.user.email?.split("@")[0],
              image_url: dbUser.profile?.avatar || session.user.user_metadata.avatar_url || "",
              role: dbUser.role || "VIEWER",
              created_at: dbUser.createdAt,
            } as any);
          } else {
            // Fallback to supabase user if DB fetch fails
            setUser({
              id: session.user.id,
              email: session.user.email!,
              display_name: session.user.user_metadata.display_name || session.user.email?.split("@")[0],
              image_url: session.user.user_metadata.avatar_url || "",
              role: "VIEWER",
              created_at: session.user.created_at,
            } as any);
          }
        } catch (error) {
          console.error("Failed to sync user with DB", error);
        }
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, setUser]);

  return <>{children}</>;
}
