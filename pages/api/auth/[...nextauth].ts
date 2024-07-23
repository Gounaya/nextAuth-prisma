import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GithubProvider from "next-auth/providers/github";

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;

if (!githubId || !githubSecret) {
  throw new Error("❌ Missing GITHUB_ID or GITHUB_SECRET in NextAuth config");
}

export const authOptions  = {
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret
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

