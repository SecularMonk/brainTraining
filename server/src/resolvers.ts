import { MutationResolvers, QueryResolvers, UserResolvers } from "./__generated__/resolvers-types";
import { dataSources } from "./index.ts";
import { generateNewUserQuiz } from "./quizzes/generateQuiz.ts";
import { logger } from "./logger.ts";

export const queryResolvers: QueryResolvers<{ dataSources: typeof dataSources }> = {
   getQuiz: async (_, { input }, { dataSources }) => {
      const date = new Date();
      const { _id, userId, difficulty } = input;
      const cutoffTime = new Date(date.setTime(date.getTime() - 10000));
      const query = {
         userId,
         difficulty,
         ...(_id && { _id }),
         ...(!_id && {
            complete: { $ne: true },
            createdAt: { $gte: cutoffTime },
         }),
      };
      console.log("query: ", query);
      const result = await dataSources.Quizzes.find(query, { sort: { createdAt: -1 }, projection: { "questions.correctAnswer": false }, limit: 1 }).toArray();
      switch (typeof result?.[0]?._id) {
         case "string": {
            console.log("string case, result: ", JSON.stringify(result));
            return result?.[0];
         }
         default: {
            console.log("default case");
            return await generateNewUserQuiz({
               userId,
               difficulty,
               dictionaryDataSource: dataSources.AllowedStrings,
               quizzesDataSource: dataSources.Quizzes,
            });
         }
      }
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
      await generateNewUserQuiz({ userId, difficulty, quizzesDataSource: dataSources.Quizzes, dictionaryDataSource: dataSources.AllowedStrings });
      return dataSources.Quizzes.findOne({ userId }, { sort: { createdAt: -1 }, projection: { "questions.correctAnswer": false } });
   },
   submitAnswer: async (_, { answer }, { dataSources }) => {
      return await dataSources.Answers.insertOne({ ...answer, createdAt: new Date() });
   },
};
