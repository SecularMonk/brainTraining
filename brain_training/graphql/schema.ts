import { gql } from "@apollo/client";

export const INSERT_MANY_ANSWERS = gql`
   mutation insertManyAnswers($answers: [AnswerInsertInput!]!) {
      insertManyAnswers(data: $answers) {
         __typename
      }
   }
`;

export const INSERT_ONE_QUIZ_RESULT = gql`
   mutation insertOneQuizResult($quizResult: QuizResultInsertInput!) {
      insertOneQuizResult(data: $quizResult) {
         _id
      }
   }
`;

export const GET_RANDOM_ICONS = gql`
   query getRandomIcons($query: GetRandomIconsInput) {
      getRandomIcons(input: $query) {
         base64
      }
   }
`;

export type ANSWER_INSERT_INPUT = {
   answers: object[];
};

export type QUIZ_RESULT_INSERT_INPUT = {
   quizResult: object[];
};

export type GET_RANDOM_ICONS_INPUT = {
   input: object;
};
