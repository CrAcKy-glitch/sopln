import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username?: string;
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }
}
