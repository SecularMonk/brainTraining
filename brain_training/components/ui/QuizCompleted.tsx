import Button from "./Button";

export default function QuizCompleted({ correctAnswers = 3, totalAnswers = 5, restart, restarted = false }) {
   return (
      <div className="card-body">
         <h2 className="card-title">Completed!</h2>
         <p>
            You scored {correctAnswers} out of {totalAnswers}.
         </p>

         <Button intent="primary">Continue</Button>
         <Button
            intent="secondary"
            onClick={() => {
               restart(!restarted);
            }}
         >
            Try again
         </Button>
      </div>
   );
}
