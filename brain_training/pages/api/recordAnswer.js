import { client } from "../../apolloConfig";
import { gql } from "@apollo/client";
import { useSession } from "next-auth/react";

export default async function handler(req, res) {
   try {
      const { data: session } = useSession();

      if (!session || !session.user.userId) {
         res.statusCode = 403;
         res.setHeader("Content-Type", "application/json");
         res.end();
      }
      const payload = {
         ...(req?.body?.userId && { userId: session.user }),
         ...(req?.body?.questionId && { questionId: req?.body?.questionId }),
         ...(req?.body?.quizId && { quizId: req?.body?.quizId }),
         ...(req?.body?.answer && { answer: req?.body?.answer }),
         ...(req?.body?.answerIsCorrect && { answerIsCorrect: req?.body?.answerIsCorrect }),
      };
      console.log(`req.body: ${Object.keys(req.body)}`);
      console.log(JSON.stringify({ payload }));
      const { data } = await client.mutate({
         variables: { answer: "No" },
         mutation: gql`
            mutation {
               insertOneResponse(data: {
                  userId: "${payload.userId}", questionId: "${payload.questionId}" answer: "${payload.answer}", answerIsCorrect: ${!!payload.answerIsCorrect} 
               }) {
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
      res.statusCode = 404;
      res.json(error);
      res.status(405).end();
   }
}
