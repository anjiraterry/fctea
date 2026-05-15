"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Logic to show a limited number of page buttons if totalPages is large
  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;
    
    if (currentPage <= 4) return [...pages.slice(0, 5), "...", totalPages];
    if (currentPage >= totalPages - 3) return [1, "...", ...pages.slice(totalPages - 5)];
    
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={cn("flex items-center justify-center gap-2 mt-12", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl border border-[#C06350]/10 text-[#C06350] hover:bg-[#C06350] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#C06350]"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1.5">
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-2 text-[#2D241E]/30 font-bold">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={cn(
                  "w-10 h-10 rounded-xl text-sm font-bold transition-all",
                  currentPage === page
                    ? "bg-[#C06350] text-white shadow-lg shadow-[#C06350]/20"
                    : "text-[#2D241E]/40 hover:text-[#C06350] hover:bg-[#C06350]/5"
                )}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl border border-[#C06350]/10 text-[#C06350] hover:bg-[#C06350] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#C06350]"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
