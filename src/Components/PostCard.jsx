import { Avatar, Dialog } from "@mui/material";
import axios from "axios";
import { Heart, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineInsertComment } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../redux/api/api";
import { useLikeAPost } from "../Requests/PostRequests";
import RenderAttachment, { fileFormat } from "./RenderAttachment";

const PostCard = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const like = useLikeAPost();
  const [menu, setMenu] = useState(false);
  const [isShareMenu, setIsShareMenu] = useState(false)

  const deleteHandler = () => {
    axios.delete(`${server}/api/v1/post/delete/${post?._id}`, {
      withCredentials: true,
      headers: {
        "token": localStorage.getItem("token")
      }
    }).then(({ data }) => toast.success(data?.message)).catch((err) => toast.error(err?.response?.data?.message))
  };


  const frontedUrl = import.meta.env.VITE_FRONTEND_URL

  const shareLinks = [
    { img: "whatsApp.png", address: `https://api.whatsapp.com/send?text=${frontedUrl}/?post=${post?._id}` },
    { img: "facebook.png", address: `https://www.facebook.com/sharer/sharer.php?u=${frontedUrl}/?post=${post?._id}` },
    { img: "instagram.png", address: `https://www.instagram.com/${frontedUrl}/user/${post?._id}` },
    { img: "linkedIn.png", address: `https://www.linkedin.com/sharing/share-offsite/?url=${frontedUrl}/?post=${post?._id}` },
    { img: "twitter.png", address: `https://twitter.com/intent/tweet?url=${frontedUrl}/?post=${post?._id}&text=Check this out!` },
  ]

  const location = useLocation();

  const scrollToPost = (postId) => {
    const element = document.getElementById(`post-${postId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const postId = queryParams.get('post');
    if (postId) {
      scrollToPost(postId);
    }
  }, [location]);


  return (
    <div id={`post-${post?._id}`} className="w-full bg-white py-10 lg:px-10" >
      <div className="header w-full py-3 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Link
            to={
              post?.user?._id === user?._id
                ? `/profile?user=${user?.username}`
                : `/user/${post?.user?._id}`
            }
            className="w-14 h-14 inline-block rounded-full overflow-hidden"
          >
            <Avatar src={post?.user?.profile?.url} style={{ width: "100%", height: "100%" }} alt="" />
          </Link>
          <div>
            <Link className="font-semibold">
              {post?.user?.fullName}
            </Link>
            <h4 className="text-sm font-semibold text-zinc-500">@{post?.user?.username}</h4>
          </div>
        </div>
        <div className="relative z-[999]">
          <button
            onClick={() => setMenu((prev) => !prev)}
            className="relative z-[999]"
          >
            <BsThreeDots />
          </button>
          {menu && (
            <>
              <div
                className="w-full fixed top-0 left-0 z-[99] bg-transparent h-screen"
                onClick={() => setMenu(false)}
              ></div>
              <div className="w-[20rem] absolute flex flex-col top-6 right-0 z-[999] bg-white h-[50vh] shadow-sm rounded-2xl">
                <button
                  onClick={deleteHandler}
                  className="w-full p-2 hover:bg-black/30"
                >
                  Delete
                </button>
                <button className="w-full p-2 hover:bg-black/30">Share</button>
                <button className="w-full p-2 hover:bg-black/30">Delete</button>
                <button className="w-full p-2 hover:bg-black/30">Share</button>
                <button className="w-full p-2 hover:bg-black/30">Delete</button>
                <button className="w-full p-2 hover:bg-black/30">Share</button>
              </div>
            </>
          )}
        </div>
      </div>
      <p className="mb-4 font-semibold text-zinc-600">{post?.caption}</p>
      <div className="w-full h-auto">
        {RenderAttachment(fileFormat(post?.attachMent?.url), post?.attachMent?.url)}
      </div>
      <div className="w-full justify-between flex items-center mt-8 py-3 pr-5">
        <div className="flex gap-4">
          <button
            onClick={() => like(post?._id)}
            className="flex flex-col"
          >
            {post?.likes?.includes(user?._id) ? (
              <Heart fill="red" className="text-red-500" />
            ) : (
              <Heart className="text-3xl text-zinc-500" />
            )}
          </button>
          <button>
            <MdOutlineInsertComment className="text-2xl text-zinc-500" />
          </button>
          <button onClick={() => setIsShareMenu(true)}>
            <Share2 className="text-zinc-500" />
          </button>
        </div>
        <button className="w-5 h-6 rounded-[3px] border-2 border-zinc-500 border-b-0 after:content-[''] after:absolute after:w-full after:h-4 after:border-2 after:border-zinc-500 after:rounded-[4px] after:-bottom-2 overflow-hidden after:left-1/2 after:-translate-x-1/2 relative after:rotate-45 after:border-b-0 after:border-r-0"></button>
      </div>
      <div className="px-2">
        <h4 className="text-zinc-500 font-semibold">{post?.likes?.length} likes this</h4>
      </div>
      {isShareMenu && <Dialog open={isShareMenu} onClose={() => setIsShareMenu(false)} PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}>
        <div className={`flex gap-4 px-6 py-4 rounded-full bg-white border-2`}>
          {shareLinks.map((link) =>
            <a href={link.address} key={link.address} className="rounded-full h-6 w-6 inline-block" target="_blank" rel="noopener noreferrer">
              <img src={`/assets/pngs/${link.img}`} className="w-full h-full object-cover" alt="" />
            </a>)}
        </div>
      </Dialog>}
    </div >
  );
};

export default PostCard;
