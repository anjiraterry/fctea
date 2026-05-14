"use client";

import React from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Phone, MapPin, Star, Calendar } from "lucide-react";

interface Place {
  id: number;
  name: string;
  image: string;
  address: string;
  rating: number;
  reviews: number;
  category: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  image: string;
}

const featuredPlaces: Place[] = [
  {
    id: 1,
    name: "Blucabana",
    image: "/blucabana.jpg",
    address: "Mabushi, Abuja",
    rating: 4.5,
    reviews: 980,
    category: "Lounge",
  },
  {
    id: 2,
    name: "Cilantro",
    image: "/cilantro.jpg",
    address: "Maitama, Abuja",
    rating: 4.7,
    reviews: 1340,
    category: "Dining",
  },
];

const upcomingEvents: Event[] = [
  { id: 1, title: "Capital Block Party", date: "March 10", image: "/images/pone.jpeg" },
  { id: 2, title: "Even in the Day", date: "April 5", image: "/images/ptwo.jpg" },
  { id: 3, title: "Meat and Greet", date: "May 20", image: "/images/pthree.jpg" },
];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const FeaturedPlacesEvents = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-raleway py-4">
      {/* Featured Places */}
      <div className="space-y-6">
        <h3 className="text-[#C06350] text-xl font-bold font-montserrat uppercase tracking-wider border-b border-[#C06350]/10 pb-2">Featured Places</h3>
        <Slider {...sliderSettings}>
          {featuredPlaces.map((place) => (
            <div key={place.id} className="group outline-none">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-700"
                />
                <div className="absolute top-4 right-4 bg-[#C06350] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {place.category}
                </div>
              </div>
              <div className="py-4 space-y-1">
                <h2 className="text-2xl font-bold text-[#2D241E] group-hover:text-[#C06350] transition-colors">{place.name}</h2>
                <div className="flex items-center text-[#2D241E]/50 text-xs">
                  <MapPin className="w-3 h-3 mr-1 text-[#C06350]" />
                  <span>{place.address}</span>
                  <span className="mx-2">•</span>
                  <Star className="w-3 h-3 mr-1 text-[#C06350]" />
                  <span>{place.rating} ({place.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-6">
        <h3 className="text-[#C06350] text-xl font-bold font-montserrat uppercase tracking-wider border-b border-[#C06350]/10 pb-2">Upcoming Events</h3>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex bg-white/40 border border-[#C06350]/5 items-center gap-4 p-3 rounded-xl hover:bg-white/60 transition-all group">
              <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 duration-500"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-[#2D241E] group-hover:text-[#C06350] font-bold text-lg leading-tight transition-colors">{event.title}</h3>
                <div className="flex items-center text-[#2D241E]/40 text-xs font-bold uppercase tracking-widest">
                  <Calendar className="w-3 h-3 mr-1 text-[#C06350]" />
                  {event.date}
                </div>
              </div>
              <div className="px-4 py-2 bg-[#C06350]/10 text-[#C06350] text-[10px] font-bold rounded-lg uppercase tracking-widest hover:bg-[#C06350] hover:text-white transition-all cursor-pointer">
                Join
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPlacesEvents;
