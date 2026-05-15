import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { NewsSchema } from "@/lib/validators";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const news = await prisma.news.findUnique({
      where: { id: params.id },
      include: {
        brand: true,
      }
    });

    if (!news) return errorResponse("News not found", "NOT_FOUND", 404);

    return successResponse(news);
  } catch (error) {
    console.error("GET /api/news/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const validatedData = NewsSchema.partial().parse(body);

    const updatedNews = await prisma.news.update({
      where: { id: params.id },
      data: validatedData,
    });

    return successResponse(updatedNews);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse("News not found", "NOT_FOUND", 404);
    }
    if (error.name === 'ZodError') {
      return errorResponse("Validation error: " + error.message, "VALIDATION_ERROR", 400);
    }
    console.error("PATCH /api/news/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.news.delete({
      where: { id: params.id }
    });
    
    return successResponse({ message: "News deleted successfully" });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse("News not found", "NOT_FOUND", 404);
    }
    console.error("DELETE /api/news/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
