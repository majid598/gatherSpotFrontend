import axios from "axios";
import { BiLogOut } from "react-icons/bi";
import { FaPlay, FaSearch, FaUser } from "react-icons/fa";
import { FaRegSquarePlus, FaSquarePlus } from "react-icons/fa6";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { RiMessengerFill, RiMessengerLine } from "react-icons/ri";
import { VscDiffAdded } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userNotExists } from "../redux/reducers/userReducer";
import { server } from "../redux/api/api";
import Svg from "./Svg";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const buttons = [
    {
      name: "Home",
      path: "/",
      icon: <GoHome className="text-3xl" />,
      icon2: <GoHomeFill className="text-3xl text-sky-500" />,
    },
    {
      name: "Search",
      path: "/search",
      icon: <FaSearch className="text-3xl text-zinc-600" />,
      icon2: <FaSearch className="text-3xl text-sky-500" />,
    },
    {
      name: "Reels",
      path: "/reels",
      icon: <Svg className="text-zinc-600" />,
      icon2: <Svg className="text-sky-500" />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <IoIosNotificationsOutline className="text-3xl" />,
      icon2: <IoIosNotifications className="text-3xl text-sky-500" />,
    },
    {
      name: "Create",
      path: "/post/new",
      icon: <FaRegSquarePlus className="text-3xl" />,
      icon2: <FaSquarePlus className="text-3xl text-sky-500" />,
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
      .get(`${server}/api/v1/user/logout`, { withCredentials: true })
      .then(({ data }) => {
        navigate("/");
        toast.success(data?.message);
        dispatch(userNotExists());
      });
  };

  return (
    <div className="lg:w-[30rem] sidebar md:w-[30rem] sm:w-16 lg:block md:block sm:block hidden h-full lg:p-10 md:p-10 lg md:border-r border-zinc-500">
      <div className="w-full h-full bg-white relative z-50 rounded-2xl py-10 shadow-sm">
        <div className="w-full text-center flex items-center gap-2 px-4">
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
              className={`grid grid-col-2 px-4 w-full py-4 items-center hover:bg-zinc-200 gap-4 ${
                location.pathname === button.path && "bg-zinc-200"
              }`}
            >
              {location.pathname === button.path ? button.icon2 : button.icon}{" "}
              <h2
                className={`leading-none lg-text-sm lg:block ${
                  location.pathname === button.path && "text-sky-500"
                } md:block hidden text-xl font-semibold`}
              >
                {button.name}
              </h2>
            </Link>
          ))}
        </div>
        <div className="flex py-10 lg-py-6 flex-col items-center gap-2">
          <Link
            to={`/users/${user.username}`}
            className=" px-4 w-full py-4 grid grid-col-2 rounded-xl items-center hover:bg-zinc-200 gap-4"
          >
              {user?.profile ? (
                <div className="w-full h-full rounded-full overflow-hidden">
                <img src={user?.profile} className="w-full h-full" alt="" />
                </div>
              ) : (
                <FaUser className="text-xl" />
              )}
            <h2 className="leading-none text-xl lg-text-sm font-semibold">Profile</h2>
          </Link>
          <button
            onClick={logoutHandler}
            className="grid grid-col-2 px-4 w-full py-4 rounded-xl items-center hover:bg-zinc-200 gap-4"
          >
            <BiLogOut className="text-3xl w-full" />
            <h2 className="leading-none text-start lg-text-sm text-xl font-semibold">
              Logout
            </h2>
          </button>
        </div>
      </div>
      <div className="w-[24rem] absolute -bottom-40 -left-40 h-[24rem] blur-xl rounded-full bg-sky-500"></div>
    </div>
  );
};

export default Sidebar;
