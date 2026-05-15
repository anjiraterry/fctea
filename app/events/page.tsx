"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Ticket, Users, Plus, Database } from "lucide-react";
import { useEvents } from "@/lib/hooks/use-city-data";
import EmptyState from "@/components/shared/EmptyState";
import { useUser } from "@/lib/store/user";
import EventCard from "@/components/cards/EventCard";
import { useResourceModal } from "@/lib/store/modal";
import { useToast } from "@/components/ui/use-toast";

import Pagination from "@/components/shared/Pagination";

const CATEGORIES = ["All", "Concerts", "Networking", "Nightlife", "Art", "Comedy", "Sports"];

export default function EventsPage() {
  const { toast } = useToast();
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

  const { data: response, isLoading } = useEvents(query);

  const events = response?.data || [];
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
          <span className="section-label">What's On</span>
          <h1 className="page-header-title">Events</h1>
          <p className="page-header-sub">Your guide to everything happening in the FCT.</p>
        </div>
        {isPrivileged && (
          <div className="flex items-center gap-2 mt-2">
            <Link 
              href="/dashboard/sync"
              className="flex items-center gap-1.5 text-[10px] font-black bg-[#F9F1ED] text-[#C06350] px-5 py-3 rounded-2xl hover:bg-[#F2E8E4] transition-all shadow-sm active:scale-95 uppercase tracking-widest"
            >
              <Database className="w-4 h-4" /> Sync Data
            </Link>
            <button 
              onClick={() => openModal("event")}
              className="flex items-center gap-1.5 text-[10px] font-black bg-[#C06350] text-white px-5 py-3 rounded-2xl hover:bg-[#a0503f] hover:scale-105 transition-all shadow-sm active:scale-95 uppercase tracking-widest"
            >
              <Plus className="w-4 h-4" /> Add Event
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
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-32 bg-[#F9F1ED] rounded-2xl" />
          ))}
        </div>
      ) : events.length > 0 ? (
        <>
          <div className="space-y-3">
            {events.map((event: any) => (
              <EventCard
                id={event.id}
                key={event.id}
                title={event.title}
                date={new Date(event.startDate).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}
                venue={event.venue || "Abuja"}
                media={event.media}
                price={event.price || "Free"}
                isTrending={event.isFeatured}
                href={`/events/${event.slug}`}
                fullData={event}
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
          emoji="🗓️"
          title={isPrivileged ? "Add your first event" : "No events scheduled"}
          description={isPrivileged 
            ? `There are currently no events listed in the ${activeCategory.toLowerCase()} category. Start scheduling the city's next big thing.` 
            : `There are currently no events listed in the ${activeCategory.toLowerCase()} category. Try browsing all events instead.`}
          ctaText={isPrivileged ? "Create Event" : "See all events"}
          ctaHref={isPrivileged ? undefined : "/events"}
          onClick={isPrivileged ? () => openModal("event") : undefined}
        />
      )}
    </div>
  );
}
