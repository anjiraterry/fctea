"use client";


import React from "react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <div className="text-center py-12 px-6 font-raleway space-y-6">
      <div className="space-y-2">
        <h2 className="text-4xl md:text-6xl font-michy text-[#C06350]">Join the Family</h2>
        <p className="text-xl text-[#2D241E]/60 font-light">Spill the FCTea with us</p>
      </div>
      <div className="flex justify-center pt-4">
        <button className="px-10 py-4 bg-[#C06350] text-[#FFFAF5] rounded-xl font-montserrat font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#C06350]/20">
          Get Involved
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
