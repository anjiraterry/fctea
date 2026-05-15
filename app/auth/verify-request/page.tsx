"use client";
import React from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen bg-[#FFFAF5] flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link href="/" className="text-5xl font-michy text-[#C06350] leading-none inline-block mb-4">
            fctea
          </Link>
          <div className="mx-auto w-20 h-20 bg-[#C06350]/10 rounded-3xl flex items-center justify-center">
            <Mail className="w-10 h-10 text-[#C06350]" />
          </div>
          <h1 className="text-3xl font-bold text-[#2D241E] font-montserrat tracking-tight">Check your email</h1>
          <p className="text-[#2D241E]/50 text-sm font-medium px-6">
            We&apos;ve sent a verification link to your email address. Please click the link to activate your city operating system.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 border border-[#C06350]/10 shadow-sm space-y-6">
          <p className="text-sm text-[#2D241E]/60 font-medium">
            Didn&apos;t receive the email? Check your spam folder or try again.
          </p>
          
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#C06350] text-white rounded-2xl font-bold text-sm transition-all active:scale-[0.98] hover:bg-[#A85544]"
            >
              Resend Email <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/auth/login"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-[#C06350]/20 text-[#C06350] rounded-2xl font-bold text-sm transition-all hover:bg-[#C06350]/5"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-[#2D241E]/30 font-bold uppercase tracking-widest">
          fctea discovery platform
        </p>
      </div>
    </div>
  );
}
