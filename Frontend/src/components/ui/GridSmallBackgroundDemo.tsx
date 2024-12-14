import Navbar from "../Navbar";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img15 from "../../assets/15.png";

export function GridSmallBackgroundDemo() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full m-auto  bg-black-900 ">
      {/* Radial gradient for the container to give a faded look */}
    <Navbar />
      <div className="h-[85vh] flex  justify-between sm:w-[80%] px-4 m-auto relative">
        <div className="h-full">
          <div className="h-full text-black-300 flex flex-col gap-2 sm:justify-center mt-32 sm:mt-0 items-center sm:items-start">
            <span className="sm:text-6xl text-4xl">Your official</span>
            <span className="sm:text-8xl text-7xl font-bold mb-5 brain text-pretty text-center sm:text-start" >Second Brain!</span>
            <span className="sm:text-xl text-sm text-gray-400 font-extralight mb-2 text-center sm:text-start">
              Store all your link in one store your second brain
            </span>
            <span
              onClick={() => {
                navigate("/login");
              }}

            >
              <Button text="login" size="lg" />
            </span>
          </div>
        </div>
        <div className="sm:flex gap-4 justify-center items-center hidden">
            <img src={img1} alt="" className="w-[800px] object-contain rounded-lg z-10" />
            <span className="absolute translate-y-[-150px] translate-x-[-50px] rotate-[-45deg] hidden sm:block "><img src={img2} alt="" className="w-[200px] rounded-3xl"/></span>
            <span className="absolute z-0 translate-x-[150px] translate-y-[-100px] rotate-45 hidden sm:block"><img src={img15} alt="" className="w-[300px] rounded-3xl" /></span>
        </div>
      </div>
    </div>
  );
}




