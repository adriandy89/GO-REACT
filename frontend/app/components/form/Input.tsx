import { forwardRef, type ForwardedRef } from "react";

interface InputProps {
  name: string;
  title: string;
  type: string;
  className?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  value?: string | number;
  errorDiv?: string;
  errorMsg?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className="mb-4">
        <label
          htmlFor={props.name}
          className="block text-gray-100 text-sm font-bold mb-2"
        >
          {props.title}
        </label>
        <input
          type={props.type}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline ${props.className}`}
          id={props.name}
          ref={ref}
          name={props.name}
          placeholder={props.placeholder}
          onChange={props.onChange}
          autoComplete={props.autoComplete}
          value={props.value}
        />
        {props.errorMsg && (
          <div className="text-red-500 text-xs italic mt-2">
            {props.errorMsg}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
