import { NextResponse } from "next/server";

export function successResponse(data: any, meta?: any, status = 200) {
  return NextResponse.json({
    success: true,
    data,
    meta,
  }, { status });
}

export function errorResponse(message: string, code: string = "BAD_REQUEST", status = 400) {
  return NextResponse.json({
    success: false,
    error: {
      code,
      message
    }
  }, { status });
}
