import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/api/api";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/userReducer";
import axios from "axios";
import { UploadingLoader } from "../Components/Loader";
import PasswordStrengthMeter from "../Components/PasswordStrengthMeter";

const Signup = () => {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [userDetails, setUserDetails] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        userDetails,
        {
          withCredentials: true,
        }
      );
      setIsLoading(false)
      localStorage.setItem("token", data?.token)
      dispatch(userExists(data?.user));
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsLoading(false)
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-100 relative overflow-hidden">
      {isLoading && <UploadingLoader />}
      <div className="absolute w-48 h-48 rounded-full overflow-hidden top-1/4 left-[10vw]">
        <img src="/assets/logo.png" alt="" />
      </div>
      <div className="w-full h-[100vw] -top-40 -right-[45%] rounded-full bg-sky-500 absolute"></div>
      <div className="w-full h-full relative flex items-center px-4 justify-center">
        <form onSubmit={handleSubmit}>
          <div className="bg-white sm:w-[30rem] w-full rounded-2xl shadow-sm p-10 relative z-50 py-10 sm:px-10 px-4">
            <h1 className="text-3xl font-bold text-center">
              Sign up to start <br />{" "}
              <span className="text-sky-500">Gathering</span>
            </h1>
            <div className="flex flex-col gap-3 mt-10 sm:px-12">
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
              <label className="w-full">
                Your Fullname
                <input
                  type="text"
                  className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500"
                  value={userDetails.fullName}
                  onChange={handleChange}
                  name="fullName"
                  placeholder="Type your full name"
                />
              </label>
              <label className="w-full">
                What we call you
                <input
                  type="text"
                  className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500"
                  value={userDetails.username}
                  onChange={handleChange}
                  name="username"
                  placeholder="What we call you ?"
                />
              </label>
              <label className="w-full relative">
                Password
                <div className="relative">
                  <input
                    type={isShow ? "text" : "password"}
                    className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500"
                    value={userDetails.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Create strong password"
                  />
                  {userDetails.password.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsShow((prev) => !prev)}
                      className="top-1/2 -translate-y-1/2 text-zinc-500 transition-all text-xl duration-300 hover:text-sky-500 right-2 absolute"
                    >
                      {isShow ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  )}
                </div>
                {userDetails.password.length > 0 && <PasswordStrengthMeter password={userDetails.password} />}
              </label>
              <button className="w-full p-3 bg-sky-500 mt-4 text-white rounded-lg font-bold transition-all duration-300 hover:bg-sky-600">
                Sign up
              </button>
              <span className="w-full text-center flex gap-1 justify-center">
                Already have an account?
                <Link
                  to={"/login"}
                  className="underline transition-all duration-300 hover:text-sky-500 font-semibold"
                >
                  Login
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

export default Signup;
