import React, {useState, useEffect} from 'react';
import DashboardCard from "../components/dashboard/DashboardCard";
import ProjectType from "../types/project.interface";
import AddProject from "../components/dashboard/AddProject";
import EditProject from "../components/dashboard/EditProject";
import api from "../utils/axiosInterceptors";

type DashboardProject = Pick<ProjectType, "id" | "title" | "description" | "logoUrl" | "onGoing">

const Projects = () => {
    const [projects, setProjects] = useState<DashboardProject[] | null>(null);
    const [isAddFormOpened, setAddFormOpened] = useState(false);
    const [isEditFormOpened, setEditFormOpened] = useState(false);
    const [editableProjectId, setEditableProjectId] = useState<number | null>(null);

    const fetchProjects = async () => {
        try {
            const response = await api.get('projects');
            const dashboardProjects = response.data.map((project: DashboardProject) => {
                return {
                    id: project.id,
                    title: project.title,
                    description: project.description,
                    logoUrl: project.logoUrl,
                    onGoing: project.onGoing,
                }
            });
            setProjects(dashboardProjects);
        } catch (e) {
            throw (e);
        }
    }

    const removeProject = async (id: number): Promise<void> => {
        await api.delete(`/projects/deleteProject/${id}`)
        setProjects((prev) => prev ? prev.filter((project) => project.id !== id) : null)
    }

    const toggleAddForm = () => {
        setAddFormOpened(!isAddFormOpened)
    }

    const toggleEditForm = (id: number) => {
        if (id) {
            setEditableProjectId(id);
        }
        setEditFormOpened(!isEditFormOpened);
    }

    useEffect(() => {
        async function fetchApi() {
            await fetchProjects()
        }

        fetchApi()
    }, [isAddFormOpened, isEditFormOpened])


    if (isAddFormOpened) {
        return (
            <AddProject toggleAddForm={toggleAddForm}/>
        )
    }
    if (isEditFormOpened) {
        return (
            <EditProject projectId={editableProjectId!} toggleEditForm={toggleEditForm}/>
        )
    }

    return (
        <div className="min-h-screen">
            <span className={'text-2xl inline-block w-full text-center p-2'}>Manage projects</span>
            <div className={'p-2 mt-5 flex flex-col gap-4 justify-center items-center'}>
                {projects?.map((project, index) => (
                    <DashboardCard
                        id={project.id}
                        key={project.id}
                        title={project.title}
                        logoUrl={project.logoUrl}
                        index={index}
                        editProject={toggleEditForm}
                        removeProject={removeProject}
                    />
                ))
                }
            </div>
            <div className={'flex flex-col justify-center items-center '}>
                <button className={'p-2 bg-sky-700 rounded-lg m-3 font-medium w-16'} onClick={toggleAddForm}>
                    <span className={'text-2xl text-center align-middle'}>+</span>
                </button>
            </div>
        </div>
    );
}

export default Projects;