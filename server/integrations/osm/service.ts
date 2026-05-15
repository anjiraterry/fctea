import { OSMClient } from "./client";
import { mapOSMElement } from "./mapper";
import { prisma } from "@/lib/prisma";

export class OSMService {
  private client: OSMClient;

  constructor() {
    this.client = new OSMClient();
  }

  async importAmenities(amenityTypes: string[] = ["restaurant", "cafe", "bar", "pub", "fast_food"]) {
    try {
      console.log(`Starting OSM import for amenities: ${amenityTypes.join(", ")}`);
      const response = await this.client.getPlacesByAmenity(amenityTypes);
      console.log(`Found ${response.elements.length} total elements from OSM.`);
      
      const results = [];
      let skipCount = 0;
      
      for (const element of response.elements) {
        if (!element.tags?.name) {
          skipCount++;
          continue; 
        }

        const normalizedData = mapOSMElement(element);
        
        const existingPlace = await prisma.place.findFirst({
          where: {
            name: {
              equals: normalizedData.name,
              mode: 'insensitive'
            }
          }
        });
        
        if (existingPlace) {
          skipCount++;
          continue;
        }

        // Attempt to find/create a category based on the amenity tag
        const categorySlug = element.tags.amenity?.replace(/_/g, '-') || 'other';
        const categoryName = element.tags.amenity?.replace(/_/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase()) || 'Other';

        const category = await prisma.placeCategory.upsert({
          where: { slug: categorySlug },
          update: {},
          create: {
            name: categoryName,
            slug: categorySlug
          }
        });

        const newPlace = await prisma.place.create({
          data: {
            ...normalizedData,
            categoryId: category.id
          }
        });
        results.push(newPlace);
      }
      
      console.log(`OSM import complete. Summary:`);
      console.log(`- Total found: ${response.elements.length}`);
      console.log(`- New imported: ${results.length}`);
      console.log(`- Skipped (duplicates or invalid): ${skipCount}`);
      
      return results;
    } catch (error) {
      console.error("Failed to import places from OSM:", error);
      throw error;
    }
  }
}
