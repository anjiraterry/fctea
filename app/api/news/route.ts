import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { NewsSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;
    
    let orderBy: any = { publishedAt: "desc" };

    const filter: any = {};
    const category = searchParams.get("category");
    if (category && category !== "All") {
      filter.category = { equals: category, mode: 'insensitive' };
    }
    
    const isBreaking = searchParams.get("isBreaking");
    if (isBreaking === "true") filter.isBreaking = true;

    const [news, totalCount] = await Promise.all([
      prisma.news.findMany({
        where: filter,
        take: limit,
        skip: skip,
        orderBy,
        include: {
          brand: true,
        }
      }),
      prisma.news.count({ where: filter })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return successResponse(news, { 
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages
      }
    });
  } catch (error) {
    console.error("GET /api/news error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = NewsSchema.parse(body);
    const { images, ...data } = validatedData;
    
    const newNews = await prisma.news.create({
      data: {
        ...data,
        featuredImage: images?.[0],
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
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
