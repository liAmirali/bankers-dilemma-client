import { useEffect, useState } from "react";
import "./App.css";
import { Socket, io } from "socket.io-client";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Play from "./pages/Play";

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
