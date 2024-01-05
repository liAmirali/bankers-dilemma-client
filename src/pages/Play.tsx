import { FC, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { SOCKET_SERVER_ADDR } from "../env/variables";

// const socket = io(SOCKET_SERVER_ADDR);

const Play: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameId = searchParams.get("gameId");

  useEffect(() => {
    let socket: Socket;

    if (gameId) {
      socket = io(SOCKET_SERVER_ADDR);

      socket.on("connect", () => {
        console.log("Connected to server");

        socket.emit("join_game", { gameId: gameId });
      });

      socket.on("message", (data) => {
        console.log("DATA:", data);
      });
    }

    return () => {
      if (socket) {
        console.log("Leaving game and disconnecting socket");
        socket.emit("leave_game", { gameId: gameId });
        socket.disconnect();
      }
    };
  }, [gameId]);

  if (!gameId) return <Navigate to="/" />;
  return <></>;
};

export default Play;
