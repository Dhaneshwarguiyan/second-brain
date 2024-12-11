import { useState } from "react";
import Button from "./Button";
import axios from "axios";

const Dialog = ({
  setDialog,
}: {
  setDialog: (args: (args: boolean) => boolean) => void;
}) => {
  const variant: Record<string, string> = {
    inp: "bg-transparent border border-black-700 rounded-lg p-3",
    label: "flex flex-col text-black-300 gap-2",
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addData = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/content", {
        title: formData.title,
        description: formData.description,
        link: formData.link,
      },{
        headers:{
          "Authorization":localStorage.getItem('token')
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLSpanElement>) => {
    e.preventDefault();
    addData();
  };
  return (
    //disable dialog on click outside....
    <div className="h-full w-full backdrop-blur-sm absolute flex items-center justify-center">
      <div className="w-[25%] h-fit border border-black-700 bg-black-900 p-5 rounded-lg">
        <div className="text-black-300 text-xl mb-3">New content</div>
        <form className="text-sm flex flex-col gap-3">
          <label htmlFor="title" className={variant.label}>
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={changeHandler}
              placeholder="Title of the content"
              className={variant.inp}
            />
          </label>
          <label htmlFor="description" className={variant.label}>
            Description
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={changeHandler}
              placeholder="Desc of the content"
              className={variant.inp}
            />
          </label>
          <label htmlFor="link" className={variant.label}>
            Url
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={changeHandler}
              placeholder="Url of the content"
              className={variant.inp}
            />
          </label>
          <span className="w-full flex justify-between mt-2">
            <Button text="Cancel" type="secondary" setDialog={setDialog} />
            <span onClick={submitHandler}>
              <Button text="Submit" setDialog={setDialog} />
            </span>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Dialog;
