import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

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
        } as any;
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
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);

export default handler;
