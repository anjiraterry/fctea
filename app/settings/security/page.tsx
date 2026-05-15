"use client";
import React, { useState } from "react";
import { ArrowLeft, Key, Shield, Loader2, Save, Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { useToast } from "@/components/ui/use-toast";

export default function SecurityPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleUpdatePassword = async () => {
    if (!password || password !== confirmPassword) {
      toast({ title: "Validation Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: "Success", description: "Your password has been updated successfully." });
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container max-w-2xl pt-24 pb-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/settings" className="p-2 hover:bg-[#F9F1ED] rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#2D241E]" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#2D241E] font-montserrat tracking-tight">Security</h1>
            <p className="text-[#2D241E]/40 text-xs font-bold uppercase tracking-widest mt-1">Manage your credentials</p>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-3xl p-8 border border-[#C06350]/10 shadow-sm space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#C06350]/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#C06350]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#2D241E]">Update Password</h2>
              <p className="text-xs text-[#2D241E]/40 font-medium">Use a strong, unique password</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2 relative">
              <label className="text-[10px] font-bold text-[#2D241E]/40 uppercase tracking-widest ml-1">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#F9F1ED]/50 border border-transparent focus:border-[#C06350]/20 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-3 text-[#2D241E]/30 hover:text-[#C06350] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#2D241E]/40 uppercase tracking-widest ml-1">Confirm New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#F9F1ED]/50 border border-transparent focus:border-[#C06350]/20 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="w-full py-4 bg-[#C06350] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#A85544] transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Shield className="w-4 h-4" /> Update Credentials</>}
          </button>
        </div>

        {/* Security Info */}
        <div className="bg-[#2D241E] rounded-3xl p-6 text-white/90">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C06350] mb-2">Security Tip</p>
          <p className="text-sm leading-relaxed font-medium">
            Keep your account secure by using a unique password that you don't use for other services. We recommend using a password manager.
          </p>
        </div>
      </div>
    </div>
  );
}
