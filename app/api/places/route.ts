import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { PlaceSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const cursor = searchParams.get("cursor");
    
    // Build filter based on query params
    const filter: any = {};
    const category = searchParams.get("category");
    if (category) filter.categoryId = category;
    const isTrending = searchParams.get("isTrending") === "true";
    
    let orderBy: any = { hotScore: "desc" };
    if (searchParams.get("sort") === "newest") {
      orderBy = { createdAt: "desc" };
    }

    const places = await prisma.place.findMany({
      where: filter,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      include: {
        category: true,
        brand: true,
        images: true,
        tags: true,
      }
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (places.length > limit) {
      const nextItem = places.pop();
      nextCursor = nextItem!.id;
    }

    return successResponse(places, { nextCursor });
  } catch (error) {
    console.error("GET /api/places error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = PlaceSchema.parse(body);
    
    // In a real app, check permissions using middleware or Supabase Auth session here
    
    const newPlace = await prisma.place.create({
      data: {
        ...validatedData,
      }
    });

    return successResponse(newPlace, undefined, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse("Validation error: " + error.message, "VALIDATION_ERROR", 400);
    }
    console.error("POST /api/places error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
