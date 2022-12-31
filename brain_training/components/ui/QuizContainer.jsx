import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Quiz } from "../../classes";
import Question from "./Question";
import QuizOptions from "./QuizOptions";
import QuizCompleted from "./QuizCompleted";
import { recordMultipleAnswers, recordSingleQuizResult } from "../../graphql/mutations";

export default function QuizContainer({ difficulty = "normal" }) {
   const { data: session } = useSession();

   const [selected, setSelected] = useState("Normal");
   const [thisQuiz, setThisQuiz] = useState(null);
   const [quizId, setQuizId] = useState(null);
   const [questionNumber, setQuestionNumber] = useState(1);
   const [question, setQuestion] = useState(null);
   const [answers, setAnswers] = useState([]);
   const [quizComplete, setQuizComplete] = useState(false);
   const [started, setStarted] = useState(false);
   const [quizResult, setQuizResult] = useState({});
   const [restarted, restart] = useState(false);
   const [numQuestions, setNumQuestions] = useState(10);

   useEffect(() => {
      initialise();
      setStarted(false);
      setQuizComplete(false);
      setQuestionNumber(1);
      console.log(`setting quizResult empty`);
      setQuizResult({});
   }, [restarted]);

   useEffect(() => {
      getNextQuestion();
      evaluateQuizCompleteness();
   }, [questionNumber]);

   useEffect(() => {
      evaluateQuizResult();
      if (quizComplete === true) {
         recordResult();
      }
   }, [quizComplete]);

   useEffect(() => {
      if (thisQuiz) {
         thisQuiz.setDifficulty(selected);
         setThisQuiz(thisQuiz);
         const newNumQuestions = thisQuiz.getNumQuestions();
         setNumQuestions(newNumQuestions);
      }
   }, [selected]);

   useEffect(() => {
      console.log("useEffect ran");
      console.log(answers);
   }, [answers]);

   return (
      <div className="container mx-auto bg-black h-96 p-6 flex items-center justify-center content-center">
         <div className="card flex justify-center h-80 self-center w-96 bg-base-100 shadow-xl">
            {started === false && <QuizOptions selected={selected} setSelected={setSelected} setStarted={setStarted} numQuestions={numQuestions} />}
            {started === true && quizComplete === false && (
               <Question quizId={quizId} questionNumber={questionNumber} numQuestions={numQuestions} {...question} setUserAnswer={setUserAnswer} />
            )}
            {started === true && quizComplete === true && <QuizCompleted {...quizResult} restart={restart} restarted={restarted} />}
         </div>
      </div>
   );

   function initialise() {
      const newQuiz = new Quiz({ difficulty: "normal" });
      console.log(JSON.stringify({ newQuiz }));
      setThisQuiz(newQuiz);
      const quizId = newQuiz.getUniqueId();
      setQuizId(quizId);
      const nextQuestion = newQuiz.getNextQuestion();
      nextQuestion.initialiseQuestion();
      setQuestion(nextQuestion);
   }

   function getNextQuestion() {
      if (thisQuiz) {
         const nextQuestion = thisQuiz.getNextQuestion();
         nextQuestion.initialiseQuestion();
         setQuestion(nextQuestion);
      }
   }

   function setUserAnswer(answer) {
      const questionId = question.getUniqueId();
      const tempAnswers = answers.slice();
      const correctAnswer = question.getCorrectAnswer();
      console.log(JSON.stringify({ correctAnswer }));
      const correct = correctAnswer === answer;
      const userId = session?.user?.userId ?? "";
      const tempAnswer = { userId, questionId, problemStatement: question.problemStatement, question: question.question, answer, correct };
      tempAnswers.push(tempAnswer);
      setQuestionNumber(questionNumber + 1);
      console.log(JSON.stringify({ questionNumber, questionId, answer, correct }));
      setAnswers([...answers, tempAnswer]);
      console.log(JSON.stringify("answers: ", answers));
   }

   function evaluateQuizCompleteness() {
      if (questionNumber > numQuestions && Object.keys(quizResult).length > 0) {
         setQuizComplete(true);
      }
   }

   async function evaluateQuizResult() {
      let correctAnswers = 0,
         totalAnswers = 0;
      console.log(`answers in evaluateQuizResult: ${JSON.stringify(answers)}`);
      for (let i = 0, n = answers.length; i < n; i++) {
         totalAnswers += 1;
         if (answers[i].correct === true) {
            correctAnswers += 1;
         }
      }
      const userId = session?.user?.userId ?? "";
      const quizResult = { correctAnswers, totalAnswers, quizId, userId };
      console.log(`setting quiz result`);
      setQuizResult(quizResult);
      await recordSingleQuizResult({ quizResult });
      console.log(`quizResult now: ${JSON.stringify(quizResult)}`);
   }

   async function recordResult() {
      try {
         await recordMultipleAnswers({ answers });
         console.log("inside recordResult", JSON.stringify(quizResult));
      } catch (error) {
         console.log(error);
      }
   }
}
