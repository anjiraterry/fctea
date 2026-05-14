"use client";
import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Send } from "lucide-react";

const LINKS = {
  discovery: [
    { name: "Places",  href: "/places" },
    { name: "Events",  href: "/events" },
    { name: "People",  href: "/people" },
    { name: "Explore", href: "/explore" },
  ],
  platform: [
    { name: "News",    href: "/news" },
    { name: "Blog",    href: "/blog" },
    { name: "About",   href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms",   href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#FFFAF5] text-[#2D241E] pt-16 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-5 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16 pb-12">

          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="text-4xl font-michy text-[#C06350] leading-none block hover:opacity-80 transition-opacity">
              fctea
            </Link>
            <p className="text-sm text-[#2D241E]/50 leading-relaxed max-w-xs">
              The city operating system for Abuja culture, nightlife, places, people, and events.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Link href="#" className="p-2 bg-[#C06350]/8 text-[#C06350] rounded-lg hover:bg-[#C06350] hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-[#C06350]/8 text-[#C06350] rounded-lg hover:bg-[#C06350] hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Discovery */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C06350]">Discover</p>
            <ul className="space-y-2.5">
              {LINKS.discovery.map(l => (
                <li key={l.name}>
                  <Link href={l.href} className="text-sm text-[#2D241E]/50 hover:text-[#C06350] transition-colors font-medium">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C06350]">Platform</p>
            <ul className="space-y-2.5">
              {LINKS.platform.map(l => (
                <li key={l.name}>
                  <Link href={l.href} className="text-sm text-[#2D241E]/50 hover:text-[#C06350] transition-colors font-medium">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C06350]">Stay Updated</p>
            <p className="text-sm text-[#2D241E]/50">
              Get the weekly Abuja Loop in your inbox.
            </p>
            <div className="flex items-center gap-2 bg-[#F2EAE5] rounded-xl p-1.5">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent text-sm text-[#2D241E] placeholder:text-[#2D241E]/30 outline-none px-2"
              />
              <button className="p-2 bg-[#C06350] text-white rounded-lg hover:bg-[#a0503f] transition-colors shrink-0">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <div className="flex items-center gap-6">
            {LINKS.legal.map(l => (
              <Link key={l.name} href={l.href} className="text-xs text-[#2D241E]/30 hover:text-[#C06350] transition-colors">
                {l.name}
              </Link>
            ))}
          </div>
          <p className="text-xs text-[#2D241E]/30">
            © {new Date().getFullYear()} fctea. Built for Abuja.
          </p>
        </div>
      </div>
    </footer>
  );
}
