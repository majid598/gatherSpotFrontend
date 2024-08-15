import React from "react";
import { MdFileOpen } from "react-icons/md";


export const fileFormat = (url = "") => {
    const fileExt = url.split(".").pop();

    if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
        return "video";

    if (fileExt === "mp3" || fileExt === "wav") return "audio";
    if (
        fileExt === "png" ||
        fileExt === "jpg" ||
        fileExt === "jpeg" ||
        fileExt === "webp" ||
        fileExt === "avif" ||
        fileExt === "gif"
    )
        return "image";

    return "file";
};

export const previewFileFormat = (url = "") => {
    if (!url) {
        // If the url is null, undefined, or an empty string, return "file" or an appropriate fallback.
        return "file";
    }

    let fileExt;

    if (url.startsWith("data:")) {
        // Extract the file type from the data URL
        const mimeType = url.split(";")[0].split(":")[1];
        fileExt = mimeType.split("/")[1];
    } else {
        // Extract the file extension from the regular URL
        fileExt = url.split(".").pop().toLowerCase();
    }

    const videoFormats = ["mp4", "webm", "ogg"];
    const audioFormats = ["mp3", "wav"];
    const imageFormats = ["png", "jpg", "jpeg", "webp", "avif", "gif"];

    if (videoFormats.includes(fileExt)) return "video";
    if (audioFormats.includes(fileExt)) return "audio";
    if (imageFormats.includes(fileExt)) return "image";

    return "file";
};


const RenderAttachment = (file, url, controls = true) => {
    switch (file) {
        case "video":
            return <video src={url} className="w-full" controls={controls} />;

        case "image":
            return (
                <img
                    src={url}
                    alt="Attachement"
                    className="w-full"
                />
            );

        case "audio":
            return <audio src={url} controls={controls} />;

        default:
            return <MdFileOpen />;
    }
};

export const shuffleArray = (array) => {
    for (let i = array?.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export default RenderAttachment;
