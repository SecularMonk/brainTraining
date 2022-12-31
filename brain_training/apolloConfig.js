import * as Realm from "realm-web";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const app = new Realm.App("graphql-server-dgvip");
// const uri = process.env.GRAPHQL_ENDPOINT;
// const apiKey = process.env.GRAPHQL_API_KEY;
const uri = "https://realm.mongodb.com/api/client/v2.0/app/graphql-server-dgvip/graphql";
const apiKey = "COYSfxf6z6GXdtTmrhxAYcsqqWixOg4HN1vMBVo6nGzLh6okjVsdQ0SKdEz2aHq7";

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
   // Guarantee that there's a logged in user with a valid access token
   if (!app.currentUser) {
      // If no user is logged in, log in an anonymous user. The logged in user will have a valid
      // access token.
      // await app.logIn(Realm.Credentials.apiKey(process.env.GRAPHQL_API_KEY));
      await app.logIn(Realm.Credentials.apiKey(apiKey));
   } else {
      // An already logged in user's access token might be stale. Tokens must be refreshed after
      // 30 minutes. To guarantee that the token is valid, we refresh the user's access token.
      await app.currentUser.refreshAccessToken();
   }
   return app.currentUser.accessToken;
}

export const client = new ApolloClient({
   link: new HttpLink({
      uri,
      // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
      // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
      // access token before sending the request.
      fetch: async (uri, options) => {
         const accessToken = await getValidAccessToken();
         options.headers.Authorization = `Bearer ${accessToken}`;
         return fetch(uri, options);
      },
   }),
   cache: new InMemoryCache(),
});
