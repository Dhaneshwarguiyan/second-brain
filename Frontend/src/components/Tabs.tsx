import { Dispatch, SetStateAction } from "react";

const Tabs = ({setActiveTab,activeTab}:{setActiveTab:Dispatch<SetStateAction<string>>,activeTab:string}) => {
    const tabs:string[] = ["All","Youtube","Twitter","Notion","Website"];
  return (
    <div className="text-sm bg-black-700  px-1 flex items-center p-1 rounded-lg text-black-300 w-fit">
      {
        tabs.map((tab,i)=>{
            return <span key={i} className={`cursor-pointer ${activeTab === tab ? "bg-black-900 px-3 py-2 rounded-lg":"bg-black-700 px-3 py-2"}`} onClick={()=>{setActiveTab(tab)}}>{tab}</span>
        })
      }
    </div>
  )
}

export default Tabs
