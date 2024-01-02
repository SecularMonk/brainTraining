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

export const GET_QUIZ = gql`
   query GetQuiz($input: CreateQuizInput) {
      getQuiz(input: $input) {
         _id
         userId
         questions {
            _id
            quizId
            options
            problemStatement
            question
            correctAnswer
            availableAnswers
            userAnswer
            correct
            answered
         }
         score
         createdAt
         complete
         difficulty
         rewards {
            _id
            rewardType
            rewardAmount
         }
      }
   }
`;

export const SUBMIT_ANSWER = gql`
   mutation SubmitAnswer($answer: AnswerInput) {
      submitAnswer(answer: $answer)
   }
`;

export const GET_USER = gql`
   query GetUser($userId: String!) {
      getUser(userId: $userId) {
         _id
         username
         engagements {
            totalQuizzes
            totalQuestions
            totalAnswers
            correctAnswer
            quizComplete
            numActiveDays
            streakLength
            lastActiveDay
         }
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
   numIcons: number;
};

export type Quiz = {
   _id: string;
   createdAt: Date;
   questions?: Question[];
   score?: number;
   userId: string;
};

export type Question = {
   _id: string;
   availableAnswers: string[];
   correct?: boolean;
   answered?: boolean;
   userAnswer: Answer["userAnswer"];
   correctAnswer: string;
   options: string[];
   problemStatement: string[];
   question: string;
   quizId: Quiz["_id"];
};

export type Answer = {
   answerId: string;
   userAnswer: string;
   correct?: boolean;
   questionId: Question["_id"];
   quizId: Quiz["_id"];
   userId: string;
};

export type User = {
   _id?: string;
   engagements?: Engagements;
   username?: string;
};

export type Engagements = {
   correctAnswer?: number;
   lastActiveDay?: Date;
   numActiveDays?: number;
   quizComplete?: number;
   streakLength?: number;
   totalAnswers?: number;
   totalQuestions?: number;
   totalQuizzes?: number;
};
