import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { BlogSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const cursor = searchParams.get("cursor");
    
    let orderBy: any = { createdAt: "desc" };

    const filter: any = {};
    const tag = searchParams.get("tag");
    if (tag) {
      filter.tags = {
        some: { slug: tag }
      };
    }

    const blogs = await prisma.blog.findMany({
      where: filter,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      include: {
        brand: true,
        tags: true,
      }
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (blogs.length > limit) {
      const nextItem = blogs.pop();
      nextCursor = nextItem!.id;
    }

    return successResponse(blogs, { nextCursor });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = BlogSchema.parse(body);
    
    const newBlog = await prisma.blog.create({
      data: {
        ...validatedData,
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
