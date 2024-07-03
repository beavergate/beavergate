import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        await connectToDatabase();

        const email = profile.email;
        const name = profile.name;
        const image = profile.picture;

        const exist_user = await User.findOne({ email });
        if (!exist_user) User.create({ email, name, balance: 0, image });

        return {
          id: profile.sub,
          name,
          email,
          image,
        };
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
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

export const handler = NextAuth(authOptions);

// Handle each HTTP method
export const GET = handler;
export const POST = handler;

