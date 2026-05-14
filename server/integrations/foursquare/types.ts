export interface FoursquarePlace {
  fsq_id: string;
  name: string;
  location: {
    address?: string;
    cross_street?: string;
  };
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
  };
  rating?: number;
  price?: 1 | 2 | 3 | 4;
  website?: string;
  social_media?: {
    instagram?: string;
    twitter?: string;
  };
  hours?: {
    display?: string;
  };
}
