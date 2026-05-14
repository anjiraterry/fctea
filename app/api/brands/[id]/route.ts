import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { BrandSchema } from "@/lib/validators";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: params.id },
      include: {
        places: true,
        events: true,
        people: true,
        blogs: true,
        news: true
      }
    });

    if (!brand) return errorResponse("Brand not found", "NOT_FOUND", 404);

    return successResponse(brand);
  } catch (error) {
    console.error("GET /api/brands/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const validatedData = BrandSchema.partial().parse(body);

    const updatedBrand = await prisma.brand.update({
      where: { id: params.id },
      data: validatedData,
    });

    return successResponse(updatedBrand);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse("Brand not found", "NOT_FOUND", 404);
    }
    if (error.name === 'ZodError') {
      return errorResponse("Validation error: " + error.message, "VALIDATION_ERROR", 400);
    }
    console.error("PATCH /api/brands/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.brand.delete({
      where: { id: params.id }
    });
    
    return successResponse({ message: "Brand deleted successfully" });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse("Brand not found", "NOT_FOUND", 404);
    }
    console.error("DELETE /api/brands/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
