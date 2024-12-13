import { Dispatch, SetStateAction } from "react";
import Cross from "../icons/Cross";

interface formDataType {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

const TagTile = ({
  text,
  setFormData,
}: {
  text: string;
  setFormData: Dispatch<SetStateAction<formDataType>>;
}) => {
  const clickHandler = () => {
    setFormData((prev) => {
      return {
        ...prev,
        tags: prev.tags.filter((tag) => {
          return tag !== text;
        }),
      };
    });
  };
  return (
    <div className="text-black-300 border border-black-700 w-fit p-2 px-3 rounded-full flex gap-2">
      <div>{text}</div>
      <span onClick={clickHandler}>
        <Cross />
      </span>
    </div>
  );
};

export default TagTile;
