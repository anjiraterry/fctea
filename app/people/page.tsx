"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter, Globe, Plus, User, Edit } from "lucide-react";
import { usePeople } from "@/lib/hooks/use-city-data";
import EmptyState from "@/components/shared/EmptyState";
import { useUser } from "@/lib/store/user";
import { useResourceModal } from "@/lib/store/modal";
import PlaceholderImage from "@/components/shared/PlaceholderImage";

import Pagination from "@/components/shared/Pagination";

const CATEGORIES = ["All", "DJs", "Chefs", "Artists", "Influencers", "Founders"];

export default function PeoplePage() {
  const user = useUser((state: any) => state.user);
  const openModal = useResourceModal(state => state.openModal);
  const isPrivileged = user?.role === "ADMIN" || user?.role === "EDITOR";
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

  const query = new URLSearchParams({
    page: page.toString(),
    limit: "12",
    ...(activeCategory !== "All" && { category: activeCategory })
  }).toString();

  const { data: response, isLoading } = usePeople(query);

  const people = response?.data || [];
  const pagination = response?.meta?.pagination;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <span className="section-label">Community</span>
          <h1 className="page-header-title">People</h1>
          <p className="page-header-sub">The creators, artists, chefs, and founders shaping Abuja's culture.</p>
        </div>
        {isPrivileged && (
          <button 
            onClick={() => openModal("person")}
            className="flex items-center gap-1.5 text-[10px] font-black bg-[#C06350] text-white px-5 py-3 rounded-2xl hover:bg-[#a0503f] hover:scale-105 transition-all shadow-sm active:scale-95 uppercase tracking-widest mt-2"
          >
            <Plus className="w-4 h-4" /> Add Person
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat} 
            onClick={() => handleCategoryChange(cat)}
            className={activeCategory === cat ? "filter-chip filter-chip-active" : "filter-chip"}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="aspect-square bg-[#F9F1ED] rounded-2xl" />
          ))}
        </div>
      ) : people.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {people.map((person: any) => (
              <Link
                key={person.id}
                href={`/people/${person.slug}`}
                className="group p-5 rounded-2xl bg-white hover:bg-[#F9F1ED] transition-colors text-center space-y-4 border border-[#C06350]/5"
              >
                <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden ring-4 ring-transparent group-hover:ring-[#C06350]/20 transition-all duration-500 bg-white">
                  {person.images?.[0] || person.avatar || person.image ? (
                    <Image src={person.images?.[0] || person.avatar || person.image} alt={person.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="96px" />
                  ) : (
                    <PlaceholderImage icon={User} className="scale-75" />
                  )}
                </div>
                {isPrivileged && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openModal("person", "edit", person);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg text-[#C06350] opacity-0 group-hover:opacity-100 transition-all z-20 hover:scale-110"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                )}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-[#2D241E] text-base group-hover:text-[#C06350] transition-colors leading-tight tracking-tight">{person.name}</h3>
                  <p className="text-[10px] text-[#C06350] font-bold uppercase tracking-widest">{person.role}</p>
                  <p className="text-[11px] text-[#2D241E]/50 leading-relaxed line-clamp-2 mt-2 font-medium">{person.bio}</p>
                </div>
                <div className="flex justify-center gap-4 pt-1">
                  <Instagram className="w-4 h-4 text-[#2D241E]/20 group-hover:text-[#C06350] transition-colors" />
                  <Twitter className="w-4 h-4 text-[#2D241E]/20 group-hover:text-[#C06350] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
          
          <Pagination 
            currentPage={page}
            totalPages={pagination?.totalPages || 1}
            onPageChange={setPage}
          />
        </>
      ) : (
        <EmptyState 
          emoji="👋"
          title={isPrivileged ? "Add your first profile" : "No people found"}
          description={isPrivileged 
            ? `There are currently no creators in the ${activeCategory.toLowerCase()} category. Start profiling Abuja's finest now.` 
            : `We couldn't find anyone in the ${activeCategory.toLowerCase()} category yet. We're currently profiling the city's finest creators.`}
          ctaText={isPrivileged ? "Create Profile" : "View all community"}
          ctaHref={isPrivileged ? undefined : "/people"}
          onClick={isPrivileged ? () => openModal("person") : undefined}
        />
      )}
    </div>
  );
}
