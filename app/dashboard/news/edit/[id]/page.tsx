"use client";

import React, { useEffect, useState } from "react";
import ResourceForm from "@/app/dashboard/components/ResourceForm";
import { NewsSchema } from "@/lib/validators";
import { useRouter, useParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState<any>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          const formattedValues = {
            title: data.data.title || "",
            slug: data.data.slug || "",
            content: data.data.content || "",
            category: data.data.category || "General",
            isBreaking: data.data.isBreaking || false,
          };
          setDefaultValues(formattedValues);
        } else {
          toast({ title: "Error", description: "Failed to load news", variant: "destructive" });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [params.id]);

  const fields = [
    { name: "title", label: "News Title", type: "text", placeholder: "e.g. New Infrastructure Project in Abuja" },
    { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. new-infrastructure-project" },
    { name: "category", label: "Category", type: "text", placeholder: "e.g. Politics, Lifestyle, Tech" },
    { name: "content", label: "Full Content", type: "textarea", placeholder: "Write the full article content here..." },
    { name: "isBreaking", label: "Breaking News", type: "switch" },
  ];

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch(`/api/news/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast({ title: "Success", description: "News article updated successfully!" });
        router.push("/dashboard");
      } else {
        const error = await res.json();
        throw new Error(error.message || "Failed to update news");
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
        title="Edit News Article"
        schema={NewsSchema}
        defaultValues={defaultValues}
        fields={fields as any}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
