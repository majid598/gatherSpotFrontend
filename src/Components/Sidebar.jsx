import { Avatar, Badge } from "@mui/material";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { FaRegSquarePlus, FaSquarePlus } from "react-icons/fa6";
import { GoBell, GoBellFill, GoHome, GoHomeFill, GoListUnordered, GoSearch, GoSignOut } from "react-icons/go";
import { IoChatbubbleEllipsesOutline, IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdGroups2 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../redux/api/api";
import { userNotExists } from "../redux/reducers/userReducer";
import Svg from "./Svg";
import { useReset } from "../Requests/GetRequest";
import { useKnowIsChat } from "../Utils/features";
import ChatList from "./Chat/ChatList";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const reset = useReset()
  const { id } = useParams()
  const isChat = useKnowIsChat(location, id)
  const buttons = [
    {
      name: "Home",
      path: "/",
      icon: <GoHome className="text-2xl text-zinc-500" />,
      icon2: <GoHomeFill className="text-2xl text-sky-500" />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      badge: true,
      handler: reset,
      query: "?type=all",
      icon: <GoBell className="text-2xl text-zinc-500" />,
      icon2: <GoBellFill className="text-2xl text-sky-500" />,
    },
    {
      name: "Chats",
      path: "/chats",
      icon: <IoChatbubbleEllipsesOutline className="text-2xl text-zinc-500" />,
      icon2: <IoChatbubbleEllipsesSharp className="text-2xl text-sky-500" />,
    },
    {
      name: "Lists",
      path: "/user/lists",
      icon: <GoListUnordered className="text-2xl text-zinc-500" />,
      icon2: <GoListUnordered className="text-2xl text-sky-500" />,
    },
    {
      name: "Friends",
      path: "/user/friends",
      icon: <MdGroups2 className="text-2xl text-zinc-500" />,
      icon2: <MdGroups2 className="text-2xl text-sky-500" />,
    },
    {
      name: "Reels",
      path: "/reels",
      icon: <Svg className="text-zinc-500" />,
      icon2: <Svg className="text-sky-500" />,
    },
    {
      name: "Search",
      path: "/search",
      icon: <GoSearch className="text-2xl text-zinc-600" />,
      icon2: <GoSearch className="text-2xl text-sky-500" />,
    },
    {
      name: "Create",
      path: "/post/new",
      icon: <FaRegSquarePlus className="text-2xl text-zinc-500" />,
      icon2: <FaSquarePlus className="text-2xl text-sky-500" />,
    },
    // {
    //   name: "Home",
    //   path: "/",
    //   icon: <GoHome />,
    //   icon2: <GoHomeFill />,
    // },
  ];


  const logoutHandler = async () => {
    await axios
      .get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
        headers: {
          "token": localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        localStorage.removeItem("token")
        toast.success(data?.message);
        dispatch(userNotExists());
      }).catch((err) => {
        toast.error(err?.response?.data?.message)
      });
  };

  return (
    <div className="sidebar lg:w-[22rem] md:w-[16rem] sm:w-16 lg:block md:block sm:block hidden h-full md:border-r border-zinc-500">
      {isChat ? <ChatList /> :
        <div className="w-full h-full bg-white relative z-50 py-10">
          <div className="w-full text-center flex items-center gap-2 px-10">
            <img
              src="/assets/logo.png"
              className="w-10 h-10 rounded-full object-contain"
              alt="GatherSpot"
            />
            <h2 className="text-2xl font-bold lg:block md:block hidden font-mono">
              GatherSpot
            </h2>
          </div>
          <div className="w-full flex py-10 lg-pb-0 lg-pt-0 flex-col items-center">
            {buttons.map((button) => (
              <Link
                key={button.name}
                to={button.path}
                onClick={button?.handler}
                className={`grid grid-col-2 px-10 w-full py-4 items-center hover:bg-zinc-200 gap-4 relative ${location.pathname === button.path && "bg-zinc-200"
                  }`}
              >
                {button?.badge && user?.notificationCount > 0 && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-sky-500">{user?.notificationCount} new</span>}
                {location.pathname === button.path ? button.icon2 : button.icon}{" "}
                <h2
                  className={`leading-none lg-text-sm lg:block ${location.pathname === button.path ? "text-sky-500" : "text-zinc-500"
                    } md:block hidden font-semibold`}
                >
                  {button.name}
                </h2>
              </Link>
            ))}
          </div>
          <div className="flex py-10 lg-py-6 flex-col items-center gap-2">
            <Link
              to={`/profile?user=${user?.username}`}
              className="px-10 w-full py-4 grid grid-col-2 items-center hover:bg-zinc-200 gap-4"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2">
                <Avatar src={user?.profile?.url} style={{ width: "100%", height: "100%" }} alt="" />
              </div>
              <h2 className="leading-none md:block hidden lg-text-sm font-semibold">Profile</h2>
            </Link>
            <button
              onClick={logoutHandler}
              className="grid grid-col-2 px-10 w-full py-4 items-center hover:bg-zinc-200 gap-4"
            >
              <GoSignOut className="text-2xl w-full" />
              <h2 className="leading-none md:block hidden text-start lg-text-sm font-semibold">
                Logout
              </h2>
            </button>
          </div>
        </div>
      }
      <div className="w-[24rem] absolute -bottom-40 -left-40 h-[24rem] blur-xl rounded-full bg-sky-500"></div>
    </div >
  );
};

export default Sidebar;
