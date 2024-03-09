import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prismadb";
import { User } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/admin/sign-in",
    error: "/admin/sign-in",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = (token as User).role;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.email = token.email!;
      }

      return session;
    },
    async jwt({ token, session, trigger }) {
      if (
        trigger === "update" &&
        (session?.name || session?.email || session.image)
      ) {
        token.name = session.name;
        token.email = session.email;
        token.picture = session.image;
      }

      // Update user in the database
      await prisma.user.update({
        where: {
          id: token.sub,
        },
        data: {
          name: token.name,
          email: token.email!,
          image: token.picture,
        },
      });

      if (!token.sub) return token;

      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.picture = existingUser.image;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
