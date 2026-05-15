"use client";
import React, { useEffect, useState } from "react";
import { User as UserIcon, MapPin, Calendar, Camera, Shield, Bell, ChevronRight, Settings as SettingsIcon, Heart, Bookmark, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/lib/store/user";

export default function ProfilePage() {
  const user = useUser((state) => state.user);
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setDbUser(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchProfile();
    else setLoading(false);
  }, [user]);

  if (loading) return (
    <div className="min-h-screen bg-[#FFFAF5] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#C06350] animate-spin" />
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-[#FFFAF5] flex flex-col items-center justify-center space-y-4">
      <p className="text-[#2D241E]/50 font-medium">Please sign in to view your profile</p>
      <Link href="/auth/login" className="px-6 py-2 bg-[#C06350] text-white rounded-xl font-bold text-sm hover:bg-[#A85544] transition-all">
        Log In
      </Link>
    </div>
  );

  const displayName = dbUser?.profile?.firstName 
    ? `${dbUser.profile.firstName} ${dbUser.profile.lastName || ""}` 
    : user.display_name;

  return (
    <div className="page-container max-w-2xl pt-24 pb-12">
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="flex items-end gap-6 pb-2">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-[#F9F1ED] border-4 border-white shadow-sm overflow-hidden flex items-center justify-center relative">
              {user.image_url ? (
                <Image src={user.image_url} alt="Profile" fill className="object-cover" />
              ) : (
                <UserIcon className="w-10 h-10 text-[#C06350]/20" />
              )}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-[#C06350] text-white rounded-full shadow-lg hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 space-y-1">
            <h1 className="text-3xl font-bold text-[#2D241E] font-montserrat tracking-tight">
              {displayName}
            </h1>
            <div className="flex items-center gap-3 text-[#2D241E]/50 text-sm font-medium">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#C06350]" /> Abuja, FCT</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#C06350]" /> Joined {new Date(user.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
          <Link href="/settings" className="p-2.5 bg-white border border-[#C06350]/10 text-[#C06350] rounded-xl hover:bg-[#F9F1ED] transition-colors">
            <SettingsIcon className="w-5 h-5" />
          </Link>
        </div>

        {/* Real Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-[#C06350]/5 text-center">
            <p className="text-xl font-bold text-[#2D241E]">{dbUser?.bookmarks?.length || 0}</p>
            <p className="text-[10px] font-bold text-[#C06350] uppercase tracking-widest mt-1">Bookmarks</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#C06350]/5 text-center">
            <p className="text-xl font-bold text-[#2D241E]">0</p>
            <p className="text-[10px] font-bold text-[#C06350] uppercase tracking-widest mt-1">RSVPed</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#C06350]/5 text-center">
            <p className="text-xl font-bold text-[#2D241E]">0</p>
            <p className="text-[10px] font-bold text-[#C06350] uppercase tracking-widest mt-1">Contributions</p>
          </div>
        </div>

        {/* Section: Activity Preview */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-[#2D241E]/40 uppercase tracking-widest ml-1">My Activity</h2>
          <div className="bg-white rounded-3xl border border-[#C06350]/10 overflow-hidden divide-y divide-[#C06350]/5">
            <Link href="/profile/bookmarks" className="flex items-center justify-between p-5 hover:bg-[#F9F1ED]/30 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#C06350]/5 text-[#C06350] flex items-center justify-center">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2D241E]">Saved Places</p>
                  <p className="text-xs text-[#2D241E]/40">View and manage your favorite spots</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#2D241E]/20 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link href="/settings/security" className="flex items-center justify-between p-5 hover:bg-[#F9F1ED]/30 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2D241E]/5 text-[#2D241E] flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2D241E]">Security & Privacy</p>
                  <p className="text-xs text-[#2D241E]/40">Manage your account protection</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#2D241E]/20 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Action: Log Out */}
        <button 
          onClick={() => {
            const supabase = require("@supabase/ssr").createBrowserClient(
              process.env.NEXT_PUBLIC_SUPABASE_URL!,
              process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );
            supabase.auth.signOut().then(() => window.location.href = "/");
          }}
          className="w-full py-4 text-[#C06350] font-bold text-sm border border-[#C06350]/20 rounded-2xl hover:bg-[#C06350]/5 transition-colors"
        >
          Sign Out of Account
        </button>
      </div>
    </div>
  );
}
