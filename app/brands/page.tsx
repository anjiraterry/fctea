"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Instagram, MapPin, Plus, Building } from "lucide-react";
import { useBrands } from "@/lib/hooks/use-city-data";
import { useUser } from "@/lib/store/user";
import { useResourceModal } from "@/lib/store/modal";
import EmptyState from "@/components/shared/EmptyState";
import PlaceholderImage from "@/components/shared/PlaceholderImage";

import Pagination from "@/components/shared/Pagination";

export default function BrandsPage() {
  const user = useUser((state: any) => state.user);
  const openModal = useResourceModal(state => state.openModal);
  const isPrivileged = user?.role === "ADMIN" || user?.role === "EDITOR";
  
  const [page, setPage] = React.useState(1);
  
  const query = new URLSearchParams({
    page: page.toString(),
    limit: "12",
  }).toString();

  const { data: response, isLoading } = useBrands(query);

  const brands = response?.data || [];
  const pagination = response?.meta?.pagination;

  return (
    <div className="page-container font-raleway">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-michy text-[#C06350]">
            Brands
          </h1>
          <p className="text-xl text-[#2D241E]/60 max-w-2xl font-light">
            The companies, collectives, and ventures building the future of the FCT.
          </p>
        </div>
        {isPrivileged && (
          <button 
            onClick={() => openModal("brand")}
            className="flex items-center gap-1.5 text-[10px] font-black bg-[#C06350] text-white px-5 py-3 rounded-2xl hover:bg-[#a0503f] hover:scale-105 transition-all shadow-sm active:scale-95 uppercase tracking-widest mt-2"
          >
            <Plus className="w-4 h-4" /> Add Brand
          </button>
        )}
      </div>

      {/* Brand Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-[4/3] bg-[#F9F1ED] rounded-xl" />
          ))}
        </div>
      ) : brands.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {brands.map((brand: any) => (
              <div key={brand.id} className="group bg-white/40 border border-[#C06350]/10 p-8 rounded-xl hover:bg-white/60 transition-all relative">
                <div className="space-y-8">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#C06350]/20 bg-white">
                    {(brand.images?.[0] || brand.image || brand.logo) ? (
                      <Image 
                        src={brand.images?.[0] || brand.image || brand.logo}
                        alt={brand.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <PlaceholderImage icon={Building} className="scale-75" />
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-3xl font-bold text-[#2D241E] group-hover:text-[#C06350] transition-colors">
                        {brand.name}
                      </h3>
                      <p className="text-xs font-bold text-[#C06350] uppercase tracking-widest">
                        {brand.category || "Brand"}
                      </p>
                    </div>
                    
                    <p className="text-[#2D241E]/60 text-sm leading-relaxed line-clamp-3">
                      {brand.description}
                    </p>
                    
                    <div className="flex items-center gap-4 pt-4 text-[#2D241E]/40">
                       <div className="flex items-center gap-2 text-xs font-bold">
                          <MapPin className="h-4 w-4" />
                          Abuja
                       </div>
                       <div className="flex gap-3">
                          {brand.website && (
                            <Link href={brand.website} target="_blank">
                              <Globe className="h-4 w-4 hover:text-[#C06350] transition-colors" />
                            </Link>
                          )}
                          <Instagram className="h-4 w-4 hover:text-[#C06350] transition-colors" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Pagination 
            currentPage={page}
            totalPages={pagination?.totalPages || 1}
            onPageChange={setPage}
          />
        </>
      ) : (
        <EmptyState 
          emoji="🏢"
          title={isPrivileged ? "Add your first brand" : "No brands found"}
          description={isPrivileged 
            ? "Start profiling the companies and collectives shaping the FCT today." 
            : "We haven't listed any brands in this category yet. Check back soon for the city's top collectives."}
          ctaText={isPrivileged ? "Create Brand" : "View all categories"}
          ctaHref={isPrivileged ? undefined : "/brands"}
          onClick={isPrivileged ? () => openModal("brand") : undefined}
        />
      )}
    </div>
  );
}
