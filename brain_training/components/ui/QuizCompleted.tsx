import { Quiz } from "@/graphql/schema";
import Button from "./Button";
import { useState } from "react";

type QuizCompletedParams = { quiz: Quiz; restart: () => void };

export default function QuizCompleted({ quiz, restart }: QuizCompletedParams) {
   const [quizStats] = useState(getQuizStats(quiz));
   return (
      <div className="card-body card flex justify-center self-center w-fit min-w-full">
         <h2 className="card-title">Completed!</h2>
         {quizStats?.correctAnswers && quizStats.totalQuestions && (
            <p>
               You scored {quizStats.correctAnswers} out of {quizStats.totalQuestions}.
            </p>
         )}

         <Button intent="primary">Continue</Button>
         <Button
            intent="secondary"
            onClick={() => {
               restart();
            }}
         >
            Try again
         </Button>
      </div>
   );
}

function getQuizStats(quiz: Quiz) {
   if (!quiz.questions) return;
   let totalQuestions = quiz?.questions?.length ?? 0;
   let correctAnswers = 0,
      totalAnswers = 0;
   for (let i = 0, n = quiz.questions?.length ?? 0; i < n; i++) {
      if (quiz.questions[i].answered === true) totalAnswers++;
      if (quiz.questions[i].correct === true) correctAnswers++;
   }
   return { totalQuestions, totalAnswers, correctAnswers };
}
