// declare global {
// namespace Schema {
type UUID = string;
type IQuestionType = "multipleChoice" | "singleChoice";

interface IDifficulty {
   1: "easy";
   2: "normal";
   3: "hard";
}
type IAvailableDifficulties = keyof Difficulty;

interface IUser {
   _id: UUID;
}

interface IQuestion {
   _id: UUID;
   prompt: string;
   type: QuestionType;
   possibleAnswers: Answer[];
   correctAnswer: Answer["_id"];
}

interface IAnswer {
   _id: UUID;
   questionId: Question["_id"];
   quizId: Quiz["_id"];
   isCorrect: boolean;
}

interface IUserAnswer extends Answer {
   userId: User["_id"];
   answeredCorrectly: boolean;
}

export interface IQuiz {
   _id: UUID;
   questions: Question[];
   complete: boolean;
}
// }
// }
