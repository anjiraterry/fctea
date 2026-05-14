"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime?: string;
  date?: string;
  href?: string;
  featured?: boolean;
  className?: string;
}

export default function BlogCard({
  title,
  excerpt,
  image,
  category,
  readTime,
  date,
  href = "/blog",
  featured = false,
  className,
}: BlogCardProps) {
  if (featured) {
    return (
      <Link
        href={href}
        className={cn(
          "group relative block rounded-2xl overflow-hidden hover:bg-[#F9F1ED] transition-colors duration-250",
          className ?? "aspect-[16/9]"
        )}
      >
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/90 via-[#2D241E]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
          <span className="inline-block px-3 py-1 bg-[#C06350] text-white text-xs font-montserrat font-bold rounded-full uppercase tracking-widest">
            {category}
          </span>
          <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-white leading-tight line-clamp-2 group-hover:text-[#E8956D] transition-colors">
            {title}
          </h2>
          <p className="text-white/70 text-sm font-montserrat line-clamp-2">{excerpt}</p>
          <div className="flex items-center gap-4 text-white/50 text-xs font-montserrat pt-1">
            {date && <span>{date}</span>}
            {readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {readTime}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-2xl overflow-hidden bg-white hover:bg-[#F9F1ED] transition-colors duration-250",
        className
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="400px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/40 to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#C06350] text-white text-xs font-montserrat font-bold rounded-full uppercase tracking-wide">
          {category}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-montserrat font-bold text-[#2D241E] text-base leading-snug group-hover:text-[#C06350] transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-[#2D241E]/50 text-xs font-montserrat line-clamp-2">{excerpt}</p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3 text-[#2D241E]/30 text-xs font-montserrat">
            {date && <span>{date}</span>}
            {readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {readTime}
              </span>
            )}
          </div>
          <ArrowRight className="w-4 h-4 text-[#C06350] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
