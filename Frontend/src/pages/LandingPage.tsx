import { Hero } from "../components/Hero";
import bg from "../assets/bg.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !(localStorage.getItem("token") === "" || !localStorage.getItem("token"))
    ) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="h-full overflow font-inter overflow-x-hidden relative">
      <img src={bg} alt="" className="absolute" />
      <Hero />
      <Footer />
    </div>
  );
};

export default LandingPage;
