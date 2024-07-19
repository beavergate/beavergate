// types/next-auth.d.ts
import { DefaultSession } from "next-auth";
import { User as NextAuthUser } from "next-auth";
import { DefaultUser as NextAuthDefaultUser } from "next-auth";

declare module "next-auth" {
  interface DefaultUser extends NextAuthDefaultUser {
    _id?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
      _id?: string;
    } & DefaultSession["user"];
  }
}

declare module "next/server" {
  export interface NextRequest {
    user?: DefaultUser & { image?: string };
  }
}
