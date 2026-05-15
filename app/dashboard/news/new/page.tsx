"use client";

import React from "react";
import ResourceForm from "@/app/dashboard/components/ResourceForm";
import { NewsSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function CreateNewsPage() {
  const router = useRouter();

  const defaultValues = {
    title: "",
    slug: "",
    content: "",
    category: "General",
    isBreaking: false,
    publishedAt: new Date().toISOString(),
  };

  const fields = [
    { name: "title", label: "News Title", type: "text", placeholder: "e.g. New Infrastructure Project in Abuja" },
    { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. new-infrastructure-project" },
    { name: "category", label: "Category", type: "text", placeholder: "e.g. Politics, Lifestyle, Tech" },
    { name: "content", label: "Full Content", type: "textarea", placeholder: "Write the full article content here..." },
    { name: "isBreaking", label: "Breaking News", type: "switch" },
  ];

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast({ title: "Success", description: "News article created successfully!" });
        router.push("/dashboard");
      } else {
        const error = await res.json();
        throw new Error(error.message || "Failed to create news");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="py-10">
      <ResourceForm
        title="Create News Article"
        schema={NewsSchema}
        defaultValues={defaultValues}
        fields={fields as any}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
