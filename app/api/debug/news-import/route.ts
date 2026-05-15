import { NextRequest } from "next/server";
import { NewsService } from "@/server/integrations/news/service";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const newsService = new NewsService();
    const result = await newsService.syncNews();

    return successResponse({
      message: `News sync complete. Imported ${result.imported} new stories.`,
      ...result
    });
  } catch (error: any) {
    console.error("News Import API error:", error);
    return errorResponse(error.message, "NEWS_IMPORT_ERROR", 500);
  }
}
