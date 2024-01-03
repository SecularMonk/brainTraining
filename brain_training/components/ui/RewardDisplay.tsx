import { cva } from "class-variance-authority";
import { useEffect } from "react";

const progressBarStyles = cva("progress flex items-center justify-center self-center", {
   variants: {
      intent: {
         primary: "progress-success w-2/3",
         secondary: "progress-primary",
         danger: "progress-error",
      },
   },
});

type AvailableRewards = "XP";
type RewardDisplayParams = { [key in AvailableRewards]?: number };

export default function RewardDisplay({
   intent = "primary",
   rewards,
}: {
   intent: "primary" | "secondary" | "danger" | null | undefined;
   rewards: RewardDisplayParams;
}) {
   return (
      <>
         {rewards &&
            Object.entries(rewards).map((element) => {
               return (
                  <p>
                     {element[0]} {element[1]}
                  </p>
               );
            })}
      </>
   );
}
