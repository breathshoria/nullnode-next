import type { NextPage } from 'next'
import PageHead from "../components/PageHead";
import React from "react";

const About: NextPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <PageHead title={'About'} />
            <div>
                <span className={'text-xl'}>TODO:About page</span>
            </div>
        </div>
    )
}

export default About
