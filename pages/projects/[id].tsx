import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
//import api from "../../utils/axiosInterceptors";
//import {useParams} from "react-router-dom";
//import Loader from "../helpers/Loader";
import ReactMarkdown from 'react-markdown'
import axios from "axios";
import {GetStaticProps, GetStaticPaths, NextPage} from "next";
import { ParsedUrlQuery } from 'querystring';
import ProjectType from "../../types/project.interface";
import PageHead from "../../components/PageHead";

interface Props {
    project: ProjectType;
}

interface Params extends ParsedUrlQuery {
    id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const response = await axios.get('http://localhost:3000/projects');
    const paths = response.data.map((project: ProjectType) => {
        return {
            params: {id: project.id?.toString()}
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
        const project: ProjectType = response.data;
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

    return (
        <>
            <div className={'min-h-screen p-5 w-full flex flex-col gap-4 items-center mx-auto'}>
                <PageHead title={project.title} />
                <div
                    className={'w-1/2 p-2 flex flex-col justify-evenly gap-1 sm:gap-0 sm:flex-row items-center'}>
                    <img
                        className={'w-20 inline-block rounded-full p-1'}
                        src={`${process.env.NEXT_PUBLIC_API}/${project.logoUrl}`}
                        alt={'project logo'}
                    />
                    <div className={'text-center p-1'}>
                        <span className={'text-4xl sm:text-5xl font-medium'}>{project.title}</span>
                    </div>
                    <div className={'flex flex-col items-center gap-2 p-1 font-medium text-lg text-black sm:text-base'}>
                        <div className={'bg-white rounded-md p-2 w-full'}>
                            <p className={'text-center'}>{project.stage}</p>
                        </div>
                        <div className={'bg-white rounded-md p-2 min-w-max flex flex-row gap-2'}>
                            <a href={project.website}><img className={'w-5'} src={'/website.svg'} alt={'website logo'}/></a>
                            <a href={project.github}><img className={'w-5'} src={'/github.svg'} alt={'github logo'}/></a>
                            <a href={project.discord}><img className={'w-5'} src={'/discord.svg'} alt={'discord logo'}/></a>
                            <a href={project.telegram}><img className={'w-5'} src={'/telegram.svg'} alt={'tg logo'}/></a>
                        </div>
                    </div>
                </div>
                <div className={'mt-2 grid sm:grid-cols-2 gap-5 w-3/4'}>
                    <div className={'border-sky-700 border-2 rounded-md p-4 flex flex-col'}>
                        <p className={'text-center font-medium text-lg bg-sky-700 mb-2 rounded-md'}>Summary</p>
                        <ReactMarkdown className={'prose prose-invert'}>{project.summary}</ReactMarkdown>
                    </div>
                    <div className={'border-sky-700 border-2 rounded-md p-4 flex flex-col'}>
                        <p className={'text-center font-medium text-lg bg-sky-700 mb-2 rounded-md'}>Contribution</p>
                        <ReactMarkdown className={'prose prose-md prose-invert m-0'}>{project.involvement}</ReactMarkdown>
                    </div>
                </div>
                <div className={'mt-2 flex flex-col w-3/4'}>
                    <div className={'border-sky-700 border-2 rounded-md p-4 flex flex-col'}>
                        <h1 className={'text-center font-medium text-lg bg-sky-700 mb-2 rounded-md'}>Guide</h1>
                        <ReactMarkdown className={'prose prose-invert'}>{project.guide}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project;