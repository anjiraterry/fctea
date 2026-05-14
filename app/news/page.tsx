import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "News | fctea",
  description: "The latest culture, lifestyle, and city news from Abuja.",
};

const CATEGORIES = ["All", "Culture", "Food", "Style", "Music", "Business"];

const NEWS = [
  { id: "1", title: "Bantu Coffee opens its 5th location in Gwarinpa",         category: "Food",    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800", excerpt: "The beloved café brand continues its rapid expansion across the FCT.", date: "May 14", author: "Nadia Obi", featured: true },
  { id: "2", title: "Abuja Fashion Week 2025 — what to expect",                category: "Style",   image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800", excerpt: "The city's biggest fashion event returns bigger than ever.", date: "May 13", author: "Tolu Adams", featured: false },
  { id: "3", title: "New rooftop bar opens in Maitama — Sky Lounge review",    category: "Culture", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800", excerpt: "We visited on opening night. Here's the honest review.", date: "May 12", author: "Jay Peters", featured: false },
  { id: "4", title: "The rise of Abuja's indie music scene in 2025",           category: "Music",   image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=800", excerpt: "A new generation of artists is putting Abuja on the music map.", date: "May 10", author: "Zara Lafia", featured: false },
];

export default function NewsPage() {
  const [featured, ...rest] = NEWS;
  return (
    <div className="page-container">
      {/* Header */}
      <div className="space-y-2">
        <span className="section-label">Latest</span>
        <h1 className="page-header-title">News</h1>
        <p className="page-header-sub">Culture updates, city stories, and breaking news from the FCT.</p>
      </div>

      {/* Category chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat, i) => (
          <button key={cat} className={i === 0 ? "filter-chip filter-chip-active" : "filter-chip"}>{cat}</button>
        ))}
      </div>

      {/* Featured story */}
      <Link href={`/news/${featured.id}`} className="group block rounded-2xl overflow-hidden bg-white hover:bg-[#F9F1ED] transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden min-h-[240px]">
            <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="600px" />
            <span className="absolute top-4 left-4 px-3 py-1 bg-[#C06350] text-white text-xs font-bold rounded-full uppercase tracking-wide">
              {featured.category}
            </span>
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-2 text-[#2D241E]/30 text-xs">
              <Clock className="w-3 h-3" />{featured.date} · {featured.author}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#2D241E] group-hover:text-[#C06350] transition-colors leading-snug">
              {featured.title}
            </h2>
            <p className="text-sm text-[#2D241E]/50 leading-relaxed">{featured.excerpt}</p>
            <div className="flex items-center gap-1 text-[#C06350] text-sm font-semibold group-hover:gap-2 transition-all">
              Read story <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>

      {/* Rest of stories */}
      <div className="space-y-4">
        {rest.map(story => (
          <Link key={story.id} href={`/news/${story.id}`} className="group flex items-center gap-5 py-6 hover:bg-[#F9F1ED] px-4 -mx-4 rounded-2xl transition-colors">
            <div className="relative w-20 h-16 shrink-0 rounded-xl overflow-hidden">
              <Image src={story.image} alt={story.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="80px" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <span className="text-xs font-bold text-[#C06350] uppercase tracking-wide">{story.category}</span>
              <h3 className="font-bold text-sm text-[#2D241E] group-hover:text-[#C06350] transition-colors line-clamp-2 leading-snug">
                {story.title}
              </h3>
              <p className="text-xs text-[#2D241E]/30">{story.date} · {story.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
