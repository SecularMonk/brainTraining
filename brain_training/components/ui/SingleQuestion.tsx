import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Question } from "../../interfaces/classes";
import axios from "axios";
import styles from "../../styles/Quiz.module.scss";
import QuestionContainer from "./Question";

export default function SingleQuestion({ quizId }: { quizId: Schema.Quiz["_id"] }) {
   const { data: session } = useSession();

   const [userAnswer, setUserAnswer] = useState(null);
   const [correctAnswer, setCorrectAnswer] = useState(null);
   const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
   const [options, setOptions] = useState([]);
   const [question, setQuestion] = useState(null);
   const [answerSubmitted, setAnswerSubmitted] = useState(false);
   const [questionData, setQuestionData] = useState(null);

   useEffect(() => {
      recordAnswer(userAnswer);
   }, [answerSubmitted]);

   useEffect(() => {
      initialise();
   }, [answerSubmitted]);

   return (
      <div className={styles.container}>
         <main className={styles.main}>
            {question && (
               <QuestionContainer
                  problemStatement={questionData.problemStatement}
                  question={questionData.question}
                  options={["Yes", "No"]}
                  // recordAnswer={recordAnswer}
                  answerSubmitted={answerSubmitted}
                  setUserAnswer={setUserAnswer}
                  setAnswerSubmitted={setAnswerSubmitted}
               ></QuestionContainer>
            )}
         </main>
      </div>
   );

   function initialise() {
      console.log("initialise");
      const newQuestion = new Question({ numItems: 3, textLength: 3 });
      newQuestion.initialise();
      setQuestionData(newQuestion.getQuizData());
      setQuestion(newQuestion);
      const options = newQuestion.getOptions();
      setOptions(options);
   }

   function recordAnswer(answer) {
      try {
         if (!answer) return;
         console.log(`recording answer ${answer}`);
         setUserAnswer(answer);
         evaluateAnswer({ question });
         callRecordAnswerAPI({ answer, session });
      } catch (error) {
         console.log(error);
      }
   }

   function evaluateAnswer({ question }) {
      try {
         console.log(JSON.stringify({ correctAnswer, answer: userAnswer, result: correctAnswer === userAnswer }));
         const correctAnswer = question.getCorrectAnswer();
         setCorrectAnswer(correctAnswer);
         const answerIsCorrect = correctAnswer === userAnswer ?? false;
         setAnswerIsCorrect(answerIsCorrect);
      } catch (error) {
         console.log(error);
      }
   }

   async function callRecordAnswerAPI({ answer, session }) {
      try {
         console.log(JSON.stringify({ session }));
         const userId = session?.user?.userId ?? "";
         console.log(JSON.stringify({ userId }));
         if (!userId) return;
         console.log(`callRecordAnswerAPI, ${JSON.stringify({ answer, answerIsCorrect })}`);
         const questionId = question.getUniqueId();
         const result = await axios.post("http://localhost:3000/api/recordAnswer", { questionId, quizId, answer, answerIsCorrect });
         console.log(JSON.stringify(result));
      } catch (error) {
         console.log(error);
      }
   }
}
