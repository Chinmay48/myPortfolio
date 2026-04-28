import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (user.email !== process.env.ADMIN_EMAIL) {
        return false;
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      // If the url is the sign-out or login page, let it redirect there
      if (url.includes("/login") || url === baseUrl) {
        return url;
      }
      // Default behavior for sign-in: go to admin
      return `${baseUrl}/admin`;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};