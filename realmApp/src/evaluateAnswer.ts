//@ts-ignore
exports = async function (arg: any) {
   const SERVICE_NAME = "Main";
   const DB_NAME = "live";

   // Get a collection from the context
   const collections = {
      quizzes: context.services.get(SERVICE_NAME).db(DB_NAME).collection("quizzes"),
      answers: context.services.get(SERVICE_NAME).db(DB_NAME).collection("answers"),
      events: context.services.get(SERVICE_NAME).db(DB_NAME).collection("events"),
   };

   const { _id, answerId, userId, questionId, quizId, userAnswer } = arg?.fullDocument ?? {};
   // console.log("values in function: ", _id, userId, quizId);

   const quiz = await collections.quizzes.findOne({ userId, _id: quizId });
   if (!quiz) {
      console.log(`No quiz matching _id ${quizId} found.`);
      return;
   }

   const matchingQuestion = quiz?.questions?.find((element: any) => element._id === questionId);
   if (!matchingQuestion) {
      console.log(`No question matching _id ${questionId} found.`);
      return;
   }

   const isCorrect = userAnswer === matchingQuestion?.correctAnswer;
   if (isCorrect === true) {
      createUserEvent("correctAnswer", { quizId, questionId, answerId });
   }
   console.log(`userAnswer: ${userAnswer}, matchingQuestion.correctAnswer: ${matchingQuestion.correctAnswer}, isCorrect: ${isCorrect}`);

   const updateResult = await collections.answers.updateOne({ _id }, { $set: { userAnswer, correct: isCorrect, answered: true } });
   if (updateResult?.acknowledged === true && updateResult?.matchedCount > 0 && updateResult?.modifiedCount === 0) {
      console.log("This answer has already been submitted.");
      return;
   }

   const totalQuestions = quiz?.questions.length;
   let totalCorrect = isCorrect === true ? 1 : 0,
      numAnswered = 1;

   const questions = quiz?.questions;
   for (let i = 0, n = questions?.length ?? 0; i < n; i++) {
      if (questions[i]?._id === questionId) continue;
      if (questions[i]?.correct === true) totalCorrect += 1;
      if (questions[i]?.answered === true) numAnswered += 1;
   }
   let percentageScore = Number((totalCorrect / totalQuestions).toFixed(2)) ?? 0;
   if (isNaN(percentageScore)) percentageScore = 0;
   const complete = numAnswered >= totalQuestions ? true : false;
   if (complete === true) {
      createUserEvent("quizComplete", { quizId });
   }

   await collections.quizzes.updateOne(
      {
         _id: quizId,
         userId,
         "questions._id": questionId,
      },
      {
         $set: {
            score: percentageScore,
            "questions.$.correct": isCorrect,
            "questions.$.answered": true,
            "questions.$.userAnswer": userAnswer,
            complete,
         },
      }
   );

   async function createUserEvent(event: any, data: any) {
      if (!event) return;
      const newEvent = {
         userId,
         event,
         ...data,
      };
      return collections.events.updateOne(newEvent, { $setOnInsert: { createdAt: new Date() } }, { upsert: true });
   }
};
