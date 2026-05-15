import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { EventSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;
    
    const filter: any = {};
    const category = searchParams.get("category");
    if (category && category !== "All") {
      filter.OR = [
        { categoryId: category },
        { category: { name: { equals: category, mode: 'insensitive' } } },
        { category: { slug: { equals: category, mode: 'insensitive' } } }
      ];
    }
    
    let orderBy: any = { hotScore: "desc" };
    if (searchParams.get("sort") === "upcoming") {
      orderBy = { startDate: "asc" };
      filter.startDate = { gte: new Date() }; // Only future events
    }

    const [events, totalCount] = await Promise.all([
      prisma.event.findMany({
        where: filter,
        take: limit,
        skip: skip,
        orderBy,
        include: {
          category: true,
          brand: true,
          place: true,
          tags: true,
          media: true
        }
      }),
      prisma.event.count({ where: filter })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return successResponse(events, { 
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages
      }
    });
  } catch (error) {
    console.error("GET /api/events error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = EventSchema.parse(body);
    const { images, ...data } = validatedData;
    
    const newEvent = await prisma.event.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        media: images ? {
          create: images.map(url => ({ url, type: "IMAGE" }))
        } : undefined
      },
      include: {
        media: true
      }
    });

    return successResponse(newEvent, undefined, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse("Validation error: " + error.message, "VALIDATION_ERROR", 400);
    }
    console.error("POST /api/events error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
