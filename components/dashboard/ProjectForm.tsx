import { AddProjectType, EditProjectType } from "../../types/project.interface";
import PageHead from "../PageHead";
import CloseIcon from "../helpers/CloseIcon";
import Error from "../helpers/Error";
import React from "react";

interface Props {
  project: AddProjectType | EditProjectType;
  toggle: Function;
  inputHandler: (event: any) => void;
  submitHandler: (event: any) => void;
  error: string[];
  imgPreview: string;
  submitButtonTitle: string;
}

const ProjectForm = ({
  project,
  toggle,
  inputHandler,
  submitHandler,
  imgPreview,
  error,
  submitButtonTitle
}: Props) => {
  return (
    <div className={"min-h-screen p-5 flex flex-col items-center relative"}>
      <PageHead title={"Add Project"} />
      <button className={"absolute top-0 right-0 p-5"} onClick={() => toggle()}>
        <CloseIcon className={"h-6 w-6"} />
      </button>
      {error.length > 0 && <Error messages={error} />}
      <form className={"w-2/3"}>
        <div className={"pb-2"}>
          <label>
            <span className={"text-lg sm:text-base"}>Title</span>
            <input
              className={
                "mt-3 h-10 pl-2 border sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-1"
              }
              type="text"
              name={"title"}
              value={project.title}
              placeholder={"Title of the project"}
              onChange={inputHandler}
              required={true}
            />
          </label>
        </div>
        <div className={"pb-2"}>
          <label>
            <span className={"text-lg sm:text-base"}>Logo</span>
            <img className={"w-20 rounded-full"} src={imgPreview} />
          </label>
          <input
            className={
              "mt-2 block w-full text-sm rounded-lg border cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 file:font-semibold file:rounded-lg file:border-0 file:p-1 file:m-1 file:bg-gray-500 file:cursor-pointer file:text-white"
            }
            type="file"
            name={"logo"}
            onChange={inputHandler}
          />
        </div>
        <div className={"pt-2 pb-2"}>
          <label>
            <span className={"text-lg sm:text-base"}>Description</span>
            <input
              className={
                "mt-3 p-2 border sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-1"
              }
              name={"description"}
              type="text"
              placeholder={"Describe the project"}
              value={project.description}
              onChange={inputHandler}
            />
          </label>
        </div>
        <div className={"pt-2 pb-2"}>
          <label>
            <span className={"text-lg sm:text-base"}>Summary</span>
            <textarea
              className={
                "mt-3 p-2 border sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-1"
              }
              value={project.summary}
              rows={5}
              name={"summary"}
              placeholder={"What is this project for?"}
              onChange={inputHandler}
            />
          </label>
        </div>
        <div className={"pt-2 pb-2"}>
          <label>
            <span className={"text-lg sm:text-base"}>Contribution</span>
            <textarea
              className={
                "mt-3 p-2 border sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-1"
              }
              value={project.involvement}
              name={"involvement"}
              placeholder={"My contribution to the project"}
              onChange={inputHandler}
              rows={5}
            />
          </label>
        </div>
        <div className={"pt-2 pb-2"}>
          <label>
            <span className={"text-lg sm:text-base"}>Guide</span>
            <textarea
              className={
                "mt-3 p-2 border sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-1"
              }
              value={project.guide}
              name={"guide"}
              placeholder={"How to install it"}
              onChange={inputHandler}
              rows={5}
            />
          </label>
        </div>
        <div
          className={"pt-2 pb-2 flex flex-row gap-3 flex-wrap justify-start"}
        >
          <label className={"grow"}>
            <span className={"text-lg sm:text-base"}>Stage</span>
            <input
              className={
                "mt-3 h-10 pl-2 border sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-1"
              }
              type="text"
              name={"stage"}
              value={project.stage}
              placeholder={"What's stage?"}
              onChange={inputHandler}
              required={true}
            />
          </label>
          <label>
            <span className={"text-lg sm:text-base"}>Start Date</span>
            <input
              className={
                "mt-3 h-10 pl-2 border sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-1"
              }
              type="text"
              name={"startDate"}
              placeholder={"When it started?"}
              value={project.startDate}
              onChange={inputHandler}
            />
          </label>
          <label>
            <span className={"text-lg sm:text-base"}>Github</span>
            <input
              className={
                "mt-3 h-10 pl-2 border sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-1"
              }
              type="text"
              name={"github"}
              placeholder={"Github link"}
              value={project.github}
              onChange={inputHandler}
            />
          </label>
          <label>
            <span className={"text-lg sm:text-base"}>Website</span>
            <input
              className={
                "mt-3 h-10 pl-2  border sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-1"
              }
              type="text"
              name={"website"}
              placeholder={"Website link"}
              value={project.website}
              onChange={inputHandler}
            />
          </label>
          <label>
            <span className={"text-lg sm:text-base"}>Telegram</span>
            <input
              className={
                "mt-3 h-10 pl-2 border sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-1"
              }
              type="text"
              name={"telegram"}
              placeholder={"Telegram link"}
              value={project.telegram}
              onChange={inputHandler}
            />
          </label>
          <label>
            <span className={"text-lg sm:text-base"}>Discord</span>
            <input
              className={
                "mt-3 h-10 pl-2 border sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-1"
              }
              type="text"
              name={"discord"}
              placeholder={"Discord link"}
              value={project.discord}
              onChange={inputHandler}
            />
          </label>
        </div>
        <div className={"pt-2 pb-2"}>
          <label>
            <span className={"text-lg sm:text-base align-middle"}>
              On Going?
            </span>
            <input
              className={
                "ml-2 align-middle rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
              type="checkbox"
              name={"onGoing"}
              placeholder={"Are you participating here now?"}
              defaultChecked={project.onGoing}
              onChange={inputHandler}
            />
          </label>
        </div>
        <button
          className="mx-auto w-20 bg-gray-700 text-white px-3 py-2 h-10 rounded-md text-sm font-medium flex items-center"
          onClick={submitHandler}
        >
          <span className={"text-lg w-full text-center sm:text-base"}>{submitButtonTitle}</span>
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
