export interface OSMElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: {
    name?: string;
    amenity?: string;
    cuisine?: string;
    'addr:street'?: string;
    'addr:city'?: string;
    website?: string;
    phone?: string;
    opening_hours?: string;
    description?: string;
    [key: string]: string | undefined;
  };
}

export interface OverpassResponse {
  elements: OSMElement[];
}
