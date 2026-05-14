export interface GooglePlace {
  place_id: string;
  name: string;
  formatted_address?: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    }
  };
  price_level?: number;
  rating?: number;
  website?: string;
  formatted_phone_number?: string;
  opening_hours?: {
    weekday_text?: string[];
  };
}

export interface GooglePlacesSearchResponse {
  results: GooglePlace[];
  status: string;
}
