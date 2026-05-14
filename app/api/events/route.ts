import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { EventSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const cursor = searchParams.get("cursor");
    
    const filter: any = {};
    const category = searchParams.get("category");
    if (category) filter.categoryId = category;
    
    let orderBy: any = { hotScore: "desc" };
    if (searchParams.get("sort") === "upcoming") {
      orderBy = { startDate: "asc" };
      filter.startDate = { gte: new Date() }; // Only future events
    }

    const events = await prisma.event.findMany({
      where: filter,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      include: {
        category: true,
        brand: true,
        place: true,
        tags: true,
        media: true
      }
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (events.length > limit) {
      const nextItem = events.pop();
      nextCursor = nextItem!.id;
    }

    return successResponse(events, { nextCursor });
  } catch (error) {
    console.error("GET /api/events error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = EventSchema.parse(body);
    
    const newEvent = await prisma.event.create({
      data: {
        ...validatedData,
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
