import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/footer";
import BottomNav from "../components/ui/BottomNav";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
   return (
      <div>
         <Head>
            <title>Brain Training</title>
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <meta charSet="utf-8" />
         </Head>
         <SessionProvider session={session}>
            <Navbar session={session} />
            <Component {...pageProps} />
            <Footer />
            <BottomNav />
         </SessionProvider>
      </div>
   );
}
