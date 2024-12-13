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
      <div className="h-[85vh] flex justify-between w-[80%] m-auto relative z-10">
        <div className="h-full">
          <div className="h-full text-black-300 flex flex-col gap-2 justify-center">
            <span className="text-6xl">Your official</span>
            <span className="text-8xl font-bold mb-5 brain" >Second Brain !</span>
            <span className="text-xl font-extralight mb-2">
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
        <div className="flex gap-4 justify-center items-center">
            <img src={img1} alt="" className="w-[800px] object-contain rounded-lg z-10" />
            <span className="absolute translate-y-[-150px] translate-x-[-50px] rotate-[-45deg]"><img src={img2} alt="" className="w-[200px] rounded-3xl"/></span>
            <span className="absolute z-0 translate-x-[150px] translate-y-[-100px] rotate-45"><img src={img15} alt="" className="w-[300px] rounded-3xl" /></span>
        </div>
      </div>
    </div>
  );
}




