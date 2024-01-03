import { Quiz } from "@/graphql/schema";
import Button from "./Button";
import RewardDisplay from "./RewardDisplay";
import { useState, useEffect } from "react";

type QuizCompletedParams = { quiz: Quiz; restart: () => void };

export default function QuizCompleted({ quiz, restart }: QuizCompletedParams) {
   const [quizStats, setQuizStats] = useState(getQuizStats(quiz));

   useEffect(() => {
      setQuizStats(getQuizStats(quiz));
   }, [quiz]);

   return (
      <div className="card-body card flex justify-center self-center w-2/3">
         <h2 className="card-title justify-center self-center">Completed!</h2>
         {quizStats?.correctAnswers && quizStats.totalQuestions && (
            <p className="justify-center self-center">
               You scored {quizStats.correctAnswers} out of {quizStats.totalQuestions}.
            </p>
         )}
         {quiz?.rewards && quizStats?.rewardSums && <RewardDisplay intent="primary" rewards={quizStats?.rewardSums} />}

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

   const rewardSums = {};
   if (quiz?.rewards?.length !== undefined && quiz?.rewards?.length > 0) {
      for (let i = 0, n = quiz.rewards.length; i < n; i++) {
         const { rewardType, rewardAmount } = quiz.rewards[i] ?? {};
         if (!rewardType || !rewardAmount) continue;
         if (rewardSums?.[rewardType]) {
            rewardSums[rewardType] += rewardAmount;
         } else {
            rewardSums[rewardType] = rewardAmount;
         }
      }
   }
   return { totalQuestions, totalAnswers, correctAnswers, rewardSums };
}
