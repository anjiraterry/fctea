import { GooglePlace, GooglePlacesSearchResponse } from "./types";

const GOOGLE_PLACES_API_BASE = "https://maps.googleapis.com/maps/api/place";

export class GooglePlacesClient {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || "";
    if (!this.apiKey) {
      console.warn("Google Places API key is not configured.");
    }
  }

  async searchText(query: string): Promise<GooglePlace[]> {
    try {
      const url = new URL(`${GOOGLE_PLACES_API_BASE}/textsearch/json`);
      url.searchParams.append("query", query);
      url.searchParams.append("key", this.apiKey);

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.statusText}`);
      }

      const data = (await response.json()) as GooglePlacesSearchResponse;
      return data.results;
    } catch (error) {
      console.error("Google Places search failed:", error);
      throw error;
    }
  }
}
