/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { login } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const LoginPage = () => {
  const variant: Record<string, string> = {
    inp: "bg-transparent border border-black-700 rounded-lg p-3 font-light",
    label: "flex flex-col text-black-300 gap-2",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const signinCall = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/signin",
        {
          email: inputForm.email,
          password: inputForm.password,
        },
      );
      toast.success("logged in")
      setTimeout(()=>{
        navigate("/home");
      },1000)
      dispatch(login({username:response.data.username,token:response.data.token}))
      localStorage.setItem("token", response.data.token);
    } catch(e) {
      //@ts-expect-error
      if(e.status === 403){
        toast.error('Incorrect email/password')
      }
      else{
        toast.error("Something went wrong")
      }
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLSpanElement>) => {
    e.preventDefault();
    signinCall();
  };
  return (
    <div className="font-inter xl:w-[25%] h-fit p-5 border border-black-700 rounded-lg backdrop-blur-2xl">
      <div>
        <h3 className="text-black-300 text-xl">Welcome to Brainly.in</h3>
        <p className="text-black-500 text-sm font-light">
          Please signin to have a good experiencce
        </p>
      </div>
      <form className="text-sm flex flex-col gap-4 mt-4">
        <label htmlFor="email" className={variant.label}>
          Email
          <input
            type="text"
            name="email"
            value={inputForm.email}
            onChange={handleInput}
            placeholder="Enter your email"
            className={variant.inp}
          />
        </label>
        <label htmlFor="password" className={variant.label}>
          Password
          <input
            type="password"
            name="password"
            value={inputForm.password}
            onChange={handleInput}
            placeholder="Password"
            className={variant.inp}
          />
        </label>
        <div className="flex justify-between">
          <div className="flex flex-col font-light text-black-500 text-sm">
            <p>New on our platform?</p>
            <p
              onClick={() => {
                navigate("/login/signup");
              }}
              className="font-medium cursor-pointer hover:text-black-300 hover:duration-300"
            >
              Create an account
            </p>
          </div>
          <span onClick={handleSubmit}>
            <Button text="Login" />
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
