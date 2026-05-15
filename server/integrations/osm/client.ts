import { OverpassResponse } from "./types";

const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

export class OSMClient {
  async query(overpassQuery: string): Promise<OverpassResponse> {
    try {
      const response = await fetch(OVERPASS_API_URL, {
        method: "POST",
        body: `data=${encodeURIComponent(overpassQuery)}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "FCTEA-City-Guide/1.0 (https://github.com/anjiraterry/fctea)"
        },
      });

      if (!response.ok) {
        throw new Error(`Overpass API error: ${response.statusText}`);
      }

      return (await response.json()) as OverpassResponse;
    } catch (error) {
      console.error("Overpass query failed:", error);
      throw error;
    }
  }

  async getPlacesByAmenity(amenityTypes: string[]): Promise<OverpassResponse> {
    const amenities = amenityTypes.join("|");
    const query = `
      [out:json][timeout:30];
      (
        area["name"="Federal Capital Territory"];
        area["name"="Abuja"];
        area["name"="Abuja Municipal Area Council"];
      )->.searchArea;
      (
        node["amenity"~"${amenities}"](area.searchArea);
        way["amenity"~"${amenities}"](area.searchArea);
        relation["amenity"~"${amenities}"](area.searchArea);
      );
      out center;
    `;
    return this.query(query);
  }
}
