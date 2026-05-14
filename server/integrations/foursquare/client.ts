import { FoursquarePlace } from "./types";

const FOURSQUARE_API_BASE = "https://api.foursquare.com/v3";

export class FoursquareClient {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.FOURSQUARE_API_KEY || "";
    if (!this.apiKey) {
      console.warn("Foursquare API key is not configured.");
    }
  }

  async searchPlaces(query: string, near: string = "Abuja, Nigeria"): Promise<FoursquarePlace[]> {
    try {
      const url = new URL(`${FOURSQUARE_API_BASE}/places/search`);
      url.searchParams.append("query", query);
      url.searchParams.append("near", near);
      url.searchParams.append("limit", "10");

      const response = await fetch(url.toString(), {
        headers: {
          "Authorization": this.apiKey,
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Foursquare API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.results as FoursquarePlace[];
    } catch (error) {
      console.error("Foursquare search failed:", error);
      throw error;
    }
  }
}
