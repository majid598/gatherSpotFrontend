import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./redux/api/api";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(server, {
    withCredentials: true,
    extraHeaders: {
      "token": localStorage.getItem("token")
    }
  }), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
