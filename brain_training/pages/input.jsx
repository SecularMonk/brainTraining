import Head from "next/head";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { Question, Answer } from "../classes";
import styles from "../styles/Home.module.css";
import Quiz from "../components/quiz";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
   const { data: session } = useSession();
   if (session) {
      return (
         <div>
            <Head></Head>
            <h1>Session</h1>
            <button onClick={() => signOut()}>Sign out</button>
            <Quiz></Quiz>
         </div>
      );
   } else {
      return (
         <div>
            <Head></Head>
            <h1>No Session</h1>
            <button onClick={() => signIn()}>Sign in</button>
            <Quiz></Quiz>
         </div>
      );
   }
}
