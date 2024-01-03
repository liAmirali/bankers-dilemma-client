import { useEffect, useState } from "react";
import "./App.css";
import { Socket, io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io("ws://localhost:8081");

    setSocket(socket);

    () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.connect();

    socket.on("connect", () => {
      console.log(socket.connected);
    });

    socket.on("message", (data) => {
      console.log("DATA:", data);
    });
  }, [socket]);

  return <p>Hi this is a text</p>;
}

export default App;
