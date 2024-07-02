import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const nonAuthPath = ["/login", "/register", "/email-verify"];
const protectedRoutes = ["/profile"];

export async function middleware(req: NextRequest) {}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
