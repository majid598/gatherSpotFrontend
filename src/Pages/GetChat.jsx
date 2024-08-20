import { useInfiniteScrollTop } from "6pp";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { Avatar, IconButton, Skeleton, Stack } from "@mui/material";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MessageComponent from "../Components/shared/MessageComponent";
import { grayColor, orange } from "../Constants/color";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  MESSAGE_DELIVERED,
  MESSAGE_READ,
  NEW_MESSAGE,
  ONLINE_USERS,
  START_TYPING,
  STOP_TYPING,
} from "../Constants/events";
import { useErrors, useSocketEvents } from "../Hooks/hook";
import { useChatDetailsQuery, useGetChatNamePhotoQuery, useGetMessagesQuery, useSendAttachmentsMutation } from "../redux/api/api";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
// import { setIsFileMenu, setUploadingLoader } from "../redux/reducers/misc";
import { getSocket } from "../socket";
// import VoiceRecorder from "../components/specific/VioceRecorder";
import toast from "react-hot-toast";
import { InputBox } from "../Components/Custom/custom";
import Layout from "../Layout/Layout";
import { FaArrowLeft, FaPhone } from "react-icons/fa";
import { getLastActive } from "../lib/features";
import { useGetSingleUser } from "../Requests/GetRequest";
import { BsThreeDotsVertical } from "react-icons/bs";


const GetChat = ({ user }) => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams()
  const chatId = params.id

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [onlineUsers, setOnlineUsers] = useState([]);


  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const [sendAttachments] = useSendAttachmentsMutation();

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const headerChat = useGetChatNamePhotoQuery(chatId)

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
  const { refetch } = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members, chatId });
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const handleVoice = async (voice) => {
    dispatch(setUploadingLoader(true));
    const toastId = toast.loading(`Sending voice...`);
    try {
      const myForm = new FormData();
      myForm.append("chatId", chatId);
      myForm.append("files", voice, 'voiceMessage.mp3');
      const res = await sendAttachments(myForm);

      if (res.data) toast.success(`Voice sent successfully`, { id: toastId });
      else toast.error(`Failed to send voice`, { id: toastId });

      // Fetching Here
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  const onlineUsersListener = useCallback((data) => {
    setOnlineUsers(data);
  }, []);
  const messageReadListener = useCallback((data) => {
    refetch()
  }, []);

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
    [ONLINE_USERS]: onlineUsersListener,
    [MESSAGE_READ]: messageReadListener
  };

  const isOnline = headerChat?.data?.chat?.members?.some((member) =>
    onlineUsers.includes(member._id)
  );

  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];


  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Layout>
      <div className="w-full h-full relative overflow-hidden">
        <div className="flex sm:px-4 px-2 sm:py-7 py-4 justify-between items-center w-full relative bg-white border-b-2 z-50">
          <div className="flex sm:gap-4 gap-2 items-center">
            <button onClick={() => navigate("/chats")}><FaArrowLeft className="text-xl text-zinc-600" /></button>
            <button className="sm:w-12 w-10 sm:h-12 h-10">
              <Avatar style={{ width: "100%", height: "100%" }} src={headerChat?.data?.chat?.avatar} />
            </button>
            <div>
              <h2 className="font-semibold">{headerChat?.data?.chat?.name}</h2>
              <h5 className="text-xs font-semibold text-sky-500">
                {
                  userTyping ?
                    "Typing..." : isOnline ? "online" : <>last active: {getLastActive(headerChat?.data?.chat?.members?.map((member) => member.lastSeen))}</>
                }
              </h5>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <button>
              <FaPhone className="text-zinc-500" />
            </button>
            <button>
              <BsThreeDotsVertical className="text-zinc-500 text-xl" />
            </button>
          </div>
        </div>
        <div
          ref={containerRef}
          className="w-full flex flex-col gap-[1rem] py-4 sm:px-4 px-2 sm:h-[80%] h-[76%] overflow-hidden overflow-y-scroll"
        >
          {allMessages.map((i) => (
            <MessageComponent key={i._id} message={i} user={user} />
          ))}


          <div ref={bottomRef} />
        </div>

        <form
          className="w-full h-[10%] sm:py-4 sm:px-4 px-2 py-1"
          onSubmit={submitHandler}
        >
          <Stack
            direction={"row"}
            height={"100%"}
            alignItems={"center"}
            position={"relative"}
          >
            <IconButton
              sx={{
                position: "absolute",
                left: "0.6rem",
                rotate: "30deg",
              }}
            // onClick={handleFileOpen}
            >
              <AttachFileIcon />
            </IconButton>
            <InputBox
              placeholder="Type Message Here..."
              value={message}
              onChange={messageOnChange}
            />
            {/* <VoiceRecorder onSendVoiceMessage={handleVoice} /> */}
            <IconButton
              type="submit"
              sx={{
                rotate: "-30deg",
                bgcolor: "red",
                color: "white",
                marginLeft: "1rem",
                padding: "0.5rem",
                "&:hover": {
                  bgcolor: "error.dark",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </form>
      </div>
      {/* <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} /> */}
    </Layout>
  );
};

export default GetChat;
