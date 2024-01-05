import { FC, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { SOCKET_SERVER_ADDR } from "../env/variables";
import { toast } from "react-toastify";
import Playground from "../views/Playgrond";

// const socket = io(SOCKET_SERVER_ADDR);

const Play: FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameId = searchParams.get("gameId");

  const [playerSocket, setPlayerSocket] = useState<Socket | null>(null);

  const [players, setPlayers] = useState<[PlayerDataT | null, PlayerDataT | null]>([null, null]);
  const [history, setHistory] = useState<TurnResultT[]>([]);

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
  }, [navigate, gameId]);

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

  if (!playerSocket) return <p>Loading...</p>;

  return (
    <Playground
      playerSid={playerSocket.id}
      players={players}
      history={history}
      gameId={gameId}
      onConfront={handleConfront}
      onCooperate={handleCooperate}
    />
  );
};

export default Play;
