import { useState } from "react";
import { useSelector } from "react-redux";
import { useNewReelMutation } from "../redux/api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReelLoader from "../Components/ReelLoader";
import Layout from "../Layout/Layout";

const NewReel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [caption, setCaption] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [newReel] = useNewReelMutation();

  const [title, setTitle] = useState("");
  const [captionText, setCaptionText] = useState("");

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setUrl(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
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
    newReel(data)
      .unwrap()
      .then((data) => {
        setIsLoading(false);
        navigate("/profile");
        toast.success(data?.message);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err?.data?.message);
      });
  };

  return (
    <Layout>
      <div className="w-full h-full p-10">
        {isLoading && <ReelLoader message={"Uploading Reel..."} />}
        <div className="w-full h-full shadow-sm bg-white p-10 rounded-2xl">
          <h2 className="text-2xl font-semibold">New Post</h2>
          <div className="w-full px-4 items-center gap-2 py-4 flex justify-end">
            <h2 className="font-semibold">{user?.username}</h2>
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={user?.profile} className="w-full h-full" alt="" />
            </div>
          </div>
          <div className="flex h-full">
            <div className="w-2/5 h-full">
              <div className="h-full relative">
                <div
                  className={`w-full h-[60vh] ${
                    !url && "border-2"
                  } rounded-2xl max-h-[60vh] flex px-6 items-center justify-center`}
                >
                  {url ? (
                    <video
                      src={previewUrl}
                      autoPlay
                      loop
                      muted
                      alt=""
                      className="w-full h-full rounded-2xl"
                    />
                  ) : (
                    <label
                      htmlFor="file"
                      className=" cursor-pointer hover:bg-sky-300 rounded-lg p-2 transition-all duration-300 font-semibold"
                    >
                      Choose
                      <input
                        type="file"
                        hidden
                        id="file"
                        onChange={imageHandler}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="w-3/5 px-20 py-2 flex flex-col gap-2">
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
                Caption
                <textarea
                  type="text"
                  className="w-full p-2 resize-none outline-none rounded-md transition-all duration-300 hover:border-black/30 focus:border-sky-500 border-2"
                  placeholder="Add title here..."
                  value={captionText}
                  onChange={(e) => setCaptionText(e.target.value)}
                />
              </label>
              <label>
                Tags
                <textarea
                  type="text"
                  className="w-full p-2 resize-none outline-none rounded-md transition-all duration-300 hover:border-black/30 focus:border-sky-500 border-2"
                  placeholder="Add title here..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <button
                onClick={submitHandler}
                className="w-full p-3 text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 font-bold rounded-md"
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

export default NewReel;
