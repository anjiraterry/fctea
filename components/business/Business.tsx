"use client";

import React from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Phone, Star, Instagram } from "lucide-react";
import { businesses, podcasts } from "./dummyData";
import Link from "next/link";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
};

const Business = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-raleway py-4">
      {/* Businesses Slider */}
      <div className="space-y-6">
        <h3 className="text-[#C06350] text-xl font-bold font-montserrat uppercase tracking-wider border-b border-[#C06350]/10 pb-2">Businesses</h3>
        <Slider {...sliderSettings}>
          {businesses.map((business) => (
            <div key={business.id} className="group outline-none">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={business.image}
                  alt={business.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-700"
                />
                <div className="absolute top-4 right-4 bg-[#C06350] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {business.category}
                </div>
              </div>
              <div className="py-4 space-y-2">
                <h2 className="text-2xl font-bold text-[#2D241E] group-hover:text-[#C06350] transition-colors">{business.name}</h2>
                <p className="text-sm text-[#2D241E]/60 italic font-light line-clamp-1">"{business.desc}"</p>
                <div className="flex items-center gap-4 text-xs font-bold text-[#C06350]">
                  <div className="flex items-center gap-1">
                    <Instagram className="w-3 h-3" />
                    {business.social?.handle}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {business.rating || 4.5}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Podcasts List */}
      <div className="space-y-6">
        <h3 className="text-[#C06350] text-xl font-bold font-montserrat uppercase tracking-wider border-b border-[#C06350]/10 pb-2">Podcasts</h3>
        <div className="space-y-4">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="flex bg-white/40 border border-[#C06350]/5 items-center gap-4 p-3 rounded-xl hover:bg-white/60 transition-all group">
              <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={podcast.image}
                  alt={podcast.title}
                  fill
                  className="object-cover group-hover:scale-110 duration-500"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-[#2D241E] group-hover:text-[#C06350] font-bold text-lg leading-tight transition-colors">{podcast.title}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]/40">
                  {podcast.date} • Featured
                </p>
              </div>
              <div className="w-10 h-10 bg-[#C06350]/10 text-[#C06350] rounded-full flex items-center justify-center hover:bg-[#C06350] hover:text-white transition-all cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Business;
