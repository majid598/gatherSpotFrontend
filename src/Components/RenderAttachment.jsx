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

const RenderAttachment = (file, url) => {
    switch (file) {
        case "video":
            return <video src={url} className="w-full" controls />;

        case "image":
            return (
                <img
                    src={url}
                    alt="Attachement"
                    className="w-full"
                />
            );

        case "audio":
            return <audio src={url} controls />;

        default:
            return <MdFileOpen />;
    }
};

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export default RenderAttachment;
