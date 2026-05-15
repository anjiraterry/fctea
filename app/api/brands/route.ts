import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { BrandSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;
    
    let orderBy: any = { hotScore: "desc" };

    const [brands, totalCount] = await Promise.all([
      prisma.brand.findMany({
        where: {},
        take: limit,
        skip: skip,
        orderBy,
        include: {
          places: true,
          events: true,
        }
      }),
      prisma.brand.count()
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return successResponse(brands, { 
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages
      }
    });
  } catch (error) {
    console.error("GET /api/brands error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = BrandSchema.parse(body);
    const { images, ...data } = validatedData;
    
    const newBrand = await prisma.brand.create({
      data: {
        ...data,
        logo: images?.[0],
        coverImage: images?.[1],
      }
    });

    return successResponse(newBrand, undefined, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse("Validation error: " + error.message, "VALIDATION_ERROR", 400);
    }
    console.error("POST /api/brands error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
