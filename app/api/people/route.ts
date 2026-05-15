import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { PersonSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;
    
    let orderBy: any = { hotScore: "desc" };

    const [people, totalCount] = await Promise.all([
      prisma.person.findMany({
        where: {},
        take: limit,
        skip: skip,
        orderBy,
        include: {
          brand: true,
        }
      }),
      prisma.person.count()
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return successResponse(people, { 
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages
      }
    });
  } catch (error) {
    console.error("GET /api/people error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = PersonSchema.parse(body);
    const { images, ...data } = validatedData;
    
    const newPerson = await prisma.person.create({
      data: {
        ...data,
        avatar: images?.[0],
      }
    });

    return successResponse(newPerson, undefined, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse("Validation error: " + error.message, "VALIDATION_ERROR", 400);
    }
    console.error("POST /api/people error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
