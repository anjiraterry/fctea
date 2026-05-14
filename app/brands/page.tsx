import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Instagram, MapPin } from "lucide-react";

const BRANDS = [
  {
    id: "1",
    name: "Bantu Coffee",
    category: "Hospitality / Coffee",
    logo: "/buka.jpg",
    description: "Abuja's premier artisanal coffee roastery, bringing the soul of the bean to the city.",
    locations: 5,
    socials: { instagram: "#", globe: "#" }
  },
  {
    id: "2",
    name: "Capital Block",
    category: "Entertainment",
    logo: "/apex.jpg",
    description: "The creative engine behind the FCT's most iconic city-wide events.",
    locations: 1,
    socials: { instagram: "#" }
  },
  {
    id: "3",
    name: "The Vibe",
    category: "Nightlife",
    logo: "/ctrl.jpg",
    description: "A lifestyle brand redefining how Abuja experiences the night.",
    locations: 2,
    socials: { instagram: "#", twitter: "#" }
  }
];

export default function BrandsPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-0 py-10 space-y-16 font-raleway">
      {/* Header */}
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-michy text-[#C06350]">
          Brands
        </h1>
        <p className="text-xl text-[#2D241E]/60 max-w-2xl font-light">
          The companies, collectives, and ventures building the future of the FCT.
        </p>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {BRANDS.map((brand) => (
          <div key={brand.id} className="group bg-white/40 border border-[#C06350]/10 p-8 rounded-xl hover:bg-white/60 transition-all">
            <div className="space-y-8">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#C06350]/20">
                <Image 
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-3xl font-bold text-[#2D241E] group-hover:text-[#C06350] transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs font-bold text-[#C06350] uppercase tracking-widest">
                    {brand.category}
                  </p>
                </div>
                
                <p className="text-[#2D241E]/60 text-sm leading-relaxed">
                  {brand.description}
                </p>
                
                <div className="flex items-center gap-4 pt-4 text-[#2D241E]/40">
                   <div className="flex items-center gap-2 text-xs font-bold">
                      <MapPin className="h-4 w-4" />
                      {brand.locations} {brand.locations > 1 ? 'Locations' : 'Location'}
                   </div>
                   <div className="flex gap-3">
                      {brand.socials.instagram && <Instagram className="h-4 w-4 hover:text-[#C06350]" />}
                      {brand.socials.globe && <Globe className="h-4 w-4 hover:text-[#C06350]" />}
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
