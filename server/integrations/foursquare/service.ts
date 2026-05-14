import { FoursquareClient } from "./client";
import { mapFoursquarePlace } from "./mapper";
import { prisma } from "@/lib/prisma";

export class FoursquareService {
  private client: FoursquareClient;

  constructor() {
    this.client = new FoursquareClient();
  }

  async importPlaces(query: string, near: string = "Abuja, Nigeria") {
    try {
      const placesData = await this.client.searchPlaces(query, near);
      
      const results = [];
      
      for (const data of placesData) {
        // Map to internal schema
        const normalizedData = mapFoursquarePlace(data);
        
        // MVP: Simple deduplication - check if place with same name exists
        const existingPlace = await prisma.place.findFirst({
          where: {
            name: {
              equals: normalizedData.name,
              mode: 'insensitive'
            }
          }
        });
        
        if (!existingPlace) {
          const newPlace = await prisma.place.create({
            data: normalizedData
          });
          results.push(newPlace);
        }
      }
      
      return results;
    } catch (error) {
      console.error("Failed to import places from Foursquare:", error);
      throw error;
    }
  }
}
