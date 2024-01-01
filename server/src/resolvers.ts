import { MutationResolvers, QueryResolvers, UserResolvers } from "./__generated__/resolvers-types";
import { dataSources } from "./index.ts";
import { generateNewUserQuiz } from "./quizzes/generateQuiz.ts";
import { logger } from "./logger.ts";

export const queryResolvers: QueryResolvers<{ dataSources: typeof dataSources }> = {
   getQuiz: async (_, { userId }, { dataSources }) => {
      return dataSources.Quizzes.findOne({ userId }, { sort: { createdAt: -1 }, projection: { "questions.correctAnswer": false } });
   },
   getUser: async (_, { userId }, { dataSources }) => {
      return dataSources.Users.findOne({ userId });
   },
   engagements: async (getUser, { userId }, { dataSources }) => {
      return dataSources.Engagements.findOne({ userId });
   },
   matchWords: async (_, { word }, { dataSources }) => {
      return dataSources.AllowedStrings.find({ word }).toArray();
   },
};

export const userResolvers: UserResolvers<{ dataSources: typeof dataSources }> = {
   engagements: async (user, __, { dataSources }) => {
      console.log("fetching engagements...");
      return dataSources.Engagements.findOne({ userId: user._id });
   },
};

export const mutationResolvers: MutationResolvers<{ dataSources: typeof dataSources }> = {
   createQuiz: async (_, { input }, { dataSources }) => {
      const { userId, difficulty } = input ?? {};
      await generateNewUserQuiz({ userId, quizzesDataSource: dataSources.Quizzes, dictionaryDataSource: dataSources.AllowedStrings, difficulty });
      return dataSources.Quizzes.findOne({ userId }, { sort: { createdAt: -1 }, projection: { "questions.correctAnswer": false } });
   },
   submitAnswer: async (_, { answer }, { dataSources }) => {
      return await dataSources.Answers.insertOne({ ...answer, createdAt: new Date() });
   },
};
