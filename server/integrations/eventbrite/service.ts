import { EventbriteClient } from "./client";
import { mapEventbriteEvent } from "./mapper";
import { prisma } from "@/lib/prisma";

export class EventbriteService {
  private client: EventbriteClient;

  constructor() {
    this.client = new EventbriteClient();
  }

  async importEvents(query: string) {
    try {
      const eventsData = await this.client.searchEvents("Abuja", query);
      
      const results = [];
      
      for (const data of eventsData) {
        // Map to internal schema
        const normalizedData = mapEventbriteEvent(data);
        
        // MVP deduplication
        const existingEvent = await prisma.event.findFirst({
          where: {
            title: {
              equals: normalizedData.title,
              mode: 'insensitive'
            }
          }
        });
        
        if (!existingEvent) {
          const newEvent = await prisma.event.create({
            data: normalizedData
          });
          results.push(newEvent);
        }
      }
      
      return results;
    } catch (error) {
      console.error("Failed to import events from Eventbrite:", error);
      throw error;
    }
  }
}
