import { ReactElement } from "react";

interface propType {
  type?: "primary" | "secondary";
  text: string;
  icon?: ReactElement;
}

const Button = ({ type, text, icon }: propType) => {
  return (
    <div
      className={`text-sm w-fit px-3 py-2 flex gap-2 cursor-pointer rounded-lg hover:duration-75 ${type === "secondary" ? "bg-transparent text-black-300 border border-black-700 hover:bg-black-700" : "bg-black-300 text-black-900 hover:bg-black-500"}`}
    >
      {icon && icon}
      <span>{text}</span>
    </div>
  );
};

export default Button;
