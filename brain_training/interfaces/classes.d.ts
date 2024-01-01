export {};

export type UUID = string;
type QuestionType = "multipleChoice" | "singleChoice";

interface User {
   _id: UUID;
}

interface Question {
   _id: UUID;
   prompt: string;
   type: QuestionType;
   possibleAnswers: Answer[];
   correctAnswer: Answer["_id"];
}

interface Answer {
   _id: UUID;
   questionId: Question["_id"];
   quizId: Quiz["_id"];
   isCorrect: boolean;
}

interface UserAnswer extends Answer {
   userId: User["_id"];
   answeredCorrectly: boolean;
}

export interface Quiz {
   _id: UUID;
   questions: Question[];
   complete: boolean;
   currentQuestion: number;
}

export type Difficulty = "easy" | "medium" | "hard";
