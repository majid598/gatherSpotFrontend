import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../Constants/color";
import moment from "moment";
import { motion } from "framer-motion";
import RenderAttachment, { fileFormat } from "../RenderAttachment";
import { FaCheck } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt, read } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#86EFAC" : "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <h4 className="text-xs font-semibold text-sky-500">
          {sender.name}
        </h4>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
      {sameSender && <div className="flex items-center justify-end w-full">
        <IoCheckmarkDoneSharp className={`${read ? "text-sky-500" : "text-zinc-500"}`} />
      </div>}
    </motion.div>
  );
};

export default memo(MessageComponent);
