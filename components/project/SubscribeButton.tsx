import {useSession, signIn} from "next-auth/react";
import React, {useEffect, useState} from "react";
import {api} from "../../utils/axiosInterceptors";
import ProjectType from "../../types/project.interface";
import Loader from "../helpers/Loader";

interface Props {
    projectId: number
}

interface UserProject {
    id: number
}

const SubscribeButton = ({projectId}: Props) => {
    const {data: session} = useSession();
    const [projects, setProjects] = useState<UserProject[]>([]);
    const [isLoading, setLoading] = useState(false);

    const getUserProjects = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users/getUser');
            const {projects: userProjects} = response.data;
            const userProjectsId = userProjects.map((project: ProjectType) => {
                return {
                    id: project.id
                }
            })
            if (userProjects) {
                setProjects(userProjectsId);
            }
        } catch (e) {
            throw e;
        } finally {
            setLoading(false);
        }
    }

    const subscribeProject = async (projectId: number) => {
        try {
            setProjects(prev => [...prev, {id: projectId}]);
            await api.post('/users/subscribeProject', {
                projectId: [...projects, {id: projectId}]
            })
        } catch {
            setProjects(prev => prev.filter(el => el.id !== projectId))
        }

    }

    useEffect(() => {
        const fetchProjects = async () => {
            await getUserProjects();
        }
        if (session?.user) fetchProjects();
    }, [projectId])

    if (isLoading) {
        return <Loader className={'w-5 h-5'}/>
    }

    if (!session?.user) {
        return (
            <div className={'bg-sky-700 text-white rounded-md hover:bg-sky-600'}>
                <button className={'text-center py-2 px-8'} onClick={() => signIn()}>Subscribe</button>
            </div>
        )
    }

    if (projects?.find(el => el.id === projectId)) {
        return (
            <div className={'bg-sky-600 text-white rounded-md'}>
                <p className={'text-center py-2 px-8'}>You are subscribed to this project!</p>
            </div>
        )
    }
    return (
        <div className={'bg-sky-700 text-white rounded-md hover:bg-sky-600'}>
            <button className={'text-center py-2 px-8'} onClick={() => subscribeProject(projectId)}>Subscribe</button>
        </div>
    )
}
export default SubscribeButton;