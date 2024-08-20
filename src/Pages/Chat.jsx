import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { BsChatFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMyChatsQuery } from "../redux/api/api";
import { FaArrowLeft } from "react-icons/fa";
import ChatList from "../Components/Chat/ChatList";
import { useCallback, useEffect, useState } from "react";
import { useErrors, useSocketEvents } from "../Hooks/hook";
import { getOrSaveFromStorage } from "../lib/features";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../Constants/events";
import { incrementNotification, setNewMessagesAlert } from "../redux/reducers/chat";
import { getSocket } from "../socket";

const Chat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);
  const chatId = useParams().id
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { newMessagesAlert } = useSelector((state) => state.chat);
  const socket = getSocket()

  const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

  useErrors([{ isError, error }]);

  useEffect(() => {
    getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
  }, [newMessagesAlert]);

  const newMessageAlertListener = useCallback(
    (data) => {
      if (data.chatId === chatId) return;
      dispatch(setNewMessagesAlert(data));
      console.log(data)
    },
    [chatId]
  );

  const newRequestListener = useCallback(() => {
    dispatch(incrementNotification());
  }, [dispatch]);

  const refetchListener = useCallback(() => {
    refetch();
    navigate("/");
  }, [refetch, navigate]);

  const onlineUsersListener = useCallback((data) => {
    setOnlineUsers(data);
  }, []);

  const eventHandlers = {
    [NEW_MESSAGE_ALERT]: newMessageAlertListener,
    [NEW_REQUEST]: newRequestListener,
    [REFETCH_CHATS]: refetchListener,
    [ONLINE_USERS]: onlineUsersListener,
  };

  useSocketEvents(socket, eventHandlers);
  return (
    <Layout>
      <div className="w-full h-full">
        <div className="flex gap-4 p-10 items-start w-full relative border-b-2 z-50">
          <button onClick={() => navigate("/")}><FaArrowLeft className="text-xl text-zinc-600" /></button>
          <div>
            <h2 className="font-semibold text-sky-500">Chats</h2>
          </div>
        </div>
        <div className="py-6 w-full flex flex-col">
          <h2 className="md:text-2xl sm:text-xl sm:block hidden font-semibold text-center">Select A friend to chat</h2>
          <div className="w-full h-full sm:hidden overflow-y-scroll">
            <ChatList
              chats={data?.chats}
              chatId={chatId}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
