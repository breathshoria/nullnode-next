import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "../components/Layout";
import {SessionProvider} from "next-auth/react"

function MyApp({
                   Component,
                   pageProps: {
                       session,
                       ...pageProps
                   }
               }: AppProps
) {
    return (
        <SessionProvider session={session}>
        <div className={'bg-gray-800 h-full text-white'}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </div>
        </SessionProvider>
    )
}

export default MyApp
