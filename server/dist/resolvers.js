import { dataSources } from "./index.js";
// import { Users } from "./users";
export const queryResolvers = {
    getUser: (_, { userId }, { Users }) => {
        return dataSources.Users.getUser(userId);
    },
    getAnything: (_, __, { Icons }) => {
        return dataSources.Icons.getAnything();
    },
};
export const mutationResolvers = {
    addAnswer: (_, {}, __) => {
        return { userId: "test", questionId: "string", correct: false };
    },
    getQuiz: (_, { userId }, {}) => {
        console.log("getQuiz ran, userId: ", userId, "dataSources: ", dataSources);
        return dataSources.Quizzes.findByFields({ userId });
    },
};
