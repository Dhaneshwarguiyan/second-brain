import { useEffect, useState } from "react";
import Button from "./Button";
import { addData } from "../utils/fetchData";
import { editContent } from "../utils/fetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialog } from "../slices/dialogTriggers";
import { clearForm } from "../slices/formData";
import type { RootState } from "../store/store";

const variant: Record<string, string> = {
  inp: "bg-transparent border border-black-700 rounded-lg p-3",
  label: "flex flex-col text-black-300 gap-2",
};
const Dialog = () => {
  const dispatch = useDispatch();

  const form = useSelector((state:RootState)=> state.form);
  const id = useSelector((state:RootState)=>state.id.id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [edit] = useState(form.title !== "");

  useEffect(()=>{
    setFormData({
      ...form
    })
  },[form])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const queryClient = useQueryClient(); //access the query cache
  const mutation = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      //invalidate the users query after a successfull mutation
      queryClient.invalidateQueries();
    },
  });
  const editMutation = useMutation({
    mutationFn: editContent,
    onSuccess: () => {
      //invalidate the users query after a successfull mutation
      queryClient.invalidateQueries();
    },
  });

  const clickHandler = () => {
    dispatch(toggleDialog());
    dispatch(clearForm());
  };

  return (
    //disable dialog on click outside....
    <div className="h-full w-full backdrop-blur-sm absolute flex items-center justify-center">
      <div className="w-[550px] h-fit border border-black-700 bg-black-900 p-5 rounded-lg">
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
            <span onClick={clickHandler}>
              <Button text="Cancel" type="secondary" />
            </span>
            {edit ? 
            <span onClick={()=>{
              editMutation.mutate({id,formData});
              clickHandler();
            }}>
              <Button text="Save"/>
            </span>:
            <span
              onClick={() => {
                mutation.mutate(formData);
                clickHandler();
              }}
            >
              <Button text="Submit" />
            </span>}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Dialog;
