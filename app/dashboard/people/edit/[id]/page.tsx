"use client";

import React, { useEffect, useState } from "react";
import ResourceForm from "@/app/dashboard/components/ResourceForm";
import { PersonSchema } from "@/lib/validators";
import { useRouter, useParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function EditPersonPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState<any>(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const res = await fetch(`/api/people/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          const formattedValues = {
            name: data.data.name || "",
            slug: data.data.slug || "",
            bio: data.data.bio || "",
            avatar: data.data.avatar || "",
            verified: data.data.verified || false,
          };
          setDefaultValues(formattedValues);
        } else {
          toast({ title: "Error", description: "Failed to load person", variant: "destructive" });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPerson();
  }, [params.id]);

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "e.g. John Doe" },
    { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. john-doe" },
    { name: "avatar", label: "Avatar Image URL", type: "url", placeholder: "https://..." },
    { name: "bio", label: "Biography", type: "textarea", placeholder: "A short bio about this person..." },
    { name: "verified", label: "Verified Profile", type: "switch" },
  ];

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch(`/api/people/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast({ title: "Success", description: "Person profile updated successfully!" });
        router.push("/dashboard");
      } else {
        const error = await res.json();
        throw new Error(error.message || "Failed to update person");
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
        title="Edit Person Profile"
        schema={PersonSchema}
        defaultValues={defaultValues}
        fields={fields as any}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
