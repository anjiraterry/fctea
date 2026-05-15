"use client";

import React from "react";
import ResourceForm from "@/app/dashboard/components/ResourceForm";
import { BrandSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function CreateBrandPage() {
  const router = useRouter();

  const defaultValues = {
    name: "",
    slug: "",
    description: "",
    logo: "",
    website: "",
    verified: false,
    isFeatured: false,
  };

  const fields = [
    { name: "name", label: "Brand Name", type: "text", placeholder: "e.g. Transcorp Hilton" },
    { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. transcorp-hilton" },
    { name: "logo", label: "Logo URL", type: "url", placeholder: "https://..." },
    { name: "website", label: "Official Website", type: "url", placeholder: "https://..." },
    { name: "description", label: "Brand Description", type: "textarea", placeholder: "What defines this brand?" },
    { name: "verified", label: "Verified Brand", type: "switch" },
    { name: "isFeatured", label: "Featured Brand", type: "switch" },
  ];

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/brands", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast({ title: "Success", description: "Brand created successfully!" });
        router.push("/dashboard");
      } else {
        const error = await res.json();
        throw new Error(error.message || "Failed to create brand");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="py-10">
      <ResourceForm
        title="Create New Brand"
        schema={BrandSchema}
        defaultValues={defaultValues}
        fields={fields as any}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
