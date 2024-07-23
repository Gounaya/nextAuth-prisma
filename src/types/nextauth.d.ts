// types/next-auth.d.ts
import type {DefaultSession, DefaultUser} from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultUser & {
      id: string; // Votre propriété personnalisée
    };
  }
}
