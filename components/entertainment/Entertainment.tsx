"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { entertainmentArticles, starsOfTheWeek } from "./dummyData"; // Import dummy data
import Link from "next/link";



interface Article {
  id: number;
  title: string;
  date: string;
  author: string;
  image?: string; // Optional image for the first article
}

interface Person {
  id: number;
  name: string;
  image: string;
  description: string;
}



const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const Entertainment = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-40 font-raleway min-h-[80vh] pb-12">
      <div className="text-[#7A7A7A] font-bold group">
        <h3 className="text-[#C06350] text-2xl font-semibold font-raleway mb-8">Entertainment</h3>
        <div className="flex flex-col gap-8 ">
          {entertainmentArticles
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((article, index) => (
              <div key={article.id} className="items-center relative ">
                {index === 0 && article.image ? (
                  <div className="relative h-96 bg-red-500 ">
                    <Image
                      src={article.image}
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-l  "
                    />
                  </div>
                ) : (
                  <div className="" />
                )}
                <div>
                {index === 0 && article.image ? (
                    <div className=" bg-opacity-80  -bottom-10 w-full ">
                  <h3 className="text-[#4F4F4F] bg-[#F8E1DB]  hover:text-[#C06350] font-bold text-2xl p-4">{article.title}</h3>
                  <p className="text-gray-600">{article.date}</p>
                  <p className="text-gray-500   pb-4   border-b-8 border-[#F8E1DB]  ">By {article.author}</p>
                  </div>
                ):(
                    <div className="">
                   <h3 className="text-[#4F4F4F] hover:text-[#C06350] font-bold text-xl ">{article.title}</h3>
                  <p className="text-gray-600">{article.date}</p>
                  <p className="text-gray-500  pb-4   border-b ">By {article.author}</p> 
                  </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Right Side - Stars of the Week Slider */}
      <div className="relative flex flex-col gap-10">
        <div className="text-7xl font-bold mb-4 flex-1 text-[#C06350] font-oswald -rotate-90 absolute -z-10 top-[210px] -left-[275px]">
          Stars of the Week
        </div>
        <div className=" bg-[#F8E1DB] bg-opacity-80 p-12 rounded-md">
        <Slider {...sliderSettings} >
          {starsOfTheWeek.map((person) => (
            <div key={person.id} className="relative group">
              <div className="min-h-[80vh] relative rounded-lg ">
                <Image
                  src={person.image}
                  alt={person.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/50 flex items-center justify-center rounded-lg  ">
                <p className="text-center opacity-0">{person.description}</p>
              </div>
              <div className="absolute bottom-0 p-8 text-xl text-[#F8E1DB] text-shadow ">
              <h4 className="mt-2 text-8xl  text-center font-oswald   font-semibold ">{person.name}</h4>
              <Link href={person.social.link}>{person.social.handle}</Link>
              </div>
            </div>
          ))}
        </Slider>
        </div>
        <div className="bg-red-400 w-full h-full"></div>
      </div>
    </div>
  );
};

export default Entertainment;
