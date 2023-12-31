import Button from "./Button";
import ProgressBar from "./ProgressBar";
import { Quiz, Question as IQuestion, Answer } from "@/graphql/schema";

type QuestionParams = IQuestion & { setUserAnswer: (answer: Answer["userAnswer"]) => void; questionNumber: number };

// export default function Question() {
export default function Question({ problemStatement, question, options, availableAnswers, setUserAnswer, questionNumber }: QuestionParams) {
   console.log(`Question component params: ${JSON.stringify({ problemStatement, question, options, setUserAnswer, questionNumber })}`);
   return (
      <div className="card-body card flex justify-center self-center w-2/3">
         {problemStatement?.length > 0 && problemStatement.map((element) => <p className="justify-center self-center">{element}</p>)}
         <p className="justify-center self-center font-bold font-large">{question}</p>
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
