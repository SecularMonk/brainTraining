import Head from "next/head";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
// import { Question } from "../classes";
import axios from "axios";
import QuizContainer from "../components/ui/QuizContainer";
import BottomNav from "../components/ui/BottomNav";

export default function Page() {
   return (
      <div>
         <QuizContainer />
         {/* <Question
            problemStatement="HARDCODED AEY is opposite to IOC. IOC is equal to FUU."
            question="HARDCODED Is AEY opposite to FUU?"
            options={["Yes", "No"]}
         ></Question> */}
         {/* <BottomNav></BottomNav> */}
      </div>
   );
}
