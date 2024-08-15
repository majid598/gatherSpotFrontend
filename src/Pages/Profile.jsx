import { Dialog } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdClose, IoMdShare } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewPost from "../Components/Creation/NewPost";
import { ImageCropper } from "../Components/Hooks/userImageCroper";
import Liked from "../Components/Profile/Liked";
import Photos from "../Components/Profile/Photos";
import Posts from "../Components/Profile/Posts";
import Reels from "../Components/Profile/Reels";
import Saved from "../Components/Profile/Saved";
import Videos from "../Components/Profile/Videos";
import ReelLoader from "../Components/ReelLoader";
import Layout from "../Layout/Layout";
import {
  useEditProfileMutation
} from "../redux/api/api";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineStyle, setLineStyle] = useState({});
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [posts, setPosts] = useState(true);
  const [photos, setPhotos] = useState(false);
  const [videos, setVideos] = useState(false);
  // const [all, setAll] = useState(true);
  const [reels, setReels] = useState(false);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState("Posts")
  const [allPosts, setAllPosts] = useState([]);
  const [openProfilePhoto, setOpenProfilePhoto] = useState(false)
  const [image, setImage] = useState("");
  const { user } = useSelector((state) => state.auth);
  // const user = {
  //   _id: "1234567890", username: "majid", fullName: "Majid ali", posts: [1, 2, 3], reels: [1, 2, 3], followers: [1, 2, 3], following: [1, 2, 3], profile: { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" }
  // }
  const [bio, setBio] = useState(user?.bio);
  const [username, setUsername] = useState(user?.username);
  const [fullName, setFullName] = useState(user?.fullName);
  const [followerLength, setFollowerLength] = useState(user?.followers.length);
  const [followingLength, setFollowingLength] = useState(
    user?.following.length
  );
  const [loading, setLoading] = useState(false);

  const [editProfile] = useEditProfileMutation();

 

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

  const frontedUrl = "https://gather-spot-frontend.vercel.app"

  const shareLinks = [
    { img: "whatsApp.png", address: `https://api.whatsapp.com/send?text=${frontedUrl}/user/${user?._id}` },
    { img: "facebook.png", address: `https://www.facebook.com/sharer/sharer.php?u=${frontedUrl}/user/${user?._id}` },
    { img: "instagram.png", address: `https://www.instagram.com/${frontedUrl}/user/${user?._id}` },
    { img: "linkedIn.png", address: `https://www.linkedin.com/sharing/share-offsite/?url=${frontedUrl}/user/${user?._id}` },
    { img: "twitter.png", address: `https://twitter.com/intent/tweet?url=${frontedUrl}/user/${user?._id}&text=Check this out!` },
  ]

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsShare(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <div className="flex gap-4 p-10 items-start w-full">
              <button onClick={() => navigate("/")}><FaArrowLeft className="text-xl text-zinc-600" /></button>
              <div>
                <h2 className="font-semibold">{user?.fullName}</h2>
                <span className="font-semibold text-zinc-500 text-sm">{user?.posts?.length} Posts</span>
              </div>
            </div>
            <div className="w-full mt-40 px-10 bg-white min-h-[80vh] relative">
              <div className="w-full h-20 relative">
                <div className="w-full h-full absolute -top-1/2 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <button onClick={() => setOpenProfilePhoto(true)} className="w-20 h-20 overflow-hidden rounded-full">
                      <img src={user?.profile} className="w-full h-full object-contain scal-150" alt="" />
                    </button>
                    <div>
                      <h2 className="font-bold">{user?.fullName}</h2>
                      <h4 className="font-bold text-zinc-500">@{user?.username}</h4>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setIsEdit(true)} className="px-6 py-2 rounded-full bg-zinc-100 flex items-center gap-2 font-bold text-zinc-600 border-2">
                      <RiEdit2Fill />  Edit Profile
                    </button>
                    <button onClick={() => setIsShare(!isShare)} className="px-6 py-2 rounded-full bg-zinc-100 flex items-center gap-2 font-bold text-zinc-600 border-2">
                      <IoMdShare />  Share
                    </button>
                  </div>
                </div>
              </div>
              <NewPost />
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
              {posts && <Posts />}
              {photos && <Photos />}
              {videos && <Videos />}
              {reels && <Reels />}
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
          <img src={user?.profile} className="w-full h-full object-contain" alt="" />
        </div>
      </Dialog>
      }
      {isEdit && <Dialog open={isEdit} onClose={() => setIsEdit(false)} PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}>
        <div className="w-full h-full">
          <ImageCropper />
        </div>
      </Dialog>
      }
      <div ref={menuRef} className={`fixed top-[12rem] right-[30rem] transition-all duration-300 ${isShare ? "scale-100" : "scale-0"} flex gap-4 px-6 py-4 rounded-full bg-white border-2`}>
        {shareLinks.map((link) =>
          <a href={link.address} className="rounded-full h-6 w-6 inline-block" target="_blank" rel="noopener noreferrer">
            <img src={`/assets/pngs/${link.img}`} className="w-full h-full object-cover" alt="" />
          </a>)}
      </div>
    </Layout>
  );
};

export default Profile;
