import Head from "next/head";
import { useEffect, useState } from "react";
import { Question } from "../interfaces/classes";
import axios from "axios";
import styles from "../styles/Home.module.scss";
import QuizContainer from "../components/ui/QuizContainer";
import FeatureSection from "../components/ui/FeatureSection";
import Hero from "../components/ui/Hero";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/schema";

export default function Home() {
   const { data, loading, error } = useQuery(GET_USER, { variables: { userId: "testUser1" } });
   console.log("user data: ", data);

   return (
      <div>
         <Head>
            <title>SMART Brain Training</title>
            <meta name="description" content="SMART Brain Training" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <Hero />
         <FeatureSection />
         <QuizContainer />
      </div>
   );
}
