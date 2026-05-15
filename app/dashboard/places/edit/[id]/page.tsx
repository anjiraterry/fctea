"use client";

import React, { useEffect, useState } from "react";
import ResourceForm from "../../../components/ResourceForm";
import { PlaceSchema } from "@/lib/validators";
import { useRouter, useParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function EditPlacePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState<any>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetch(`/api/places/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          // Filter out fields that shouldn't be in the form or handle nulls
          const formattedValues = {
            name: data.data.name || "",
            slug: data.data.slug || "",
            description: data.data.description || "",
            address: data.data.address || "",
            phone: data.data.phone || "",
            website: data.data.website || "",
            isFeatured: data.data.isFeatured || false,
            isPublished: data.data.isPublished || false,
          };
          setDefaultValues(formattedValues);
        } else {
          toast({ title: "Error", description: "Failed to load place", variant: "destructive" });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [params.id]);

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
      const res = await fetch(`/api/places/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast({ title: "Success", description: "Place updated successfully!" });
        router.push("/dashboard");
      } else {
        const error = await res.json();
        throw new Error(error.message || "Failed to update place");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C06350]" />
      </div>
    );
  }

  return (
    <div className="py-10">
      <ResourceForm
        title="Edit Place"
        schema={PlaceSchema}
        defaultValues={defaultValues}
        fields={fields as any}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
