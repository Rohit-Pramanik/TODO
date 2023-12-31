import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/MongoDB";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export default NextAuth({
  secret: "secret",
  providers: [
    GoogleProvider({
      // clientId:
      //   "334774191903-42e62uvovumcrmr0hl324o8edu3n15bs.apps.googleusercontent.com",
      // clientSecret: "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",

      // working
      clientId: '421894344563-unl4lrdkd0huud9hojnv6buf943j4m5o.apps.googleusercontent.com',
      clientSecret: "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",

      // clientId: '654526047627-8rl0doflgm7v3g02imue2a5br864r7ij.apps.googleusercontent.com',
      // clientSecret: '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',

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
