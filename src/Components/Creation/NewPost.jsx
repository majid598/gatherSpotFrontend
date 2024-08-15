import { IconButton } from "@mui/material"
import { useState } from "react"
import toast from "react-hot-toast"
import { FaImage, FaMusic, FaVideo } from "react-icons/fa6"
import RenderAttachment, { previewFileFormat } from "../RenderAttachment"


const NewPost = () => {
    const [description, setDescription] = useState("")
    const [filePreview, setFilePreview] = useState(null)
    const [file, setFile] = useState(null)

    const fileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="w-full bg-zinc-100 p-5 border-2 rounded-md">
            <div className="h-40 w-full bg-white rounded-md relative">
                <textarea name="" id="" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-full rounded-md resize-none bg-transparent outline-none border-none p-3 placeholder:text-sm pb-12" placeholder="Compose New Post"></textarea>
                <div className="w-full absolute bottom-0 left-0 flex">
                    <input type="file" hidden accept="image/*" onChange={fileChange} id="imageInput" />
                    <input type="file" hidden accept="video/*" onChange={fileChange} id="videoInput" />
                    <input type="file" hidden accept="audio/*" onChange={fileChange} id="audioInput" />
                    <input type="file" hidden accept="video/*" onChange={fileChange} id="reelInput" />
                    <IconButton className="text-zinc-500" style={{ padding: "12px" }} onClick={() => { document.getElementById("imageInput").click() }}><FaImage className="text-xl" /></IconButton>
                    <IconButton className="text-zinc-500" style={{ padding: "12px" }} onClick={() => { document.getElementById("videoInput").click() }}><FaVideo className="text-xl" /></IconButton>
                    <IconButton className="text-zinc-500" style={{ padding: "12px" }} onClick={() => { document.getElementById("audioInput").click() }}><FaMusic className="text-xl" /></IconButton>
                    <IconButton className="text-zinc-500" style={{ padding: "12px" }} onClick={() => { document.getElementById("reelInput").click() }}><FaImage className="text-xl" /></IconButton>
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
    )
}

export default NewPost
