import React, { useEffect, useState } from "react";
import { api } from "../../utils/axiosInterceptors";
import { EditProjectType } from "../../types/project.interface";
import Loader from "../helpers/Loader";
import ProjectForm from "./ProjectForm";
import axios from "axios";
import ProjectFormError from "../../types/validation-error.interface";

interface Props {
  toggleEditForm: Function;
  projectId: number;
}

const EditProject = ({ toggleEditForm, projectId }: Props) => {
  const [project, setProject] = useState<EditProjectType>({
    id: 0,
    title: "",
    description: "",
    summary: "",
    startDate: "",
    stage: "",
    discord: "",
    website: "",
    telegram: "",
    involvement: "",
    logoUrl: "",
    logo: null,
    github: "",
    onGoing: false,
    guide: "",
  });

  const [imgPreview, setImgPreview] = useState<string>("");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string[]>([]);

  const fetchProject = async () => {
    const response = await api.get(`/projects/getProject/${projectId}`);
    response.data.logo = null;
    setImgPreview(`${process.env.NEXT_PUBLIC_API}/${response.data.logoUrl}`);
    setProject(response.data);
  };

  const handleChange = (event: any) => {
    const { name, value, checked, files } = event.target;
    if (name === "onGoing") {
      event.target.checked = checked;
      project.onGoing = event.target.checked.toString();
      return setProject(project);
    }
    if (name === "logo") {
      project.logo = files[0];
      setImgPreview(URL.createObjectURL(project.logo!));
      console.log(event.target.src);
      return setProject(project);
    }
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    await event.preventDefault();
    let formData = new FormData();
    for (let key in project) {
      if (key === "logo" && (project as any)[key] === null) {
        continue;
      }
      formData.append(key, (project as any)[key]);
    }
    try {
      await api.post("/projects/updateProject", formData);
      toggleEditForm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError((error.response?.data as ProjectFormError).message);
      }
    }
  };

  useEffect(() => {
    const populateForm = async () => {
      await fetchProject();
      setLoading(false);
    };
    populateForm();
  }, [projectId]);

  if (isLoading) {
    return (
      <div
        className={"bg-gray-800 min-h-screen flex items-center justify-center"}
      >
        <Loader className={"w-10 h-10"}></Loader>
      </div>
    );
  }
  return (
    <ProjectForm
      project={project}
      toggle={toggleEditForm}
      inputHandler={handleChange}
      submitHandler={handleSubmit}
      error={error}
      imgPreview={imgPreview}
      submitButtonTitle={'Edit'}
    />
  );
};

export default EditProject;
