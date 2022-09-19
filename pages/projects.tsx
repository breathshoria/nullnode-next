import React from "react";
import ProjectCard from "../components/project/ProjectCard";
import { NextPage } from "next";
import ProjectType from "../types/project.interface";
import PageHead from "../components/PageHead";
import {api} from "../utils/axiosInterceptors";

interface Props {
  projects: ProjectType[];
}

export async function getStaticProps() {
  try {
    const response = await api.get("/projects");
    const mappedProjects = response.data.map((project: ProjectType) => {
      return {
        id: project.id,
        title: project.title,
        description: project.description,
        logoUrl: project.logoUrl,
        onGoing: project.onGoing,
      };
    });
    return {
      props: {
        projects: mappedProjects,
      },
    };
  } catch (e) {
    throw e;
  }
}

const Projects: NextPage<Props> = ({ projects }) => {
  return (
    <div className="min-h-screen">
      <PageHead title={"Projects"} />
      <span className={"text-2xl inline-block w-full text-center p-2"}>
        My projects
      </span>
      <div
        className={
          "p-4 flex flex-col mx-auto w-3/4 sm:grid sm:grid-cols-3 gap-3 items-center justify-items-center justify-center"
        }
      >
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            logoUrl={project.logoUrl}
            onGoing={project.onGoing}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
