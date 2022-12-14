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
});
