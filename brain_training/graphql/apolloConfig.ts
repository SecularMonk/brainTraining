import * as Realm from "realm-web";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const app = new Realm.App("graphql-server-dgvip");
const uri = process.env.GRAPHQL_ENDPOINT ?? "http://localhost:4000/";
const ws_uri = process.env.GRAPHQL_WS_ENDPOINT;
// const apiKey = process.env.GRAPHQL_API_KEY;
console.log("uri: ", uri);

export const client = new ApolloClient({
   uri,
   cache: new InMemoryCache(),
});
