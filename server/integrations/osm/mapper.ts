import { OSMElement } from "./types";
import { Prisma } from "@prisma/client";

export function mapOSMElement(element: OSMElement): Omit<Prisma.PlaceCreateInput, "id" | "createdAt" | "updatedAt"> {
  const tags = element.tags || {};
  const lat = element.lat || element.center?.lat;
  const lon = element.lon || element.center?.lon;

  const name = tags.name || `Unnamed ${tags.amenity || 'Place'}`;
  
  // Generate a robust slug
  const baseSlug = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const slug = `${baseSlug}-${element.id}`;

  const addressParts = [
    tags['addr:street'],
    tags['addr:suburb'],
    tags['addr:city'] || "Abuja"
  ].filter(Boolean);

  const address = addressParts.join(", ") || null;

  return {
    name: name,
    slug: slug,
    description: tags.description || `A ${tags.amenity?.replace(/_/g, ' ')} in Abuja.`,
    address: address,
    coordinates: lat && lon ? { lat, lng: lon } as Prisma.InputJsonValue : null,
    phone: tags.phone || tags['contact:phone'] || null,
    website: tags.website || tags['contact:website'] || null,
    openingHours: tags.opening_hours ? { raw: tags.opening_hours } as Prisma.InputJsonValue : null,
    rating: null, // OSM doesn't typically have ratings
    hotScore: 0,
    isFeatured: false,
    isPublished: true,
  };
}
