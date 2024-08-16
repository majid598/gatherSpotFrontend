import { Avatar, Dialog, IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdClose, IoMdShare } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
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
import { TbCameraPlus } from "react-icons/tb";
import { useFileHandler, useInputValidation } from "6pp";
import { userEditBio, userUploadCoverPhoto, userUploadProfilePhoto } from "../Requests/PostRequests";
import { LuLoader } from "react-icons/lu";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isShare, setIsShare] = useState(false);
  const file = useFileHandler("single")
  const bio = useInputValidation(user?.bio)
  const coverPhoto = useFileHandler("single")

  const { upload, isLoading } = userUploadCoverPhoto()
  const { uploadProfile, isLoading: profileLoading } = userUploadProfilePhoto()
  const { editBio, bioLoading } = userEditBio()
  const uploadCoverPhoto = () => {
    upload(coverPhoto)
  }
  const uploadProfilePhoto = () => {
    uploadProfile(file)
  }
  const editUserBio = () => {
    editBio(bio)
  }

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

  return (
    <Layout>
      <div className="w-full h-full pb-40">
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
              {coverPhoto.file || user?.coverPhoto ? <>
                <img src={coverPhoto.preview || user?.coverPhoto?.url} className="w-full h-full object-cover" />
                <label className="flex flex-col items-center cursor-pointer absolute z-50 bottom-10 right-10"><TbCameraPlus className="text-xl" /><input type="file" accept="image/*" hidden onChange={coverPhoto.changeHandler} /></label>
              </> : <label className="flex flex-col items-center text-sky-500 hover:text-sky-600 cursor-pointer transition-all duration-300"><TbCameraPlus className="text-xl" /> <span className="font-semibold text-sm">Add Cover Photo</span><input type="file" accept="image/*" hidden onChange={coverPhoto.changeHandler} /></label>}
            </div>
            <div className="w-full mt-40 px-10 bg-white min-h-[80vh] relative">
              <div className="w-full h-20 relative">
                <div className="w-full h-full absolute -top-1/2 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-full relative">
                      <IconButton onClick={() => document.getElementById("editImage").click()} style={{ position: "absolute", top: -6, right: -6, zIndex: 9 }}><RiEdit2Fill /></IconButton>
                      <input type="file" accept="image/*" onChange={file.changeHandler} hidden id="editImage" />
                      <div onClick={() => setOpenProfilePhoto(true)} className="w-20 h-20 overflow-hidden rounded-full">
                        <Avatar src={file.preview || user?.profile?.url} style={{ width: "100%", height: "100%", border: "4px solid #0284C7" }} alt="" />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-bold">{user?.fullName}</h2>
                      <h4 className="font-bold text-zinc-500">@{user?.username}</h4>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {file.file ?
                      <button onClick={uploadProfilePhoto} className="px-6 py-2 rounded-full bg-sky-500 text-white flex items-center gap-2 font-bold border-2 border-sky-500 hover:bg-sky-600 hover:border-sky-600 transition-all duration-300">
                        {profileLoading ? <LuLoader className="mx-3 text-xl loader" /> : "Save"}
                      </button> : coverPhoto.file &&
                      <button onClick={uploadCoverPhoto} className="px-6 py-2 rounded-full bg-sky-500 text-white flex items-center gap-2 font-bold border-2 border-sky-500 hover:bg-sky-600 hover:border-sky-600 transition-all duration-300">
                        {isLoading ? <LuLoader className="mx-3 text-xl loader" /> : "Save"}
                      </button>
                    }
                    <button onClick={() => setIsShare(!isShare)} className="px-6 py-2 rounded-full bg-zinc-100 flex items-center gap-2 font-bold text-zinc-600 border-2">
                      <IoMdShare />  Share
                    </button>
                  </div>
                </div>
              </div>
              <span className="font-semibold text-sky-500 cursor-pointer">Add Bio/About</span>
              <div className="h-32 mt-2 w-full bg-zinc-100 border-2 rounded-md relative">
                <textarea name="" id="" value={bio.value} onChange={bio.changeHandler} className="w-full h-full rounded-md resize-none bg-transparent outline-none border-none p-3 placeholder:text-sm" placeholder="Write here..."></textarea>
                {bio?.value !== user?.bio &&
                  <div className="w-full flex justify-end">
                    <button onClick={editUserBio} className="px-6 py-2 rounded-md mt-4 bg-sky-500 text-white flex items-center gap-2 font-bold border-2 border-sky-500 hover:bg-sky-600 hover:border-sky-600 transition-all duration-300">
                      {bioLoading ? <LuLoader className="mx-3 text-xl loader" /> : "Save"}
                    </button>
                  </div>
                }
              </div>
              <div className="h-60"></div>
            </div>
          </div>
        </div>
      </div>
      <div ref={menuRef} className={`fixed top-[12rem] right-[30rem] transition-all duration-300 ${isShare ? "scale-100" : "scale-0"} flex gap-4 px-6 py-4 rounded-full bg-white border-2`}>
        {shareLinks.map((link) =>
          <a href={link.address} className="rounded-full h-6 w-6 inline-block" target="_blank" rel="noopener noreferrer">
            <img src={`/assets/pngs/${link.img}`} className="w-full h-full object-cover" alt="" />
          </a>)}
      </div>
    </Layout>
  );
};

export default EditProfile;
