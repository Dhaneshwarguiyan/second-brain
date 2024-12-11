import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Tabs from "../components/Tabs";
import Dialog from "../components/Dialog";
import Button from "../components/Button";
import Add from "../icons/Add";
import Share from "../icons/Share";
import { logout } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Layout = () => {
  const [active, setActive] = useState("Home");
  const [dialog, setDialog] = useState(false);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem("token", "");
    navigate("/");
  };
  console.log(token);
  useEffect(() => {
    if (token === "" || !token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-[100vw]  h-[100vh] overflow-hidden flex font-inter">
      {dialog && <Dialog setDialog={setDialog} />}
      <SideBar active={active} setActive={setActive} />
      <div className="border-y border-r w-full h-full border-y-black-700 border-r-black-700 text-black-300">
        <div className=" w-full h-[70px] flex items-center justify-between px-8">
          <Tabs />
          <div className="flex gap-5">
            <Button text={"Add content"} icon={<Add />} setDialog={setDialog} />
            <Button text={"Add content"} icon={<Share />} />
            <span onClick={handleLogout}>
              <Button text="Logout" />
            </span>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
