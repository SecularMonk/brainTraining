import Head from "next/head";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { Question } from "../classes";
import axios from "axios";
import Quiz from "../components/quiz";

export default function Page() {
   return <Quiz></Quiz>;
}
