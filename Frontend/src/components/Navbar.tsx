import Button from "./Button";
import { useNavigate } from "react-router-dom";
import logo from '../assets/brain.png'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex w-[80%] m-auto sm:justify-between justify-center py-5 drop-shadow-lg font-inter z-20">
        <div className="flex gap-4 items-center cursor-pointer" onClick={()=>{navigate('/')}}>
        <img src={logo} alt="" className="w-[35px] object-cover rounded-full"/>
        <span className="text-3xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-black-500 to-pink-300">Brainly.in</span>
        </div>
      <span className="sm:flex gap-4 hidden">
        {" "}
        <span
          onClick={() => {
            navigate("/login");
          }}
        >
          <Button text="login" size="lg"/>
        </span>
        <span
          onClick={() => {
            navigate("login/signup");
          }}
        >
          <Button text="signup" type="secondary" size="lg"/>
        </span>
      </span>
    </div>
  );
};

export default Navbar;
