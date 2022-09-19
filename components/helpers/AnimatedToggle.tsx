import React from "react";

interface Props {
    trigger: boolean
}

const AnimatedToggle = ({trigger}: Props) => {
    return (
      <div className={'p-1'}>
        <div
          className={
            trigger
              ? "transition ease-out duration-300 w-5 h-0.5 bg-gray-200 -rotate-45 absolute"
              : "transition ease-out duration-300 w-5 h-0.5 bg-gray-200 rotate-0 mb-1"
          }
        />
        <div
          className={
            trigger
              ? "transition ease-out w-0 h-0 delay-75"
              : "transition ease-out w-5 h-0.5 bg-gray-200 mb-1"
          }
        />
        <div
          className={
            trigger
              ? "transition ease-out duration-300 w-5 h-0.5 bg-gray-200 rotate-45"
              : "transition ease-out duration-300 w-5 h-0.5 bg-gray-200 rotate-0"
          }
        />
      </div>
    );
}

export default AnimatedToggle;