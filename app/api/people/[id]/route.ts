import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { PersonSchema } from "@/lib/validators";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const person = await prisma.person.findUnique({
      where: { id: params.id },
      include: {
        brand: true,
        events: true,
        blogs: true,
        places: true
      }
    });

    if (!person) return errorResponse("Person not found", "NOT_FOUND", 404);

    return successResponse(person);
  } catch (error) {
    console.error("GET /api/people/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const validatedData = PersonSchema.partial().parse(body);

    const updatedPerson = await prisma.person.update({
      where: { id: params.id },
      data: validatedData,
    });

    return successResponse(updatedPerson);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse("Person not found", "NOT_FOUND", 404);
    }
    if (error.name === 'ZodError') {
      return errorResponse("Validation error: " + error.message, "VALIDATION_ERROR", 400);
    }
    console.error("PATCH /api/people/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.person.delete({
      where: { id: params.id }
    });
    
    return successResponse({ message: "Person deleted successfully" });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse("Person not found", "NOT_FOUND", 404);
    }
    console.error("DELETE /api/people/[id] error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
