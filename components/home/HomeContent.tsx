"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { useQuery } from "@tanstack/react-query";
import PlaceCard from "@/components/cards/PlaceCard";
import EventCard from "@/components/cards/EventCard";
import EmptyState from "@/components/shared/EmptyState";
import { useUser } from "@/lib/store/user";
import { useResourceModal } from "@/lib/store/modal";
import {
  ArrowRight,
  Flame,
  Search,
  ChevronLeft,
  ChevronRight,
  Zap,
  Loader2,
  Edit,
  Plus,
  User,
} from "lucide-react";
// API Fetching Helpers
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HERO_SLIDES = [
  {
    id: 1,
    title: "Abuja Nights",
    subtitle: "Where the city never sleeps.",
    cta: "Explore Nightlife",
    ctaHref: "/explore",
    image:
      "https://images.unsplash.com/photo-1642433706033-82b795d91fe3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Trending Now",
  },
  {
    id: 2,
    title: "Weekend Guide",
    subtitle: "The best of Abuja this weekend, curated for you.",
    cta: "See Events",
    ctaHref: "/events",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000",
    tag: "Editor's Pick",
  },
  {
    id: 3,
    title: "Hidden Gems",
    subtitle: "Spots only locals know about.",
    cta: "Discover Places",
    ctaHref: "/places",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000",
    tag: "Featured",
  },
];

const SEARCH_CATEGORIES = ["Places", "Events", "People", "News", "Blog"];

const AREAS = [
  {
    name: "Maitama",
    desc: "Luxury & Diplomacy",
    img: "/maitama.jpg",
    href: "/places?area=maitama",
  },
  {
    name: "Wuse 2",
    desc: "Food & Nightlife",
    img: "/wuse.jpg",
    href: "/places?area=wuse2",
  },
  {
    name: "Gwarinpa",
    desc: "Community & Cafés",
    img: "/gwarinpa.jpg",
    href: "/places?area=gwarinpa",
  },
  {
    name: "Jabi",
    desc: "Lakeside & Leisure",
    img: "/jabi.jpg",
    href: "/places?area=jabi",
  },
];

/* HERO */
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("Places");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const slide = HERO_SLIDES[current];
  const user = useUser((state: any) => state.user);
  const firstName = user?.display_name?.split(" ")[0];

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % HERO_SLIDES.length),
      6000,
    );
    return () => clearInterval(t);
  }, []);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length),
    [],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % HERO_SLIDES.length),
    [],
  );

  return (
    <section className="px-5 pt-24 pb-4 mx-auto max-w-7xl lg:px-6">
      <div className="relative w-full aspect-[21/9] min-h-[480px] rounded-[2.5rem] overflow-hidden group/hero">
        {/* Slides */}
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#2D241E]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,99,80,0.35)_0%,transparent_70%)]" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          {user && (
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
              Welcome back, {firstName}
            </p>
          )}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C06350] text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-4">
            {slide.tag}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4 drop-shadow-sm">
            {slide.title}
          </h1>
          <p className="max-w-lg mb-8 text-base font-medium leading-relaxed md:text-lg text-white/90">
            {slide.subtitle}
          </p>

          {/* Discovery Search Bar - Custom Dropdown */}
          <div className="w-full max-w-xl bg-white/95 backdrop-blur-sm rounded-2xl p-1.5 flex items-center gap-1 transition-all focus-within:ring-2 ring-[#C06350]/20">
            <div className="relative shrink-0">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-[#F9F1ED] hover:bg-[#F2E8E4] transition-colors rounded-xl px-4 py-2.5 text-[#C06350] text-xs font-bold outline-none"
              >
                {searchCategory}
                <ChevronLeft
                  className={`w-3 h-3 transition-transform ${isDropdownOpen ? "rotate-90" : "-rotate-90"}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-xl shadow-xl shadow-black/5 border border-[#C06350]/5 overflow-hidden z-50 py-1 animate-in fade-in zoom-in-95 duration-150">
                  {SEARCH_CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSearchCategory(c);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${searchCategory === c ? "text-[#C06350] bg-[#F9F1ED]" : "text-[#2D241E]/60 hover:bg-[#F9F1ED]/50"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Find ${searchCategory.toLowerCase()}…`}
              className="flex-1 bg-transparent text-[#2D241E] placeholder:text-[#2D241E]/30 text-sm outline-none px-3 font-medium"
            />

            <button className="flex items-center justify-center w-11 h-11 bg-[#C06350] text-white rounded-xl hover:bg-[#a0503f] transition-all shrink-0">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Overlays */}
        <div className="absolute inset-y-0 left-0 flex items-center justify-center w-24 transition-opacity opacity-0 group-hover/hero:opacity-100">
          <button
            onClick={prev}
            className="p-3 text-white transition-all rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center justify-center w-24 transition-opacity opacity-0 group-hover/hero:opacity-100">
          <button
            onClick={next}
            className="p-3 text-white transition-all rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute flex gap-3 -translate-x-1/2 bottom-8 left-1/2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 bg-[#C06350]" : "w-1.5 bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION HEADER ─── */
function SectionHeader({
  title,
  href,
  resourceType,
}: {
  title: string;
  href: string;
  resourceType?: "place" | "event" | "news" | "person" | "brand" | "blog";
}) {
  const user = useUser((state: any) => state.user);
  const openModal = useResourceModal((state) => state.openModal);
  const isPrivileged = user?.role === "ADMIN" || user?.role === "EDITOR";

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-[#2D241E]">{title}</h2>
      <div className="flex items-center gap-4">
        {isPrivileged && resourceType && (
          <button
            onClick={() => openModal(resourceType)}
            className="flex items-center gap-1.5 text-[10px] font-black bg-[#C06350] text-white px-4 py-2 rounded-xl hover:bg-[#a0503f] hover:scale-105 transition-all shadow-sm active:scale-95 uppercase tracking-widest"
          >
            <Plus className="w-3.5 h-3.5" />{" "}
            {resourceType === "person"
              ? "Add Person"
              : resourceType === "news"
                ? "Add News"
                : resourceType === "event"
                  ? "Add Event"
                  : resourceType === "place"
                    ? "Add Place"
                    : "Add New"}
          </button>
        )}
        <Link
          href={href}
          className="flex items-center gap-1 text-sm text-[#C06350] font-semibold hover:gap-2 transition-all"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

/* ─── WHAT'S HOT ─── */
function WhatsHot() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const { data: response, isLoading } = useQuery({
    queryKey: ["places", "hot"],
    queryFn: () => fetcher("/api/places?limit=10&isTrending=true"),
  });

  const items = response?.data || [];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const user = useUser((state: any) => state.user);
  const openModal = useResourceModal((state) => state.openModal);
  const isPrivileged = user?.role === "ADMIN" || user?.role === "EDITOR";

  return (
    <section className="relative group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#2D241E]">🔥 What's Hot</h2>
        <div className="flex items-center gap-2">
          {isPrivileged && (
            <button
              onClick={() => openModal("place")}
              className="flex items-center gap-1.5 text-[10px] font-black bg-[#C06350] text-white px-4 py-2 rounded-xl hover:bg-[#a0503f] hover:scale-105 transition-all shadow-sm active:scale-95 uppercase tracking-widest mr-2"
            >
              <Plus className="w-3.5 h-3.5" /> Add Place
            </button>
          )}
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-[#F9F1ED] text-[#C06350] hover:bg-[#C06350] hover:text-white transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-[#F9F1ED] text-[#C06350] hover:bg-[#C06350] hover:text-white transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <Link
            href="/places"
            className="ml-4 flex items-center gap-1 text-sm text-[#C06350] font-semibold hover:gap-2 transition-all"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {isLoading ? null : items.length > 0 ? (
        <div
          ref={scrollRef}
          className="flex gap-4 px-5 pb-1 -mx-5 overflow-x-auto no-scrollbar md:mx-0 md:px-0 snap-x snap-mandatory"
        >
          {items.map((item: any) => (
            <div key={item.id} className="flex-shrink-0 w-[280px] snap-start">
              <PlaceCard
                id={item.id}
                title={item.name}
                category={item.category?.name || "Uncategorized"}
                images={item.images}
                address={item.address || "Abuja"}
                rating={item.rating}
                isHot={item.hotScore > 0.8}
                href={`/places/${item.slug}`}
                fullData={item}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          emoji="☕"
          title={
            isPrivileged ? "Add your first hot spot" : "No hot spots found"
          }
          description={
            isPrivileged
              ? "Abuja is quiet. Be the first to list a trending spot today."
              : "It's a bit quiet right now. Check back later for the latest trending spots in Abuja."
          }
          ctaText={isPrivileged ? "Create Place" : "Explore all places"}
          ctaHref={isPrivileged ? undefined : "/places"}
          onClick={isPrivileged ? () => openModal("place") : undefined}
        />
      )}
    </section>
  );
}

/* EVENTS */
function UpcomingEvents() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["events", "upcoming"],
    queryFn: () => fetcher("/api/events?limit=4&sort=upcoming"),
  });

  const items = response?.data || [];

  return (
    <section>
      <SectionHeader
        title="🗓️ Upcoming Events"
        href="/events"
        resourceType="event"
      />

      {isLoading ? null : items.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {items.map((e: any) => (
            <EventCard
              id={e.id}
              key={e.id}
              title={e.title}
              date={new Date(e.startDate).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
              venue={e.venue || "Abuja"}
              media={e.media}
              price={e.price}
              attendees={0}
              isTrending={e.isFeatured}
              href={`/events/${e.slug}`}
              fullData={e}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          emoji="🎈"
          title="No events scheduled"
          description="The city is taking a breather. We'll have new events listed soon!"
          ctaText="Browse archive"
          ctaHref="/events"
        />
      )}
    </section>
  );
}

/* PEOPLE */
function FeaturedPeople() {
  const openModal = useResourceModal((state) => state.openModal);
  const { data: response, isLoading } = useQuery({
    queryKey: ["people", "featured"],
    queryFn: () => fetcher("/api/people?limit=8"),
  });

  const items = response?.data || [];

  return (
    <section>
      <SectionHeader
        title="👋 People of Abuja"
        href="/people"
        resourceType="person"
      />

      {isLoading ? null : items.length > 0 ? (
        <div className="flex gap-6 px-5 pb-1 -mx-5 overflow-x-auto no-scrollbar md:mx-0 md:px-0">
          {items.map((p: any) => {
            const user = useUser((state: any) => state.user);
            const isPrivileged =
              user?.role === "ADMIN" || user?.role === "EDITOR";
            const avatar = p.images?.[0] || p.avatar;

            return (
              <div key={p.id} className="relative group">
                <Link
                  href={`/people/${p.slug}`}
                  className="flex-shrink-0 block w-32 space-y-3 text-center"
                >
                  <div className="relative mx-auto w-20 h-20 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-[#C06350] transition-all">
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <PlaceholderImage icon={User} className="scale-75" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#2D241E] group-hover:text-[#C06350] transition-colors leading-tight">
                      {p.name}
                    </p>
                    <p className="text-xs text-[#2D241E]/40 mt-0.5">
                      {p.bio || "Abuja Resident"}
                    </p>
                  </div>
                </Link>
                {isPrivileged && (
                  <button
                    onClick={() => openModal("person", "edit", p)}
                    className="absolute top-0 right-0 p-1.5 bg-white rounded-full shadow-lg text-[#C06350] opacity-0 group-hover:opacity-100 transition-all z-20 hover:scale-110"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 text-center text-[#2D241E]/30 text-sm italic font-medium">
          Meet the community soon…
        </div>
      )}
    </section>
  );
}

/* WEEKEND GUIDE */
function WeekendGuide() {
  const openModal = useResourceModal((state) => state.openModal);
  const { data: response } = useQuery({
    queryKey: ["events", "weekend"],
    queryFn: () => fetcher("/api/events?limit=3&sort=upcoming"),
  });

  const items = response?.data || [];

  return (
    <section className="rounded-3xl bg-[#C06350] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="max-w-md space-y-3">
        <span className="text-xs font-bold tracking-widest uppercase text-white/60">
          🍸 This Weekend
        </span>
        <h2 className="text-2xl font-black text-white md:text-3xl">
          Weekend Guide: May 2025
        </h2>
        <p className="text-sm leading-relaxed text-white/75">
          From brunch to rooftop sundowners. The complete Abuja weekend, curated
          by our editors.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#C06350] font-bold rounded-xl hover:scale-105 transition-all text-sm"
        >
          See the Guide <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="w-full space-y-2 md:w-72">
        {items.length > 0 ? (
          items.map((e: any) => {
            const user = useUser((state: any) => state.user);
            const isPrivileged =
              user?.role === "ADMIN" || user?.role === "EDITOR";

            return (
              <div
                key={e.id}
                className="relative flex items-center gap-3 p-3 transition-colors group bg-white/10 rounded-xl hover:bg-white/20"
              >
                <div className="relative flex-shrink-0 overflow-hidden rounded-lg w-9 h-9">
                  {e.media?.[0]?.url ? (
                    <Image
                      src={e.media[0].url}
                      alt={e.title}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  ) : (
                    <PlaceholderImage icon={Zap} className="scale-75" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    {e.title}
                  </p>
                  <p className="text-xs text-white/50">
                    {new Date(e.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {isPrivileged && (
                  <button
                    onClick={() => openModal("event", "edit", e)}
                    className="p-1.5 text-white/20 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-4 text-xs italic text-center bg-white/5 rounded-xl text-white/40">
            New weekend highlights coming soon
          </div>
        )}
      </div>
    </section>
  );
}

/* EXPLORE BY AREA */
function ExploreByArea() {
  return (
    <section>
      <SectionHeader title="📍 Explore by Area" href="/explore" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {AREAS.map((area) => (
          <Link
            key={area.name}
            href={area.href}
            className="group relative rounded-2xl overflow-hidden aspect-[4/5] block"
          >
            <Image
              src={area.img}
              alt={area.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/80 via-[#2D241E]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-base font-bold leading-tight text-white">
                {area.name}
              </p>
              <p className="text-white/60 text-xs mt-0.5">{area.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* LATEST NEWS STRIP */
function LatestNews() {
  const openModal = useResourceModal((state) => state.openModal);
  const { data: response, isLoading } = useQuery({
    queryKey: ["news", "latest"],
    queryFn: () => fetcher("/api/news?limit=5"),
  });

  const items = response?.data || [];

  return (
    <section>
      <SectionHeader title="🗞️ Latest News" href="/news" resourceType="news" />

      {isLoading ? null : items.length > 0 ? (
        <div className="space-y-1">
          {items.map((s: any) => {
            const user = useUser((state: any) => state.user);
            const isPrivileged =
              user?.role === "ADMIN" || user?.role === "EDITOR";

            return (
              <div key={s.id} className="relative group">
                <Link
                  href={`/news/${s.slug}`}
                  className="flex items-center justify-between py-3 px-4 -mx-4 rounded-xl hover:bg-[#F9F1ED] transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-[#C06350] uppercase tracking-wider w-16 shrink-0">
                      {s.category || "General"}
                    </span>
                    <span className="text-sm font-semibold text-[#2D241E] group-hover:text-[#C06350] transition-colors">
                      {s.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 ml-4 shrink-0">
                    <span className="text-xs text-[#2D241E]/30 font-medium">
                      {new Date(s.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    {isPrivileged && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          openModal("news", "edit", s);
                        }}
                        className="p-1.5 text-[#2D241E]/20 hover:text-[#C06350] opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 text-center text-[#2D241E]/30 text-sm italic font-medium">
          No news today. Abuja is peaceful.
        </div>
      )}
    </section>
  );
}

/* PAGE */
export default function HomeContent() {
  return (
    <div className="font-montserrat">
      {/* Hero immediately after navbar — no wrapper padding */}
      <HeroCarousel />

      {/* All other sections in page container */}
      <div className="page-container">
        <WhatsHot />
        <UpcomingEvents />
        <WeekendGuide />
        <FeaturedPeople />
        <ExploreByArea />
        <LatestNews />
      </div>
    </div>
  );
}
