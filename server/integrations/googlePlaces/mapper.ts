import { GooglePlace } from "./types";
import { Prisma } from "@prisma/client";

export function mapGooglePlace(data: GooglePlace): Omit<Prisma.PlaceCreateInput, "id" | "createdAt" | "updatedAt"> {
  const coordinates = data.geometry?.location ? {
    lat: data.geometry.location.lat,
    lng: data.geometry.location.lng
  } : null;

  // Generate a base slug
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.random().toString(36).substring(2, 7);

  return {
    name: data.name,
    slug: slug,
    address: data.formatted_address || null,
    coordinates: coordinates ? coordinates as Prisma.InputJsonValue : null,
    phone: data.formatted_phone_number || null,
    website: data.website || null,
    priceLevel: data.price_level || null,
    rating: data.rating || null,
    openingHours: data.opening_hours?.weekday_text ? { days: data.opening_hours.weekday_text } as Prisma.InputJsonValue : null,
    hotScore: 0,
    isFeatured: false,
    isPublished: false,
  };
}
