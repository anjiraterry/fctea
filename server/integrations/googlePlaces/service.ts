import { GooglePlacesClient } from "./client";
import { mapGooglePlace } from "./mapper";
import { prisma } from "@/lib/prisma";

export class GooglePlacesService {
  private client: GooglePlacesClient;

  constructor() {
    this.client = new GooglePlacesClient();
  }

  async importPlaces(query: string) {
    try {
      const placesData = await this.client.searchText(query);
      
      const results = [];
      
      for (const data of placesData) {
        // Map to internal schema
        const normalizedData = mapGooglePlace(data);
        
        // MVP deduplication
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
      console.error("Failed to import places from Google Places:", error);
      throw error;
    }
  }
}
