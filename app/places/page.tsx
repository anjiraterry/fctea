"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Flame, Filter, Plus, Database } from "lucide-react";
import { usePlaces } from "@/lib/hooks/use-city-data";
import EmptyState from "@/components/shared/EmptyState";
import { useUser } from "@/lib/store/user";
import PlaceCard from "@/components/cards/PlaceCard";
import { useResourceModal } from "@/lib/store/modal";

import { useToast } from "@/components/ui/use-toast";

import Pagination from "@/components/shared/Pagination";

const CATEGORIES = ["All", "Restaurants", "Lounges", "Cafés", "Nightlife", "Outdoors", "Art Spaces"];

export default function PlacesPage() {
  const { toast } = useToast();
  const user = useUser((state: any) => state.user);
  const openModal = useResourceModal(state => state.openModal);
  const isPrivileged = user?.role === "ADMIN" || user?.role === "EDITOR";
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);

  const query = new URLSearchParams({
    page: page.toString(),
    limit: "12",
    ...(activeCategory !== "All" && { category: activeCategory })
  }).toString();

  const { data: response, isLoading } = usePlaces(query);

  const places = response?.data || [];
  const pagination = response?.meta?.pagination;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1); // Reset to first page on category change
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <span className="section-label">Discover</span>
          <h1 className="page-header-title">Places</h1>
          <p className="page-header-sub">Restaurants, lounges, cafés, and hidden gems across the FCT.</p>
        </div>
        {isPrivileged && (
          <div className="flex items-center gap-2 mt-2">
            <button 
              disabled={isSyncing}
              onClick={async () => {
                setIsSyncing(true);
                try {
                  const res = await fetch("/api/debug/osm-import");
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message || "Sync failed");
                  
                  toast({
                    title: "Sync Complete",
                    description: data.message,
                  });
                  window.location.reload();
                } catch (error: any) {
                  toast({
                    title: "Sync Failed",
                    description: error.message,
                    variant: "destructive",
                  });
                } finally {
                  setIsSyncing(false);
                }
              }}
              className="flex items-center gap-1.5 text-[10px] font-black bg-[#F9F1ED] text-[#C06350] px-5 py-3 rounded-2xl hover:bg-[#F2E8E4] transition-all shadow-sm active:scale-95 uppercase tracking-widest disabled:opacity-50"
            >
              {isSyncing ? <Database className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />} Sync OSM
            </button>
            <button 
              onClick={() => openModal("place")}
              className="flex items-center gap-1.5 text-[10px] font-black bg-[#C06350] text-white px-5 py-3 rounded-2xl hover:bg-[#a0503f] hover:scale-105 transition-all shadow-sm active:scale-95 uppercase tracking-widest"
            >
              <Plus className="w-4 h-4" /> Add Place
            </button>
          </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-[4/5] bg-[#F9F1ED] rounded-2xl" />
          ))}
        </div>
      ) : places.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {places.map((place: any) => (
              <PlaceCard 
                id={place.id}
                key={place.id}
                title={place.name}
                category={place.category?.name || "Place"}
                images={place.images}
                address={place.address || "Abuja"}
                rating={place.rating}
                isHot={place.hotScore > 0.8}
                href={`/places/${place.slug}`}
                fullData={place}
              />
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
          emoji="📍"
          title={isPrivileged ? "Add your first place" : "No places found"}
          description={isPrivileged 
            ? `There are currently no places in the ${activeCategory.toLowerCase()} category. Start building the city directory now.` 
            : `We couldn't find any places in the ${activeCategory.toLowerCase()} category yet. We're constantly adding new spots to our directory.`}
          ctaText={isPrivileged ? "Create Place" : "Explore all categories"}
          ctaHref={isPrivileged ? undefined : "/places"}
          onClick={isPrivileged ? () => openModal("place") : undefined}
        />
      )}
    </div>
  );
}
