import { useState } from "react";
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import { cva } from "class-variance-authority";

const buttonGroupStyles = cva("btn text-white", {
   variants: {
      intent: {
         active: "bg-cyan-500",
         inactive: "",
      },
   },
});

export default function QuizOptions({ selected, setSelected, setStarted, numQuestions }) {
   // const [selected, setSelected] = useState("Normal");

   const options = [{ text: "Easy" }, { text: "Normal" }, { text: "Hard" }];
   return (
      <div className="card-body">
         <h2 className="card-title">Choose your difficulty.</h2>
         <div className="btn-group justify-center btn-block">{renderOptions({ options })}</div>
         <p>Contains {numQuestions} questions.</p>
         <Button
            intent="primary"
            onClick={() => {
               setStarted(true);
            }}
         >
            Start!
         </Button>
      </div>
   );

   function renderOptions({ options }) {
      return (
         options &&
         options.map((Element) => {
            const intent = Element.text === selected ? "active" : "inactive";
            return (
               <Button
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
