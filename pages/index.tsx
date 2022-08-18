import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div>
          <span className={'text-xl'}>Welcome at the Great Node</span>
        </div>
      </div>
  )
}

export default Home
