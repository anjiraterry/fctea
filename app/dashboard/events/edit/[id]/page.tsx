"use client";

import React, { useEffect, useState } from "react";
import ResourceForm from "@/app/dashboard/components/ResourceForm";
import { EventSchema } from "@/lib/validators";
import { useRouter, useParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          const formattedValues = {
            title: data.data.title || "",
            slug: data.data.slug || "",
            description: data.data.description || "",
            startDate: data.data.startDate ? new Date(data.data.startDate).toISOString().slice(0, 16) : "",
            venue: data.data.venue || "",
            organizer: data.data.organizer || "",
            price: data.data.price || "Free",
            isFeatured: data.data.isFeatured || false,
          };
          setDefaultValues(formattedValues);
        } else {
          toast({ title: "Error", description: "Failed to load event", variant: "destructive" });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [params.id]);

  const fields = [
    { name: "title", label: "Event Title", type: "text", placeholder: "e.g. Abuja Jazz Festival" },
    { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. abuja-jazz-festival" },
    { name: "startDate", label: "Start Date & Time", type: "date" },
    { name: "venue", label: "Venue Location", type: "text", placeholder: "e.g. Eagle Square, Abuja" },
    { name: "organizer", label: "Organizer Name", type: "text", placeholder: "e.g. Abuja Arts Council" },
    { name: "price", label: "Ticket Price", type: "text", placeholder: "e.g. Free or ₦5,000" },
    { name: "description", label: "Event Description", type: "textarea", placeholder: "What's happening at this event?" },
    { name: "isFeatured", label: "Featured Event", type: "switch" },
  ];

  const handleSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
      };

      const res = await fetch(`/api/events/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast({ title: "Success", description: "Event updated successfully!" });
        router.push("/dashboard");
      } else {
        const error = await res.json();
        throw new Error(error.message || "Failed to update event");
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
        title="Edit Event"
        schema={EventSchema}
        defaultValues={defaultValues}
        fields={fields as any}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
