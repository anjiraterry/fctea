"use client";

import React from "react";
import ResourceForm from "@/app/dashboard/components/ResourceForm";
import { EventSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function CreateEventPage() {
  const router = useRouter();

  const defaultValues = {
    title: "",
    slug: "",
    description: "",
    startDate: new Date().toISOString().slice(0, 16),
    venue: "",
    organizer: "",
    price: "Free",
    isFeatured: false,
  };

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
      // Ensure date is in full ISO format for Zod
      const payload = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
      };

      const res = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast({ title: "Success", description: "Event created successfully!" });
        router.push("/dashboard");
      } else {
        const error = await res.json();
        throw new Error(error.message || "Failed to create event");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="py-10">
      <ResourceForm
        title="Create New Event"
        schema={EventSchema}
        defaultValues={defaultValues}
        fields={fields as any}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
