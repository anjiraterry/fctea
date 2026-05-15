"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Bookmark, Loader2, MapPin, Calendar, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/lib/store/user";
import DiscoveryCard from "@/components/ui/DiscoveryCard";

export default function BookmarksPage() {
  const user = useUser((state) => state.user);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"place" | "event">("place");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await fetch("/api/user/bookmarks");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch bookmarks", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchBookmarks();
  }, [user]);

  if (loading) return (
    <div className="min-h-screen bg-[#FFFAF5] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#C06350] animate-spin" />
    </div>
  );

  const items = data ? data[activeTab] : [];

  return (
    <div className="page-container pt-24 pb-12 max-w-5xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/profile" className="p-2 hover:bg-[#F9F1ED] rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-[#2D241E]" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#2D241E] font-montserrat tracking-tight">My Saved Items</h1>
              <p className="text-[#2D241E]/40 text-xs font-bold uppercase tracking-widest mt-1">Your personal collection</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-[#C06350]/10 pb-px">
          {(["place", "event"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all relative ${
                activeTab === tab ? "text-[#C06350]" : "text-[#2D241E]/30 hover:text-[#2D241E]/60"
              }`}
            >
              {tab}s
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C06350]" />
              )}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((b: any) => (
              <DiscoveryCard
                key={b.id}
                type={activeTab}
                title={b.details.name || b.details.title}
                image={activeTab === "place" 
                  ? b.details.images?.[0]?.url 
                  : b.details.media?.[0]?.url || "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e"
                }
                category={b.details.category?.name}
                address={b.details.address}
                date={activeTab === "event" ? new Date(b.details.startDate).toLocaleDateString() : undefined}
                rating={b.details.rating}
                price={b.details.price}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4">
            <div className="w-20 h-20 bg-[#F9F1ED] rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-10 h-10 text-[#C06350]/20" />
            </div>
            <h3 className="text-xl font-bold text-[#2D241E]">No {activeTab}s saved yet</h3>
            <p className="text-[#2D241E]/50 max-w-xs mx-auto text-sm leading-relaxed">
              Explore the city and bookmark your favorite spots to build your personal guide.
            </p>
            <div className="pt-4">
              <Link 
                href={activeTab === "place" ? "/places" : "/events"} 
                className="px-6 py-2.5 bg-[#C06350] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#A85544] transition-all"
              >
                Discover {activeTab}s
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
