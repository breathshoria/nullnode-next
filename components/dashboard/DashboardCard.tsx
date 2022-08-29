import React from 'react';
import ProjectType from "../../types/project.interface";

type Props = Pick<ProjectType, "logoUrl" | "title" | "id"> & {
    index: number;
    removeProject: Function;
    editProject: Function;
}

const ProjectCard = ({logoUrl, title, id, index, removeProject, editProject}: Props) => {
    return (
        <div
            className={`relative w-2/3 flex flex-col sm:flex-row items-center justify-center gap-2 bg-sky-700 rounded-lg p-4 min-h-full`}
        >
            <img className={'w-12 mx-auto rounded-full'} src={`${process.env.NEXT_PUBLIC_API}/${logoUrl}`}
                 alt={'project logo'}/>
            <span className={'py-2 inline-block grow'}>{title}</span>
            <div className={'flex flex-row flex-wrap gap-2 justify-center'}>
                <button className={'p-3 bg-green-500 rounded-lg hover:bg-green-400'}
                        onClick={() => editProject(id)}>Edit
                </button>
                <button className={'p-3 bg-red-500 rounded-lg hover:bg-red-400'}
                        onClick={() => removeProject(id)}>Delete
                </button>

            </div>
        </div>
    )
}
export default ProjectCard;