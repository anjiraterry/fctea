import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  icon: LucideIcon;
  className?: string;
}

export default function PlaceholderImage({ icon: Icon, className }: PlaceholderImageProps) {
  return (
    <div className={cn("w-full h-full bg-[#F9F1ED] flex items-center justify-center", className)}>
      <Icon className="w-10 h-10 text-[#C06350]/40 stroke-[1.5]" />
    </div>
  );
}
