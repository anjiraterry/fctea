import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { PlaceSchema } from "@/lib/validators";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const place = await prisma.place.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        brand: true,
        images: true,
        tags: true,
        events: true
      }
    });

    if (!place) return errorResponse("Place not found", "NOT_FOUND", 404);

    return successResponse(place);
  } catch (error) {
    console.error("GET /api/places/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const validatedData = PlaceSchema.partial().parse(body);

    const updatedPlace = await prisma.place.update({
      where: { id: params.id },
      data: validatedData,
    });

    return successResponse(updatedPlace);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse("Place not found", "NOT_FOUND", 404);
    }
    if (error.name === 'ZodError') {
      return errorResponse("Validation error: " + error.message, "VALIDATION_ERROR", 400);
    }
    console.error("PATCH /api/places/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.place.delete({
      where: { id: params.id }
    });
    
    return successResponse({ message: "Place deleted successfully" });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse("Place not found", "NOT_FOUND", 404);
    }
    console.error("DELETE /api/places/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
