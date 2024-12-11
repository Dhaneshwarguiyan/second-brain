import { useState } from "react";

const Tabs = () => {
    const tabs:string[] = ["All","Youtube","Twitter"];
    const [active,setActive] = useState("All");
  return (
    <div className="text-sm bg-black-700  px-1 flex items-center p-1 rounded-lg text-black-300 w-fit">
      {
        tabs.map((tab,i)=>{
            return <span key={i} className={`cursor-pointer ${active === tab ? "bg-black-900 px-3 py-2 rounded-lg":"bg-black-700 px-3 py-2"}`} onClick={()=>{setActive(tab)}}>{tab}</span>
        })
      }
    </div>
  )
}

export default Tabs
