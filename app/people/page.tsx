import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter, Globe } from "lucide-react";

export const metadata = {
  title: "People | fctea",
  description: "Meet the creators, chefs, DJs, artists, and founders shaping Abuja's culture.",
};

const CATEGORIES = ["All", "DJs", "Chefs", "Artists", "Influencers", "Founders"];

const PEOPLE = [
  { id: "1", name: "DJ Kaywise",    role: "DJ / Producer",    image: "https://i.pravatar.cc/300?img=11", bio: "The pulse of Abuja's nightlife.",              socials: { instagram: "#", twitter: "#" } },
  { id: "2", name: "Amaka Obi",     role: "Chef",             image: "https://i.pravatar.cc/300?img=12", bio: "Redefining Nigerian cuisine in the FCT.",      socials: { instagram: "#" } },
  { id: "3", name: "Tunde Adeyemi", role: "Visual Artist",    image: "https://i.pravatar.cc/300?img=13", bio: "Capturing the soul of Abuja in digital art.", socials: { twitter: "#", instagram: "#" } },
  { id: "4", name: "Funke Adeola",  role: "Food Critic",      image: "https://i.pravatar.cc/300?img=14", bio: "Abuja's most trusted restaurant reviewer.",    socials: { instagram: "#", twitter: "#" } },
  { id: "5", name: "Chidi Okeke",   role: "Architect",        image: "https://i.pravatar.cc/300?img=15", bio: "Designing the modern face of Abuja.",          socials: { instagram: "#" } },
  { id: "6", name: "Yetunde Lagos", role: "Content Creator",  image: "https://i.pravatar.cc/300?img=16", bio: "1M+ followers documenting Abuja culture.",    socials: { instagram: "#", twitter: "#" } },
];

export default function PeoplePage() {
  return (
    <div className="page-container">
      {/* Header */}
      <div className="space-y-2">
        <span className="section-label">Community</span>
        <h1 className="page-header-title">People</h1>
        <p className="page-header-sub">The creators, artists, chefs, and founders shaping Abuja's culture.</p>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat, i) => (
          <button key={cat} className={i === 0 ? "filter-chip filter-chip-active" : "filter-chip"}>{cat}</button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {PEOPLE.map(person => (
          <Link
            key={person.id}
            href={`/people/${person.id}`}
            className="group p-5 rounded-2xl bg-white hover:bg-[#F9F1ED] transition-colors text-center space-y-3"
          >
            <div className="relative mx-auto w-20 h-20 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-[#C06350] transition-all">
              <Image src={person.image} alt={person.name} fill className="object-cover" sizes="80px" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-[#2D241E] text-sm group-hover:text-[#C06350] transition-colors leading-tight">{person.name}</h3>
              <p className="text-xs text-[#C06350] font-semibold uppercase tracking-wide">{person.role}</p>
              <p className="text-xs text-[#2D241E]/50 leading-relaxed line-clamp-2 mt-1">{person.bio}</p>
            </div>
            <div className="flex justify-center gap-3">
              {person.socials.instagram && <Instagram className="w-3.5 h-3.5 text-[#2D241E]/30 group-hover:text-[#C06350] transition-colors" />}
              {person.socials.twitter && <Twitter className="w-3.5 h-3.5 text-[#2D241E]/30 group-hover:text-[#C06350] transition-colors" />}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
