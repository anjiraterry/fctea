import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { EventSchema } from "@/lib/validators";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        brand: true,
        place: true,
        tags: true,
        media: true
      }
    });

    if (!event) return errorResponse("Event not found", "NOT_FOUND", 404);

    return successResponse(event);
  } catch (error) {
    console.error("GET /api/events/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const validatedData = EventSchema.partial().parse(body);

    const updatedEvent = await prisma.event.update({
      where: { id: params.id },
      data: validatedData,
    });

    return successResponse(updatedEvent);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse("Event not found", "NOT_FOUND", 404);
    }
    if (error.name === 'ZodError') {
      return errorResponse("Validation error: " + error.message, "VALIDATION_ERROR", 400);
    }
    console.error("PATCH /api/events/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.event.delete({
      where: { id: params.id }
    });
    
    return successResponse({ message: "Event deleted successfully" });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse("Event not found", "NOT_FOUND", 404);
    }
    console.error("DELETE /api/events/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
