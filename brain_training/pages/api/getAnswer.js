import { client } from "../../apolloConfig";
import { gql } from "@apollo/client";

export default async function handler(req, res) {
   try {
      const { data } = await client.query({
         query: gql`
            query {
               response {
                  _id
                  answer
                  result
               }
            }
         `,
      });
      console.log(JSON.stringify(data));
      res.status(200).json(data);
   } catch (error) {
      console.log(error);
   }
}
