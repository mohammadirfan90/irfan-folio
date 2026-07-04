import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
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
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // This will refresh the session if it is expired - required for Server Components
  // to get the correct session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAccessingAdmin = request.nextUrl.pathname.startsWith("/admin");
  const isAccessingLogin = request.nextUrl.pathname === "/login";

  // Protection logic:
  // If request is for admin area and user is not logged in, redirect to login
  if (isAccessingAdmin && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If request is for login page and user is already logged in, redirect to admin
  if (isAccessingLogin && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}
