import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function middleware(request: NextRequest) {
  await connectToDatabase();

  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & { userId: string };
    const user = (await User.findById(decoded.userId)) as IUser;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = NextResponse.next();
    const userId = user?._id as string;
    response.headers.set("X-User-ID", userId);
    response.headers.set("X-User-Name", user.name);
    // Add other user details as needed
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
