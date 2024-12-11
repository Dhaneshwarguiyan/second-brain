import Button from "./Button";
import { useDispatch } from "react-redux";
import { toggleShareDialog } from "../slices/dialogTriggers";
import { shareLink } from "../utils/fetchData";
import copy from "copy-to-clipboard";

const ShareDialog = ({ link }: { link: string }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(toggleShareDialog());
    shareLink(false);
  };
  return (
    //disable dialog on click outside....
    <div className="h-full w-full backdrop-blur-sm absolute flex items-center justify-center">
      <div className="w-[550px] h-fit border border-black-700 bg-black-900 p-5 rounded-lg text-black-300 flex flex-col gap-4">
        <span className="flex justify-between">
          <span>{link}</span>
          <span
            onClick={() => {
              copy(link);
            }}
          >
            <Button text="copy" />
          </span>
        </span>
        <span className="flex justify-between">
          <span
            onClick={() => {
              dispatch(toggleShareDialog());
            }}
          >
            <Button text="Close" />
          </span>
          <span onClick={handleDelete}>
            <Button text="Delete" />
          </span>
        </span>
      </div>
    </div>
  );
};

export default ShareDialog;
