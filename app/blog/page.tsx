"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, Plus, BookOpen, Edit } from "lucide-react";
import { useBlog } from "@/lib/hooks/use-city-data";
import EmptyState from "@/components/shared/EmptyState";
import { useUser } from "@/lib/store/user";
import { useResourceModal } from "@/lib/store/modal";
import PlaceholderImage from "@/components/shared/PlaceholderImage";

import Pagination from "@/components/shared/Pagination";

const CATEGORIES = ["All", "Food & Drink", "Nightlife", "Neighborhood Guides", "People", "Style"];

export default function BlogPage() {
  const user = useUser((state: any) => state.user);
  const openModal = useResourceModal(state => state.openModal);
  const isPrivileged = user?.role === "ADMIN" || user?.role === "EDITOR";
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

  const query = new URLSearchParams({
    page: page.toString(),
    limit: "13", // 1 featured + 12 rest
    ...(activeCategory !== "All" && { category: activeCategory })
  }).toString();

  const { data: response, isLoading } = useBlog(query);

  const posts = response?.data || [];
  const pagination = response?.meta?.pagination;
  const featured = posts[0];
  const rest = posts.slice(1);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <span className="section-label">Editorial</span>
          <h1 className="page-header-title">The Loop</h1>
          <p className="page-header-sub">Deep dives into Abuja culture, the people behind the city, and the places that define it.</p>
        </div>
        {isPrivileged && (
          <button 
            onClick={() => openModal("blog")}
            className="flex items-center gap-1.5 text-[10px] font-black bg-[#C06350] text-white px-5 py-3 rounded-2xl hover:bg-[#a0503f] hover:scale-105 transition-all shadow-sm active:scale-95 uppercase tracking-widest mt-2"
          >
            <Plus className="w-4 h-4" /> Write Post
          </button>
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
          <div className="aspect-[16/7] bg-[#F9F1ED] rounded-[2.5rem]" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-[#F9F1ED] rounded-2xl" />
            ))}
          </div>
        </div>
      ) : posts.length > 0 ? (
        <>
          {/* Featured post */}
          {featured && page === 1 && (
            <Link href={`/blog/${featured.slug}`} className="group block rounded-[2.5rem] overflow-hidden bg-white hover:bg-[#F9F1ED] transition-colors border border-[#C06350]/5">
              <div className="relative aspect-[16/7] overflow-hidden">
                {featured.images?.[0] || featured.featuredImage ? (
                  <>
                    <Image src={featured.images?.[0] || featured.featuredImage} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/90 via-[#2D241E]/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 space-y-3">
                      <span className="inline-block px-3 py-1 bg-[#C06350] text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                        {featured.category || "Editorial"}
                      </span>
                      <h2 className="text-2xl md:text-4xl font-black text-white leading-[1.1] group-hover:text-[#F2C4B8] transition-colors tracking-tight">
                        {featured.title}
                      </h2>
                      <div className="flex items-center gap-3 text-white/50 text-[11px] font-medium">
                        <span>{new Date(featured.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric' })}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />5 min read</span>
                      </div>
                      {isPrivileged && (
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openModal("blog", "edit", featured);
                          }}
                          className="absolute top-8 right-8 p-3 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-2xl transition-all z-10"
                        >
                          <Edit className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col h-full">
                    <PlaceholderImage icon={BookOpen} className="flex-1" />
                    <div className="p-8 md:p-12 space-y-3 bg-white/40">
                      <span className="inline-block px-3 py-1 bg-[#C06350] text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                        {featured.category || "Editorial"}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black text-[#2D241E] leading-[1.1] group-hover:text-[#C06350] transition-colors tracking-tight">
                        {featured.title}
                      </h2>
                      <div className="flex items-center gap-3 text-[#2D241E]/40 text-[11px] font-medium">
                        <span>{new Date(featured.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric' })}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />5 min read</span>
                      </div>
                      {isPrivileged && (
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openModal("blog", "edit", featured);
                          }}
                          className="absolute top-8 right-8 p-3 text-[#2D241E]/20 hover:text-[#C06350] hover:bg-[#F9F1ED] rounded-2xl transition-all z-10"
                        >
                          <Edit className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          )}

          {/* Post list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mt-8">
            {(page > 1 ? posts : rest).map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex items-center gap-5 py-6 hover:bg-[#F9F1ED] px-4 -mx-4 rounded-2xl transition-colors">
                <div className="relative w-28 h-20 shrink-0 rounded-xl overflow-hidden">
                  {post.images?.[0] || post.featuredImage ? (
                    <Image src={post.images?.[0] || post.featuredImage} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="120px" />
                  ) : (
                    <PlaceholderImage icon={BookOpen} className="scale-75" />
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <span className="text-[10px] font-bold text-[#C06350] uppercase tracking-widest">{post.category || "Story"}</span>
                  <h3 className="font-bold text-base text-[#2D241E] group-hover:text-[#C06350] transition-colors line-clamp-2 leading-tight tracking-tight">{post.title}</h3>
                  <div className="flex items-center gap-3 text-[10px] text-[#2D241E]/30 font-medium">
                    <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />4 min read</span>
                  </div>
                </div>
                {isPrivileged && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openModal("blog", "edit", post);
                    }}
                    className="p-1.5 text-[#2D241E]/20 hover:text-[#C06350] transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                <ArrowRight className="w-4 h-4 text-[#2D241E]/20 group-hover:text-[#C06350] shrink-0 transition-colors" />
              </Link>
            ))}
          </div>

          <Pagination 
            currentPage={page}
            totalPages={pagination?.totalPages || 1}
            onPageChange={setPage}
          />
        </>
      ) : (
        <EmptyState 
          emoji="✍️"
          title={isPrivileged ? "Start writing your first post" : "The Loop is empty"}
          description={isPrivileged 
            ? `There are currently no stories in the ${activeCategory.toLowerCase()} category. Share your first deep dive with the city.` 
            : `We haven't published any stories in the ${activeCategory.toLowerCase()} category yet. Stay tuned for deep dives into the city.`}
          ctaText={isPrivileged ? "Create Post" : "Back to all stories"}
          ctaHref={isPrivileged ? undefined : "/blog"}
          onClick={isPrivileged ? () => openModal("blog") : undefined}
        />
      )}
    </div>
  );
}
