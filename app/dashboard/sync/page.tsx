"use client";
import React, { useState } from "react";
import { Database, Download, CheckCircle2, AlertCircle, Loader2, Globe, Map as MapIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function SyncPage() {
  const { toast } = useToast();
  const [syncing, setSyncing] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  const handleSyncOSM = async () => {
    setSyncing("osm");
    setResults(null);
    try {
      const res = await fetch("/api/debug/osm-import");
      const data = await res.json();
      if (res.ok) {
        setResults({
          type: "osm",
          message: data.message,
          count: data.count,
          places: data.places
        });
        toast({ title: "OSM Sync Complete", description: `Imported ${data.count} places successfully.` });
      } else {
        throw new Error(data.message || "Failed to sync OSM");
      }
    } catch (error: any) {
      toast({ title: "Sync Failed", description: error.message, variant: "destructive" });
    } finally {
      setSyncing(null);
    }
  };

  return (
    <div className="p-10 space-y-10">
      <div>
        <h1 className="text-3xl font-black text-[#2D241E] tracking-tight">Data Synchronization</h1>
        <p className="text-[#2D241E]/50 mt-2 font-medium">Populate the city database from external global sources.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OSM Sync */}
        <div className="bg-white rounded-[2rem] p-8 border border-[#C06350]/10 shadow-sm space-y-6">
          <div className="w-12 h-12 bg-[#C06350]/10 text-[#C06350] rounded-2xl flex items-center justify-center">
            <MapIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2D241E]">OpenStreetMap</h3>
            <p className="text-sm text-[#2D241E]/40 mt-1 leading-relaxed">
              Pull crowdsourced data for restaurants, cafes, bars, and public amenities in Abuja.
            </p>
          </div>
          <button
            onClick={handleSyncOSM}
            disabled={!!syncing}
            className="w-full py-4 bg-[#C06350] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#a0503f] transition-all shadow-lg shadow-[#C06350]/20 disabled:opacity-50"
          >
            {syncing === "osm" ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Download className="w-4 h-4" /> Start OSM Import</>}
          </button>
        </div>

        {/* Google Places Sync (Placeholder) */}
        <div className="bg-white rounded-[2rem] p-8 border border-[#C06350]/10 shadow-sm space-y-6 opacity-60">
          <div className="w-12 h-12 bg-[#2D241E]/10 text-[#2D241E] rounded-2xl flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2D241E]">Google Places</h3>
            <p className="text-sm text-[#2D241E]/40 mt-1 leading-relaxed">
              Import high-fidelity business data, ratings, and reviews from Google's database.
            </p>
          </div>
          <button
            disabled
            className="w-full py-4 bg-[#F2EAE5] text-[#2D241E]/40 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </div>

      {/* Results View */}
      {results && (
        <div className="bg-[#F9F1ED] rounded-[2.5rem] p-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 text-green-600 font-bold">
            <CheckCircle2 className="w-5 h-5" />
            <span>Success: {results.message}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.places?.slice(0, 8).map((p: any) => (
              <div key={p.slug} className="bg-white p-4 rounded-2xl border border-[#C06350]/5">
                <p className="text-xs font-bold text-[#2D241E] truncate">{p.name}</p>
                <p className="text-[10px] text-[#2D241E]/30 mt-0.5 truncate">{p.slug}</p>
              </div>
            ))}
            {results.count > 8 && (
              <div className="bg-white/50 p-4 rounded-2xl border border-dashed border-[#C06350]/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#2D241E]/30">+{results.count - 8} more</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
