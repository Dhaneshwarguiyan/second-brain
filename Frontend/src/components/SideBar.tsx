import NavTile from "../components/NavTile";
import Home from "../icons/Home";
// import Search from "../icons/Search";
import { ReactElement } from "react";

interface itemType {
  icon: ReactElement;
  text: string;
}

const SideBar = ({
  active,
  setActive,
}: {
  active: string;
  setActive: (args: string) => void;
}) => {
  const items: itemType[] = [
    {
      icon: <Home />,
      text: "Home",
    },
    // {
    //   icon: <Search />,
    //   text: "Search",
    // },
  ];

  return (
    <div className="w-[15vw] h-full border border-black-700 text-black-300 lg:flex flex-col items-start py-4 px-3 hidden ">
      <span className="px-4 mb-2 text-black-300 text-lg">Dashboard</span>
      <div className="w-full flex flex-col gap-2">
        {items.map((item, i) => {
          return (
            <NavTile
              text={item.text}
              icon={item.icon}
              key={i}
              setActive={setActive}
              active={active === item.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
