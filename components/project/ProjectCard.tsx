import React from 'react';
import Link from "next/link";
import ProjectStatus from "./ProjectStatus";
import ProjectType from "../../types/project.interface";

type Props = Pick<ProjectType, "id" | "logoUrl" | "title" | "description" | "onGoing">

const ProjectCard = ({id, title, onGoing, logoUrl, description}: Props) => {
    return (
        <Link
            href={`/projects/${id}`}
        >
            <div
                className={`relative w-full flex flex-col items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-xl p-2 flex-nowrap min-h-full cursor-pointer`}>
                <img className={'w-20 mx-auto rounded-full'} src={`${process.env.NEXT_PUBLIC_API}/${logoUrl}`}/>
                <span className={'py-2 inline-block w-full text-center font-semibold'}>{title}</span>
                <p className={'inline-block w-full text-start bg-gray-800 rounded-xl p-3'}>{description}</p>
                <ProjectStatus className={'absolute top-1 right-1'} onGoing={onGoing}/>
            </div>
        </Link>
    )
}
export default ProjectCard;