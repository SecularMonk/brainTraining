import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import EmailProvider from "next-auth/providers/email";
export default NextAuth({
   adapter: MongoDBAdapter(clientPromise),
   providers: [
      EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
      }),
   ],

   database: process.env.MONGODB_URI,

   jwt: {
      secret: "n7AfjHavFckHLwPOzruDAsyR3mEhpewgQQf7E3ud1bzUy273RM",
      // encryption: true,
   },

   session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60, // DAYS * HOURS * MINS * SECS, 30 days
      strategy: "jwt",
   },

   callbacks: {
      signIn: async ({ user, account, profile, email, credentials }) => {
         // console.log(JSON.stringify({ user, account, profile, email, credentials }));
         return true;
      },
      jwt: async ({ token, user }) => {
         // if (user) {
         //    console.log(JSON.stringify({ user }));
         //    token.userId = user.id;
         // }
         // if (account) {
         //    console.log(JSON.stringify({ account }));
         // }
         // if (profile) {
         //    console.log(JSON.stringify({ profile }));
         // }
         return Promise.resolve(token);
      },

      session: async ({ session, token, user }) => {
         // console.log(JSON.stringify({ session, token, user }));
         if (token) {
            session.user.userId = token.userId;
         }
         // session.user.userId = user.userId;
         return Promise.resolve(session);
      },
   },
});
