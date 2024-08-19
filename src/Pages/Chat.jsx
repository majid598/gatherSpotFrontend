import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { BsChatFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useMyChatsQuery } from "../redux/api/api";

const Chat = () => {
  const { user } = useSelector((state) => state.auth);
  const { data } = useMyChatsQuery(user?._id);
  return (
    <Layout>
      <div className="w-full h-full">
        <div className="w-full px-4 flex py-2 justify-between">
          back
          <h2>{user?.username}</h2>
          <h2>
            <BsChatFill />
          </h2>
        </div>
        <div className="">
          <div className="w-full flex mt-2  px-4 font-semibold justify-between">
            <button className="text-sky-500">Primary</button>
            <button>General</button>
            <button>Request</button>
          </div>
          <div className="w-full h-1 mt-2 px-4">
            <div className="bg-zinc-300 w-full h-full">
              <div className="h-full w-1/6 bg-sky-500"></div>
            </div>
          </div>
        </div>
        <div className="py-6 w-full h-full flex items-center justify-center">
         <h2 className="text-2xl font-semibold">Select A friend to chat</h2>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
