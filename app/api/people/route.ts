import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { PersonSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const cursor = searchParams.get("cursor");
    
    let orderBy: any = { hotScore: "desc" };

    const people = await prisma.person.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      include: {
        brand: true,
      }
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (people.length > limit) {
      const nextItem = people.pop();
      nextCursor = nextItem!.id;
    }

    return successResponse(people, { nextCursor });
  } catch (error) {
    console.error("GET /api/people error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = PersonSchema.parse(body);
    
    const newPerson = await prisma.person.create({
      data: {
        ...validatedData,
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
