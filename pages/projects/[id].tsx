import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
//import api from "../../utils/axiosInterceptors";
//import {useParams} from "react-router-dom";
//import Loader from "../helpers/Loader";
import ReactMarkdown from 'react-markdown'
import axios from "axios";
import {GetStaticProps, GetStaticPaths, NextPage} from "next";
import { ParsedUrlQuery } from 'querystring';

interface Project {
    id: string;
    title: string;
    description: string;
    stage: string;
    logo: string;
    website: string;
    discord: string;
    github: string;
    telegram: string;
    summary: string;
    startDate: string;
    involvement: string;
    guide: string;
}

interface Props {
    project: Project;
}

interface Params extends ParsedUrlQuery {
    id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const response = await axios.get('http://localhost:3000/projects');
    const paths = response.data.map((project: Project) => {
        return {
            params: {id: project.id.toString()}
        }
    })
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<Props, Params> = async(context) => {
    try {
        const {id} = context.params!
        const response = await axios.get(`http://localhost:3000/projects/getProject/${id}`);
        const project: Project = response.data;
        return {
            props: {
                project
            }
        }
    } catch (e) {
        throw (e);
    }
}

const Project: NextPage<Props> = ({project}) => {

   /* if (!project) {
        return (
            <div className={'bg-gray-800 min-h-screen flex items-center justify-center'}>
                <Loader className={'w-10 h-10'}></Loader>
            </div>
        )
    }*/

    return (
        <>
            <div className={'min-h-screen p-5 w-full flex flex-col gap-4 items-center mx-auto'}>
                <div
                    className={'w-1/2 p-2 flex flex-col justify-evenly sm:flex-row sm:flex-wrap items-center'}>
                    <img
                        className={'w-20'}
                        src={`${process.env.NEXT_PUBLIC_API}/${project.logo}`}
                    />
                    <div className={'text-center'}>
                        <span className={'text-4xl sm:text-5xl font-medium'}>{project.title}</span>
                    </div>
                    <div className={'flex flex-col items-center gap-2 p-2 font-medium text-base text-black sm:text-lg'}>
                        <div className={'bg-white rounded-md p-2 w-full'}>
                            <p className={'text-center'}>{project.stage}</p>
                        </div>
                        <div className={'bg-white rounded-md p-2 w-full flex flex-row gap-2'}>
                            <a href={project.website}><img className={'fill-sky-700 w-5'} src={'/website.svg'}/></a>
                            <a href={project.github}><img className={'fill-sky-700 w-5'} src={'/github.svg'}/></a>
                            <a href={project.discord}><img className={'fill-sky-700 w-5'} src={'/discord.svg'}/></a>
                            <a href={project.telegram}><img className={'fill-sky-700 w-5'} src={'/telegram.svg'}/></a>
                        </div>
                    </div>
                </div>
                <div className={'mt-2 grid sm:grid-cols-2 gap-5 w-3/4'}>
                    <div className={'border-sky-800 border-2  p-4 flex flex-col'}>
                        <p className={'text-center font-medium text-lg bg-sky-900 mb-2 rounded-md'}>Summary</p>
                        <ReactMarkdown className={'prose prose-invert'}>{project.summary}</ReactMarkdown>
                    </div>
                    <div className={'border-sky-800 border-2 p-4 flex flex-col'}>
                        <p className={'text-center font-medium text-lg bg-sky-900 mb-2 rounded-md'}>Contribution</p>
                        <ReactMarkdown className={'prose prose-md prose-invert'}>{project.involvement}</ReactMarkdown>
                    </div>
                </div>
                <div className={'mt-2 flex flex-col w-3/4'}>
                    <div className={'border-sky-800 border-2 p-4 flex flex-col'}>
                        <h1 className={'text-center font-medium text-lg bg-sky-900 mb-2 rounded-md'}>Guide</h1>
                        <p>{project.guide}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project;