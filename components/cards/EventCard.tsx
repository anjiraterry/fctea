"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Bookmark, Users, Ticket, Edit, Ticket as TicketIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/store/user";
import { useResourceModal } from "@/lib/store/modal";
import PlaceholderImage from "@/components/shared/PlaceholderImage";

interface EventCardProps {
  id?: string;
  title: string;
  date: string;
  venue: string;
  image?: string;
  images?: any[];
  media?: any[];
  price?: string;
  attendees?: number;
  isTrending?: boolean;
  href?: string;
  className?: string;
  fullData?: any;
}

export default function EventCard({ id, title, date, venue, image, images = [], media = [], price, attendees, isTrending, href = "/events", className, fullData }: EventCardProps) {
  const user = useUser(state => state.user);
  const openModal = useResourceModal(state => state.openModal);
  const isPrivileged = user?.role === "ADMIN" || user?.role === "EDITOR";
  
  const getImageUrl = (img: any) => {
    if (!img) return null;
    if (typeof img === 'string') return img;
    return img.url;
  };

  const displayImage = getImageUrl(images?.[0]) || getImageUrl(media?.[0]) || image;

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openModal("event", "edit", fullData || { id, title, startDate: date, venue, price, media, images });
  };

  return (
    <div className={cn("group relative flex gap-4 p-4 rounded-2xl bg-white hover:bg-[#F9F1ED] transition-colors duration-250", className)}>
      <Link href={href} className="flex gap-4 flex-1">
        <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
          {displayImage ? (
            <Image src={displayImage} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="64px" />
          ) : (
            <PlaceholderImage icon={TicketIcon} />
          )}
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
      </Link>
      
      <div className="flex flex-col gap-2">
        <button onClick={e => e.preventDefault()} className="p-1.5 text-[#2D241E]/20 hover:text-[#C06350] transition-colors" aria-label="Bookmark">
          <Bookmark className="w-4 h-4" />
        </button>
        {isPrivileged && (
          <button 
            onClick={handleEdit}
            className="p-1.5 text-[#2D241E]/20 hover:text-[#C06350] transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
