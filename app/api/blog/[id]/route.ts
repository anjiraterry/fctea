import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { BlogSchema } from "@/lib/validators";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      include: {
        brand: true,
        tags: true,
      }
    });

    if (!blog) return errorResponse("Blog not found", "NOT_FOUND", 404);

    return successResponse(blog);
  } catch (error) {
    console.error("GET /api/blog/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const validatedData = BlogSchema.partial().parse(body);

    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
      data: validatedData,
    });

    return successResponse(updatedBlog);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse("Blog not found", "NOT_FOUND", 404);
    }
    if (error.name === 'ZodError') {
      return errorResponse("Validation error: " + error.message, "VALIDATION_ERROR", 400);
    }
    console.error("PATCH /api/blog/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.blog.delete({
      where: { id: params.id }
    });
    
    return successResponse({ message: "Blog deleted successfully" });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse("Blog not found", "NOT_FOUND", 404);
    }
    console.error("DELETE /api/blog/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
