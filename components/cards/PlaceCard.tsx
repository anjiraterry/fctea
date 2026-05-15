"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Bookmark, Flame, Edit, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/store/user";
import { useResourceModal } from "@/lib/store/modal";
import PlaceholderImage from "@/components/shared/PlaceholderImage";

interface PlaceCardProps {
  id?: string;
  title: string;
  category: string;
  image?: string;
  images?: any[]; 
  address: string;
  rating?: number;
  isHot?: boolean;
  href?: string;
  className?: string;
  fullData?: any; 
}

export default function PlaceCard({ id, title, category, image, images = [], address, rating, isHot, href = "/places", className, fullData }: PlaceCardProps) {
  const user = useUser(state => state.user);
  const openModal = useResourceModal(state => state.openModal);
  const isPrivileged = user?.role === "ADMIN" || user?.role === "EDITOR";
  
  const getImageUrl = (img: any) => {
    if (!img) return null;
    if (typeof img === 'string') return img;
    return img.url;
  };

  const displayImage = getImageUrl(images?.[0]) || image;

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openModal("place", "edit", fullData || { id, name: title, address, rating, images });
  };

  return (
    <div className={cn("group relative block rounded-2xl overflow-hidden bg-white hover:bg-[#F9F1ED] transition-colors duration-250", className)}>
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          {displayImage ? (
            <Image src={displayImage} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 300px" />
          ) : (
            <PlaceholderImage icon={MapIcon} />
          )}
          {displayImage && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/60 via-transparent to-transparent" />
          )}
          {isHot && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-[#C06350] text-white text-xs font-bold rounded-full">
              <Flame className="w-3 h-3" /> HOT
            </div>
          )}
          <button onClick={e => e.preventDefault()} className="absolute top-3 right-3 p-1.5 bg-white/20 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[#C06350]" aria-label="Bookmark">
            <Bookmark className="w-3.5 h-3.5" />
          </button>
          <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-white/20 text-white text-xs font-semibold rounded-md uppercase tracking-wide">{category}</span>
        </div>
      </Link>
      
      {isPrivileged && (
        <button 
          onClick={handleEdit}
          className="absolute top-3 left-3 flex items-center justify-center w-8 h-8 bg-white/90 text-[#C06350] rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-20"
        >
          <Edit className="w-4 h-4" />
        </button>
      )}

      <Link href={href} className="p-4 space-y-1.5 block">
        <h3 className="font-bold text-[#2D241E] text-sm leading-tight group-hover:text-[#C06350] transition-colors line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#2D241E]/40 text-xs"><MapPin className="w-3 h-3" />{address}</div>
          {rating && <div className="flex items-center gap-1 text-amber-500 text-xs font-bold"><Star className="w-3 h-3 fill-current" />{rating}</div>}
        </div>
      </Link>
    </div>
  );
}
