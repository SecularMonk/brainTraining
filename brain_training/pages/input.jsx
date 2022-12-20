import Head from "next/head";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import SingleQuestion from "../components/SingleQuestion";
import QuizContainer from "../components/ui/QuizContainer";
import Hero from "../components/ui/Hero";
import Header from "../components/header";
import { useSession } from "next-auth/react";

export default function Home() {
   const { data: session } = useSession();
   if (session) {
      return (
         <div>
            <Hero />
            <SingleQuestion session={session} />
            <QuizContainer />
         </div>
      );
   } else {
      return (
         <div>
            <Head></Head>
            {/* <Quiz session={session}></Quiz> */}
         </div>
      );
   }
}
