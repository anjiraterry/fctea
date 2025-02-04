"use client";

import React from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

import { Phone, MapPin, Star } from "lucide-react";


interface Place {
  id: number;
  name: string;
  image: string;
  address:string;
  rating:number;
  reviews: number;
   phone:string;
  category:string;
  
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
    address: "1322 Shehu Yar'adua Way, Mabushi, Abuja",
    rating: 4.5,
    reviews: 980,
    phone: "+234 803 123 4567",
    category: "Restaurant & Lounge",
  },
  {
    id: 2,
    name: "Cilantro",
    image: "/cilantro.jpg",
    address: "12 Gana St, Maitama, Abuja",
    rating: 4.7,
    reviews: 1340,
    phone: "+234 802 456 7890",
    category: "Fine Dining",
  },
  {
    id: 3,
    name: "Bukka",
    image: "/buka.jpg",
    address: "Transcorp Hilton, 1 Aguiyi Ironsi St, Abuja",
    rating: 4.3,
    reviews: 760,
    phone: "+234 901 234 5678",
    category: "Nigerian Cuisine",
  },
  {
    id: 4,
    name: "Nkoyo",
    image: "/nkoyo.jpg",
    address: "Ceddi Plaza, 264 Tafawa Balewa Way, Abuja",
    rating: 4.6,
    reviews: 1205,
    phone: "+234 812 345 6789",
    category: "African & Continental",
  },
  {
    id: 5,
    name: "Capital Bar",
    image: "/capitalbar.jpg",
    address: "Hilton Hotel, 1 Aguiyi Ironsi St, Abuja",
    rating: 4.2,
    reviews: 890,
    phone: "+234 903 567 8901",
    category: "Bar & Lounge",
  },
];


const upcomingEvents: Event[] = [
  { id: 1, title: "Capital Block Party", date: "March 10, 2025", image: "/images/pone.jpeg" },
  { id: 2, title: "Even in the Day", date: "April 5, 2025", image: "/images/ptwo.jpg" },
  { id: 3, title: "Meat and Greet", date: "May 20, 2025", image: "/images/pthree.jpg" },
  { id: 1, title: "Otaku Connect", date: "March 10, 2025", image: "/images/pfour.jpg" },
 
];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 7000,
};

const FeaturedPlacesEvents = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-40  font-raleway min-h-[80vh] pb-12">
      <div className="text-[#7A7A7A] font-bold group ">
      <h3 className="text-[#C06350] text-2xl font-semibold font-raleway mb-8">Featured Places</h3>
        <Slider {...sliderSettings}>
          {featuredPlaces.map((place) => (
           <div className="w-[500px] h-[600px]  rounded-xl  transition ">
           {/* Image Section */}
           <div className="relative w-full h-[400px]">
             <Image
               src={place.image}
               alt={place.name}
               layout="fill"
               objectFit="cover"
               className="rounded-t-xl"
             />
           </div>
     
           {/* Info Section */}
           <div className="p-6 py-10 transition-all group-hover:bg-[#F8E1DB] rounded-lg group-hover:bg-opacity-80 ">
             {/* Title & Category */}
             <div className="flex justify-between items-center mb-2">
               <h2 className="text-xl font-bold">{place.name}</h2>
               <span className="text-sm text-[#FFFAF5] px-3 py-1 bg-[#C06350] rounded-full">
                 {place.category}
               </span>
             </div>
     
             {/* Address */}
             <div className="flex items-center text-gray-700 text-sm mb-1">
               <MapPin className="w-4 h-4 mr-2" />
               <span>{place.address}</span>
             </div>
     
             {/* Rating & Reviews */}
             <div className="flex items-center text-gray-700 text-sm mb-2">
               <Star className="w-4 h-4 text-[#C06350]  mr-1" />
               <span className="font-semibold">{place.rating}</span>
               <span className="ml-2 text-gray-500">({place.reviews} reviews)</span>
             </div>
     
             {/* Phone Number */}
             <div className="flex items-center text-gray-700 text-sm">
               <Phone className="w-4 h-4 mr-2" />
               <span>{place.phone}</span>
             </div>
           </div>
         </div>
          ))}
        </Slider>
      </div>

      {/* Upcoming Events List */}
      <div className="relative ">
        <div className="text-7xl font-bold mb-4 flex-1 text-[#C06350] font-oswald -rotate-90 absolute -z-10 top-[210px] -left-[275px] ">Upcoming Events</div>
        <div className="space-y-4 ">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex bg-[#F8E1DB] z-20 bg-opacity-80  items-center space-x-4 p-4  rounded-lg shadow-sm">
              <div className="relative w-32 h-32">
                <Image
                  src={event.image}
                  alt={event.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h3 className=" text-[#4F4F4F] hover:text-[#C06350] font-bold text-xl ">{event.title}</h3>
                <p className="text-gray-600">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPlacesEvents;
