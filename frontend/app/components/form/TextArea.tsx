import React from "react";

interface TextAreaProps {
  name: string;
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows: number;
  errorDiv: string;
  errorMsg: string;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  return (
    <div className="mb-3">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {props.title}
      </label>
      <textarea
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        rows={props.rows}
      />
      <div className={props.errorDiv}>{props.errorMsg}</div>
    </div>
  );
};

export default TextArea;
