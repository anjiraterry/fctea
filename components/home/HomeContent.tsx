"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Search, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import PlaceCard from "@/components/cards/PlaceCard";
import EventCard from "@/components/cards/EventCard";

/* ─── DATA ─── */
const HERO_SLIDES = [
  { id: 1, title: "Abuja Nights", subtitle: "Where the city never sleeps.", cta: "Explore Nightlife", ctaHref: "/explore", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000", tag: "Trending Now" },
  { id: 2, title: "Weekend Guide", subtitle: "The best of Abuja this weekend, curated for you.", cta: "See Events", ctaHref: "/events", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000", tag: "Editor's Pick" },
  { id: 3, title: "Hidden Gems", subtitle: "Spots only locals know about.", cta: "Discover Places", ctaHref: "/places", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000", tag: "Featured" },
];

const SEARCH_CATEGORIES = ["Places", "Events", "People", "News", "Blog"];

const HOT_ITEMS = [
  { title: "Sky Lounge Abuja",    category: "Lounge",     image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800", address: "Maitama",  rating: 4.9, isHot: true,  href: "/places/sky-lounge" },
  { title: "The Crib Restaurant", category: "Restaurant", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800", address: "Wuse 2",   rating: 4.7, isHot: true,  href: "/places/the-crib" },
  { title: "Bantu Coffee",        category: "Café",       image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800", address: "Gwarinpa", rating: 4.8, isHot: false, href: "/places/bantu-coffee" },
  { title: "Jabi Lake Park",      category: "Outdoor",    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800", address: "Jabi",     rating: 4.6, isHot: false, href: "/places/jabi-lake" },
  { title: "Abuja Jazz Lounge",   category: "Live Music", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=800", address: "CBD",      rating: 4.8, isHot: true,  href: "/places/jazz-lounge" },
];

const EVENTS = [
  { title: "Capital Block Party 2025", date: "Sat, Jun 14",  venue: "Jabi Lake Park",   image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400", price: "₦5,000", attendees: 1240, isTrending: true, href: "/events/capital-block" },
  { title: "Afrobeats Night Live",     date: "Fri, Jun 20",  venue: "Transcorp Hilton", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=400", price: "₦8,000", attendees: 840,  isTrending: false, href: "/events/afrobeats-night" },
  { title: "Abuja Art Fair",           date: "Sun, Jun 22",  venue: "Silverbird Mall",  image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=400", price: "Free",   attendees: 500,  isTrending: true, href: "/events/art-fair" },
  { title: "Jazz & Cocktails Evening", date: "Thu, Jun 26",  venue: "Sky Lounge Abuja", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=400", price: "₦3,500", attendees: 320,  isTrending: false, href: "/events/jazz-cocktails" },
];

const PEOPLE = [
  { name: "DJ Kaywise",    role: "DJ / Producer",  img: "https://i.pravatar.cc/300?img=11", href: "/people" },
  { name: "Amaka Obi",     role: "Chef",           img: "https://i.pravatar.cc/300?img=12", href: "/people" },
  { name: "Tunde Adeyemi", role: "Visual Artist",  img: "https://i.pravatar.cc/300?img=13", href: "/people" },
  { name: "Funke Adeola",  role: "Food Critic",    img: "https://i.pravatar.cc/300?img=14", href: "/people" },
  { name: "Chidi Okeke",   role: "Architect",      img: "https://i.pravatar.cc/300?img=15", href: "/people" },
];

const AREAS = [
  { name: "Maitama",   desc: "Luxury & Diplomacy",  img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=600", href: "/places?area=maitama" },
  { name: "Wuse 2",    desc: "Food & Nightlife",     img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=600", href: "/places?area=wuse2" },
  { name: "Gwarinpa",  desc: "Community & Cafés",   img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=600", href: "/places?area=gwarinpa" },
  { name: "Jabi",      desc: "Lakeside & Leisure",  img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=600", href: "/places?area=jabi" },
];

/* ─── HERO ─── */
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("Places");
  const slide = HERO_SLIDES[current];

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const prev = useCallback(() => setCurrent(c => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), []);
  const next = useCallback(() => setCurrent(c => (c + 1) % HERO_SLIDES.length), []);

  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-6 pt-24 pb-4">
      <div className="relative w-full aspect-[21/9] min-h-[480px] rounded-[2.5rem] overflow-hidden group/hero">
        {/* Slides */}
        {HERO_SLIDES.map((s, i) => (
          <div key={s.id} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}>
            <Image src={s.image} alt={s.title} fill priority={i === 0} className="object-cover" sizes="100vw" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D241E]/30 via-transparent to-[#2D241E]/80" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C06350] text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-4">
            <Zap className="w-3 h-3" />{slide.tag}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4 drop-shadow-sm">
            {slide.title}
          </h1>
          <p className="text-base md:text-lg text-white/90 font-medium mb-8 max-w-lg leading-relaxed">
            {slide.subtitle}
          </p>

          {/* Discovery Search Bar - Redesigned */}
          <div className="w-full max-w-xl bg-white/95 backdrop-blur-sm rounded-2xl p-1.5 flex items-center gap-1 transition-all focus-within:ring-2 ring-[#C06350]/20">
            <div className="relative flex items-center bg-[#F9F1ED] rounded-xl px-3 py-2.5">
              <select
                value={searchCategory}
                onChange={e => setSearchCategory(e.target.value)}
                className="appearance-none bg-transparent text-[#C06350] text-xs font-bold outline-none cursor-pointer pr-4"
              >
                {SEARCH_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <div className="absolute right-2 pointer-events-none text-[#C06350]">
                <ChevronLeft className="w-3 h-3 rotate-[270deg]" />
              </div>
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={`Find ${searchCategory.toLowerCase()}…`}
              className="flex-1 bg-transparent text-[#2D241E] placeholder:text-[#2D241E]/30 text-sm outline-none px-3 font-medium"
            />
            
            <button className="flex items-center justify-center w-11 h-11 bg-[#C06350] text-white rounded-xl hover:bg-[#a0503f] transition-all shrink-0">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Overlays */}
        <div className="absolute inset-y-0 left-0 w-24 flex items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-opacity">
          <button onClick={prev} className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm"><ChevronLeft className="w-6 h-6" /></button>
        </div>
        <div className="absolute inset-y-0 right-0 w-24 flex items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-opacity">
          <button onClick={next} className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm"><ChevronRight className="w-6 h-6" /></button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 bg-white" : "w-1.5 bg-white/40"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION HEADER ─── */
function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-[#2D241E]">{title}</h2>
      <Link href={href} className="flex items-center gap-1 text-sm text-[#C06350] font-semibold hover:gap-2 transition-all">
        View all <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

/* ─── WHAT'S HOT ─── */
function WhatsHot() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="relative group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#2D241E]">🔥 What's Hot</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => scroll("left")} className="p-2 rounded-full bg-[#F9F1ED] text-[#C06350] hover:bg-[#C06350] hover:text-white transition-all"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={() => scroll("right")} className="p-2 rounded-full bg-[#F9F1ED] text-[#C06350] hover:bg-[#C06350] hover:text-white transition-all"><ChevronRight className="w-4 h-4" /></button>
          <Link href="/places" className="ml-4 flex items-center gap-1 text-sm text-[#C06350] font-semibold hover:gap-2 transition-all">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory"
      >
        {HOT_ITEMS.map(item => (
          <div key={item.title} className="flex-shrink-0 w-[280px] snap-start"><PlaceCard {...item} /></div>
        ))}
      </div>
    </section>
  );
}

/* ─── EVENTS ─── */
function UpcomingEvents() {
  return (
    <section>
      <SectionHeader title="🗓️ Upcoming Events" href="/events" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {EVENTS.map(e => <EventCard key={e.title} {...e} />)}
      </div>
    </section>
  );
}

/* ─── PEOPLE ─── */
function FeaturedPeople() {
  return (
    <section>
      <SectionHeader title="👋 People of Abuja" href="/people" />
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5 md:mx-0 md:px-0">
        {PEOPLE.map(p => (
          <Link key={p.name} href={p.href} className="flex-shrink-0 w-32 text-center group space-y-3">
            <div className="relative mx-auto w-20 h-20 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-[#C06350] transition-all">
              <Image src={p.img} alt={p.name} fill className="object-cover" sizes="80px" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#2D241E] group-hover:text-[#C06350] transition-colors leading-tight">{p.name}</p>
              <p className="text-xs text-[#2D241E]/40 mt-0.5">{p.role}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── WEEKEND GUIDE ─── */
function WeekendGuide() {
  return (
    <section className="rounded-3xl bg-[#C06350] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="space-y-3 max-w-md">
        <span className="text-white/60 text-xs font-bold uppercase tracking-widest">🍸 This Weekend</span>
        <h2 className="text-2xl md:text-3xl font-black text-white">Weekend Guide — May 2025</h2>
        <p className="text-white/75 text-sm leading-relaxed">From brunch to rooftop sundowners. The complete Abuja weekend, curated by our editors.</p>
        <Link href="/explore" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#C06350] font-bold rounded-xl hover:scale-105 transition-all text-sm">
          See the Guide <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="w-full md:w-72 space-y-2">
        {EVENTS.slice(0, 3).map(e => (
          <div key={e.title} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
            <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 relative">
              <Image src={e.image} alt={e.title} fill className="object-cover" sizes="36px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-bold truncate">{e.title}</p>
              <p className="text-white/50 text-xs">{e.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── EXPLORE BY AREA ─── */
function ExploreByArea() {
  return (
    <section>
      <SectionHeader title="📍 Explore by Area" href="/explore" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {AREAS.map(area => (
          <Link key={area.name} href={area.href} className="group relative rounded-2xl overflow-hidden aspect-[4/5] block">
            <Image src={area.img} alt={area.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="300px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/80 via-[#2D241E]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="font-bold text-white text-base leading-tight">{area.name}</p>
              <p className="text-white/60 text-xs mt-0.5">{area.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── LATEST NEWS STRIP ─── */
function LatestNews() {
  const stories = [
    { title: "Bantu Coffee opens 5th location in Gwarinpa", category: "Culture", date: "May 14", href: "/news" },
    { title: "Abuja Fashion Week returns for 2025 edition", category: "Style",   date: "May 13", href: "/news" },
    { title: "New rooftop bar opens in Maitama",           category: "Food",    date: "May 12", href: "/news" },
  ];
  return (
    <section>
      <SectionHeader title="🗞️ Latest News" href="/news" />
      <div className="space-y-1">
        {stories.map(s => (
          <Link key={s.title} href={s.href} className="flex items-center justify-between py-3 px-4 -mx-4 rounded-xl hover:bg-[#F9F1ED] transition-colors group">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-[#C06350] uppercase tracking-wider w-16 shrink-0">{s.category}</span>
              <span className="text-sm font-semibold text-[#2D241E] group-hover:text-[#C06350] transition-colors">{s.title}</span>
            </div>
            <span className="text-xs text-[#2D241E]/30 shrink-0 ml-4">{s.date}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── PAGE ─── */
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
