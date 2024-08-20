import { Avatar } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { GoBell, GoBellFill, GoHome, GoHomeFill, GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Svg from "./Svg";
import { IoChatbubbleEllipsesOutline, IoChatbubbleEllipsesSharp } from "react-icons/io5";

const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const buttons = [
    {
      name: "Home",
      path: "/",
      icon: <GoHome className="text-2xl text-zinc-500" />,
      icon2: <GoHomeFill className="text-2xl text-white" />,
    },
    {
      name: "Search",
      path: "/search",
      icon: <GoSearch className="text-2xl text-zinc-500" />,
      icon2: <GoSearch className="text-2xl text-white" />,
    },
    {
      name: "Reels",
      path: "/reels",
      icon: <Svg className="text-zinc-500" />,
      icon2: <Svg className="text-white" />,
    },
    {
      name: "Notifications",
      path: "/chats",
      icon: <IoChatbubbleEllipsesOutline className="text-2xl text-zinc-500" />,
      icon2: <IoChatbubbleEllipsesSharp className="text-2xl text-sky-500" />,
    },

    // {
    //   name: "Home",
    //   path: "/",
    //   icon: <GoHome />,
    //   icon2: <GoHomeFill />,
    // },
  ];

  return (
    <div className="w-full sm:hidden h-16 bottom-0 left-0 z-[999] bg-white border-t-2">
      <div className="w-full h-full relative z-50 px-6">
        <div className="w-full h-full grid grid-cols-5 relative justify-between rounded-tl-3xl rounded-tr-3xl items-center">
          {buttons.map((button) => (
            <Link
              key={button.name}
              to={button.path}
              className={`flex w-full h-full p-2 items-center hover:bg-sky-200 justify-center gap-4 ${location.pathname === button.path
                ? "bg-sky-500"
                : ""
                }`}
            >
              {location.pathname === button.path ? button.icon2 : button.icon}{" "}
            </Link>
          ))}
          <Link
            to={`/profile?user=${user?.username}`}
            className={`flex items-center w-full h-full justify-center  gap-4`}
          >
            <div className="w-10 h-10 rounded-full border-2 border-white bg-zinc-300 overflow-hidden">
              <Avatar src={user?.profile?.url} style={{ width: "100%", height: "100%" }} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
