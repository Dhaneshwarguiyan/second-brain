import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleShareDialog } from "../slices/dialogTriggers";
import { shareLink } from "../utils/fetchData";
import copy from "copy-to-clipboard";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../store/store";

const ShareDialog = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const shareDialogRef = useRef<HTMLDivElement>(null);
  const [link, setLink] = useState<string>("");
  const [share, setShare] = useState<boolean>(
    localStorage.getItem("share") === "true",
  );
  const dispatch = useDispatch();
  
  const handleChange = () => {
    setShare((prev) => !prev);
  };

  //useEffects
  useEffect(() => {
    const createShareLink = async () => {
      //handle properly if token is not present
      if(token){
        const { hash } = await shareLink(share,token);
        if (share) {
          setLink(`http:localhost:5173/share/${hash}`);
        } else {
          setLink("No link to share");
        }
      }
    };
    createShareLink();
    if (share) {
      localStorage.setItem("share", "true");
    } else {
      localStorage.setItem("share", "false");
    }
  }, [share]);

  useEffect(() => {
    window.addEventListener("mousedown", closeShareDialog);
    return () => {
      window.removeEventListener("mousedown", closeShareDialog);
    };
  }, []);

  const closeShareDialog = (e: MouseEvent) => {
    if (
      e.target instanceof Node &&
      !shareDialogRef.current?.contains(e.target)
    ) {
      dispatch(toggleShareDialog());
    }
  };

  return (
    //disable dialog on click outside....
    <div className="h-full w-full backdrop-blur-sm absolute flex items-center justify-center z-10">
      <div
        className="sm:w-[550px] w-[80%] h-fit border border-black-700 bg-black-900 p-5 rounded-lg text-black-300 flex flex-col gap-4"
        ref={shareDialogRef}
      >
        <span className="flex justify-between">
          <div className="w-[80%] break-all ">{link}</div>
          <label
            htmlFor="check"
            className={` cursor-pointer ${share ? "bg-black-300" : "bg-gray-600"} relative w-12 h-7 rounded-full`}
          >
            <input
              type="checkbox"
              id="check"
              className="sr-only peer"
              onChange={handleChange}
              defaultValue={`${share}`}
            />
            <span
              className={`w-[20px] h-[20px] bg-black-900 absolute rounded-full left-1 top-1 ${share && "left-6"} transition-all duration-300`}
            ></span>
          </label>
        </span>
        <span className="flex justify-between">
          <span
            onClick={() => {
              dispatch(toggleShareDialog());
            }}
          >
            <Button text="Close" />
          </span>
          <span
            onClick={() => {
              copy(link);
            }}
          >
            <Button text="copy" />
          </span>
        </span>
      </div>
    </div>
  );
};

export default ShareDialog;
