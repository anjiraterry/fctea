import React from "react";
import hero from "@/public/hero.jpg"
import Navbar from "../nav/Navbar";


export default function HeroSection() {
	return (
		<section
			className="w-full relative flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-[#C06350] bg-[#FFFAF5]  text-center pb-8"
			>
				 <div className=" absolute inset-0  opacity-60"></div>
				 <Navbar/>
		<h1 className="lg:text-7xl md:text-4xl relative z-10 font-michy   p-14">
				FCTea
			</h1>
			
			
		</section>
	);
}
