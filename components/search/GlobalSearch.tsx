"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Search, X, TrendingUp, Clock, MapPin, Calendar, Newspaper, User } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import Link from "next/link";

const TRENDING = [
  { icon: TrendingUp, label: "Rooftop Bars in Maitama",  href: "/places?q=rooftop", type: "Places" },
  { icon: TrendingUp, label: "Jazz Night at Transcorp",   href: "/events/jazz-night",  type: "Event" },
  { icon: TrendingUp, label: "Hidden Gems Gwarinpa",    href: "/explore",            type: "Explore" },
  { icon: TrendingUp, label: "This Weekend in Abuja",     href: "/events",             type: "Events" },
];

const RECENT = [
  { icon: MapPin,    label: "The Abuja Tea House",      href: "/places/abuja-tea-house",  type: "Place" },
  { icon: Calendar, label: "Capital Block Party",       href: "/events/capital-block",    type: "Event" },
  { icon: Newspaper, label: "Bantu Coffee opens in Gwarinpa", href: "/news",             type: "News" },
];

const TYPE_COLORS: Record<string, string> = {
  Places:  "bg-[#C06350]/10 text-[#C06350]",
  Place:   "bg-[#C06350]/10 text-[#C06350]",
  Event:   "bg-amber-100 text-amber-700",
  Events:  "bg-amber-100 text-amber-700",
  News:    "bg-sky-100 text-sky-700",
  Explore: "bg-emerald-100 text-emerald-700",
};

export default function GlobalSearch() {
  const { isSearchOpen, setSearchOpen } = useAppStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setSearchOpen]);

  const close = useCallback(() => setSearchOpen(false), [setSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#2D241E]/60 backdrop-blur-sm animate-in fade-in duration-200" />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl bg-[#FFFAF5] rounded-2xl overflow-hidden animate-in slide-in-from-top-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-5 py-5 bg-[#F9F1ED]/50">
          <Search className="w-5 h-5 text-[#C06350] flex-shrink-0" />
          <input
            ref={inputRef}
            id="global-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search places, events, people, news…"
            className="flex-1 bg-transparent text-[#2D241E] placeholder:text-[#2D241E]/30 text-base font-montserrat outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md hover:bg-[#C06350]/10 text-[#2D241E]/40 hover:text-[#C06350] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-[#C06350]/8 text-[#C06350] text-xs rounded-md font-montserrat">
            ESC
          </kbd>
        </div>

        {/* Results / Suggestions */}
        <div className="px-5 py-5 max-h-[60vh] overflow-y-auto no-scrollbar space-y-6">
          {!query && (
            <>
              {/* Recent */}
              <div>
                <p className="text-xs text-[#2D241E]/40 font-montserrat font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Clock className="w-3 h-3" /> Recent
                </p>
                <div className="space-y-1">
                  {RECENT.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={close}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#C06350]/5 transition-colors group"
                    >
                      <item.icon className="w-4 h-4 text-[#2D241E]/30 group-hover:text-[#C06350] transition-colors flex-shrink-0" />
                      <span className="text-sm text-[#2D241E]/80 font-montserrat flex-1 group-hover:text-[#2D241E] transition-colors">
                        {item.label}
                      </span>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-bold font-montserrat", TYPE_COLORS[item.type] ?? "")}>
                        {item.type}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Trending */}
              <div>
                <p className="text-xs text-[#2D241E]/40 font-montserrat font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" /> Trending in Abuja
                </p>
                <div className="space-y-1">
                  {TRENDING.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={close}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#C06350]/5 transition-colors group"
                    >
                      <item.icon className="w-4 h-4 text-[#C06350]/50 group-hover:text-[#C06350] transition-colors flex-shrink-0" />
                      <span className="text-sm text-[#2D241E]/80 font-montserrat flex-1 group-hover:text-[#2D241E] transition-colors">
                        {item.label}
                      </span>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-bold font-montserrat", TYPE_COLORS[item.type] ?? "")}>
                        {item.type}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

          {query && (
            <div className="text-center py-8 space-y-2">
              <Search className="w-8 h-8 text-[#C06350]/30 mx-auto" />
              <p className="text-sm text-[#2D241E]/50 font-montserrat">
                Searching for <span className="text-[#C06350] font-bold">&ldquo;{query}&rdquo;</span>…
              </p>
              <p className="text-xs text-[#2D241E]/30 font-montserrat">
                Live results coming soon
              </p>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 flex items-center gap-4 text-xs text-[#2D241E]/30 font-montserrat">
          <span>↵ to select</span>
          <span>↑↓ navigate</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
