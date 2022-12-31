import { client } from "../apolloConfig";
import { GET_RANDOM_ICONS, GET_RANDOM_ICONS_INPUT } from "./schema";

// export async function getRandomIcons(input) {
export async function getRandomIcons(input: GET_RANDOM_ICONS_INPUT) {
   try {
      console.log(`getRandomIcons input: ${JSON.stringify(input)}`);
      const query = { query: GET_RANDOM_ICONS, variables: { query: input } };
      console.log(JSON.stringify(query));
      const { data } = await client.query(query);
      return data;
   } catch (error) {
      console.log(error);
   }
}
