import { useState } from "react";
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import { cva } from "class-variance-authority";
import { QuizOptionsParameters, DifficultyOptions } from "../../interfaces/QuizOptions";

const buttonGroupStyles = cva("btn text-white", {
   variants: {
      intent: {
         active: "bg-cyan-500",
         inactive: "",
      },
   },
});

export default function QuizOptions({ selected, setSelected, setStarted, numQuestions }: QuizOptionsParameters) {
   const options: DifficultyOptions[] = [{ text: "Easy" }, { text: "Normal" }, { text: "Hard" }];
   return (
      <div className="card-body">
         <h2 className="card-title">Choose your difficulty.</h2>
         <div className="btn-group justify-center btn-block">{renderOptions(options)}</div>
         <p>Contains {numQuestions} questions.</p>
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
         options.map((Element) => {
            const intent = Element.text === selected ? "active" : "inactive";
            return (
               <Button
                  key={Element.text}
                  fullWidth={true}
                  className={buttonGroupStyles({ intent })}
                  onClick={() => {
                     setSelected(Element.text);
                  }}
               >
                  {Element.text}
               </Button>
            );
         })
      );
   }
}
