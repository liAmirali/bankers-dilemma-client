import { FC, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { SOCKET_SERVER_ADDR } from "../env/variables";
import { toast } from "react-toastify";

// const socket = io(SOCKET_SERVER_ADDR);

const Play: FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameId = searchParams.get("gameId");

  const [playerSocket, setPlayerSocket] = useState<Socket | null>(null);

  const [players, setPlayers] = useState<[PlayerDataT | null, PlayerDataT | null]>([null, null]);
  const [history, setHistory] = useState<TurnResultT[]>([]);

  const [playground, setPlayground] = useState({ name: "Playground", id: gameId });

  useEffect(() => {
    let socket: Socket;

    if (gameId) {
      socket = io(SOCKET_SERVER_ADDR);

      socket.on("connect", () => {
        console.log("Connected to server");

        setPlayers((prevValues) => [{ sid: socket.id, score: 0, latestMove: null }, prevValues[1]]);

        socket.emit("join_game", { gameId: gameId });
      });

      socket.on("start_game", (data: GameRoomDetails) => {
        console.log("STARTING GAME...", data);
        setPlayers(data.players);
      });

      socket.on("results", (data: TurnResultT) => {
        console.log("PLAYED:", data);

        setHistory((prevHistory) => [...prevHistory, data]);
        setPlayers((prevValue) => [
          {
            sid: prevValue[0]!.sid,
            latestMove: data.moves[0].move,
            score: prevValue[0]!.score + data.moves[0].score,
          },
          {
            sid: prevValue[1]!.sid,
            latestMove: data.moves[1].move,
            score: prevValue[1]!.score + data.moves[1].score,
          },
        ]);
      });

      socket.on("message", (data: MessageT) => {
        console.log("MSG:", data);
        toast(data.message, { type: "default" });

        if (data.code === 3) {
          navigate("/");
        }
      });

      setPlayerSocket(socket);
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
    if (!playerSocket) {
      alert("No socket there bitch");
      return;
    }

    playerSocket.emit("play", { gameId: gameId, move: "confront" });
  };

  const handleCooperate = () => {
    if (!playerSocket) {
      alert("No socket there bitch");
      return;
    }

    playerSocket.emit("play", { gameId: gameId, move: "cooperate" });
  };

  if (!gameId) return <Navigate to="/" />;

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <div className="flex w-4/5 p-8 bg-white rounded-lg shadow-md">
        {/* Player 1 */}
        <div className="flex flex-1 flex-col items-center">
          {players[0] ? (
            <>
              <h2 className="text-xl font-semibold">{players[0].sid}</h2>
              <p>Score: {players[0].score}</p>
            </>
          ) : (
            <p>Not Joined</p>
          )}
        </div>

        {/* Playground Details */}
        <div className="flex flex-[2] flex-col items-center">
          <h2 className="text-2xl font-bold">{playground.name}</h2>
          <p>ID: {playground.id}</p>
        </div>

        {/* Player 2 */}
        <div className="flex flex-1 flex-col items-center">
          {players[1] ? (
            <>
              <h2 className="text-xl font-semibold">{players[1].sid}</h2>
              <p>Score: {players[1].score}</p>
            </>
          ) : (
            <p>Not Joined</p>
          )}
        </div>
      </div>

      {/* History */}
      <div className="mt-8 flex justify-between w-4/5 overflow-auto">
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
            {history.map((turnResult, index) => (
              <div
                key={index}
                className={`size-10 rounded-full mx-1 my-1 ${
                  turnResult.moves[0].move === "confront" ? "bg-red-500" : "bg-green-500"
                }`}
              ></div>
            ))}
          </div>

          <div className="flex justify-center">
            {history.map((turnResult, index) => (
              <div
                key={index}
                className={`size-10 rounded-full mx-1 my-1 ${
                  turnResult.moves[1].move === "confront" ? "bg-red-500" : "bg-green-500"
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
