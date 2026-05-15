import { NextRequest } from "next/server";
import { OSMService } from "@/server/integrations/osm/service";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const amenitiesParam = searchParams.get("amenities");
    const amenities = amenitiesParam ? amenitiesParam.split(",") : undefined;

    const osmService = new OSMService();
    const importedPlaces = await osmService.importAmenities(amenities);

    return successResponse({
      message: `Successfully imported ${importedPlaces.length} places from OSM`,
      count: importedPlaces.length,
      places: importedPlaces.map(p => ({ name: p.name, slug: p.slug }))
    });
  } catch (error: any) {
    console.error("OSM Import API error:", error);
    return errorResponse(error.message, "OSM_IMPORT_ERROR", 500);
  }
}
