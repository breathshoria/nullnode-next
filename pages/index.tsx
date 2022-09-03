import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import PageHead from "../components/PageHead";
import React from "react";

const Home: NextPage = () => {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center">
          <PageHead title={'Home'} />
        <div>
          <span className={'text-xl'}>Welcome at the Great Node</span>
        </div>
      </div>
  )
}

export default Home
