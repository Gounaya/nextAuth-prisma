import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Email from "next-auth/providers/email";

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
    }),
    Email({
      from: process.env.EMAIL_FROM,
      server: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      }
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

