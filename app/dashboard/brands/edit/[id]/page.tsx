"use client";

import React, { useEffect, useState } from "react";
import ResourceForm from "../../components/ResourceForm";
import { BrandSchema } from "@/lib/validators";
import { useRouter, useParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function EditBrandPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState<any>(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await fetch(`/api/brands/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          const formattedValues = {
            name: data.data.name || "",
            slug: data.data.slug || "",
            description: data.data.description || "",
            logo: data.data.logo || "",
            website: data.data.website || "",
            verified: data.data.verified || false,
            isFeatured: data.data.isFeatured || false,
          };
          setDefaultValues(formattedValues);
        } else {
          toast({ title: "Error", description: "Failed to load brand", variant: "destructive" });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrand();
  }, [params.id]);

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
      const res = await fetch(`/api/brands/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast({ title: "Success", description: "Brand updated successfully!" });
        router.push("/dashboard");
      } else {
        const error = await res.json();
        throw new Error(error.message || "Failed to update brand");
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
        title="Edit Brand"
        schema={BrandSchema}
        defaultValues={defaultValues}
        fields={fields as any}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
