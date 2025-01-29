import React from "react";

interface CheckBoxProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  title: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  value,
  onChange,
  checked,
  title,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        id={name}
        className="form-check-input h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        type="checkbox"
        value={value}
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <label className="form-check-label text-gray-700" htmlFor={name}>
        {title}
      </label>
    </div>
  );
};

export default CheckBox;
