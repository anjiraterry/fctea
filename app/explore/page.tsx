import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";

export const metadata = {
  title: "Explore | fctea",
  description: "Discover hidden gems, trending spots, rooftop bars, and more across Abuja.",
};

const EXPLORE_SECTIONS = [
  { id: "trending",  emoji: "🔥", label: "Trending Now",    desc: "What Abuja is talking about this week",         href: "/places?sort=trending",   image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800" },
  { id: "hidden",    emoji: "✨", label: "Hidden Gems",     desc: "Spots only the locals know about",              href: "/places?sort=hidden",     image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" },
  { id: "brunch",    emoji: "☕", label: "Brunch Spots",    desc: "The best mid-morning cafés & restaurants",      href: "/places?category=brunch", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800" },
  { id: "nightlife", emoji: "🌙", label: "Nightlife",       desc: "Lounges, clubs & rooftop bars after dark",      href: "/places?category=night",  image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800" },
  { id: "date",      emoji: "❤️", label: "Date Spots",      desc: "Intimate & romantic venues across the city",    href: "/places?category=date",   image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" },
  { id: "solo",      emoji: "🧘", label: "Solo Hangouts",   desc: "Cafés, parks, and bookstores — great alone",    href: "/places?category=solo",   image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800" },
];

export default function ExplorePage() {
  return (
    <div className="page-container">
      {/* Header */}
      <div className="space-y-2">
        <span className="section-label">Discover</span>
        <h1 className="page-header-title">Explore Abuja</h1>
        <p className="page-header-sub">
          Curated ways to discover the city — for every mood, every time of day.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {EXPLORE_SECTIONS.map((section) => (
          <Link
            key={section.id}
            href={section.href}
            className="group relative rounded-2xl overflow-hidden aspect-[16/10] block"
          >
            <Image 
              src={section.image} 
              alt={section.label} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110" 
              sizes="400px" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/90 via-[#2D241E]/20 to-transparent" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end space-y-1">
              <span className="text-2xl mb-2">{section.emoji}</span>
              <h2 className="text-xl font-black text-white group-hover:text-[#F2C4B8] transition-colors leading-tight">
                {section.label}
              </h2>
              <p className="text-white/70 text-xs leading-relaxed max-w-[200px]">{section.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Random Discovery CTA */}
      <div className="relative rounded-3xl bg-[#C06350] p-10 md:p-16 text-center space-y-6 overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex p-3 bg-white/20 backdrop-blur-md rounded-2xl">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-white">Feeling Lucky?</h2>
            <p className="text-white/80 max-w-sm mx-auto text-sm md:text-base leading-relaxed">
              Let us pick a random hidden gem for you. Something you&apos;ve probably never tried.
            </p>
          </div>
          <Link
            href="/places"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#C06350] font-bold rounded-xl hover:scale-105 transition-all text-sm shadow-xl shadow-black/10"
          >
            <Sparkles className="w-4 h-4" />
            Surprise Me
          </Link>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
