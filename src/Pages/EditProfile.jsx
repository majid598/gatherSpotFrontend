import { useFileHandler, useInputValidation } from "6pp";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { LuLoader } from "react-icons/lu";
import { RiEdit2Fill } from "react-icons/ri";
import { TbCameraPlus } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useChangePassword, useEditBio, useEditProfile, useUploadCoverPhoto, useUploadProfilePhoto } from "../Requests/PostRequests";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isShare, setIsShare] = useState(false);
  const file = useFileHandler("single")
  const coverPhoto = useFileHandler("single")
  const bio = useInputValidation(user?.bio)
  const fullName = useInputValidation(user?.fullName)
  const username = useInputValidation(user?.username)
  const website = useInputValidation(user?.websiteLink)
  const oldPass = useInputValidation("")
  const newPass = useInputValidation("")

  const { upload, isLoading } = useUploadCoverPhoto()
  const { uploadProfile, isLoading: profileLoading } = useUploadProfilePhoto()
  const { editBio, bioLoading } = useEditBio()
  const { editProfile, editLoading } = useEditProfile()
  const { change, passLoading } = useChangePassword()
  const uploadCoverPhoto = () => {
    upload(coverPhoto)
  }
  const uploadProfilePhoto = () => {
    uploadProfile(file)
  }
  const editUserBio = () => {
    editBio(bio)
  }
  const editMyProfile = () => {
    const data = {
      fullName: fullName.value,
      username: username.value,
      websiteLink: website.value
    }
    editProfile(data)
  }
  const changePassword = () => {
    const data = {
      oldPassword: oldPass.value,
      newPassword: newPass.value,

    }
    change(data)
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
                      <button disabled={profileLoading} onClick={uploadProfilePhoto} className="px-6 py-2 rounded-full bg-sky-500 text-white flex items-center gap-2 font-bold border-2 border-sky-500 hover:bg-sky-600 hover:border-sky-600 transition-all duration-300">
                        {profileLoading ? <LuLoader className="mx-3 text-xl loader" /> : "Save"}
                      </button> : coverPhoto.file &&
                      <button disabled={isLoading} onClick={uploadCoverPhoto} className="px-6 py-2 rounded-full bg-sky-500 text-white flex items-center gap-2 font-bold border-2 border-sky-500 hover:bg-sky-600 hover:border-sky-600 transition-all duration-300">
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
              </div>
              {bio?.value !== user?.bio &&
                <div className="w-full flex justify-end">
                  <button disabled={bioLoading} onClick={editUserBio} className="px-6 py-2 rounded-md mt-4 bg-sky-500 text-white flex items-center gap-2 font-bold border-2 border-sky-500 hover:bg-sky-600 hover:border-sky-600 transition-all duration-300">
                    {bioLoading ? <LuLoader className="mx-3 text-xl loader" /> : "Save"}
                  </button>
                </div>
              }
              <div className="w-full flex gap-10 mt-10">
                <label className="w-1/2 cursor-pointer">
                  <span className="font-semibold text-sm text-sky-500 mb-3 inline-block">Change Display Name</span>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500"
                    value={fullName.value}
                    onChange={fullName.changeHandler}
                  />
                </label>
                <label className="w-1/2 cursor-pointer">
                  <span className="font-semibold text-sm text-sky-500 mb-3 inline-block">Change username</span>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500"
                    value={username.value}
                    onChange={username.changeHandler}
                  />
                </label>
              </div>
              <div className="w-full flex gap-10 mt-10">
                <label className="w-1/2 cursor-pointer">
                  <span className="font-semibold text-sm text-sky-500 mb-3 inline-block">Website</span>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500"
                    value={website.value}
                    onChange={website.changeHandler}
                  />
                </label>
                <label className="w-1/2 cursor-pointer">
                  <span className="font-semibold text-sm text-sky-500 mb-3 inline-block">Change username</span>
                  <input type="" className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500" />
                </label>
              </div>
              {
                <div className="w-full flex justify-end">
                  <button disabled={editLoading} onClick={editMyProfile} className="px-6 py-2 rounded-md mt-4 bg-sky-500 text-white flex items-center gap-2 font-bold border-2 border-sky-500 hover:bg-sky-600 hover:border-sky-600 transition-all duration-300">
                    {editLoading ? <LuLoader className="mx-3 text-xl loader" /> : "Save"}
                  </button>
                </div>
              }
              <div className="w-full flex flex-col gap-3 mt-10">
                <span className="font-semibold text-sm text-sky-500">Change username</span>
                <input type="password" value={oldPass.value} onChange={oldPass.changeHandler} className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500" placeholder="Old Password" />
                <input type="password" className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500" placeholder="New Password" />
                <input type="password" value={newPass.value} onChange={newPass.changeHandler} className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500" placeholder="Confirm New Password" />
              </div>
              {
                <div className="w-full flex justify-end">
                  <button disabled={passLoading} onClick={changePassword} className="px-6 py-2 rounded-md mt-4 bg-sky-500 text-white flex items-center gap-2 font-bold border-2 border-sky-500 hover:bg-sky-600 hover:border-sky-600 transition-all duration-300">
                    {passLoading ? <LuLoader className="mx-3 text-xl loader" /> : "Save"}
                  </button>
                </div>
              }
              <div className="h-60"></div>
            </div>
          </div>
        </div>
      </div>
      <div ref={menuRef} className={`fixed top-[12rem] right-[30rem] transition-all duration-300 ${isShare ? "scale-100" : "scale-0"} flex gap-4 px-6 py-4 rounded-full bg-white border-2`}>
        {shareLinks.map((link) =>
          <a href={link.address} key={link.address} className="rounded-full h-6 w-6 inline-block" target="_blank" rel="noopener noreferrer">
            <img src={`/assets/pngs/${link.img}`} className="w-full h-full object-cover" alt="" />
          </a>)}
      </div>
    </Layout>
  );
};

export default EditProfile;
