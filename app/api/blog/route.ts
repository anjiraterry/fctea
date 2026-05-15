import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { BlogSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;
    
    let orderBy: any = { createdAt: "desc" };

    const filter: any = {};
    const tag = searchParams.get("tag");
    if (tag) {
      filter.tags = {
        some: { slug: tag }
      };
    }
    
    const category = searchParams.get("category");
    if (category && category !== "All") {
      // If blog doesn't have a category field, we might need to filter by tag or something else.
      // Assuming for now it might have a category string or we can filter by tag name.
      filter.OR = [
        { tags: { some: { name: { equals: category, mode: 'insensitive' } } } },
        { title: { contains: category, mode: 'insensitive' } }
      ];
    }

    const [blogs, totalCount] = await Promise.all([
      prisma.blog.findMany({
        where: filter,
        take: limit,
        skip: skip,
        orderBy,
        include: {
          brand: true,
          tags: true,
        }
      }),
      prisma.blog.count({ where: filter })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return successResponse(blogs, { 
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages
      }
    });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = BlogSchema.parse(body);
    const { images, ...data } = validatedData;
    
    const newBlog = await prisma.blog.create({
      data: {
        ...data,
        featuredImg: images?.[0],
      }
    });

    return successResponse(newBlog, undefined, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse("Validation error: " + error.message, "VALIDATION_ERROR", 400);
    }
    console.error("POST /api/blog error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
