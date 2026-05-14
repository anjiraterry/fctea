"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import { entertainmentArticles, starsOfTheWeek } from "./dummyData";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const Entertainment = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-raleway py-4">
      {/* Entertainment Articles */}
      <div className="space-y-6">
        <h3 className="text-[#C06350] text-xl font-bold font-montserrat uppercase tracking-wider border-b border-[#C06350]/10 pb-2">Entertainment</h3>
        <div className="space-y-6">
          {entertainmentArticles
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3)
            .map((article, index) => (
              <div key={article.id} className="group cursor-pointer">
                <div className="flex gap-4 items-center">
                  {index === 0 && article.image && (
                    <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden shadow-sm">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h4 className="text-[#2D241E] group-hover:text-[#C06350] font-bold text-lg leading-snug transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]/40">
                      By {article.author} • {article.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Stars of the Week */}
      <div className="space-y-6">
        <h3 className="text-[#C06350] text-xl font-bold font-montserrat uppercase tracking-wider border-b border-[#C06350]/10 pb-2">Stars of the Week</h3>
        <div className="relative rounded-xl overflow-hidden bg-[#F8E1DB]/20">
          <Slider {...sliderSettings}>
            {starsOfTheWeek.map((person) => (
              <div key={person.id} className="outline-none">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <h4 className="text-3xl font-michy text-[#F8E1DB]">{person.name}</h4>
                    <div className="text-xs font-bold uppercase tracking-widest opacity-80">
                      {person.social?.handle || "@fctea"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Entertainment;
