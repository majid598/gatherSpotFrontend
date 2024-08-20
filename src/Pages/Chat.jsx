import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { BsChatFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useMyChatsQuery } from "../redux/api/api";
import { FaArrowLeft } from "react-icons/fa";

const Chat = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const { data } = useMyChatsQuery(user?._id);
  return (
    <Layout>
      <div className="w-full h-full">
        <div className="flex gap-4 p-10 items-start w-full relative border-b-2 z-50">
          <button onClick={() => navigate("/")}><FaArrowLeft className="text-xl text-zinc-600" /></button>
          <div>
            <h2 className="font-semibold text-sky-500">Chats</h2>
          </div>
        </div>
        <div className="py-6 w-full flex items-center justify-center">
          <h2 className="text-2xl font-semibold">Select A friend to chat</h2>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
