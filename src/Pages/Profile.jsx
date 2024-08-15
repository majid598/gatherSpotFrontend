import { Dialog, IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaImage, FaMusic, FaVideo } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ReelLoader from "../Components/ReelLoader";
import Layout from "../Layout/Layout";
import {
  useEditProfileMutation
} from "../redux/api/api";
import { useFileHandler } from "6pp";
import RenderAttachment, { fileFormat, previewFileFormat } from "../Components/RenderAttachment";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [all, setAll] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState(false);
  const [reels, setReels] = useState(false);
  const [favourites, setFavourites] = useState(false);
  const [description, setDescription] = useState("")
  const [openProfilePhoto, setOpenProfilePhoto] = useState(false)
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const { user } = useSelector((state) => state.auth);
  // const user = {
  //   username: "majid", fullName: "Majid ali", posts: [1, 2, 3], reels: [1, 2, 3], followers: [1, 2, 3], following: [1, 2, 3], profile: { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" }
  // }
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
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  console.log(file)

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
      <div className="w-full h-full">
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
                      <img src={user?.profile} className="w-full h-full object-contain scale-150" alt="" />
                    </button>
                    <div>
                      <h2 className="font-bold">{user?.fullName}</h2>
                      <h4 className="font-bold text-zinc-500">@{user?.username}</h4>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-2 rounded-full bg-zinc-100 flex items-center gap-2 font-bold text-zinc-600 border-2">
                      <RiEdit2Fill />  Edit Profile
                    </button>
                    <button className="px-6 py-2 rounded-full bg-zinc-100 flex items-center gap-2 font-bold text-zinc-600 border-2">
                      <IoMdShare />  Share
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full bg-zinc-100 p-5 border-2 rounded-md">
                <div className="h-40 w-full bg-white rounded-md relative">
                  <textarea name="" id="" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-full rounded-md resize-none bg-transparent outline-none border-none p-3 placeholder:text-sm pb-12" placeholder="Compose New Post"></textarea>
                  <div className="w-full absolute bottom-0 left-0 flex">
                    <input type="file" hidden onChange={imageChange} id="file" />
                    <IconButton className="text-zinc-500" style={{ padding: "12px" }} onClick={() => { document.getElementById("file").click() }}><FaImage className="text-xl" /></IconButton>
                    <IconButton className="text-zinc-500" style={{ padding: "12px" }}><FaVideo className="text-xl" /></IconButton>
                    <IconButton className="text-zinc-500" style={{ padding: "12px" }}><FaMusic className="text-xl" /></IconButton>
                    <IconButton className="text-zinc-500" style={{ padding: "12px" }}><FaImage className="text-xl" /></IconButton>
                  </div>
                </div>
                <div className="w-full rounded-md overflow-hidden mt-5">
                  {file && RenderAttachment(previewFileFormat(filePreview), filePreview)}
                  {/* <img src={filePreview} alt="" className="w-full"/> */}
                </div>
                {description.length > 0 ? <div className="w-full flex justify-end pt-4">
                  <button onClick={() => {
                    setDescription("")
                    setFile(null)
                    setFilePreview(null)
                    toast.success("Post Saved To Draft")
                  }} className="font-semibold px-6 py-2 rounded-md text-sky-500">Post Later</button>
                  <button onClick={() => {
                    setDescription("")
                    setFile(null)
                    setFilePreview(null)
                    toast.success("Post Uploaded")
                  }} className="px-10 py-2 rounded-md bg-sky-500 font-bold text-white transition-all duration-300 hover:bg-sky-600">Post</button>
                </div> : file &&
                <div className="w-full flex justify-end pt-4">
                  <button onClick={() => {
                    setDescription("")
                    setFile(null)
                    setFilePreview(null)
                    toast.success("Post Saved To Draft")
                  }} className="font-semibold px-6 py-2 rounded-md text-sky-500">Post Later</button>
                  <button onClick={() => {
                    setDescription("")
                    setFile(null)
                    setFilePreview(null)
                    toast.success("Post Uploaded")
                  }} className="px-10 py-2 rounded-md bg-sky-500 font-bold text-white transition-all duration-300 hover:bg-sky-600">Post</button>
                </div>}
              </div>
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
          <img src={user?.profile} className="w-full h-full object-contain" alt="" />
        </div>
      </Dialog>}
    </Layout>
  );
};

export default Profile;
