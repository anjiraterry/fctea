"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, Plus, Newspaper, Edit } from "lucide-react";
import { useNews } from "@/lib/hooks/use-city-data";
import EmptyState from "@/components/shared/EmptyState";
import { useUser } from "@/lib/store/user";
import { useResourceModal } from "@/lib/store/modal";
import PlaceholderImage from "@/components/shared/PlaceholderImage";

import Pagination from "@/components/shared/Pagination";

import { useToast } from "@/components/ui/use-toast";
import { Database } from "lucide-react";

const CATEGORIES = ["All", "Culture", "Food", "Style", "Music", "Business"];

export default function NewsPage() {
  const { toast } = useToast();
  const user = useUser((state: any) => state.user);
  const openModal = useResourceModal(state => state.openModal);
  const isPrivileged = user?.role === "ADMIN" || user?.role === "EDITOR";
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);

  const query = new URLSearchParams({
    page: page.toString(),
    limit: "13", // 1 featured + 12 rest
    ...(activeCategory !== "All" && { category: activeCategory })
  }).toString();

  const { data: response, isLoading } = useNews(query);

  const news = response?.data || [];
  const pagination = response?.meta?.pagination;
  const featured = news[0];
  const rest = news.slice(1);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <span className="section-label">Latest</span>
          <h1 className="page-header-title">News</h1>
          <p className="page-header-sub">Culture updates, city stories, and breaking news from the FCT.</p>
        </div>
        {isPrivileged && (
          <div className="flex items-center gap-2 mt-2">
            <button 
              disabled={isSyncing}
              onClick={async () => {
                setIsSyncing(true);
                try {
                  const res = await fetch("/api/debug/news-import");
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message || "Sync failed");
                  
                  toast({
                    title: "Sync Complete",
                    description: data.message,
                  });
                  window.location.reload();
                } catch (error: any) {
                  toast({
                    title: "Sync Failed",
                    description: error.message,
                    variant: "destructive",
                  });
                } finally {
                  setIsSyncing(false);
                }
              }}
              className="flex items-center gap-1.5 text-[10px] font-black bg-[#F9F1ED] text-[#C06350] px-5 py-3 rounded-2xl hover:bg-[#F2E8E4] transition-all shadow-sm active:scale-95 uppercase tracking-widest disabled:opacity-50"
            >
              {isSyncing ? <Database className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />} Sync News
            </button>
            <button 
              onClick={() => openModal("news")}
              className="flex items-center gap-1.5 text-[10px] font-black bg-[#C06350] text-white px-5 py-3 rounded-2xl hover:bg-[#a0503f] hover:scale-105 transition-all shadow-sm active:scale-95 uppercase tracking-widest"
            >
              <Plus className="w-4 h-4" /> Add News
            </button>
          </div>
        )}
      </div>

      {/* Category chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat} 
            onClick={() => handleCategoryChange(cat)}
            className={activeCategory === cat ? "filter-chip filter-chip-active" : "filter-chip"}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-8 animate-pulse">
          <div className="aspect-[2/1] bg-[#F9F1ED] rounded-[2.5rem]" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-[#F9F1ED] rounded-2xl" />
            ))}
          </div>
        </div>
      ) : news.length > 0 ? (
        <>
          {/* Featured story */}
          {featured && page === 1 && (
            <Link href={`/news/${featured.slug}`} className="group block rounded-[2.5rem] overflow-hidden bg-white hover:bg-[#F9F1ED] transition-colors border border-[#C06350]/5">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden min-h-[300px]">
                  {featured.images?.[0] || featured.featuredImage ? (
                    <Image src={featured.images?.[0] || featured.featuredImage} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="600px" />
                  ) : (
                    <PlaceholderImage icon={Newspaper} />
                  )}
                  <span className="absolute top-6 left-6 px-3 py-1 bg-[#C06350] text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                    {featured.category || "Featured"}
                  </span>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center space-y-6 relative">
                  {isPrivileged && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openModal("news", "edit", featured);
                      }}
                      className="absolute top-4 right-4 p-2 text-[#2D241E]/20 hover:text-[#C06350] hover:bg-[#F9F1ED] rounded-xl transition-all z-10"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  )}
                  <div className="flex items-center gap-2 text-[#2D241E]/30 text-xs font-medium">
                    <Clock className="w-3 h-3" />
                    {new Date(featured.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-[#2D241E] group-hover:text-[#C06350] transition-colors leading-[1.1] tracking-tight">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-[#2D241E]/50 leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-[#C06350] text-sm font-bold group-hover:gap-2 transition-all">
                    Read full story <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Rest of stories */}
          {(page > 1 ? news : rest).length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mt-8">
              {(page > 1 ? news : rest).map((story: any) => (
                <Link key={story.id} href={`/news/${story.slug}`} className="group flex items-center gap-5 py-6 hover:bg-[#F9F1ED] px-4 -mx-4 rounded-2xl transition-colors">
                  <div className="relative w-24 h-20 shrink-0 rounded-xl overflow-hidden">
                    {story.images?.[0] || story.featuredImage ? (
                      <Image src={story.images?.[0] || story.featuredImage} alt={story.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="120px" />
                    ) : (
                      <PlaceholderImage icon={Newspaper} className="scale-75" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <span className="text-[10px] font-bold text-[#C06350] uppercase tracking-widest">{story.category || "News"}</span>
                    <h3 className="font-bold text-base text-[#2D241E] group-hover:text-[#C06350] transition-colors line-clamp-2 leading-snug tracking-tight">
                      {story.title}
                    </h3>
                    <p className="text-[10px] text-[#2D241E]/30 font-medium">
                      {new Date(story.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  {isPrivileged && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openModal("news", "edit", story);
                      }}
                      className="p-1.5 text-[#2D241E]/20 hover:text-[#C06350] transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </Link>
              ))}
            </div>
          )}

          <Pagination 
            currentPage={page}
            totalPages={pagination?.totalPages || 1}
            onPageChange={setPage}
          />
        </>
      ) : (
        <EmptyState 
          emoji="🗞️"
          title={isPrivileged ? "Add your first story" : "No news stories found"}
          description={isPrivileged 
            ? `There are currently no stories in the ${activeCategory.toLowerCase()} category. Start documenting Abuja's culture today.` 
            : `We couldn't find any stories in the ${activeCategory.toLowerCase()} category. Try checking another one.`}
          ctaText={isPrivileged ? "Create News" : "Back to all news"}
          ctaHref={isPrivileged ? undefined : "/news"}
          onClick={isPrivileged ? () => openModal("news") : undefined}
        />
      )}
    </div>
  );
}
