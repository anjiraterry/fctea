"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useResourceModal } from "@/lib/store/modal";
import ResourceForm from "./ResourceForm";
import { PlaceSchema, EventSchema, NewsSchema, PersonSchema, BrandSchema, BlogSchema } from "@/lib/validators";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function ResourceModal() {
  const { isOpen, resourceType, mode, initialData, closeModal } = useResourceModal();
  const router = useRouter();

  if (!resourceType) return null;

  const getResourceConfig = () => {
    const isEdit = mode === "edit";
    
    switch (resourceType) {
      case "place":
        return {
          title: isEdit ? "Edit Place" : "Create New Place",
          schema: PlaceSchema,
          endpoint: isEdit ? `/api/places/${initialData?.id}` : "/api/places",
          method: isEdit ? "PATCH" : "POST",
          defaultValues: initialData || { name: "", slug: "", description: "", address: "", phone: "", website: "", instagram: "", twitter: "", images: [], isFeatured: false, isPublished: true },
          fields: [
            { name: "images", label: "Place Gallery", type: "multi-image" },
            { name: "name", label: "Place Name", type: "text", placeholder: "e.g. Jabi Lake Mall" },
            { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. jabi-lake-mall" },
            { name: "address", label: "Physical Address", type: "text", placeholder: "e.g. Plot 126, Cental Business District" },
            { name: "phone", label: "Contact Phone", type: "text", placeholder: "e.g. +234 800 000 0000" },
            { name: "website", label: "Official Website", type: "url", placeholder: "https://..." },
            { name: "instagram", label: "Instagram Handle", type: "text", placeholder: "@username" },
            { name: "twitter", label: "Twitter Handle", type: "text", placeholder: "@username" },
            { name: "description", label: "Detailed Description", type: "textarea", placeholder: "Tell the story of this place..." },
            { name: "isFeatured", label: "Featured Spot", type: "switch" },
            { name: "isPublished", label: "Visible on Site", type: "switch" },
          ]
        };
      case "event":
        return {
          title: isEdit ? "Edit Event" : "Create New Event",
          schema: EventSchema,
          endpoint: isEdit ? `/api/events/${initialData?.id}` : "/api/events",
          method: isEdit ? "PATCH" : "POST",
          defaultValues: initialData || { title: "", slug: "", description: "", images: [], startDate: new Date().toISOString().slice(0, 16), venue: "", organizer: "", price: "Free", instagram: "", twitter: "", isFeatured: false },
          fields: [
            { name: "images", label: "Event Gallery", type: "multi-image" },
            { name: "title", label: "Event Title", type: "text", placeholder: "e.g. Abuja Jazz Festival" },
            { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. abuja-jazz-festival" },
            { name: "startDate", label: "Start Date & Time", type: "date" },
            { name: "venue", label: "Venue Location", type: "text", placeholder: "e.g. Eagle Square, Abuja" },
            { name: "organizer", label: "Organizer Name", type: "text", placeholder: "e.g. Abuja Arts Council" },
            { name: "price", label: "Ticket Price", type: "text", placeholder: "e.g. Free or ₦5,000" },
            { name: "instagram", label: "Event Instagram", type: "text", placeholder: "@event_handle" },
            { name: "twitter", label: "Event Twitter", type: "text", placeholder: "@event_handle" },
            { name: "description", label: "Event Description", type: "textarea", placeholder: "What's happening at this event?" },
            { name: "isFeatured", label: "Featured Event", type: "switch" },
          ]
        };
      case "news":
        return {
          title: isEdit ? "Edit News Article" : "Create News Article",
          schema: NewsSchema,
          endpoint: isEdit ? `/api/news/${initialData?.id}` : "/api/news",
          method: isEdit ? "PATCH" : "POST",
          defaultValues: initialData || { title: "", slug: "", content: "", images: [], category: "General", isBreaking: false, publishedAt: new Date().toISOString() },
          fields: [
            { name: "images", label: "News Images", type: "multi-image" },
            { name: "title", label: "News Title", type: "text", placeholder: "e.g. New Infrastructure Project" },
            { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. new-infrastructure-project" },
            { name: "category", label: "Category", type: "text", placeholder: "e.g. Politics, Lifestyle" },
            { name: "content", label: "Full Content", type: "textarea", placeholder: "Write the article..." },
            { name: "isBreaking", label: "Breaking News", type: "switch" },
          ]
        };
      case "person":
        return {
          title: isEdit ? "Edit Person Profile" : "Create Person Profile",
          schema: PersonSchema,
          endpoint: isEdit ? `/api/people/${initialData?.id}` : "/api/people",
          method: isEdit ? "PATCH" : "POST",
          defaultValues: initialData || { name: "", slug: "", bio: "", images: [], instagram: "", twitter: "", verified: false },
          fields: [
            { name: "images", label: "Profile Gallery", type: "multi-image" },
            { name: "name", label: "Full Name", type: "text", placeholder: "e.g. John Doe" },
            { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. john-doe" },
            { name: "instagram", label: "Instagram", type: "text", placeholder: "@handle" },
            { name: "twitter", label: "Twitter", type: "text", placeholder: "@handle" },
            { name: "bio", label: "Biography", type: "textarea", placeholder: "Short bio..." },
            { name: "verified", label: "Verified Profile", type: "switch" },
          ]
        };
      case "brand":
        return {
          title: isEdit ? "Edit Brand" : "Create New Brand",
          schema: BrandSchema,
          endpoint: isEdit ? `/api/brands/${initialData?.id}` : "/api/brands",
          method: isEdit ? "PATCH" : "POST",
          defaultValues: initialData || { name: "", slug: "", description: "", images: [], website: "", instagram: "", twitter: "", verified: false, isFeatured: false },
          fields: [
            { name: "images", label: "Brand Gallery", type: "multi-image" },
            { name: "name", label: "Brand Name", type: "text", placeholder: "e.g. Transcorp Hilton" },
            { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. transcorp-hilton" },
            { name: "website", label: "Official Website", type: "url", placeholder: "https://..." },
            { name: "instagram", label: "Brand Instagram", type: "text", placeholder: "@brand" },
            { name: "twitter", label: "Brand Twitter", type: "text", placeholder: "@brand" },
            { name: "description", label: "Brand Description", type: "textarea", placeholder: "Brand story..." },
            { name: "verified", label: "Verified Brand", type: "switch" },
            { name: "isFeatured", label: "Featured Brand", type: "switch" },
          ]
        };
      case "blog":
        return {
          title: isEdit ? "Edit Blog Post" : "Write Blog Post",
          schema: BlogSchema,
          endpoint: isEdit ? `/api/blog/${initialData?.id}` : "/api/blog",
          method: isEdit ? "PATCH" : "POST",
          defaultValues: initialData || { title: "", slug: "", content: "", images: [] },
          fields: [
            { name: "images", label: "Post Gallery", type: "multi-image" },
            { name: "title", label: "Post Title", type: "text", placeholder: "e.g. The Best Brunch Spots" },
            { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. best-brunch-spots" },
            { name: "content", label: "Post Content", type: "textarea", placeholder: "Write your story..." },
          ]
        };
      default:
        return null;
    }
  };

  const config = getResourceConfig();
  if (!config) return null;

  const handleSubmit = async (data: any) => {
    try {
      const payload = { ...data };
      if (resourceType === "event" && data.startDate) {
        payload.startDate = new Date(data.startDate).toISOString();
      }

      const res = await fetch(config.endpoint, {
        method: config.method,
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast({ title: "Success", description: `${resourceType} ${mode === 'edit' ? 'updated' : 'created'} successfully!` });
        closeModal();
        router.refresh();
        window.location.reload(); // Force refresh to show changes
      } else {
        const error = await res.json();
        throw new Error(error.message || `Failed to ${mode} resource`);
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-[#2D241E]/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-[3rem] shadow-2xl border border-[#C06350]/10 custom-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-8 right-8 p-3 text-[#2D241E]/20 hover:text-[#C06350] hover:bg-[#F9F1ED] rounded-2xl transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-2">
              <ResourceForm
                title={config.title}
                schema={config.schema}
                defaultValues={config.defaultValues}
                fields={config.fields as any}
                onSubmit={handleSubmit}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
