import Head from "next/head";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { Question } from "../classes";
import axios from "axios";
import styles from "../styles/Quiz.module.scss";

export default function Quiz({ session }) {
   const [userAnswer, setUserAnswer] = useState(null);
   const [correctAnswer, setCorrectAnswer] = useState(null);
   const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
   const [options, setOptions] = useState([]);
   const [question, setQuestion] = useState(null);
   const [optionState, setOptionState] = useState(false);

   useEffect(() => {
      initialise();
   }, []);

   useEffect(() => {
      initialise();
      recordAnswer(userAnswer);
      // console.log(JSON.stringify(newQuestion.getCorrectAnswer()));
      // const tempStatement = neestion(tempQuestion2);
   }, [userAnswer]);

   // useEffect(() => {
   //    evaluateAnswer({ question });
   // }, [optionState]);

   return (
      <div className={styles.container}>
         <Head>
            <title>SMART Brain Training</title>
            <meta name="description" content="SMART Brain Training" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main className={styles.main}>
            {question && (
               <div className={styles.questionContainer}>
                  <p className={styles.questionContainer}>{question.getProblemStatement()}</p>
                  <p className={styles.questionContainer}>{question.getQuestion()}</p>
               </div>
            )}

            <div className={styles.answerButtonContainer}>
               {!!options &&
                  options.length !== 0 &&
                  options.map((Element) => {
                     return (
                        <button
                           key={Element}
                           className={styles[`answerButton${Element}`]}
                           onClick={() => {
                              recordAnswer(Element);
                           }}
                        >
                           {Element}
                        </button>
                     );
                  })}
            </div>
         </main>

         <Footer />
      </div>
   );

   function initialise() {
      const newQuestion = new Question({ numItems: 3, textLength: 3 });
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
         setOptionState(!optionState);
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
         const userId = session?.user?.userId ?? "";
         console.log(`callRecordAnswerAPI, ${JSON.stringify({ userId, answer, answerIsCorrect })}`);
         const result = await axios.post("http://localhost:3000/api/recordAnswer", { userId, answer, answerIsCorrect });
         console.log(JSON.stringify(result));
      } catch (error) {
         console.log(error);
      }
   }
}
