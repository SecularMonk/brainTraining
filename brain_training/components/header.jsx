import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Header.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
   const { data: session } = useSession();
   return (
      <div className={styles.header}>
         {/* <h1>{session ? "Session" : "No Session"}</h1> */}
         {session ? (
            <button className={styles.signOut} onClick={() => signOut()}>
               Sign out
            </button>
         ) : (
            <button className={styles.signIn} onClick={() => signIn()}>
               Sign in
            </button>
         )}
      </div>
   );
}
