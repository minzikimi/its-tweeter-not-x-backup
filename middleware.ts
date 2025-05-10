
import { NextRequest, NextResponse } from "next/server";
import getSession from "./app/lib/session";


const publicPages = ["/login", "/create-account"];

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isPublicPage = publicPages.includes(request.nextUrl.pathname);

  if (!session?.id) {

    if (!isPublicPage) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  else {
    if (isPublicPage) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
