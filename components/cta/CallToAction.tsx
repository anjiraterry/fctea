"use client";


import React from "react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <div className="bg-[#C06350] text-white text-center py-20 px-6 rounded-t-xl shadow-lg mt-12 font-raleway">
      <h2 className="text-3xl md:text-5xl font-bold mb-4">Join the Family</h2>
      <p className="text-lg md:text-2xl opacity-90 mb-6">Spill the FCTea with us</p>
      <Button className="bg-white text-[#C06350] text-lg font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition">
        Get Started
      </Button>
    </div>
  );
};

export default CallToAction;
