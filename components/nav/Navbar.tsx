"use client";
import React from "react";
import HoverUnderLine from "./HoverUnderLine";
import Link from "next/link";
import { useUser } from "@/lib/store/user";
import Profile from "./Profile";

export default function Navbar() {
	const user = useUser((state) => state.user);

	return (
		<nav className="w-full flex justify-end items-center p-6 font-raleway xl:p-0 z-20">
			{/* Navigation Links with "/" separator */}
			<div className="flex text-xl font-light items-center">
  {["Places", "Events", "Blog", "More"].map((item, index, array) => (
    <React.Fragment key={item}>
      <div className={`px-6 ${index !== array.length - 1 ? "border-r border-[#C06350]" : ""}`}>
        <HoverUnderLine>
          <Link href={`| ${item.toLowerCase()}`}>{item}</Link>
        </HoverUnderLine>
      </div>
    </React.Fragment>
  ))}

				{/* Auth Section (White Border Button) */}
				<Link
					href="/login"
					className="px-6 py-2 border border-[#C06350] text-[#C06350] text-sm font-light rounded-lg transition-all duration-300 hover:bg-[#C06350] hover:border-[#C06350] hover:text-[#FFF0E8]"
				>
					{user ? <Profile /> : "Login"}
				</Link>
			</div>
		</nav>
	);
}
