import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Session } from "next-auth";

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className={"bg-gray-800 h-full text-white"}>
        <Head>
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SessionProvider>
  );
}

export default App;
