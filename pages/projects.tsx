import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProjectCard from "../components/project/ProjectCard";
import {GetStaticProps, NextPage} from "next";
import ProjectType from "../types/project.interface";

interface Props {
    projects: ProjectType[];
}

export async function getStaticProps() {
    try {
        const response = await axios.get('http://localhost:3000/projects');
        const mappedProjects = response.data.map((project: ProjectType) => {
            return {
                id: project.id,
                title: project.title,
                description: project.description,
                logoUrl: project.logoUrl,
                onGoing: project.onGoing,
            }
        });
        return {
            props: {
                projects: mappedProjects
            }
        }
    } catch (e) {
        throw (e);
    }
}


const Projects: NextPage<Props> = ({projects}) => {
    return (
        <div className="min-h-screen">
            <span className={'text-2xl inline-block w-full text-center p-2'}>My projects</span>
            <div  className={'p-5 flex flex-col sm:grid sm:grid-cols-3 gap-4 items-center justify-center'}>
                {projects?.map((project) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        logoUrl={project.logoUrl}
                        onGoing={project.onGoing}
                    />
                ))
                }
            </div>
        </div>
    );
}

export default Projects;