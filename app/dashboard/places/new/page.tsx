"use client";

import React from "react";
import ResourceForm from "@/app/dashboard/components/ResourceForm";
import { PlaceSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function CreatePlacePage() {
  const router = useRouter();

  const defaultValues = {
    name: "",
    slug: "",
    description: "",
    address: "",
    phone: "",
    website: "",
    isFeatured: false,
    isPublished: true,
  };

  const fields = [
    { name: "name", label: "Place Name", type: "text", placeholder: "e.g. Jabi Lake Mall" },
    { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. jabi-lake-mall" },
    { name: "address", label: "Physical Address", type: "text", placeholder: "e.g. Plot 126, Cental Business District" },
    { name: "phone", label: "Contact Phone", type: "text", placeholder: "e.g. +234 800 000 0000" },
    { name: "website", label: "Official Website", type: "url", placeholder: "https://..." },
    { name: "description", label: "Detailed Description", type: "textarea", placeholder: "Tell the story of this place..." },
    { name: "isFeatured", label: "Featured Spot", type: "switch" },
    { name: "isPublished", label: "Visible on Site", type: "switch" },
  ];

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/places", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast({ title: "Success", description: "Place created successfully!" });
        router.push("/dashboard");
      } else {
        const error = await res.json();
        throw new Error(error.message || "Failed to create place");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="py-10">
      <ResourceForm
        title="Create New Place"
        schema={PlaceSchema}
        defaultValues={defaultValues}
        fields={fields as any}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
