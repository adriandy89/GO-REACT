import React from "react";

interface SelectProps {
  name: string;
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeHolder: string;
  options: { id: string; value: string }[];
  errorDiv: string;
  errorMsg: string;
}

const Select: React.FC<SelectProps> = (props) => {
  return (
    <div className="mb-3">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {props.title}
      </label>
      <select
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        <option value="">{props.placeHolder}</option>
        {props.options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.value}
            </option>
          );
        })}
      </select>
      <div className={props.errorDiv}>{props.errorMsg}</div>
    </div>
  );
};

export default Select;
