import { OSMService } from "../server/integrations/osm/service";
import "dotenv/config";

async function main() {
  try {
    console.log("Starting standalone OSM import...");
    const osmService = new OSMService();
    const imported = await osmService.importAmenities();
    console.log(`Success! Imported ${imported.length} places.`);
  } catch (error) {
    console.error("Standalone OSM import failed:", error);
    process.exit(1);
  }
}

main();
