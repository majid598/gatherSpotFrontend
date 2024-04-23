import { useState } from "react";
import { FaFacebook, FaFacebookSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { server } from "../redux/api/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/userReducer";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        userDetails,
        {
          withCredentials: true,
        }
      );
      // navigate("/profile");
      dispatch(userExists(true));
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-100 relative overflow-hidden">
      <div className="absolute w-48 h-48 rounded-full overflow-hidden top-1/4 left-[10vw]">
        <img src="/assets/logo.png" alt="" />
      </div>
      <div className="w-full h-[100vw] -top-40 -right-[45%] rounded-full bg-sky-500 absolute"></div>
      <div className="w-full h-full relative flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div className="bg-white w-[30rem]  rounded-2xl shadow-sm p-10">
            <h1 className="text-2xl font-bold text-center">
              Login to continue <br />{" "}
              <span className="text-sky-500">Gathering</span>
            </h1>
            <div className="flex flex-col gap-3 mt-10 px-12">
              <label className="w-full">
                Email or Phone
                <input
                  type="text"
                  className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500"
                  value={userDetails.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="Your email or phone number"
                />
              </label>
              <label className="w-full relative">
                Password
                <input
                  type={isShow ? "text" : "password"}
                  className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500"
                  value={userDetails.password}
                  onChange={handleChange}
                  name="password"
                  placeholder="Your password"
                />
                {userDetails.password.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsShow((prev) => !prev)}
                    className="top-[2.3vw] text-zinc-500 transition-all text-xl duration-300 hover:text-sky-500 right-2 absolute"
                  >
                    {isShow ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                )}
              </label>
              <button className="w-full p-3 bg-sky-500 mt-4 text-white rounded-lg font-bold transition-all duration-300 hover:bg-sky-600">
                Log in
              </button>
              <span className="w-full text-center flex gap-1 justify-center">
                Don&apos;t have an account?
                <Link
                  to={"/signup"}
                  className="underline transition-all duration-300 hover:text-sky-500 font-semibold"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>

      <div className="w-[24rem] absolute -bottom-40 -left-40 h-[24rem] rounded-full bg-sky-500"></div>
    </div>
  );
};

export default Login;
