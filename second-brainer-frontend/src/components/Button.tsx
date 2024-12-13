import { ReactElement } from "react";

interface propType {
  type?: "primary" | "secondary";
  size?:"sm"|"lg";
  text: string;
  icon?: ReactElement;
}

const Button = ({ type, text, icon ,size}: propType) => {
  return (
    <div
      className={`w-fit text-inter ${size === 'lg' ? 'text-base px-8 py-2':'text-sm px-3 py-2'} flex gap-2 cursor-pointer rounded-lg hover:duration-75 ${type === "secondary" ? "bg-black-900 text-black-300 border border-black-700 hover:bg-black-700" : "bg-black-300 text-black-900 hover:bg-black-500"}`}
    >
      {icon && icon}
      <span>{text}</span>
    </div>
  );
};

export default Button;
