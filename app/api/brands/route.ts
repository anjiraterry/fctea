import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { BrandSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const cursor = searchParams.get("cursor");
    
    let orderBy: any = { hotScore: "desc" };

    const brands = await prisma.brand.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      include: {
        places: true,
        events: true,
      }
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (brands.length > limit) {
      const nextItem = brands.pop();
      nextCursor = nextItem!.id;
    }

    return successResponse(brands, { nextCursor });
  } catch (error) {
    console.error("GET /api/brands error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = BrandSchema.parse(body);
    
    const newBrand = await prisma.brand.create({
      data: {
        ...validatedData,
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
