import { EventbriteEvent, EventbriteSearchResponse } from "./types";

const EVENTBRITE_API_BASE = "https://www.eventbriteapi.com/v3";

export class EventbriteClient {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.EVENTBRITE_API_KEY || "";
    if (!this.apiKey) {
      console.warn("Eventbrite API key is not configured.");
    }
  }

  async searchEvents(location: string = "Abuja", q: string = ""): Promise<EventbriteEvent[]> {
    try {
      const url = new URL(`${EVENTBRITE_API_BASE}/events/search/`);
      if (q) url.searchParams.append("q", q);
      url.searchParams.append("location.address", location);

      const response = await fetch(url.toString(), {
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
        }
      });

      if (!response.ok) {
        throw new Error(`Eventbrite API error: ${response.statusText}`);
      }

      const data = (await response.json()) as EventbriteSearchResponse;
      return data.events || [];
    } catch (error) {
      console.error("Eventbrite search failed:", error);
      throw error;
    }
  }
}
