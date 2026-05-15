"use client";
import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-[#FFFAF5] flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link href="/" className="text-5xl font-michy text-[#C06350] leading-none inline-block mb-4">
            fctea
          </Link>
          <div className="mx-auto w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#2D241E] font-montserrat tracking-tight">Authentication Error</h1>
          <p className="text-[#2D241E]/50 text-sm font-medium px-6">
            Something went wrong while trying to authenticate you. This could be due to an expired link or a connection issue.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 border border-[#C06350]/10 shadow-sm space-y-6">
          <p className="text-sm text-[#2D241E]/60 font-medium">
            Please try logging in again. If the problem persists, contact support.
          </p>
          
          <div className="grid grid-cols-1 gap-3">
            <Link
              href="/auth/login"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#C06350] text-white rounded-2xl font-bold text-sm transition-all active:scale-[0.98] hover:bg-[#A85544]"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </Link>
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-[#C06350]/20 text-[#C06350] rounded-2xl font-bold text-sm transition-all hover:bg-[#C06350]/5"
            >
              <ArrowLeft className="w-4 h-4" /> Return Home
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-[#2D241E]/30 font-bold uppercase tracking-widest">
          Error Code: AUTH_FLOW_FAILURE
        </p>
      </div>
    </div>
  );
}
