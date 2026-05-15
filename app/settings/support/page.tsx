"use client";
import React, { useState } from "react";
import { ArrowLeft, HelpCircle, Mail, MessageSquare, Twitter, Instagram, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function SupportPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    
    setLoading(true);
    // Simulate sending support ticket
    setTimeout(() => {
      setLoading(false);
      setMessage("");
      toast({ 
        title: "Message Sent", 
        description: "Our team has received your support request. We'll get back to you shortly.",
      });
    }, 1500);
  };

  return (
    <div className="page-container max-w-2xl pt-24 pb-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/settings" className="p-2 hover:bg-[#F9F1ED] rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#2D241E]" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#2D241E] font-montserrat tracking-tight">Support</h1>
            <p className="text-[#2D241E]/40 text-xs font-bold uppercase tracking-widest mt-1">We&apos;re here to help</p>
          </div>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-[#C06350]/10 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#C06350]/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#C06350]" />
            </div>
            <h3 className="font-bold text-[#2D241E]">Email Us</h3>
            <p className="text-xs text-[#2D241E]/50 leading-relaxed">Direct support for billing, account issues, and partnerships.</p>
            <p className="text-sm font-bold text-[#C06350]">hello@fctea.com</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#C06350]/10 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#2D241E]/5 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#2D241E]" />
            </div>
            <h3 className="font-bold text-[#2D241E]">Social Support</h3>
            <p className="text-xs text-[#2D241E]/50 leading-relaxed">Reach out on social media for quick city updates and news.</p>
            <div className="flex items-center gap-3">
              <Link href="#" className="text-[#C06350] hover:scale-110 transition-transform"><Twitter className="w-4 h-4" /></Link>
              <Link href="#" className="text-[#C06350] hover:scale-110 transition-transform"><Instagram className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-8 border border-[#C06350]/10 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#2D241E]">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#2D241E]/40 uppercase tracking-widest ml-1">How can we help?</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Describe your issue or feedback..."
                className="w-full px-4 py-3 bg-[#F9F1ED]/50 border border-transparent focus:border-[#C06350]/20 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !message}
              className="w-full py-4 bg-[#C06350] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#A85544] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Ticket</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
