import { EventbriteEvent } from "./types";
import { Prisma } from "@prisma/client";

export function mapEventbriteEvent(data: EventbriteEvent): Omit<Prisma.EventCreateInput, "id" | "createdAt" | "updatedAt"> {
  // Generate a base slug
  const slug = data.name.text.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.random().toString(36).substring(2, 7);

  return {
    title: data.name.text,
    slug: slug,
    description: data.description?.text || null,
    startDate: new Date(data.start.utc),
    endDate: data.end?.utc ? new Date(data.end.utc) : undefined,
    venue: data.venue_id || null, // Will likely need an internal place mapping later
    ticketUrl: data.url || null,
    organizer: data.organization_id || null,
    price: data.is_free ? "Free" : null, // Exact price requires pulling ticket classes
    hotScore: 0,
    isFeatured: false,
  };
}
