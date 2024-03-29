import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import Question from "./Question";
import QuizOptions from "./QuizOptions";
import QuizCompleted from "./QuizCompleted";
import { Question as IQuestion } from "../../graphql/schema";
import { GET_QUIZ, Quiz, SUBMIT_ANSWER, Answer } from "../../graphql/schema";
import ProgressBar from "./ProgressBar";

type UserAnswer = { _id: string; answer: Answer["userAnswer"] };

export default function QuizContainer() {
   const { data: session } = useSession();

   const [selectedDifficulty, setSelectedDifficulty] = useState("Normal");
   const [quizComplete, setQuizComplete] = useState(false);
   const [started, setStarted] = useState(false);
   const [numAttempts, setNumAttempts] = useState(1);
   const [currentQuestion, setCurrentQuestion] = useState<IQuestion>();
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
   const [progress, setProgress] = useState(0);
   const [getQuiz, { data: queryData, error: queryError, loading: queryLoading }] = useLazyQuery<{ getQuiz: Quiz }>(GET_QUIZ);
   const [submitAnswer] = useMutation(SUBMIT_ANSWER, { variables: {} });

   if (queryError) console.error(queryError);

   useEffect(() => {
      if (queryData?.getQuiz?.questions) {
         const nextQuestion = queryData.getQuiz.questions?.[currentQuestionIndex];
         setCurrentQuestion(nextQuestion);
         setProgress(calculateProgress());
      }
   }, [queryData]);

   useEffect(() => {
      setCurrentQuestion(queryData?.getQuiz?.questions?.[currentQuestionIndex]);
      setProgress(calculateProgress());
   }, [currentQuestionIndex]);

   useEffect(() => {
      if (progress === 1) {
         setQuizComplete(true);
         getQuiz({ variables: { input: { userId: "testUser1", difficulty: selectedDifficulty, _id: queryData?.getQuiz?._id } }, pollInterval: 1000 });
      }
   }, [progress]);

   useEffect(() => {
      getQuiz({ variables: { input: { userId: "testUser1", difficulty: selectedDifficulty } } });
   }, [selectedDifficulty]);

   function restart() {
      setStarted(false);
      setQuizComplete(false);
      setCurrentQuestionIndex(0);
      setNumAttempts(numAttempts + 1);
   }

   function changeQuestionIndex(direction: "forward" | "backward") {
      if (!direction) return;
      switch (direction) {
         case "forward": {
            if (queryData?.getQuiz?.questions?.length && currentQuestionIndex === queryData.getQuiz.questions.length) return;
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            break;
         }
         case "backward": {
            if (currentQuestionIndex === 0) return;
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            break;
         }
         default: {
            return;
         }
      }
   }

   function calculateProgress(): number {
      if (!queryData?.getQuiz?.questions) return 0;
      let progress = Number(currentQuestionIndex / queryData.getQuiz.questions.length);
      console.log(`calculateProgress, currentQuestionIndex: ${currentQuestionIndex}, totalQuestions: ${queryData?.getQuiz?.questions?.length}`);
      if (progress === undefined || isNaN(progress)) progress = 0;
      return progress;
   }

   async function answerQuestion(answer: Answer["userAnswer"]) {
      let currentAnswer = userAnswers?.[currentQuestionIndex];
      if (currentAnswer) {
         currentAnswer["answer"] = answer;
      } else {
         currentAnswer = { _id: crypto.randomUUID(), answer };
      }
      userAnswers[currentQuestionIndex] = currentAnswer;
      setUserAnswers([...userAnswers]);
      const variables = {
         answer: {
            answerId: currentAnswer._id,
            userId: "testUser1",
            questionId: queryData?.getQuiz?.questions?.[currentQuestionIndex]?._id ?? "random",
            quizId: queryData?.getQuiz?._id,
            userAnswer: answer,
         },
      };
      submitAnswer({ variables });
      changeQuestionIndex("forward");
   }

   return (
      <div className="mx-auto max-w-full bg-transparent h-2/3 p-6 flex items-center justify-center content-center">
         <div className="card flex justify-center self-center max-w-fit shadow-xl container min-w-full mx-auto bg-gray-800 h-96 p-6 items-center content-center">
            {queryLoading && !currentQuestion && <p>Loading...</p>}
            {queryError && (
               <div>
                  <p>Error :(</p>
               </div>
            )}
            {currentQuestion && started === false && (
               <QuizOptions
                  selected={selectedDifficulty}
                  setSelected={setSelectedDifficulty}
                  setStarted={setStarted}
                  numQuestions={queryData?.getQuiz?.questions?.length}
               />
            )}
            {currentQuestion && started === true && <Question questionNumber={currentQuestionIndex} {...currentQuestion} setUserAnswer={answerQuestion} />}
            {quizComplete === true && queryData && <QuizCompleted quiz={queryData?.getQuiz} restart={restart} />}
            {queryLoading === false && started === true && <ProgressBar intent="primary" value={progress} max={1} />}
         </div>
      </div>
   );
}
