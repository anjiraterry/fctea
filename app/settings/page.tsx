"use client";
import React, { useEffect, useState } from "react";
import { User as UserIcon, Mail, Shield, Bell, Moon, Smartphone, Globe, ArrowLeft, Loader2, Save, ChevronRight, HelpCircle, Trash2, Key } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/store/user";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const user = useUser((state) => state.user);
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [preferences, setPreferences] = useState<any>({
    theme: "light",
    notifications: true,
    language: "en"
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data.profile) {
          setFirstName(data.profile.firstName || "");
          setLastName(data.profile.lastName || "");
          setBio(data.profile.bio || "");
        }
        if (data.preferences) {
          setPreferences(data.preferences);
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchSettings();
    else setLoading(false);
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          bio,
          preferences,
        }),
      });
      
      if (res.ok) {
        toast({ title: "Settings saved", description: "Your profile has been updated successfully." });
        router.refresh();
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({ title: "Error", description: "Could not save settings. Please try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FFFAF5] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#C06350] animate-spin" />
    </div>
  );

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be wiped.")) {
      return;
    }
    
    setSaving(true);
    try {
      // Logic for deleting from Prisma and then Supabase
      const res = await fetch("/api/user", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete account data");
      
      const supabase = (await import("@supabase/ssr")).createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-container max-w-2xl pt-24 pb-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/profile" className="p-2 hover:bg-[#F9F1ED] rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#2D241E]" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#2D241E] font-montserrat tracking-tight">Settings</h1>
            <p className="text-[#2D241E]/40 text-xs font-medium uppercase tracking-widest mt-1">Manage your experience</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {/* Section: Profile Info */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-[#2D241E]/40 uppercase tracking-widest ml-1">Public Profile</h2>
            <div className="bg-white rounded-3xl p-6 border border-[#C06350]/10 space-y-4 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#2D241E]/40 uppercase tracking-widest ml-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F9F1ED]/50 border border-transparent focus:border-[#C06350]/20 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#2D241E]/40 uppercase tracking-widest ml-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F9F1ED]/50 border border-transparent focus:border-[#C06350]/20 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#2D241E]/40 uppercase tracking-widest ml-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#F9F1ED]/50 border border-transparent focus:border-[#C06350]/20 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium resize-none"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-3 bg-[#C06350] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save Profile</>}
              </button>
            </div>
          </div>

          {/* Section: Account & Security */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-[#2D241E]/40 uppercase tracking-widest ml-1">Account & Security</h2>
            <div className="bg-white rounded-3xl border border-[#C06350]/10 overflow-hidden divide-y divide-[#C06350]/5 shadow-sm">
              <Link href="/settings/security" className="flex items-center justify-between p-5 hover:bg-[#F9F1ED]/30 transition-colors group">
                <div className="flex items-center gap-4">
                  <Key className="w-5 h-5 text-[#C06350]" />
                  <div>
                    <p className="text-sm font-bold text-[#2D241E]">Change Password</p>
                    <p className="text-xs text-[#2D241E]/40">Update your security credentials</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#2D241E]/20 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <Bell className="w-5 h-5 text-[#C06350]" />
                  <div>
                    <p className="text-sm font-bold text-[#2D241E]">Notifications</p>
                    <p className="text-xs text-[#2D241E]/40">Alerts for hot spots & events</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPreferences({ ...preferences, notifications: !preferences.notifications })}
                  className={`w-10 h-6 rounded-full transition-colors relative p-1 ${preferences.notifications ? "bg-[#C06350]" : "bg-[#F9F1ED]"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${preferences.notifications ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Section: Support & Info */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-[#2D241E]/40 uppercase tracking-widest ml-1">Support & Privacy</h2>
            <div className="bg-white rounded-3xl border border-[#C06350]/10 overflow-hidden divide-y divide-[#C06350]/5 shadow-sm">
              <Link href="/settings/support" className="flex items-center justify-between p-5 hover:bg-[#F9F1ED]/30 transition-colors group">
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-5 h-5 text-[#C06350]" />
                  <div>
                    <p className="text-sm font-bold text-[#2D241E]">Contact Support</p>
                    <p className="text-xs text-[#2D241E]/40">Get help with your account</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#2D241E]/20 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button 
                onClick={handleDeleteAccount}
                className="w-full flex items-center justify-between p-5 hover:bg-red-50/50 transition-colors group text-left"
              >
                <div className="flex items-center gap-4">
                  <Trash2 className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-bold text-red-500">Delete Account</p>
                    <p className="text-xs text-red-500/40">Permanently remove all data</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-red-500/20 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
