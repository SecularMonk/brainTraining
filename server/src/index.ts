import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { MongoClient } from "mongodb";
import { queryResolvers, mutationResolvers, userResolvers } from "./resolvers.js";
import { Quiz, User, Answer, Event, Engagements, DictionaryWord } from "./__generated__/resolvers-types.js";
import * as dotenv from "dotenv";
dotenv.config();
const { MONGODB_CLUSTER, MONGODB_USERNAME, MONGODB_PASSWORD } = process.env ?? {};

const typeDefs = readFileSync("./graphql/schema.graphql", { encoding: "utf-8" });

const mongoDBConnectionString = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}`;
export const database = new MongoClient(mongoDBConnectionString);
await database.connect();

const Users = database.db("live").collection<User>("users");
const Quizzes = database.db("live").collection<Quiz>("quizzes");
const Answers = database.db("live").collection<Answer>("answers");
const Events = database.db("live").collection<Event>("events");
const Engagements = database.db("live").collection<Engagements>("engagements");
const AllowedStrings = database.db("dictionary").collection<DictionaryWord>("allowedStrings");

export const Logs = database.db("logs").collection<any>("logs");

export const dataSources = { Users, Quizzes, Answers, Events, Engagements, AllowedStrings } as const;

const server = new ApolloServer({
   typeDefs,
   resolvers: { Mutation: mutationResolvers, Query: { ...queryResolvers, ...userResolvers } },
});

const { url } = await startStandaloneServer(server, {
   context: async ({ req }) => ({
      dataSources,
   }),
   listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
