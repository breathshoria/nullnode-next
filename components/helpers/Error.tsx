import React, {useEffect, useState} from "react";
import CloseIcon from "./CloseIcon";

interface Props {
  messages: string[];
}

const Error = ({ messages }: Props) => {
  const [visible, setVisible] = useState(true);

  const hide = () => {
    setVisible(false)
  }

  useEffect(() => {
    setVisible(true);
  }, [messages])

  if (visible) {
    return (
        <div className={"relative w-1/2 bg-red-400 p-2 rounded-xl flex flex-col gap-1"}>
          {messages?.map((message, index) => (
              <span key={index} className={"text-base text-center"}>
          {message}
        </span>
          ))}
          <button className={'absolute top-0 right-1 p-1'} onClick={hide}>
            <CloseIcon className={'h-3 w-3'} />
          </button>
        </div>
    );
  }

  return null

};

export default Error;