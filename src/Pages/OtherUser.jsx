import { Avatar, Dialog } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaUserPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Liked from "../Components/Profile/Liked";
import Photos from "../Components/Profile/Photos";
import Posts from "../Components/Profile/Posts";
import Reels from "../Components/Profile/Reels";
import Saved from "../Components/Profile/Saved";
import Videos from "../Components/Profile/Videos";
import ReelLoader from "../Components/ReelLoader";
import Layout from "../Layout/Layout";
import { useGetSingleUser } from "../Requests/GetRequest";
import { useFollowAUser, useSendFriendRequest } from "../Requests/PostRequests";

const Profile = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineStyle, setLineStyle] = useState({});
  const navRef = useRef(null);
  const [posts, setPosts] = useState(true);
  const [photos, setPhotos] = useState(false);
  const [videos, setVideos] = useState(false);
  const [reels, setReels] = useState(false);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState("Posts")
  const [openProfilePhoto, setOpenProfilePhoto] = useState(false)
  const { user } = useGetSingleUser(id)
  const [followerLength, setFollowerLength] = useState(user?.followers.length);
  const [followingLength, setFollowingLength] = useState(
    user?.following.length
  );
  const [loading, setLoading] = useState(false)
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

  const follow = useFollowAUser()
  const { user: me } = useSelector(state => state.auth)

  const { sendReq, isLoading } = useSendFriendRequest()

  const buttons = [
    {
      name: "Posts", handler: (index) => {
        setActiveIndex(index)
        setSelectedBtn("Posts")
        setPosts(true)
        setPhotos(false)
        setVideos(false)
        setReels(false)
        setLiked(false)
        setSaved(false)
      }
    },
    {
      name: "Photos", handler: (index) => {
        setActiveIndex(index)
        setSelectedBtn("Photos")
        setPosts(false)
        setPhotos(true)
        setVideos(false)
        setReels(false)
        setLiked(false)
        setSaved(false)
      }
    },
    {
      name: "Videos", handler: (index) => {
        setActiveIndex(index)
        setSelectedBtn("Videos")
        setPosts(false)
        setPhotos(false)
        setVideos(true)
        setReels(false)
        setLiked(false)
        setSaved(false)
      }
    },
    {
      name: "Reels", handler: (index) => {
        setActiveIndex(index)
        setSelectedBtn("Reels")
        setPosts(false)
        setPhotos(false)
        setVideos(false)
        setReels(true)
        setLiked(false)
        setSaved(false)
      }
    },
    {
      name: "Liked", handler: (index) => {
        setActiveIndex(index)
        setSelectedBtn("Posts")
        setPosts(false)
        setPhotos(false)
        setVideos(false)
        setReels(false)
        setLiked(true)
        setSaved(false)
      }
    },
    {
      name: "Saved", handler: (index) => {
        setActiveIndex(index)
        setSelectedBtn("Saved")
        setPosts(false)
        setPhotos(false)
        setVideos(false)
        setReels(false)
        setLiked(false)
        setSaved(true)
      }
    },
  ]

  useEffect(() => {
    const updateLinePosition = () => {
      if (navRef.current) {
        const button = navRef.current.children[activeIndex];
        setLineStyle({
          width: button.offsetWidth,
          left: button.offsetLeft,
        });
      }
    };

    updateLinePosition();
    window.addEventListener('resize', updateLinePosition);

    return () => window.removeEventListener('resize', updateLinePosition);
  }, [activeIndex]);
  useEffect(() => {
    followerDisplay();
  }, []);

  return (
    <Layout>
      <div className="w-full h-full pb-40">
        {loading && <ReelLoader message={"Profile Editing..."} />}
        <div className="w-full flex lg:flex-row md:flow-row flex-col gap-10 h-full">
          <div className="w-full">
            <div className="flex gap-4 p-10 items-start w-full relative z-50">
              <button onClick={() => navigate("/")}><FaArrowLeft className="text-xl text-zinc-600" /></button>
              <div>
                <h2 className="font-semibold">{user?.fullName}</h2>
                <span className="font-semibold text-zinc-500 text-sm">{user?.posts?.length} Posts</span>
              </div>
            </div>
            <div className="absolute w-full h-72 top-0 flex items-center justify-center">
              {user?.coverPhoto &&
                <img src={user?.coverPhoto?.url} className="w-full h-full object-cover" />
              }
            </div>
            <div className="w-full mt-40 px-10 bg-white min-h-[80vh] relative">
              <div className="w-full h-20 relative">
                <div className="w-full h-full absolute -top-1/2 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <button onClick={() => setOpenProfilePhoto(true)} className="w-20 h-20 overflow-hidden rounded-full">
                      <Avatar src={user?.profile?.url} style={{ width: "100%", height: "100%" }} alt="" />
                    </button>
                    <div>
                      <h2 className="font-bold">{user?.fullName}</h2>
                      <h4 className="font-bold text-zinc-500">@{user?.username}</h4>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {user?.followers?.includes(me?._id) ?
                      <button onClick={() => follow(user?._id)} className="px-6 py-2 rounded-full bg-sky-500 transition-all duration-300 hover:bg-sky-600 flex items-center gap-2 font-bold text-white border-2 border-sky-500 hover:border-sky-600">
                        Following
                      </button> :
                      <button onClick={() => follow(user?._id)} className="px-6 py-2 rounded-full bg-sky-500 transition-all duration-300 hover:bg-sky-600 flex items-center gap-2 font-bold text-white border-2 border-sky-500 hover:border-sky-600">
                        Follow
                      </button>}
                    <button onClick={() => sendReq(user?._id)} className="px-6 py-2 rounded-full bg-zinc-100 flex items-center gap-2 font-bold text-zinc-600 border-2">
                      {isLoading ? "Sending..." : <><FaUserPlus /> Add</>}
                    </button>
                  </div>
                </div>
              </div>
              <nav ref={navRef} className="flex mt-10 relative gap-12 pb-2" >
                {buttons.map((button, index) => (
                  <button
                    key={index}
                    className={`nav-button font-semibold ${activeIndex === index ? 'active' : ''} ${selectedBtn === button.name ? "text-black" : "text-zinc-500"} transition-all duration-300`}
                    onClick={() => button.handler(index)}
                  >
                    {button.name}
                  </button>
                ))}
                <div className=" absolute bottom-0 transition-all duration-300 z-50 bg-black h-1" style={lineStyle}></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-200"></div>
              </nav>
              {posts && <Posts id={user?._id} />}
              {photos && <Photos id={user?._id} />}
              {videos && <Videos id={user?._id} />}
              {reels && <Reels id={user?._id} />}
              {liked && <Liked />}
              {saved && <Saved />}
              {/* {photos && "Photos"} */}
              <div className="h-60"></div>
            </div>
          </div>
        </div>
      </div>
      {openProfilePhoto && <Dialog open={openProfilePhoto} onClose={() => setOpenProfilePhoto(false)} PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          width: "100%",
          height: "100%"
        },
      }}>
        <div className="w-full h-full">
          <button className="text-white fixed right-5" onClick={() => setOpenProfilePhoto(false)}><IoMdClose className="text-5xl" /></button>
          <img src={user?.profile?.url} className="w-full h-full object-contain" alt="" />
        </div>
      </Dialog>
      }
    </Layout>
  );
};

export default Profile;
