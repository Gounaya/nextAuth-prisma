import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;

const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;

if (!githubId || !githubSecret) {
  throw new Error("❌ Missing GITHUB_ID or GITHUB_SECRET in NextAuth config");
} else if (!googleId || !googleSecret) {
  throw new Error("❌ Missing GOOGLE_ID or GOOGLE_SECRET in NextAuth config");

}

export const authOptions  = {
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret
    }),
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    })

  ],
  callbacks: {
    session: async ({session, user}: any) => {
      console.log(session, user);
      if(session.user) {
        session.user.id = user.id;

      }
      return session;
    }
  },
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);

