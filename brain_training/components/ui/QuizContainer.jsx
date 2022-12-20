import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Quiz } from "../../classes";
import Question from "./Question";
import QuizOptions from "./QuizOptions";
import QuizCompleted from "./QuizCompleted";

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

   // useEffect(() => {
   //    initialise();
   // }, []);

   useEffect(() => {
      initialise();
      setStarted(false);
      setQuizComplete(false);
      setQuestionNumber(1);
      setQuizResult({});
   }, [restarted]);

   useEffect(() => {
      getNextQuestion();
      evaluateQuizCompleteness();
   }, [questionNumber]);

   useEffect(() => {
      evaluateQuizResult();
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
      console.log(`questionId: ${questionId}`);
      const tempAnswers = answers.slice();
      const correctAnswer = question.getCorrectAnswer();
      console.log(JSON.stringify({ correctAnswer }));
      const correct = correctAnswer === answer;
      const tempAnswer = { questionId, question, answer, correct };
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

   function evaluateQuizResult() {
      let correctAnswers = 0,
         totalAnswers = 0;
      console.log(`answers in evaluateQuizResult: ${JSON.stringify(answers)}`);
      for (let i = 0, n = answers.length; i < n; i++) {
         totalAnswers += 1;
         console.log(typeof answers[i].correct);
         if (answers[i].correct === true) {
            correctAnswers += 1;
         }
      }
      const quizResult = { correctAnswers, totalAnswers, quizId };
      console.log(JSON.stringify({ quizResult }));
      setQuizResult({ ...quizResult });
   }

   async function recordAnswers() {
      try {
         for (let i = 0, n = answers.length; i < n; i++) {
            const answer = answers[i];
            callRecordAnswerAPI({ ...answer });
         }
      } catch (error) {
         console.log(error);
      }
   }

   async function callRecordAnswerAPI({ questionId, question, answer, correct, session }) {
      try {
         console.log(JSON.stringify({ session }));
         const userId = session?.user?.userId ?? "";
         console.log(JSON.stringify({ userId }));
         if (!userId) return;
         // console.log(`callRecordAnswerAPI, ${JSON.stringify({ answer, answerIsCorrect })}`);
         const result = await axios.post("http://localhost:3000/api/recordAnswer", { questionId, quizId, answer, answerIsCorrect: correct });
         console.log(JSON.stringify(result));
      } catch (error) {
         console.log(error);
      }
   }
}
