import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SharePage from "./pages/SharePage";
import SignupPage from "./pages/SignupPage";
import LoginLayout from "./pages/LoginLayout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import SettingPage from "./pages/SettingPage";
import SearchPage from "./pages/SearchPage";
import { useState } from "react";

function App() {
  const [activeTab,setActiveTab] = useState("All");
  return (
    <div className="bg-black-900 h-[100vh]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
          <Route path="/share/:link" element={<SharePage />} />
          <Route path="/home" element={<Layout activeTab={activeTab} setActiveTab={setActiveTab}/>}>
            <Route index element={<HomePage activeTab={activeTab}/>} />
            <Route path="search" element={<SearchPage />} />
            <Route path="setting" element={<SettingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
