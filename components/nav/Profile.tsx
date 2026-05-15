"use client";
import React from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useUser } from "@/lib/store/user";
import { Button } from "@/components/ui/button";
import { User as UserIcon, LayoutDashboard, LogOut, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

export default function Profile() {
	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
	const user = useUser((state) => state.user);
	const setUser = useUser((state) => state.setUser);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		setUser(null);
    window.location.reload();
	};
	const isAdmin = user?.role === "ADMIN";

	return (
		<Popover>
			<PopoverTrigger className="outline-none">
        <div className="w-9 h-9 rounded-full bg-[#C06350]/10 border border-[#C06350]/20 overflow-hidden flex items-center justify-center transition-transform active:scale-95">
          {user?.image_url ? (
            <Image
              src={user.image_url}
              alt={user.display_name || "User"}
              width={36}
              height={36}
              className="object-cover"
            />
          ) : (
            <UserIcon className="w-5 h-5 text-[#C06350]" />
          )}
        </div>
			</PopoverTrigger>
			<PopoverContent className="w-64 mt-2 p-3 bg-white rounded-2xl border border-[#C06350]/10 shadow-xl space-y-3" side="bottom" align="end">
				<div className="px-3 py-2">
					<p className="text-sm font-bold text-[#2D241E] font-montserrat">{user?.display_name}</p>
					<p className="text-xs text-[#2D241E]/40 font-medium truncate">{user?.email}</p>
				</div>
        
        <div className="space-y-1 pt-1">
          {isAdmin && (
            <Link href="/dashboard" className="block">
              <Button
                variant="ghost"
                className="w-full flex justify-between items-center text-xs font-bold text-[#2D241E]/60 hover:text-[#C06350] hover:bg-[#C06350]/5 rounded-xl px-3"
              >
                Admin Dashboard <LayoutDashboard className="w-4 h-4" />
              </Button>
            </Link>
          )}

          <Link href="/profile" className="block">
            <Button
              variant="ghost"
              className="w-full flex justify-between items-center text-xs font-bold text-[#2D241E]/60 hover:text-[#C06350] hover:bg-[#C06350]/5 rounded-xl px-3"
            >
              My Profile <UserIcon className="w-4 h-4" />
            </Button>
          </Link>

          <Link href="/settings" className="block">
            <Button
              variant="ghost"
              className="w-full flex justify-between items-center text-xs font-bold text-[#2D241E]/60 hover:text-[#C06350] hover:bg-[#C06350]/5 rounded-xl px-3"
            >
              Settings <SettingsIcon className="w-4 h-4" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            className="w-full flex justify-between items-center text-xs font-bold text-[#C06350] hover:bg-red-50 hover:text-red-500 rounded-xl px-3 transition-colors"
            onClick={handleLogout}
          >
            Log out <LogOut className="w-4 h-4" />
          </Button>
        </div>
			</PopoverContent>
		</Popover>
	);
}
