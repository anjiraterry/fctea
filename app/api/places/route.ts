import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { PlaceSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;
    
    // Build filter based on query params
    const filter: any = {};
    const category = searchParams.get("category");
    
    if (category && category !== "All") {
      filter.OR = [
        { categoryId: category },
        { category: { name: { equals: category, mode: 'insensitive' } } },
        { category: { slug: { equals: category, mode: 'insensitive' } } }
      ];
    }
    
    const isTrending = searchParams.get("isTrending") === "true";
    if (isTrending) filter.hotScore = { gt: 0.7 };

    let orderBy: any = { hotScore: "desc" };
    if (searchParams.get("sort") === "newest") {
      orderBy = { createdAt: "desc" };
    }

    const [places, totalCount] = await Promise.all([
      prisma.place.findMany({
        where: filter,
        take: limit,
        skip: skip,
        orderBy,
        include: {
          category: true,
          brand: true,
          images: true,
          tags: true,
        }
      }),
      prisma.place.count({ where: filter })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return successResponse(places, { 
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages
      }
    });
  } catch (error) {
    console.error("GET /api/places error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = PlaceSchema.parse(body);
    const { images, ...data } = validatedData;
    
    const newPlace = await prisma.place.create({
      data: {
        ...data,
        images: images ? {
          create: images.map(url => ({ url }))
        } : undefined
      },
      include: {
        images: true
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
