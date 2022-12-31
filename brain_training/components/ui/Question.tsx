import Button from "./Button";
import ProgressBar from "./ProgressBar";

// export default function Question() {
export default function Question({ problemStatement, question, options, setUserAnswer, answerSubmitted, setAnswerSubmitted, questionNumber, numQuestions }) {
   let progress = Number(((questionNumber / numQuestions) * 100).toFixed(0));
   if (isNaN(progress)) progress = 0;
   return (
      <div className="card-body">
         <h2 className="card-title">{problemStatement}</h2>
         <p>{question}</p>
         <div className="card-actions justify-end">
            {options &&
               options.map((Element) => {
                  const intent = Element === "Yes" ? "primary" : "secondary";
                  return (
                     <Button
                        onClick={() => {
                           setUserAnswer(Element);
                           if (setAnswerSubmitted) setAnswerSubmitted(!answerSubmitted);
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
         <ProgressBar intent="primary" value={progress} />
      </div>
   );
}
