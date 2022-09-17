import { useSession, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { api } from "../../utils/axiosInterceptors";
import ProjectType from "../../types/project.interface";
import Loader from "../helpers/Loader";

interface Props {
  projectId: number;
}

interface UserProject {
  id: number;
}

const SubscribeButton = ({ projectId }: Props) => {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [isLoading, setLoading] = useState(false);

  const getUserProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users/getUser");
      const { projects: userProjects } = response.data;
      const userProjectsId = userProjects.map((project: ProjectType) => {
        return {
          id: project.id,
        };
      });
      if (userProjects) {
        setProjects(userProjectsId);
      }
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const subscribeProject = async (projectId: number) => {
    try {
      setLoading(true);
      setProjects((prev) => [...prev, { id: projectId }]);
      await api.post("/users/subscribe", {
        projectId: {
          id: projectId,
        },
      });
    } catch {
      setProjects((prev) => prev.filter((el) => el.id !== projectId));
    } finally {
      setLoading(false);
    }
  };

  const unsubscribeProject = async (projectId: number) => {
    try {
      setLoading(true);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      await api.post("/users/unsubscribe", {
        projectId: {
          id: projectId,
        },
      });
    } catch {
      setProjects((prev) => [...prev, { id: projectId }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      await getUserProjects();
    };
    if (session?.user) fetchProjects();
  }, [projectId]);

  if (isLoading) {
    return (
      <div
        className={
          "flex flex-row justify-items-center justify-center items-center p-2"
        }
      >
        <Loader className={"w-6 h-6"} />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className={"bg-sky-700 text-white rounded-md hover:bg-sky-600 p-2"}>
        <button className={"text-center"} onClick={() => signIn()}>
          Subscribe
        </button>
      </div>
    );
  }

  if (projects?.find((el) => el.id === projectId)) {
    return (
      <div className={"bg-sky-600 text-white rounded-md p-2"}>
        <button
          className={"text-center"}
          onClick={() => unsubscribeProject(projectId)}
        >
          You are subscribed!
        </button>
      </div>
    );
  }
  return (
    <div className={"bg-sky-700 text-white rounded-md hover:bg-sky-600 p-2"}>
      <button
        className={"text-center"}
        onClick={() => subscribeProject(projectId)}
      >
        Subscribe
      </button>
    </div>
  );
};
export default SubscribeButton;
