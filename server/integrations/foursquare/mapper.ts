import { FoursquarePlace } from "./types";
import { Prisma } from "@prisma/client";

export function mapFoursquarePlace(data: FoursquarePlace): Omit<Prisma.PlaceCreateInput, "id" | "createdAt" | "updatedAt"> {
  const coordinates = data.geocodes?.main ? {
    lat: data.geocodes.main.latitude,
    lng: data.geocodes.main.longitude
  } : null;

  // Generate a base slug from the name. In reality, the service will need to ensure this is unique.
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.random().toString(36).substring(2, 7);

  return {
    name: data.name,
    slug: slug,
    address: data.location?.address || null,
    coordinates: coordinates ? coordinates as Prisma.InputJsonValue : null,
    website: data.website || null,
    instagram: data.social_media?.instagram || null,
    priceLevel: data.price || null,
    rating: data.rating || null,
    openingHours: data.hours?.display ? { display: data.hours.display } as Prisma.InputJsonValue : null,
    hotScore: 0,
    isFeatured: false,
    isPublished: false, // Imported places should be reviewed before publishing
  };
}
