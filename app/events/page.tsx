import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Ticket, Users } from "lucide-react";

export const metadata = {
  title: "Events | fctea",
  description: "Concerts, networking, art shows, and everything happening in Abuja.",
};

const CATEGORIES = ["All", "Concerts", "Networking", "Nightlife", "Art", "Comedy", "Sports"];

const EVENTS = [
  { id: "1", title: "Capital Block Party 2025", date: "Sat, Jun 14",  venue: "Jabi Lake Park",    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",  price: "₦5,000",  attendees: 1240, category: "Concerts",   isTrending: true },
  { id: "2", title: "Afrobeats Night Live",     date: "Fri, Jun 20",  venue: "Transcorp Hilton",  image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800",  price: "₦8,000",  attendees: 840,  category: "Concerts",   isTrending: false },
  { id: "3", title: "Abuja Art Fair",           date: "Sun, Jun 22",  venue: "Silverbird Mall",   image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800",  price: "Free",    attendees: 500,  category: "Art",        isTrending: true },
  { id: "4", title: "Jazz & Cocktails Evening", date: "Thu, Jun 26",  venue: "Sky Lounge Abuja",  image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=800",  price: "₦3,500",  attendees: 320,  category: "Nightlife",  isTrending: false },
  { id: "5", title: "Tech Founders Mixer",      date: "Wed, Jul 2",   venue: "Transcorp Hilton",  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",  price: "₦2,000",  attendees: 200,  category: "Networking", isTrending: false },
];

export default function EventsPage() {
  return (
    <div className="page-container">
      {/* Header */}
      <div className="space-y-2">
        <span className="section-label">What's On</span>
        <h1 className="page-header-title">Events</h1>
        <p className="page-header-sub">Your guide to everything happening in the FCT.</p>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat, i) => (
          <button key={cat} className={i === 0 ? "filter-chip filter-chip-active" : "filter-chip"}>{cat}</button>
        ))}
      </div>

      {/* Events list */}
      <div className="space-y-3">
        {EVENTS.map(event => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="group flex flex-col sm:flex-row items-start gap-4 p-4 rounded-2xl bg-white hover:bg-[#F9F1ED] transition-colors"
          >
            <div className="relative w-full sm:w-32 h-24 shrink-0 rounded-xl overflow-hidden">
              <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="128px" />
            </div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  {event.isTrending && (
                    <span className="inline-block px-2 py-0.5 bg-[#C06350]/10 text-[#C06350] text-xs font-bold rounded-full uppercase tracking-wide mb-1">
                      Trending
                    </span>
                  )}
                  <h3 className="font-bold text-[#2D241E] text-base group-hover:text-[#C06350] transition-colors leading-tight">
                    {event.title}
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#C06350] shrink-0">{event.price}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="flex items-center gap-1 text-xs text-[#2D241E]/40">
                  <Calendar className="w-3 h-3" />{event.date}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#2D241E]/40">
                  <MapPin className="w-3 h-3" />{event.venue}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#2D241E]/30">
                  <Users className="w-3 h-3" />{event.attendees.toLocaleString()} going
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
