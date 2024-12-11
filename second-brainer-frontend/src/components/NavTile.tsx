import { ReactElement } from "react";

interface propType {
  icon: ReactElement;
  text: string;
  setActive:(arg:string)=>void,
  active?:boolean
}

const NavTile = ({text,icon,active,setActive}:propType) => {
  return (
    <div className={`w-full text-black-300 cursor-pointer flex gap-3 px-4 py-3 rounded-lg text-sm ${active ? "bg-black-700": "bg-black-900"}`} onClick={()=>setActive(text)}>
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default NavTile;
