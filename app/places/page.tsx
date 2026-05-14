import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Flame, Filter } from "lucide-react";

export const metadata = {
  title: "Places | fctea",
  description: "Discover restaurants, lounges, cafés, parks, and more across Abuja.",
};

const CATEGORIES = ["All", "Restaurants", "Lounges", "Cafés", "Nightlife", "Outdoors", "Art Spaces"];

const PLACES = [
  { id: "1", title: "Sky Lounge Abuja",    category: "Lounges",     image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800", address: "Maitama",  rating: 4.9, isHot: true },
  { id: "2", title: "The Crib Restaurant", category: "Restaurants", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800", address: "Wuse 2",   rating: 4.7, isHot: false },
  { id: "3", title: "Bantu Coffee",        category: "Cafés",       image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800", address: "Gwarinpa", rating: 4.8, isHot: true },
  { id: "4", title: "Jabi Lake Park",      category: "Outdoors",    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800", address: "Jabi",     rating: 4.6, isHot: false },
  { id: "5", title: "Abuja Jazz Lounge",   category: "Nightlife",   image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=800", address: "CBD",      rating: 4.8, isHot: true },
  { id: "6", title: "Terracotta Gardens",  category: "Restaurants", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800", address: "Maitama",  rating: 4.9, isHot: false },
];

export default function PlacesPage() {
  return (
    <div className="page-container">
      {/* Header */}
      <div className="space-y-2">
        <span className="section-label">Discover</span>
        <h1 className="page-header-title">Places</h1>
        <p className="page-header-sub">Restaurants, lounges, cafés, and hidden gems across the FCT.</p>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat}
            className={i === 0 ? "filter-chip filter-chip-active" : "filter-chip"}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PLACES.map(place => (
          <Link key={place.id} href={`/places/${place.id}`} className="group block rounded-2xl overflow-hidden bg-white hover:bg-[#F9F1ED] transition-colors">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={place.image} alt={place.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="400px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/50 to-transparent" />
              {place.isHot && (
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-[#C06350] text-white text-xs font-bold rounded-full">
                  <Flame className="w-3 h-3" /> HOT
                </div>
              )}
              <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/80 uppercase tracking-wide">
                {place.category}
              </span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#2D241E] text-sm group-hover:text-[#C06350] transition-colors">{place.title}</h3>
                <div className="flex items-center gap-1 text-[#2D241E]/40 text-xs mt-1">
                  <MapPin className="w-3 h-3" />{place.address}
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-3 h-3 fill-current" />{place.rating}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
