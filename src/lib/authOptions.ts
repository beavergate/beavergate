import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        await connectToDatabase();
        const email = profile.email;
        const name = profile.name;
        const image = profile.picture;
        let _id;
        const exist_user = await User.findOne({ email });
        _id = exist_user?._id;
        if (!exist_user) {
          const user = await User.create({ email, name, balance: 0, image });
          _id = user?._id;
        }
        return {
          _id,
          id: _id,
          name,
          email,
          image,
          provider: "google",
        } as any;
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ email: credentials?.email });
        if (user && credentials?.password && user.password) {
          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isMatch) {
            return {
              _id: user._id,
              email: user.email,
              name: user.name,
              provider: "credentials",
            } as any;
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
  },
  callbacks: {
    async session({ session, token }: any) {
      if (session.user) {
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.provider = token.provider;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.provider = user.provider;
      }
      return token;
    },
  },
  events: {
    async signOut({ session, token }) {
      // You can perform any cleanup operations here
      console.log("User signed out");
    },
  },
  // pages: {
  //   signOut: "/auth/signout", // Custom signout page (optional)
  // },
};
