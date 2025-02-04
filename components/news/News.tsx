"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import dummyNews, { NewsArticle } from "./dummyNews";

const NewsSection = () => {
  // Sort news articles by date (latest first)
  const sortedNews = [...dummyNews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Extract the latest news article for the featured section
  const [latestNews, ...otherNews] = sortedNews;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 min-h-[0vh] pb-12">
   
      <div className="relative lg:col-span-2 rounded-xl overflow-hidden gjustify-between">
      <div className="text-[#C06350] text-2xl font-semibold font-raleway mb-8 ">Featured News</div>
      <div className="relative">
        <Image
          src={latestNews.image}
          alt={latestNews.title}
          width={800}
          height={450}
          className="w-full h-[400px] object-cover rounded-md"
        />
      
        <div className="absolute  inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/50"></div>

        <div className="absolute bottom-6 left-6 text-white z-10">
          <h2 className="text-2xl font-bold">{latestNews.title}</h2>
          <p className="text-sm text-gray-300 mt-1">
            <span className="text-[#C06350]">{latestNews.author}</span> | {latestNews.date}
          </p>
        </div>
        </div>

      </div>

      {/* Other News List */}
      <aside>
        <h3 className="text-[#C06350] text-2xl font-semibold font-raleway mb-8">Latest News</h3>
        <ul className="space-y-4 mt-4">
          {otherNews.map((story) => (
            <li
              key={story.id}
              className="flex gap-4 items-center justify-between border-b border-[#4F4F4F] pb-4"
            >
              <div>
                <Link
                  href="#"
                  className="text-[#4F4F4F] hover:text-[#C06350] font-bold text-xl"
                >
                  {story.title}
                </Link>
                <p className="text-sm text-gray-40 mt-4 font-raleway">
                  <span className="text-[#C06350]">{story.author}</span> | {story.date}
                </p>
              </div>
              <Image
                src={story.image}
                alt={story.title}
                width={80}
                height={80}
                className="rounded-md w-20 h-20 object-cover"
              />
            </li>
          ))}
        </ul>
      </aside>
      <div className="w-full h-[180px] bg-red-400"></div>
      <div className="w-full h-[180px] bg-red-400"></div>
      <div className="w-full h-[180px] bg-red-400"></div>
    </div>
  );
};

export default NewsSection;
