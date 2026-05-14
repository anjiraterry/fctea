import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { NewsSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const cursor = searchParams.get("cursor");
    
    let orderBy: any = { publishedAt: "desc" };

    const filter: any = {};
    const category = searchParams.get("category");
    if (category) filter.category = category;
    
    const isBreaking = searchParams.get("isBreaking");
    if (isBreaking === "true") filter.isBreaking = true;

    const news = await prisma.news.findMany({
      where: filter,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      include: {
        brand: true,
      }
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (news.length > limit) {
      const nextItem = news.pop();
      nextCursor = nextItem!.id;
    }

    return successResponse(news, { nextCursor });
  } catch (error) {
    console.error("GET /api/news error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = NewsSchema.parse(body);
    
    const newNews = await prisma.news.create({
      data: {
        ...validatedData,
      }
    });

    return successResponse(newNews, undefined, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse("Validation error: " + error.message, "VALIDATION_ERROR", 400);
    }
    console.error("POST /api/news error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
