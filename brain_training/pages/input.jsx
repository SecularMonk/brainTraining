import Head from "next/head";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { Question, Answer } from "../classes";
import styles from "../styles/Home.module.css";

export default function Home() {
   const [answer, setAnswer] = useState(null);
   const [correctAnswer, setCorrectAnswer] = useState(null);
   const [options, setOptions] = useState([]);
   const [question, setQuestion] = useState(null);
   const [optionState, setOptionState] = useState(false);

   useEffect(() => {
      const newQuestion = new Question({ numItems: 3, textLength: 3 });
      setQuestion(newQuestion);
      const options = newQuestion.getOptions();
      setOptions(options);
      // const tempStatement = neestion(tempQuestion2);
   }, [answer]);

   useEffect(() => {
      evaluateAnswer();
   }, [optionState]);

   return (
      <div className={styles.container}>
         <Head>
            <title>SMART Brain Training</title>
            <meta name="description" content="SMART Brain Training" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main className={styles.main}>
            {question && (
               <div>
                  <p>{question.getProblemStatement()}</p>
                  <p>{question.getQuestion()}</p>
               </div>
            )}

            {!!options &&
               options.length !== 0 &&
               options.map((Element) => {
                  return (
                     <button
                        key={Element}
                        onClick={() => {
                           recordAnswer(Element);
                        }}
                     >
                        {Element}
                     </button>
                  );
               })}
         </main>

         <Footer />
      </div>
   );

   function recordAnswer(answer) {
      try {
         console.log(`recording answer ${answer}`);
         setAnswer(answer);
         setOptionState(!optionState);
      } catch (error) {
         console.log(error);
      }
   }

   function evaluateAnswer() {
      try {
         console.log(JSON.stringify({ correctAnswer, answer, result: correctAnswer === answer }));
         return correctAnswer === answer;
      } catch (error) {
         console.log(error);
      }
   }
}
