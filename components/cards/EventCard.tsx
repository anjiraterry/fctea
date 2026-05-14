"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Bookmark, Users, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventCardProps {
  title: string;
  date: string;
  venue: string;
  image: string;
  price?: string;
  attendees?: number;
  isTrending?: boolean;
  href?: string;
  className?: string;
}

export default function EventCard({ title, date, venue, image, price, attendees, isTrending, href = "/events", className }: EventCardProps) {
  return (
    <Link href={href} className={cn("group flex gap-4 p-4 rounded-2xl bg-white hover:bg-[#F9F1ED] transition-colors duration-250", className)}>
      <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="64px" />
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        {isTrending && <span className="inline-block px-2 py-0.5 bg-[#C06350]/10 text-[#C06350] text-xs font-bold rounded-full uppercase tracking-wide">Trending</span>}
        <h3 className="font-bold text-[#2D241E] text-sm leading-snug group-hover:text-[#C06350] transition-colors line-clamp-2">{title}</h3>
        <div className="flex items-center gap-1 text-[#2D241E]/40 text-xs"><Calendar className="w-3 h-3 shrink-0" />{date}</div>
        <div className="flex items-center gap-1 text-[#2D241E]/40 text-xs"><MapPin className="w-3 h-3 shrink-0" />{venue}</div>
        <div className="flex items-center gap-3 pt-0.5">
          {price && <span className="flex items-center gap-1 text-xs font-bold text-[#C06350]"><Ticket className="w-3 h-3" />{price}</span>}
          {attendees && <span className="flex items-center gap-1 text-xs text-[#2D241E]/30"><Users className="w-3 h-3" />{attendees.toLocaleString()} going</span>}
        </div>
      </div>
      <button onClick={e => e.preventDefault()} className="flex-shrink-0 self-start p-1.5 text-[#2D241E]/20 hover:text-[#C06350] transition-colors" aria-label="Bookmark">
        <Bookmark className="w-4 h-4" />
      </button>
    </Link>
  );
}
