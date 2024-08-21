import React, { memo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
}) => {
    return (
        <Link
            sx={{
                padding: "0",
            }}
            to={`/chat/${_id}`}
            onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
        >
            <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`flex !gap-4 relative !items-center ${sameSender ? "bg-black text-white" : "hover:!bg-zinc-200 text-black font-bold"} p-[1rem]`}
            >
                <AvatarCard avatar={avatar} />
                <div className="-ml-8">
                    <h2 className="font-semibold text-lg">{name}</h2>
                    {newMessageAlert && (
                        <h4 className="text-sm text-sky-600">{newMessageAlert.count === 1 ? <>{newMessageAlert.count} New Message</> : newMessageAlert.count > 99 ? "99+ New Messages" : <>{newMessageAlert.count} New Message</>}</h4>
                    )}
                </div>

                {isOnline && (
                    <Box
                        sx={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "green",
                            position: "absolute",
                            top: "50%",
                            right: "1rem",
                            transform: "translateY(-50%)",
                        }}
                    />
                )}
            </motion.div>
        </Link>
    );
};

export default memo(ChatItem);
