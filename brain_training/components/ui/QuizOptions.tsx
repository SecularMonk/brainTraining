import { useState } from "react";
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import { cva } from "class-variance-authority";
import { QuizOptionsParameters, DifficultyOptions } from "../../interfaces/QuizOptions";

const buttonGroupStyles = cva("btn text-white flex w-fit hover:bg-gray-600", {
   variants: {
      intent: {
         active: "bg-green-500 hover:bg-green-600",
         inactive: "bg-gray-500",
      },
   },
});

export default function QuizOptions({ selected, setSelected, setStarted, numQuestions }: QuizOptionsParameters) {
   const options: DifficultyOptions[] = [{ text: "Easy" }, { text: "Normal" }, { text: "Hard" }];
   return (
      // <div className="card-body card flex justify-center self-center w-fit">
      <div className="card-body flex justify-center self-center min-w-fit w-2/3">
         <h2 className="card-title flex justify-center self-center w-fit">Choose your difficulty.</h2>
         <div className="btn-group flex justify-center btn-block">{renderOptions(options)}</div>
         {(numQuestions && <p className="flex justify-center self-center">Contains {numQuestions} questions.</p>) ?? (
            <p className="flex justify-center self-center">Loading...</p>
         )}
         <Button
            key="start"
            intent="cta"
            onClick={() => {
               setStarted(true);
            }}
         >
            Start!
         </Button>
      </div>
   );

   function renderOptions(options: any[]) {
      return (
         options &&
         options.map((element, index) => {
            const intent = element.text === selected ? "active" : "inactive";
            return (
               <Button
                  key={`quiz-options-${index}`}
                  fullWidth={true}
                  className={buttonGroupStyles({ intent })}
                  onClick={() => {
                     setSelected(element.text);
                  }}
               >
                  {element.text}
               </Button>
            );
         })
      );
   }
}
