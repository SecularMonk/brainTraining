import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const uri = "https://realm.mongodb.com/api/client/v2.0/app/graphql-server-dgvip/graphql";
const apiKey = "COYSfxf6z6GXdtTmrhxAYcsqqWixOg4HN1vMBVo6nGzLh6okjVsdQ0SKdEz2aHq7";

const httpLink = createHttpLink({
   uri,
});

const authLink = setContext((_, { headers }) => {
   // return the headers to the context so httpLink can read them
   return {
      headers: {
         ...headers,
         apiKey,
      },
   };
});

export const client = new ApolloClient({
   link: authLink.concat(httpLink),
   cache: new InMemoryCache(),
});
