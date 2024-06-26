import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { BiLink, BiLogOut } from "react-icons/bi";
import { FaCamera, FaPlay } from "react-icons/fa";
import {
  server,
  useEditProfileMutation,
  useLogoutQuery,
} from "../redux/api/api";
import axios from "axios";
import { toast } from "react-toastify";
import ContentDisplay from "../Components/ContentDisplay";
import { userNotExists } from "../redux/reducers/userReducer";
import { BsBank } from "react-icons/bs";
import ReelLoader from "../Components/ReelLoader";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [all, setAll] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState(false);
  const [reels, setReels] = useState(false);
  const [favourites, setFavourites] = useState(false);
  const [image, setImage] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [bio, setBio] = useState(user?.bio);
  const [username, setUsername] = useState(user?.username);
  const [fullName, setFullName] = useState(user?.fullName);
  const [followerLength, setFollowerLength] = useState(user?.followers.length);
  const [followingLength, setFollowingLength] = useState(
    user?.following.length
  );

  const amount = user.credits * 1;
  const [loading, setLoading] = useState(false);

  const [editProfile] = useEditProfileMutation();

  const imageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEdit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let url;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "insta-cloud");
    formData.append("cloud_name", "dfmcsvthn");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfmcsvthn/image/upload",
        formData
      );
      url = response.data.url;
      console.log(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    const data = {
      profile: url,
      fullName,
      username,
      bio,
    };
    editProfile(data)
      .unwrap()
      .then((data) => {
        setIsEdit(false);
        setLoading(false);
        toast.success(data?.message);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.data?.message);
      });
  };
  const followerDisplay = () => {
    const formatted =
      user?.followers?.length >= 1000 && user?.followers?.length < 2000
        ? `${(user?.followers?.length / 1000).toFixed(1)}k`
        : user?.followers?.length;
    setFollowerLength(formatted);
    const following =
      user?.following?.length >= 1000 && user?.following?.length < 2000
        ? `${(user?.following?.length / 1000).toFixed(1)}k`
        : user?.following?.length;
    setFollowingLength(following);
  };
  useEffect(() => {
    followerDisplay();
  }, []);

  return (
    <Layout>
      <div className="w-full h-full overflow-hidden overflow-y-scroll px-10 py-10">
        {loading && <ReelLoader message={"Profile Editing..."} />}
        <div className="w-full flex lg:flex-row md:flow-row flex-col gap-10 h-full">
          <div className="min-w-[25rem] profileside min-h-[80vh] p-10 pb-0 bg-white shadow-sm lg:flex md:flex sm:flex hidden flex-col items-center rounded-3xl">
            <div className="profile bg-zinc-500 w-28 h-28 relative rounded-full overflow-hidden">
              <img src={user?.profile} className="w-full h-full" alt="" />
              <div className="w-full h-full absolute top-0 left-0 transition-all duration-300 opacity-0 hover:opacity-100 bg-black/30 flex items-center justify-center">
                <label htmlFor="file" className=" cursor-pointer">
                  <FaCamera className="text-2xl text-white" />
                  <input type="file" hidden id="file" onChange={imageChange} />
                </label>
              </div>
            </div>
            <h2 className="text-zinc-600 mt-2">{user.username}</h2>
            <div className="w-full px-12">
              <button
                onClick={() => setIsEdit(true)}
                className="w-full py-2 text-white mt-5 transition-all duration-300 hover:bg-sky-600 font-semibold bg-sky-500 rounded-lg"
              >
                Edit Profile
              </button>
            </div>
            <div className="w-full py-5 flex flex-col gap-2">
              <div
                className={`w-full py-2 flex flex-col border-2 ${
                  isEdit && "border-black/30"
                } rounded-lg px-4`}
              >
                <span className="text-xs text-zinc-500">Name</span>
                <input
                  type="text"
                  readOnly={!isEdit}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="outline-none bg-transparent text-sm border-none"
                />
              </div>
              <div
                className={`w-full py-2 flex flex-col border-2 ${
                  isEdit && "border-black/30"
                } rounded-lg px-4`}
              >
                <span className="text-xs text-zinc-500">username</span>
                <input
                  type="text"
                  readOnly={!isEdit}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="outline-none bg-transparent text-sm border-none"
                />
              </div>
              <div
                className={`w-full py-2 flex flex-col border-2 ${
                  isEdit && "border-black/30"
                } rounded-lg px-4`}
              >
                <span className="text-xs text-zinc-500">Bio</span>
                <textarea
                  type="text"
                  readOnly={!isEdit}
                  value={user.bio}
                  className="outline-none resize-none bg-transparent text-sm border-none"
                />
              </div>
              {user.easypesa ? (
                <div
                  className={`w-full py-2 flex flex-col border-2 ${
                    isEdit && "border-black/30"
                  } rounded-lg px-4`}
                >
                  <span className="text-xs text-zinc-500">
                    <img src="/assets/easy.png" width={80} alt="" />
                  </span>
                  <input
                    type="text"
                    readOnly={!isEdit}
                    value={"+92-3236195337"}
                    className="outline-none bg-transparent text-sm border-none"
                  />
                </div>
              ) : (
                <div className="w-full flex gap-2 py-2">
                  <BsBank />
                  <BsBank />
                  <BsBank />
                  <BsBank />
                  <BsBank />

                  <button>Add Account+</button>
                </div>
              )}
              {isEdit && (
                <div className="w-full flex justify-end mt-2">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 rounded-md text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 font-semibold"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col">
            <div className="mx-auto my-10 lg:hidden md:hidden sm:hidden flex flex-col">
              <div className="w-32 h-32 rounded-full bg-zinc-300 overflow-hidden">
                <img src={user?.profile} className="w-full h-full" alt="" />
              </div>
              <h2 className="text-center mt-5 font-semibold">{user?.fullName}</h2>
            </div>
            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 pb-10">
              <div className="w-full min-h-28 p-4 justify-between rounded-2xl bg-white shadow-sm flex flex-col items-center">
                <h3 className="font-bold">Credits</h3>
                <div className="w-full min-h-12 rounded-lg flex items-center justify-center bg-sky-100">
                  <span className="font-bold">{user.credits}</span>
                </div>
              </div>
              <div className="w-full min-h-28 p-4 justify-between rounded-2xl bg-white shadow-sm flex flex-col items-center">
                <h3 className="font-bold">Exchange</h3>
                <div className="w-full min-h-12 rounded-lg flex items-center justify-center bg-sky-100">
                  <span className="font-bold">
                    {user.credits}C = {amount} PKR
                  </span>
                </div>
              </div>
              <div className="w-full min-h-28 p-4 justify-between rounded-2xl bg-white shadow-sm flex flex-col items-center">
                <h3 className="font-bold">{amount} PKR</h3>
                <div className="w-full min-h-12 rounded-lg flex items-center justify-center">
                  <button
                    disabled={user.credits < 100}
                    className="bg-sky-500 text-white transition-all duration-300 hover:bg-sky-600 disabled:opacity-70 disabled:cursor-not-allowed w-full font-bold px-4 py-2 rounded-lg"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full overflow-y-scroll bg-white h-[70vh] max-h-[70vh] rounded-2xl shadow-sm">
              <div className="max-w-full overflow-y-scroll">
                <div className="w-full py-4 flex justify-between border-b px-16 border-black/20">
                  <div className="flex flex-col gap-1 items-center">
                    <span className="leading-none font-semibold">
                      {user?.posts?.length + user?.reels?.length}
                    </span>
                    <h3 className="leading-none">posts</h3>
                  </div>
                  <Link
                    to="/user/followers"
                    className="flex flex-col gap-1 items-center"
                  >
                    <span className="leading-none font-semibold">
                      {followerLength}
                    </span>
                    <h3 className="leading-none">followers</h3>
                  </Link>
                  <Link
                    to="/user/following"
                    className="flex flex-col gap-1 items-center"
                  >
                    <span className="leading-none font-semibold">
                      {followingLength}
                    </span>
                    <h3 className="leading-none">following</h3>
                  </Link>
                </div>
              </div>
              <div className="w-full px-12 flex items-center justify-between transition-all duration-300 py-4 border-b border-black/20">
                <button
                  onClick={() => {
                    setAll(true);
                    setPosts(false);
                    setReels(false);
                    setFavourites(false);
                  }}
                >
                  <div
                    className={`w-5 h-5 border transition-all duration-300 ${
                      all ? "border-sky-500" : "border-black/40"
                    } grid grid-cols-3 grid-rows-3`}
                  >
                    {[...Array(9)].map((_, index) => {
                      return (
                        <div
                          className={`w-full h-full border transition-all duration-300 ${
                            all ? "border-sky-500" : "border-black/40"
                          }`}
                        ></div>
                      );
                    })}
                  </div>
                </button>
                <button
                  onClick={() => {
                    setAll(false);
                    setPosts(true);
                    setReels(false);
                    setFavourites(false);
                  }}
                  className="flex w-3 h-5 flex-col gap-0.5"
                >
                  <div
                    className={`w-full h-0.5 ${
                      posts ? "bg-sky-500" : "bg-black/40"
                    } transition-all duration-300`}
                  ></div>
                  <div
                    className={`w-full h-2.5 border-2 ${
                      posts ? "border-sky-500" : "border-black/40"
                    } transition-all duration-300`}
                  ></div>
                  <div
                    className={`w-full h-0.5 ${
                      posts ? "bg-sky-500" : "bg-black/40"
                    } transition-all duration-300`}
                  ></div>
                </button>
                <button
                  onClick={() => {
                    setAll(false);
                    setPosts(false);
                    setReels(true);
                    setFavourites(false);
                  }}
                  className={`border-[1px] h-5 rounded-md w-5 flex items-center justify-center transition-all duration-300 ${
                    reels ? "border-sky-500" : "border-black/40"
                  }`}
                >
                  <FaPlay
                    className={`text-[10px] transition-all duration-300 ${
                      reels ? "text-sky-600" : "text-black/40"
                    }`}
                  />
                </button>
                <button
                  onClick={() => {
                    setAll(false);
                    setPosts(false);
                    setReels(false);
                    setFavourites(true);
                  }}
                >
                  <button
                    className={`w-4 h-4 rounded-sm border-2 ${
                      favourites ? "border-sky-500" : "border-black/40"
                    } border-b-0 after:content-[''] after:absolute after:w-full after:h-3 after:border-2 transition-all duration-300 ${
                      favourites
                        ? "after:border-sky-500"
                        : "after:border-black/40"
                    } after:-bottom-1.5 overflow-hidden after:left-1/2 after:-translate-x-1/2 relative after:rotate-45 after:border-b-0 after:border-r-0`}
                  ></button>
                </button>
                <button>faks</button>
              </div>
              <div className="w-full grid mb-20 grid-cols-3 gap-0.5 justify-between bg-white border-t-[1px] border-black/60 h-full">
                {all && (
                  <>
                    {user?.posts?.map((post, index) => (
                      <div
                        key={index}
                        className="w-full inline-block h-64 bg-zinc-300"
                      >
                        <ContentDisplay src={post.attachMent} h="full" />
                      </div>
                    ))}
                  </>
                )}
                {reels && (
                  <>
                    {user?.reels?.map((reel, index) => (
                      <Link
                        to={`/reels`}
                        key={reel?._id}
                        className="w-full h-64 relative"
                      >
                        <video
                          src={reel?.attachMent}
                          autoPlay
                          muted
                          loop
                          className="w-full h-full object-cover"
                          alt=""
                        />
                        <div className="bottom-2 left-2 items-center absolute text-white flex gap-1">
                          <FaPlay className="text-sm" />
                          <span>{reel.views}</span>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
                {favourites && (
                  <>
                    {user?.favorites?.map((favorite, index) => (
                      <Link
                        to={`/reels`}
                        key={favorite?._id}
                        className="w-full h-40 bg-zinc-300 relative"
                      >
                        <video
                          src={favorite?.attachMent}
                          autoPlay
                          muted
                          loop
                          className="w-full h-full"
                          alt=""
                        />
                        <div className="bottom-2 left-2 items-center absolute text-white flex gap-1">
                          <FaPlay className="text-sm" />
                          <span>{favorite.views}</span>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
