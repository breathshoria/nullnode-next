import React from "react";
import clsx from "clsx";

interface Props {
  trigger: boolean;
}

const AnimatedToggle = ({ trigger }: Props) => {
  return (
    <div className={"p-1"}>
      <div
        className={clsx(
          trigger ? "-rotate-45 absolute" : "mb-1" ,
          "transition ease-out duration-300 w-5 h-0.5 bg-gray-200"
        )}
      />
      <div
        className={clsx(
          trigger ? "w-0 h-0 delay-75" : "w-5 h-0.5 mb-1",
          "transition ease-out bg-gray-200"
        )}
      />
      <div
        className={clsx(
            trigger ? "rotate-45" : "mb-1",
            "transition ease-out duration-300 w-5 h-0.5 bg-gray-200"
        )}
      />
    </div>
  );
};

export default AnimatedToggle;
