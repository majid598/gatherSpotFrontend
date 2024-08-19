import { createContext, useMemo, useContext, useEffect } from "react";
import io from "socket.io-client";
import { server } from "./redux/api/api";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-hot-toast";
import { ONLINE_USERS } from "./Constants/events";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    return io(server, {
      withCredentials: true,
      extraHeaders: {
        "token": localStorage.getItem("token"),
      },
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
