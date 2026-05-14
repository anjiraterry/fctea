import React from "react";
import Image from "next/image";
import { MapPin, Star, Phone, Calendar, Clock, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiscoveryCardProps {
  type: "place" | "event" | "news" | "brand";
  title: string;
  image: string;
  category?: string;
  address?: string;
  rating?: number;
  reviews?: number;
  phone?: string;
  date?: string;
  time?: string;
  price?: string;
  className?: string;
}

export default function DiscoveryCard({
  type,
  title,
  image,
  category,
  address,
  rating,
  reviews,
  phone,
  date,
  time,
  price,
  className
}: DiscoveryCardProps) {
  return (
    <div className={cn("w-full group font-raleway rounded-xl overflow-hidden", className)}>
      {/* Image Section */}
      <div className="relative w-full h-[400px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {category && (
          <div className="absolute top-4 right-4 z-10">
            <span className="text-xs text-[#FFFAF5] px-3 py-1 bg-[#C06350] rounded-full font-semibold uppercase tracking-wider">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-6 py-10 transition-all group-hover:bg-[#F8E1DB] rounded-b-xl space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-xl font-bold text-[#2D241E] leading-tight group-hover:text-[#C06350] transition-colors">
            {title}
          </h2>
          {rating !== undefined && (
            <div className="flex items-center gap-1 text-[#2D241E] shrink-0">
              <Star className="w-4 h-4 fill-[#C06350] text-[#C06350]" />
              <span className="font-bold text-sm">{rating}</span>
            </div>
          )}
        </div>

        {/* Place Specifics */}
        {type === "place" && (
          <div className="space-y-1">
            {address && (
              <div className="flex items-center text-[#2D241E]/60 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-[#C06350]" />
                <span className="truncate">{address}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center text-[#2D241E]/60 text-sm">
                <Phone className="w-4 h-4 mr-2 text-[#C06350]" />
                <span>{phone}</span>
              </div>
            )}
          </div>
        )}

        {/* Event Specifics */}
        {type === "event" && (
          <div className="space-y-1">
            {date && (
              <div className="flex items-center text-[#C06350] text-sm font-bold">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{date}</span>
              </div>
            )}
            {time && (
              <div className="flex items-center text-[#2D241E]/60 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>{time}</span>
              </div>
            )}
          </div>
        )}

        {/* Action / Price */}
        {(price || type === "event") && (
          <div className="pt-4 flex items-center justify-between border-t border-[#C06350]/10 mt-4">
             {price && (
               <div className="flex items-center gap-2">
                 <Ticket className="w-4 h-4 text-[#C06350]" />
                 <span className="font-bold text-[#2D241E]">{price}</span>
               </div>
             )}
             <span className="text-xs font-bold uppercase tracking-widest text-[#C06350] group-hover:underline">
               {type === "event" ? "Get Tickets" : "View Details"}
             </span>
          </div>
        )}
      </div>
    </div>
  );
}
