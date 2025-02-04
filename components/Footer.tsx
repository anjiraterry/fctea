"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-20 rounded-b-xl  font-raleway">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 justify-items-center ">
        
        <div>
          <h2 className="text-4xl font-bold text-[#C06350] font-michy  ">FCTea</h2>
          <p className="text-gray-400 mt-4 ">
            Your one-stop hub for everything happening in Abuja.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#C06350]">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-gray-400 ">
            <li><Link href="#" className="hover:text-[#C06350] transition">Home</Link></li>
            <li><Link href="#" className="hover:text-[#C06350] transition">Events</Link></li>
            <li><Link href="#" className="hover:text-[#C06350] transition">News</Link></li>
            <li><Link href="#" className="hover:text-[#C06350] transition">Podcasts</Link></li>
            <li><Link href="#" className="hover:text-[#C06350] transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#C06350]">Contact Us</h3>
          <ul className="mt-4 space-y-3 text-gray-400">
            <li className="flex items-center"><Mail className="w-5 h-5 mr-2 text-[#C06350]" /> info@fctea.com</li>
            <li className="flex items-center"><Phone className="w-5 h-5 mr-2 text-[#C06350]" /> +234 800 123 4567</li>
            <li className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-[#C06350]" /> Abuja, Nigeria</li>
          </ul>
       
          <div className="flex space-x-4 mt-6">
            <Link href="#" className="p-2 bg-[#C06350] rounded-full hover:bg-opacity-80 transition"><Facebook className="w-5 h-5" /></Link>
            <Link href="#" className="p-2 bg-[#C06350] rounded-full hover:bg-opacity-80 transition"><Twitter className="w-5 h-5" /></Link>
            <Link href="#" className="p-2 bg-[#C06350] rounded-full hover:bg-opacity-80 transition"><Instagram className="w-5 h-5" /></Link>
          </div>
        </div>

      </div>


      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} FCTea. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
