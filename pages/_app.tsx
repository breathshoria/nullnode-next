import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return(
      <div className={'bg-gray-800 h-full text-white'}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
  )
}

export default MyApp
