import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog | fctea",
  description: "Long reads, deep dives, and editorial pieces on Abuja culture and lifestyle.",
};

const CATEGORIES = ["All", "Food & Drink", "Nightlife", "Neighborhood Guides", "People", "Style"];

const POSTS = [
  { id: "1", title: "The 10 Best Rooftop Bars in Abuja Right Now",              excerpt: "We spent two weeks visiting every rooftop in the city. Here's the definitive ranking.", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200", category: "Food & Drink",        readTime: "5 min", date: "May 10", featured: true },
  { id: "2", title: "Gwarinpa: The Neighborhood That Has Everything",            excerpt: "From food to nightlife, Gwarinpa is Abuja's most underrated district.", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800", category: "Neighborhood Guides", readTime: "4 min", date: "May 8",  featured: false },
  { id: "3", title: "Meet the Chef Redefining Nigerian Cuisine in Abuja",        excerpt: "Chef Amaka Obi is bringing Abuja's food scene to the world stage.", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800", category: "People",              readTime: "7 min", date: "May 5",  featured: false },
  { id: "4", title: "A Night Out Guide: How to Do Abuja Nightlife Properly",     excerpt: "Start at Maitama, end up in Wuse 2. Here's the full guide.", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", category: "Nightlife",          readTime: "6 min", date: "May 3",  featured: false },
];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;
  return (
    <div className="page-container">
      {/* Header */}
      <div className="space-y-2">
        <span className="section-label">Editorial</span>
        <h1 className="page-header-title">The Loop</h1>
        <p className="page-header-sub">Deep dives into Abuja culture, the people behind the city, and the places that define it.</p>
      </div>

      {/* Category chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat, i) => (
          <button key={cat} className={i === 0 ? "filter-chip filter-chip-active" : "filter-chip"}>{cat}</button>
        ))}
      </div>

      {/* Featured post */}
      <Link href={`/blog/${featured.id}`} className="group block rounded-2xl overflow-hidden bg-white hover:bg-[#F9F1ED] transition-colors">
        <div className="relative aspect-[16/7] overflow-hidden">
          <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/80 via-[#2D241E]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-2">
            <span className="inline-block px-3 py-1 bg-[#C06350] text-white text-xs font-bold rounded-full uppercase tracking-wide">
              {featured.category}
            </span>
            <h2 className="text-xl md:text-3xl font-black text-white leading-tight group-hover:text-[#F2C4B8] transition-colors">
              {featured.title}
            </h2>
            <div className="flex items-center gap-3 text-white/50 text-xs">
              <span>{featured.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime} read</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Post list */}
      <div className="space-y-4">
        {rest.map(post => (
          <Link key={post.id} href={`/blog/${post.id}`} className="group flex items-center gap-5 py-6 hover:bg-[#F9F1ED] px-4 -mx-4 rounded-2xl transition-colors">
            <div className="relative w-24 h-16 shrink-0 rounded-xl overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="96px" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <span className="text-xs font-bold text-[#C06350] uppercase tracking-wide">{post.category}</span>
              <h3 className="font-bold text-sm text-[#2D241E] group-hover:text-[#C06350] transition-colors line-clamp-2 leading-snug">{post.title}</h3>
              <div className="flex items-center gap-3 text-xs text-[#2D241E]/30">
                <span>{post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} read</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#2D241E]/20 group-hover:text-[#C06350] shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
