import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@app/lib/mongodb";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ token, session }) {
      if (session?.user && token) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
