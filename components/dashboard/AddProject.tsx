import React, { useState } from "react";
import { api } from "../../utils/axiosInterceptors";
import axios from "axios";
import ProjectFormError from "../../types/validation-error.interface";
import ProjectForm from "./ProjectForm";
import {AddProjectType} from "../../types/project.interface";

interface Props {
  toggleAddForm: Function;
}

const AddProject = ({ toggleAddForm }: Props) => {
  const [project, setProject] = useState<AddProjectType>({
    title: "",
    description: "",
    summary: "",
    startDate: "",
    stage: "",
    discord: "",
    website: "",
    telegram: "",
    involvement: "",
    logo: null,
    github: "",
    onGoing: false,
    guide: "",
  });
  const [imgPreview, setImgPreview] = useState<string>("");
  const [error, setError] = useState<string[]>([]);

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
      return setProject(project);
    }
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    await event.preventDefault();
    let formData = new FormData();
    for (let key in project) {
      formData.append(key, (project as any)[key]);
    }
    try {
      await api.post("/projects/addProject", formData);
      toggleAddForm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError((error.response?.data as ProjectFormError).message);
      }
    }
  };

  return (
    <ProjectForm
      project={project}
      toggle={toggleAddForm}
      inputHandler={handleChange}
      submitHandler={handleSubmit}
      error={error}
      imgPreview={imgPreview}
      submitButtonTitle={'Add'}
    />
  );
};

export default AddProject;
