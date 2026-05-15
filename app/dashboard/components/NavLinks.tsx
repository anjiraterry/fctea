"use client";
import { cn } from "@/lib/utils";
import { PersonIcon, ReaderIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLinks() {
	const pathname = usePathname();
	const links = [
		{
			href: "/dashboard",
			Icon: ReaderIcon,
			text: "dashboard",
		},

		{
			href: "/dashboard/user",
			Icon: PersonIcon,
			text: "users",
		},
		{
			href: "/dashboard/sync",
			Icon: ReaderIcon,
			text: "sync",
		},
	];

	return (
		<div className="flex items-center gap-5 border-b pb-2">
			{links.map(({ href, Icon, text }, index) => {
				return (
					<Link
						href={href}
						className={cn(
							"text-sm text-[#2D241E]/40 flex items-center gap-1 hover:text-[#C06350] transition-all",
							{ "text-[#C06350] font-bold": pathname === href }
						)}
						key={index}
					>
						<Icon /> / {text}
					</Link>
				);
			})}
		</div>
	);
}
