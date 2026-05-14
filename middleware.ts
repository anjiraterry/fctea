import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value,
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value,
						...options,
					});
				},
				remove(name: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value: "",
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value: "",
						...options,
					});
				},
			},
		}
	);

	const { data: { session } } = await supabase.auth.getSession();

	const isAdminRoute = pathname.startsWith('/admin');
	const isEditorRoute = pathname.startsWith('/editor');

	if (isAdminRoute) {
		if (!session || session.user.user_metadata?.role !== "ADMIN") {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	if (isEditorRoute) {
		if (!session || !["EDITOR", "ADMIN"].includes(session.user.user_metadata?.role)) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	return response;
}

export const config = {
	matcher: [
        "/admin/:path*", 
        "/editor/:path*"
    ],
};
