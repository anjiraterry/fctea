"use client";

import React from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

import { Phone, MapPin, Star } from "lucide-react";

import { businesses, podcasts } from "./dummyData";// Import upcomingpodcasts properly
import Link from "next/link";
import { InstagramLogoIcon } from "@radix-ui/react-icons";


const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 7000,
};

const Business = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-44  font-raleway min-h-[80vh] pb-12">
      <div className="text-[#7A7A7A] font-bold group ">
      <h3 className="text-[#C06350] text-2xl font-semibold font-raleway mb-8">Businesses</h3>
        <Slider {...sliderSettings}>
          {businesses.map((business) => (
           <div className="w-[500px] h-[600px]  rounded-xl  transition ">
           {/* Image Section */}
           <div className="relative w-full h-[400px]">
             <Image
               src={business.image}
               alt={business.name}
               layout="fill"
               objectFit="cover"
               className="rounded-t-xl"
             />
           </div>
     
         
           <div className="p-6 py-10 transition-all group-hover:bg-[#F8E1DB] rounded-lg group-hover:bg-opacity-80 ">
             {/* Title & Category */}
             <div className="flex justify-between items-center mb-2">
               <h2 className="text-xl font-bold">{business.name}</h2>
               <span className="text-sm text-[#FFFAF5] px-3 py-1 bg-[#C06350] rounded-full">
                 {business.category}
               </span>
             </div>
     
             <div className="flex items-center text-gray-700 text-sm mb-1">
               <InstagramLogoIcon className="w-4 h-4 mr-2" />
               <Link href={business.social.link}>{business.social.handle}</Link>
             </div>
     
            
             <div className="flex items-center text-gray-700 text-sm mb-2">
               <Star className="w-4 h-4 text-[#C06350]  mr-1" />
               <span className="font-semibold">{business.desc}</span>
               <span className="ml-2 text-gray-500">({business.reviews} reviews)</span>
             </div>
     
           
             <div className="flex items-center text-gray-700 text-sm">
               <Phone className="w-4 h-4 mr-2" />
               <span>{business.phone}</span>
             </div>
           </div>
         </div>
          ))}
        </Slider>
      </div>

      {/* Upcoming podcasts List */}
      <div className="relative ">
        <div className="text-7xl font-bold mb-4 flex-1 text-[#C06350] font-oswald -rotate-90 absolute -z-10 top-[85px] -left-[150px] ">Podcasts</div>
        <div className="space-y-4 ">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="flex bg-[#F8E1DB] z-20 bg-opacity-80  items-center space-x-4 p-4  rounded-lg shadow-sm">
              <div className="relative w-32 h-32">
                <Image
                  src={podcast.image}
                  alt={podcast.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h3 className=" text-[#4F4F4F] hover:text-[#C06350] font-bold text-xl ">{podcast.title}</h3>
                <p className="text-gray-600">{podcast.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Business;
