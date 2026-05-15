"use client";
import React from "react";
import { ArrowRight, SearchX } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  emoji?: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  onClick?: () => void;
}

export default function EmptyState({
  emoji = "🌵",
  title,
  description,
  ctaText,
  ctaHref,
  onClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-[#F9F1ED]/50 rounded-[2.5rem] border-2 border-dashed border-[#C06350]/10">
      <div className="text-6xl mb-6 animate-bounce-slow">{emoji}</div>
      <h3 className="text-xl font-bold text-[#2D241E] mb-2">{title}</h3>
      <p className="text-sm text-[#2D241E]/50 max-w-xs leading-relaxed mb-8">
        {description}
      </p>
      {ctaText && (
        onClick ? (
          <button
            onClick={onClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C06350] text-white font-bold rounded-xl hover:scale-105 transition-all text-sm"
          >
            {ctaText} <ArrowRight className="w-4 h-4" />
          </button>
        ) : ctaHref ? (
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C06350] text-white font-bold rounded-xl hover:scale-105 transition-all text-sm"
          >
            {ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
        ) : null
      )}
    </div>
  );
}
