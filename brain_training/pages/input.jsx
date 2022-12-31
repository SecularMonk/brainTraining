import SingleQuestion from "../components/ui/SingleQuestion";
import QuizContainer from "../components/ui/QuizContainer";
import FeatureSection from "../components/ui/FeatureSection";
import Hero from "../components/ui/Hero";
import { useSession } from "next-auth/react";

export default function Input() {
   const { data: session } = useSession();

   if (session) {
      return (
         <div>
            <Hero />
            <FeatureSection />
            <SingleQuestion session={session} />
            <QuizContainer />
         </div>
      );
   } else {
      return (
         <div>
            <Hero />
            <FeatureSection />
         </div>
      );
   }
}
