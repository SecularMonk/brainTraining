import Button from "./Button";
import ProgressBar from "./ProgressBar";
import { Quiz, Question as IQuestion, Answer } from "@/graphql/schema";

type QuestionParams = IQuestion & { setUserAnswer: (answer: Answer["userAnswer"]) => void; questionNumber: number };

// export default function Question() {
export default function Question({ problemStatement, question, options, availableAnswers, setUserAnswer, questionNumber }: QuestionParams) {
   console.log(`Question component params: ${JSON.stringify({ problemStatement, question, options, setUserAnswer, questionNumber })}`);
   return (
      <div className="card-body card flex justify-center self-center w-fit">
         <h2 className="card-title">{problemStatement}</h2>
         <p>{question}</p>
         <div className="card-actions justify-end">
            {availableAnswers &&
               availableAnswers.map((Element, index) => {
                  const intent = index === 1 ? "secondary" : "primary";
                  return (
                     <Button
                        onClick={() => {
                           setUserAnswer(Element);
                        }}
                        key={Element}
                        intent={intent}
                        fullWidth={true}
                     >
                        {Element}
                     </Button>
                  );
               })}
         </div>
      </div>
   );
}
