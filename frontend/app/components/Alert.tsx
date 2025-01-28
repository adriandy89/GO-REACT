import React from "react";

interface AlertProps {
  className: string;
  message: string;
}

const Alert: React.FC<AlertProps> = (props) => {
  return (
    <div
      className={"text-center p-2 mb-2 text-sm rounded-lg " + props.className}
      role="alert"
    >
      {props.message}
    </div>
  );
};

export default Alert;
