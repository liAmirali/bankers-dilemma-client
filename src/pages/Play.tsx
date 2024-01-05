import { FC, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { SOCKET_SERVER_ADDR } from "../env/variables";

// const socket = io(SOCKET_SERVER_ADDR);

const Play: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameId = searchParams.get("gameId");

  const [player1, setPlayer1] = useState({
    name: "Player 1",
    score: 0,
    history: ["confront", "cooperate", "confront", "confront"],
  });
  const [player2, setPlayer2] = useState({
    name: "Player 2",
    score: 0,
    history: ["confront", "confront", "cooperate", "confront"],
  });
  const [playground, setPlayground] = useState({ name: "Playground", id: "12345" });

  useEffect(() => {
    let socket: Socket;

    if (gameId) {
      socket = io(SOCKET_SERVER_ADDR);

      socket.on("connect", () => {
        console.log("Connected to server");

        socket.emit("join_game", { gameId: gameId });
      });

      socket.on("start_game", () => {
        console.log("STARTING GAME...");
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

  const handleConfront = () => {
    // Emit event for confrontation
    // socket.emit('confront', { /* any relevant data */ });
  };

  const handleCooperate = () => {
    // Emit event for cooperation
    // socket.emit('cooperate', { /* any relevant data */ });
  };

  if (!gameId) return <Navigate to="/" />;

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <div className="flex justify-between w-4/5 p-8 bg-white rounded-lg shadow-md">
        {/* Player 1 */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">{player1.name}</h2>
          <p>Score: {player1.score}</p>
        </div>

        {/* Playground Details */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">{playground.name}</h2>
          <p>ID: {playground.id}</p>
        </div>

        {/* Player 2 */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">{player2.name}</h2>
          <p>Score: {player2.score}</p>
        </div>
      </div>

      {/* History */}
      <div className="mt-8 flex justify-between w-4/5 overflow-auto">
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
            {player1.history.map((action, index) => (
              <div
                key={index}
                className={`size-10 rounded-full mx-1 my-1 ${
                  action === "confront" ? "bg-red-500" : "bg-green-500"
                }`}
              ></div>
            ))}
          </div>

          <div className="flex justify-center">
            {player2.history.map((action, index) => (
              <div
                key={index}
                className={`size-10 rounded-full mx-1 my-1 ${
                  action === "confront" ? "bg-red-500" : "bg-green-500"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg mr-4 flex items-center"
          onClick={handleConfront}
        >
          Confront
          {/* Add an icon here if needed */}
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg flex items-center"
          onClick={handleCooperate}
        >
          Cooperate
          {/* Add an icon here if needed */}
        </button>
      </div>
    </div>
  );
};

export default Play;
