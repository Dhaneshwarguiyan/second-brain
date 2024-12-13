import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Tabs from "../components/Tabs";
import Dialog from "../components/Dialog";
import Button from "../components/Button";
import Add from "../icons/Add";
import Share from "../icons/Share";
import { logout } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import { toggleDialog } from "../slices/dialogTriggers";
import { toggleShareDialog } from "../slices/dialogTriggers";
import ShareDialog from "../components/ShareDialog";
import toast, { Toaster } from "react-hot-toast";

const Layout = ({setActiveTab,activeTab}:{setActiveTab:Dispatch<SetStateAction<string>>,activeTab:string}) => {
  const [active, setActive] = useState("Home");

  const dialog = useSelector((state: RootState) => state.trigger.dialog);
  const shareDialog = useSelector(
    (state: RootState) => state.trigger.shareDialog,
  );
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem("token", "");
    toast.success("Logged Out");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  useEffect(() => {
    if (token === "" || !token) {
      navigate("/");
    }
  });
  return (
    <div className="w-[100vw]  h-[100vh] overflow-hidden flex font-inter">
      {dialog && <Dialog />}
      {shareDialog && <ShareDialog />}
      <SideBar active={active} setActive={setActive} />
      <div className="border-y border-r w-full h-full border-y-black-700 border-r-black-700 text-black-300">
        <div className=" w-full h-[70px] flex items-center justify-between px-8">
          <Tabs setActiveTab={setActiveTab} activeTab={activeTab}/>
          <div className="flex gap-5">
            <span onClick={() => dispatch(toggleDialog())}>
              <Button text={"Add content"} icon={<Add />} />
            </span>
            <span onClick={()=>{dispatch(toggleShareDialog())}}>
              <Button text={"Share content"} icon={<Share />} />
            </span>
            <span onClick={handleLogout}>
              <Button text="Logout" />
            </span>
          </div>
        </div>
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
