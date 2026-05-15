import { createServerClient, type CookieOptions } from "@supabase/ssr";
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

  // Fetch or create Prisma user and profile
  const dbUser = await prisma.user.upsert({
    where: { email: user.email! },
    update: {},
    create: {
      id: user.id,
      email: user.email!,
      profile: {
        create: {
          firstName: user.user_metadata.display_name?.split(" ")[0] || "",
          lastName: user.user_metadata.display_name?.split(" ")[1] || "",
          avatar: user.user_metadata.avatar_url || "",
        }
      }
    },
    include: {
      profile: true,
      bookmarks: true,
    }
  });

  return NextResponse.json(dbUser);
}

export async function PATCH(request: Request) {
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

  const body = await request.json();
  const { firstName, lastName, bio, preferences } = body;

  const updatedUser = await prisma.user.update({
    where: { email: user.email! },
    data: {
      preferences: preferences ? preferences : undefined,
      profile: {
        upsert: {
          create: {
            firstName,
            lastName,
            bio,
          },
          update: {
            firstName,
            lastName,
            bio,
          }
        }
      }
    },
    include: {
      profile: true,
    }
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE() {
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

  // Delete user from database (cascades will handle profile, bookmarks etc)
  await prisma.user.delete({
    where: { id: user.id },
  });

  return NextResponse.json({ success: true });
}
