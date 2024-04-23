import { useState } from "react";
import { useSelector } from "react-redux";
import { useNewPostMutation } from "../redux/api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReelLoader from "../Components/ReelLoader";
import Layout from "../Layout/Layout";
import ContentDisplay from "../Components/ContentDisplay";
import { IoClose } from "react-icons/io5";

const NewPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [url, setUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [caption, setCaption] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [newPost] = useNewPostMutation();

  const [title, setTitle] = useState("");
  const [captionText, setCaptionText] = useState("");

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setUrl(file);
    setPopup(false);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const imageSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let attachMent;
    const formData = new FormData();
    formData.append("file", url);
    formData.append("upload_preset", "insta-cloud");
    formData.append("cloud_name", "dfmcsvthn");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfmcsvthn/image/upload",
        formData
      );
      attachMent = response.data.url;
      console.log(attachMent);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    const data = {
      userId: user._id,
      title,
      caption: captionText,
      attachMent,
    };
    newPost(data)
      .unwrap()
      .then((data) => {
        setIsLoading(false);
        navigate(`/users/${user.username}`);
        toast.success(data?.message);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err?.data?.message);
      });
  };

  const videoSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let attachMent;
    const formData = new FormData();
    formData.append("file", url);
    formData.append("upload_preset", "insta-cloud");
    formData.append("resource_type", "video");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dfmcsvthn/video/upload`,
        formData
      );
      attachMent = response.data.url;
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    const data = {
      userId: user._id,
      title,
      caption: captionText,
      attachMent,
    };
    newPost(data)
      .unwrap()
      .then((data) => {
        setIsLoading(false);
        navigate(`/users/${user.username}`);
        toast.success(data?.message);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err?.data?.message);
      });
  };

  return (
    <Layout>
      <div className="w-full h-full lg:p-10 md:p-10">
        {isLoading && <ReelLoader message={"Uploading Post..."} />}

        <div className="w-full h-full shadow-sm bg-white p-10 lg:rounded-2xl md:rounded-2xl">
          <h2 className="text-2xl font-semibold">New Post</h2>
          <div className="w-full lg:flex md:flex hidden px-4 items-center gap-2 py-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={user?.profile} className="w-full h-full" alt="" />
            </div>
            <h2 className="font-semibold">{user?.username}</h2>
          </div>
          <div className="flex lg:flex-row md:flex-row flex-col h-full pt-12 lg-pt-6">
            <div className="lg:w-2/5 md:w-2/5 lg:h-full md:h-full">
              <div className="h-full relative px-5">
                <div
                  className={`w-full lg:h-[60vh] md:h-[60vh] h-[40vh] ${
                    !url && "border-2"
                  } rounded-2xl max-h-[55vh] flex px-6 relative items-center justify-center`}
                >
                  {url ? (
                    <ContentDisplay src={previewUrl} h="full" autoPlay={true} />
                  ) : (
                    <div className="w-full flex flex-col items-center">
                      Choose an image or video
                      <button
                        onClick={() => setPopup(true)}
                        className="px-4 w-3/5 py-2 rounded-md bg-sky-500 text-white transition-all duration-300 hover:bg-sky-600 mt-4"
                      >
                        Select
                      </button>
                      {popup && (
                        <div className="w-4/5 absolute bg-white shadow-sm h-40 rounded-2xl left-1/2 flex flex-col items-center justify-center gap- -translate-x-1/2 top-1/2 -translate-y-1/2">
                          <button
                            className="top-2 right-2 absolute p-1 rounded-md bg-red-500 text-white transition-all duration-300 hover:bg-red-600 font-bold"
                            onClick={() => setPopup(false)}
                          >
                            <IoClose className="text-xl" />
                          </button>
                          <label
                            htmlFor="file"
                            className=" cursor-pointer hover:bg-sky-300 rounded-lg p-2 transition-all duration-300 font-semibold"
                          >
                            Image
                            <input
                              type="file"
                              hidden
                              id="file"
                              onChange={imageHandler}
                            />
                          </label>
                          or
                          <label
                            htmlFor="file"
                            className=" cursor-pointer hover:bg-sky-300 rounded-lg p-2 transition-all duration-300 font-semibold"
                            onClick={() => setIsVideo(true)}
                          >
                            Video
                            <input
                              type="file"
                              hidden
                              id="file"
                              onChange={imageHandler}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:w-3/5 md:w-3/5 lg:px-20 md:px-20 py-2 flex flex-col gap-2">
              <label>
                Title
                <input
                  type="text"
                  className="w-full p-2 outline-none rounded-md transition-all duration-300 hover:border-black/30 focus:border-sky-500 border-2"
                  placeholder="Add title here..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                Description
                <textarea
                  type="text"
                  className="w-full p-2 resize-none outline-none rounded-md transition-all duration-300 hover:border-black/30 focus:border-sky-500 border-2"
                  placeholder="Add title here..."
                  value={captionText}
                  onChange={(e) => setCaptionText(e.target.value)}
                />
              </label>
              <button
                onClick={isVideo ? videoSubmitHandler : imageSubmitHandler}
                className="w-full p-3 text-white bg-sky-500 transition-all duration-300 hover:bg-sky-600 font-bold rounded-md"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewPost;
