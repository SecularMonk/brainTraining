import Head from "next/head";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import Quiz from "../components/quiz";
import Header from "../components/header";
import { useSession } from "next-auth/react";

export default function Home() {
   const { data: session } = useSession();
   if (session) {
      return (
         <div>
            <Head></Head>
            <Header />
            <Quiz session={session}></Quiz>
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
