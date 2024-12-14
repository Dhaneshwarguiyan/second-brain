import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const variant: Record<string, string> = {
    inp: "bg-transparent border border-black-700 rounded-lg p-3 font-light",
    label: "flex flex-col text-black-300 gap-2",
  };
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState({
    fullname: "",
    username: "",
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

  const signupCall = async () => {
    try {
       await axios.post(
        "http://localhost:8000/api/v1/users/signup",
        {
          fullname: inputForm.fullname,
          username: inputForm.username,
          email: inputForm.email,
          password: inputForm.password,
        },
      );
      toast.success("User Created")
      navigate("/login");
    } catch (error) {
      toast.error('something went wrong')
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLSpanElement>) => {
    e.preventDefault();
    signupCall();
  };
  return (
    <div className="font-inter xl:w-[25%] h-fit p-5 border border-black-700 rounded-lg backdrop-blur-2xl">
      <div>
        <h3 className="text-black-300 text-xl">Welcome to Brainly.in</h3>
        <p className="text-black-500 text-sm font-light">Please signup</p>
      </div>
      <form className="text-sm flex flex-col gap-4 mt-4">
        <label htmlFor="fullname" className={variant.label}>
          Fullname
        <input
          type="text"
          name="fullname"
          value={inputForm.fullname}
          onChange={handleInput}
          placeholder="Jhon Doe"
          className={variant.inp}
        />
        </label>
        <label htmlFor="username" className={variant.label}>
          Username
        <input
          type="text"
          name="username"
          value={inputForm.username}
          onChange={handleInput}
          placeholder="@jhondoe4651"
          className={variant.inp}
        />
        </label>
        <label htmlFor="email" className={variant.label}>
          Email
        <input
          type="email"
          name="email"
          value={inputForm.email}
          onChange={handleInput}
          placeholder="jhondoe4651@gmail.com"
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
        <p>New on our platform</p>
        <p
          onClick={() => {
            navigate("/login");
          }}
          className="font-medium cursor-pointer hover:text-black-300 hover:duration-300"
        >
          Already have an account
        </p>
      </div>
        <span onClick={handleSubmit}><Button text="Signup"/></span>
        </div>
      </form>

    </div>
  );
};

export default SignupPage;
