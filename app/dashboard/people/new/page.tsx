"use client";

import React from "react";
import ResourceForm from "../../../components/ResourceForm";
import { PersonSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function CreatePersonPage() {
  const router = useRouter();

  const defaultValues = {
    name: "",
    slug: "",
    bio: "",
    avatar: "",
    verified: false,
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "e.g. John Doe" },
    { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. john-doe" },
    { name: "avatar", label: "Avatar Image URL", type: "url", placeholder: "https://..." },
    { name: "bio", label: "Biography", type: "textarea", placeholder: "A short bio about this person..." },
    { name: "verified", label: "Verified Profile", type: "switch" },
  ];

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/people", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast({ title: "Success", description: "Person profile created successfully!" });
        router.push("/dashboard");
      } else {
        const error = await res.json();
        throw new Error(error.message || "Failed to create person");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="py-10">
      <ResourceForm
        title="Create Person Profile"
        schema={PersonSchema}
        defaultValues={defaultValues}
        fields={fields as any}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
