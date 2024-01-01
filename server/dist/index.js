import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { MongoClient } from "mongodb";
import { IIcons, IUsers, IQuizzes } from "./collections.js";
import { queryResolvers, mutationResolvers } from "./resolvers.js";
import * as dotenv from "dotenv";
dotenv.config();
const { MONGODB_CLUSTER, MONGODB_USERNAME, MONGODB_PASSWORD } = process.env ?? {};
const typeDefs = readFileSync("./graphql/schema.graphql", { encoding: "utf-8" });
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
// const resolvers = {
//    Query: {
//       books: () => books,
//    },
// };
const mongoDBConnectionString = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}`;
export const database = new MongoClient(mongoDBConnectionString);
const connection = await database.connect();
const Users = new IUsers({ modelOrCollection: database.db("live").collection("users") });
const Icons = new IIcons({ modelOrCollection: database.db("live").collection("icons") });
const Quizzes = new IQuizzes({ modelOrCollection: database.db("live").collection("quizzes") });
const dataSources = { Users, Icons, Quizzes };
export { Users, Icons, Quizzes, dataSources };
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers: { Mutation: mutationResolvers, Query: queryResolvers },
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({
        dataSources,
    }),
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
