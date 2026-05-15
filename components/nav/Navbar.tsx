"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/store/user";
import { Search, Bell, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import Profile from "./Profile";

const navItems = [
  { name: "Home",    href: "/" },
  { name: "Places",  href: "/places" },
  { name: "Events",  href: "/events" },
  { name: "People",  href: "/people" },
  { name: "News",    href: "/news" },
  { name: "Blog",    href: "/blog" },
  { name: "Explore", href: "/explore" },
];

export default function Navbar() {
  const user = useUser((state) => state.user);
  const pathname = usePathname();
  const { setSearchOpen } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setSearchOpen]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#FFFAF5]",
          scrolled ? "py-4" : "py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-6 flex items-center justify-between">

          {/* Logo Night Michy font only here */}
          <Link
            href="/"
            className="text-4xl font-michy text-[#C06350] hover:opacity-80 transition-opacity select-none leading-none"
          >
            fctea
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-montserrat font-normal tracking-wide transition-all duration-200",
                  pathname === item.href
                    ? "text-[#C06350] bg-[#C06350]/8"
                    : "text-[#2D241E]/60 hover:text-[#C06350] hover:bg-[#C06350]/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              id="navbar-search-btn"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#2D241E]/50 hover:text-[#C06350] hover:bg-[#C06350]/5 transition-all group"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline text-xs text-[#2D241E]/30 group-hover:text-[#C06350]/50 font-montserrat transition-colors">
                ⌘K
              </span>
            </button>

            <button
              id="navbar-bell-btn"
              className="relative p-2 rounded-lg text-[#2D241E]/50 hover:text-[#C06350] hover:bg-[#C06350]/5 transition-all"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#C06350] rounded-full" />
            </button>

            <div className="ml-2">
              {user ? (
                <Profile />
              ) : (
                <Link
                  href="/auth/login"
                  id="navbar-login-btn"
                  className="px-5 py-2 border border-[#C06350] text-[#C06350] text-xs font-montserrat font-bold rounded-lg transition-all hover:bg-[#C06350] hover:text-[#FFFAF5] uppercase tracking-wider"
                >
                  Login
                </Link>
              )}
            </div>

            <button
              id="navbar-mobile-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-[#2D241E]/60 hover:text-[#C06350] hover:bg-[#C06350]/5 transition-all ml-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer solid background, no blur */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#FFFAF5] border-t border-[#C06350]/10",
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-5 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-montserrat font-bold uppercase tracking-widest transition-all",
                  pathname === item.href
                    ? "text-[#C06350] bg-[#C06350]/8"
                    : "text-[#2D241E]/60 hover:text-[#C06350] hover:bg-[#C06350]/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer removed - content starts at y=0 */}
    </>
  );
}
