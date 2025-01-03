import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import {z} from "zod";

const SignupPage = () => {
  const variant: Record<string, string> = {
    inp: "bg-transparent border border-black-700 rounded-lg p-3 font-light",
    label: "flex flex-col text-black-300 gap-2",
  };
  const userSchema = z.object({
    fullname:z.string().min(3,{message:"FullName should be 3-10 character long"}).max(10,{message:"FullName should be 3-10 character long"}),
    username:z.string().min(3,{message:"username should be 3-10 character long"}).max(10,{message:"username should be 3-10 character long"}),
    email:z.string().email({message:"Not a valid Email"}),
    password:z.string().min(8,{message:"Password must be 8-12 character long"})
  })
  // type userType = z.infer<typeof userSchema>;

  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [isFromValid,setIsFormValid] = useState({
    fullname: null,
    username: null,
    email: null,
    password: null,
  })

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
      toast.loading("Please wait..");
       await axios.post(
        `${import.meta.env.VITE_API}/api/v1/users/signup`,
        {
          fullname: inputForm.fullname,
          username: inputForm.username,
          email: inputForm.email,
          password: inputForm.password,
        },
      );
      toast.dismiss();
      toast.success("User Created Successfully")
      navigate("/login");
    } catch  {
      toast.error('something went wrong')
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const result = userSchema.safeParse(inputForm);
    if(result.success){
      signupCall();
      setIsFormValid({
        fullname: null,
        username: null,
        email: null,
        password: null,
      });
    }else{
      const parsedError = JSON.parse(result.error.message);
      const errors = parsedError.reduce((result: { [x: string]: string; },parsedError: { path: (string | number)[]; message: string; })=>{
          result[parsedError.path[0]] = parsedError.message;
          return result;
      },{})
      setIsFormValid({...errors})
    }
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
        {isFromValid.fullname && <div className="text-red-500">{isFromValid.fullname}</div>}
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
        {isFromValid.username && <div className="text-red-500">{isFromValid.username}</div>}
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
        {isFromValid.email && <div className="text-red-500">{isFromValid.email}</div>}
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
        {isFromValid.password && <div className="text-red-500">{isFromValid.password}</div>}
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
