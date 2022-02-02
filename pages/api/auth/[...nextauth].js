import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/MongoDB";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export default NextAuth({
  secret: "secret",
  providers: [
    GoogleProvider({
      clientId:
        "334774191903-42e62uvovumcrmr0hl324o8edu3n15bs.apps.googleusercontent.com",
      clientSecret: "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",

      authorization: {
        params: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    // async jwt({ token, account }) {
    //   // Persist the OAuth access_token to the token right after signin
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    //   return token;
    // },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async jwt(token, account) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token;
      return session;
    },
  },
});
