import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  // Group by type and fetch details
  const categorized: any = {
    place: [],
    event: [],
    news: [],
  };

  for (const b of bookmarks) {
    let details = null;
    if (b.targetType === "place") {
      details = await prisma.place.findUnique({ 
        where: { id: b.targetId },
        include: { images: true, category: true }
      });
    } else if (b.targetType === "event") {
      details = await prisma.event.findUnique({ 
        where: { id: b.targetId },
        include: { media: true, category: true }
      });
    }
    
    if (details) {
      categorized[b.targetType].push({
        ...b,
        details
      });
    }
  }

  return NextResponse.json(categorized);
}
