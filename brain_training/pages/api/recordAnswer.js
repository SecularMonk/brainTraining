import { client } from "../../apolloConfig";
import { gql } from "@apollo/client";

export default async function handler(req, res) {
   try {
      const payload = {
         ...(req?.body?.result && { result: req?.body?.result }),
         ...(req?.body?.answer && { answer: req?.body?.answer }),
         ...(req?.body?.answerIsCorrect && { answerIsCorrect: req?.body?.answerIsCorrect }),
      };
      console.log(`req.body: ${Object.keys(req.body)}`);
      console.log(JSON.stringify({ payload }));
      const { data } = await client.mutate({
         variables: { answer: "No" },
         mutation: gql`
            mutation {
               insertOneResponse(data: { answer: "${payload.answer}", answerIsCorrect: ${!!payload.answerIsCorrect} }) {
                  _id
               }
            }
         `,
      });
      console.log(data);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
   } catch (error) {
      console.log(error);
      res.json(error);
      res.status(405).end();
   }
}
