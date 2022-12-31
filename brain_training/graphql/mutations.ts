import { client } from "../apolloConfig";
import { INSERT_MANY_ANSWERS, ANSWER_INSERT_INPUT, INSERT_ONE_QUIZ_RESULT, QUIZ_RESULT_INSERT_INPUT } from "./schema";

export async function recordMultipleAnswers(answers: ANSWER_INSERT_INPUT) {
   try {
      const { data } = await client.mutate({ mutation: INSERT_MANY_ANSWERS, variables: answers });
      return data;
   } catch (error) {
      console.log(error);
   }
}

export async function recordSingleQuizResult(quizResult: QUIZ_RESULT_INSERT_INPUT) {
   try {
      console.log(`recordSingleQuizResult: ${JSON.stringify(quizResult)}`);
      const { data } = await client.mutate({ mutation: INSERT_ONE_QUIZ_RESULT, variables: quizResult });
   } catch (error) {
      console.log(error);
   }
}
