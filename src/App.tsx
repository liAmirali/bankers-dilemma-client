import { useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  useEffect(() => {
    const socket = io("ws://localhost:8001");
    socket.connect();

    socket.on("connect", () => {
      console.log(socket.connected);
    });
    
    console.log(":HERE");
    socket.on("message", (data) => {
      console.log(socket.connected);
      console.log("DATA:", data);
    });
  }, []);

  return <p>Hi this is a text</p>;
}

export default App;
