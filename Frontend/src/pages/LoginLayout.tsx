import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import bg from '../assets/bg.png';
import { Toaster } from "react-hot-toast";

function LoginLayout() {
  return (
    <div className="h-full w-full m-auto  bg-black-900 bg-grid-small-slate-500/[0.9] font-inter absolute">
      <img src={bg} alt="" className="absolute"/>
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none inset-0 flex items-center justify-center bg-black-500 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>
      <Navbar />
      <span className="w-full h-[80vh] flex items-center justify-center">
      <Outlet />
      </span>
      <Toaster />
    </div>
  );
}

export default LoginLayout




