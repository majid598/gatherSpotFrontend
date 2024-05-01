import { FaPlay, FaSearch } from "react-icons/fa";
import { FaRegSquarePlus, FaSquarePlus } from "react-icons/fa6";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { RiMessengerFill, RiMessengerLine } from "react-icons/ri";
import { VscDiffAdded } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Svg from "./Svg";

const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const buttons = [
    {
      name: "Home",
      path: "/",
      icon: <GoHome className="text-3xl" />,
      icon2: <GoHomeFill className="text-3xl text-white" />,
    },
    {
      name: "Reels",
      path: "/reels",
      icon: <Svg className="text-zinc-600" />,
      icon2: <Svg className="text-white" />,
    },
    {
      name: "Create",
      path: "/post/new",
      icon: <FaRegSquarePlus className="text-3xl" />,
      icon2: <FaSquarePlus className="text-3xl text-white" />,
    },
    {
      name: "Search",
      path: "/search",
      icon: <FaSearch className="text-3xl text-zinc-600" />,
      icon2: <FaSearch className="text-3xl text-white" />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <IoIosNotificationsOutline className="text-3xl" />,
      icon2: <IoIosNotifications className="text-3xl text-white" />,
    },
    {
      name: "Notifications",
      path: `/users/${user?.username}`,
      icon: (
        <div className="w-10 h-10 rounded-full bg-zinc-300 overflow-hidden">
          <img src={user?.profile} className="w-full h-full" alt="" />
        </div>
      ),
      icon2: (
        <div className="w-10 h-10 rounded-full border-2 border-white bg-zinc-300 overflow-hidden">
          <img src={user?.profile} className="w-full h-full" alt="" />
        </div>
      ),
    },

    // {
    //   name: "Home",
    //   path: "/",
    //   icon: <GoHome />,
    //   icon2: <GoHomeFill />,
    // },
  ];

  return (
    <div className="w-full lg:hidden md:hidden sm:hidden h-16 absolute bottom-0 left-0 z-[999] bg-white border-t border-zinc-500">
      <div className="w-full h-full relative z-50 shadow-sm px-6">
        <div className="w-full h-full grid grid-cols-6 rounded-tl-3xl rounded-tr-3xl items-center">
          {buttons.map((button) => (
            <Link
              key={button.name}
              to={button.path}
              className={`flex w-full h-full items-center justify-center  gap-4 ${
                location.pathname === button.path
                  ? "bg-sky-500 hover:bg-sky-500"
                  : "hover:bg-sky-200"
              }`}
            >
              {location.pathname === button.path ? button.icon2 : button.icon}{" "}
            </Link>
          ))}
        </div>
        <div className="flex py-10 flex-col items-center gap-2">
          <Link
            to={`/users/${user?.username}`}
            className="flex px-4 w-full py-4 rounded-xl items-center hover:bg-zinc-200 gap-4"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="/assets/pfl.jpg" alt="" />
            </div>
            <h2 className="leading-none text-xl font-semibold">Profile</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
