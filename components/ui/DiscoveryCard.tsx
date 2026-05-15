import { MapPin, Star, Phone, Calendar, Clock, Ticket, Bookmark, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/store/user";
import { useState } from "react";
import { useToast } from "./use-toast";

interface DiscoveryCardProps {
  type: "place" | "event" | "news" | "brand";
  title: string;
  image: string;
  category?: string;
  address?: string;
  rating?: number;
  reviews?: number;
  phone?: string;
  date?: string;
  time?: string;
  price?: string;
  className?: string;
}

export default function DiscoveryCard({
  type,
  title,
  image,
  category,
  address,
  rating,
  reviews,
  phone,
  date,
  time,
  price,
  className
}: DiscoveryCardProps) {
  const user = useUser((state) => state.user);
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please log in to save your favorite spots.",
        variant: "destructive",
      });
      return;
    }
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from favorites" : "Saved to favorites",
      description: `${title} has been ${isSaved ? "removed from" : "added to"} your collection.`,
    });
  };

  return (
    <div className={cn("w-full group font-raleway rounded-xl overflow-hidden", className)}>
      {/* Image Section */}
      <div className="relative w-full h-[400px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[10px] text-[#FFFAF5] px-3 py-1 bg-[#C06350] rounded-full font-bold uppercase tracking-widest">
              {category}
            </span>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={cn(
            "absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-md",
            isSaved 
              ? "bg-[#C06350] text-white" 
              : "bg-white/20 text-white hover:bg-white hover:text-[#C06350]"
          )}
        >
          {isSaved ? <Heart className="w-5 h-5 fill-current" /> : <Bookmark className="w-5 h-5" />}
        </button>
      </div>

      {/* Info Section */}
      <div className="p-6 py-10 transition-all group-hover:bg-[#F8E1DB] rounded-b-xl space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-xl font-bold text-[#2D241E] leading-tight group-hover:text-[#C06350] transition-colors">
            {title}
          </h2>
          {rating !== undefined && (
            <div className="flex items-center gap-1 text-[#2D241E] shrink-0">
              <Star className="w-4 h-4 fill-[#C06350] text-[#C06350]" />
              <span className="font-bold text-sm">{rating}</span>
            </div>
          )}
        </div>

        {/* Place Specifics */}
        {type === "place" && (
          <div className="space-y-1">
            {address && (
              <div className="flex items-center text-[#2D241E]/60 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-[#C06350]" />
                <span className="truncate">{address}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center text-[#2D241E]/60 text-sm">
                <Phone className="w-4 h-4 mr-2 text-[#C06350]" />
                <span>{phone}</span>
              </div>
            )}
          </div>
        )}

        {/* Event Specifics */}
        {type === "event" && (
          <div className="space-y-1">
            {date && (
              <div className="flex items-center text-[#C06350] text-sm font-bold">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{date}</span>
              </div>
            )}
            {time && (
              <div className="flex items-center text-[#2D241E]/60 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>{time}</span>
              </div>
            )}
          </div>
        )}

        {/* Action / Price */}
        {(price || type === "event") && (
          <div className="pt-4 flex items-center justify-between border-t border-[#C06350]/10 mt-4">
             {price && (
               <div className="flex items-center gap-2">
                 <Ticket className="w-4 h-4 text-[#C06350]" />
                 <span className="font-bold text-[#2D241E]">{price}</span>
               </div>
             )}
             <span className="text-xs font-bold uppercase tracking-widest text-[#C06350] group-hover:underline">
               {type === "event" ? "Get Tickets" : "View Details"}
             </span>
          </div>
        )}
      </div>
    </div>
  );
}
