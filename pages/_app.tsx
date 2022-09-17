import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { NextPage } from "next";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
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

export default MyApp;
