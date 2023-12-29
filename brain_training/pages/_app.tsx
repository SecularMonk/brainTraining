import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/ui/Navbar";
import Drawer from "../components/ui/Drawer";
import Footer from "../components/ui/Footer";
import BottomNav from "../components/ui/BottomNav";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/apolloConfig";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
   const [drawerIsOpen, setDrawerIsOpen] = useState(false);

   function toggleDrawer(setting: boolean) {
      if (setting) {
         setDrawerIsOpen(setting);
      } else {
         setDrawerIsOpen(!drawerIsOpen);
      }
   }

   console.log("client: ", client);

   return (
      <ApolloProvider client={client}>
         <Head>
            <title>Brain Training</title>
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <meta charSet="utf-8" />
         </Head>
         <SessionProvider session={session}>
            <Navbar drawerIsOpen={drawerIsOpen} toggleDrawer={toggleDrawer} />
            <Drawer drawerIsOpen={drawerIsOpen} toggleDrawer={toggleDrawer} />
            {/* <Hero /> */}
            <Component session={session} {...pageProps} />
            <Footer />
            <BottomNav />
         </SessionProvider>
      </ApolloProvider>
   );
}
