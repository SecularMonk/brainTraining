import { client } from "../../graphql/apolloConfig";
import { GET_RANDOM_ICONS, GET_RANDOM_ICONS_INPUT } from "../../graphql/schema";

export default async function handler(req: any, res: any) {
   try {
      const numIcons: number = req.body.numIcons;
      const data = await getRandomIcons({ numIcons });
      // console.log(JSON.stringify(data));
      res.status(200).json(data);
   } catch (error) {
      console.log(error);
   }
}

// export async function getRandomIcons(input) {
export async function getRandomIcons(input: GET_RANDOM_ICONS_INPUT) {
   try {
      console.log(`getRandomIcons input: ${JSON.stringify(input)}`);
      const query = { query: GET_RANDOM_ICONS, variables: { query: input } };
      const { data } = await client.query(query);
      // console.log("response received: ", !!data);
      return data;
   } catch (error) {
      console.log(error);
   }
}
