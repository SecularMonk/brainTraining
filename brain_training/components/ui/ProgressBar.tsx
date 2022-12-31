import { cva } from "class-variance-authority";

const progressBarStyles = cva("progress flex items-center justify-center", {
   variants: {
      intent: {
         primary: "progress-success",
         secondary: "progress-primary",
         danger: "progress-error",
      },
   },
});

export default function ProgressBar({ intent = "primary", value }) {
   return <progress className={progressBarStyles({ intent })} value={value} max="100"></progress>;
}
