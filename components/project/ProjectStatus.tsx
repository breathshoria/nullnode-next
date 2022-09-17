interface Props {
  onGoing: boolean;
  className: string;
}

const ProjectStatus = ({ onGoing, className }: Props) => {
  if (onGoing) {
    return (
      <div className={className}>
        <div className={"rounded-lg bg-emerald-500 w-5 h-5"}></div>
      </div>
    );
  }
  return (
    <div className={className}>
      <div
        className={"rounded-lg border-emerald-500 bg-gray-800 border-2 w-5 h-5"}
      ></div>
    </div>
  );
};
export default ProjectStatus;
