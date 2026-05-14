"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import dummyNews, { NewsArticle } from "./dummyNews";

const NewsSection = () => {
  const sortedNews = [...dummyNews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [latestNews, ...otherNews] = sortedNews;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 font-raleway py-4">
      {/* Featured News */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-[#C06350] text-xl font-bold font-montserrat uppercase tracking-wider border-b border-[#C06350]/10 pb-2">Featured News</h3>
        <Link href={`/news/${latestNews.id}`} className="group block space-y-4">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm">
            <Image
              src={latestNews.image}
              alt={latestNews.title}
              fill
              className="object-cover transition-transform group-hover:scale-105 duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
               <h2 className="text-3xl md:text-5xl font-michy text-[#F8E1DB] leading-tight">{latestNews.title}</h2>
               <p className="text-xs font-bold uppercase tracking-widest opacity-80">
                 {latestNews.author} • {latestNews.date}
               </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Latest News List */}
      <aside className="space-y-6">
        <h3 className="text-[#C06350] text-xl font-bold font-montserrat uppercase tracking-wider border-b border-[#C06350]/10 pb-2">Latest News</h3>
        <ul className="space-y-6">
          {otherNews.slice(0, 4).map((story) => (
            <li key={story.id} className="group">
              <Link href={`/news/${story.id}`} className="flex gap-4 items-center">
                <div className="flex-1 space-y-1">
                  <h4 className="text-[#2D241E] group-hover:text-[#C06350] font-bold text-base leading-snug transition-colors line-clamp-2">
                    {story.title}
                  </h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]/40">
                    {story.date}
                  </p>
                </div>
                <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden shadow-sm border border-[#C06350]/5">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default NewsSection;
