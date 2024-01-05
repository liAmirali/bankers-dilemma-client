import { FC } from "react";

type Props = {
  playerSid: string;
  gameId: string;
  players: [PlayerDataT | null, PlayerDataT | null];
  history: TurnResultT[];
  onConfront: () => void;
  onCooperate: () => void;
};

const Playground: FC<Props> = ({
  playerSid,
  players,
  history,
  gameId,
  onConfront,
  onCooperate,
}) => {
  const player1: PlayerDataT | null = players[0]
    ? playerSid === players[0].sid
      ? players[0]
      : players[1]
    : null;
  const player2: PlayerDataT | null = players[1]
    ? playerSid !== players[1].sid
      ? players[1]
      : players[0]
    : null;

  const player1Moves: PlayerMoveT[] = [];
  const player2Moves: PlayerMoveT[] = [];
  history.forEach((record) => {
    if (record.moves[0].sid === playerSid) {
      player1Moves.push(record.moves[0]);
      player2Moves.push(record.moves[1]);
    } else {
      player1Moves.push(record.moves[1]);
      player2Moves.push(record.moves[0]);
    }
  });

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <div className="flex w-4/5 p-8 bg-white rounded-lg shadow-md">
        {/* Player 1 */}
        <div className="flex flex-1 flex-col items-center">
          {player1 ? (
            <>
              <h2 className="text-xl font-semibold">{player1.sid}</h2>
              <p>Score: {player1.score}</p>
            </>
          ) : (
            <p>Not Joined</p>
          )}
        </div>

        {/* Playground Details */}
        <div className="flex flex-[2] flex-col items-center">
          <h2 className="text-2xl font-bold">{"playground.name"}</h2>
          <p>ID: {gameId}</p>
        </div>

        {/* Player 2 */}
        <div className="flex flex-1 flex-col items-center">
          {player2 ? (
            <>
              <h2 className="text-xl font-semibold">{player2.sid}</h2>
              <p>Score: {player2.score}</p>
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
            {player1Moves.map((move, index) => (
              <div
                key={index}
                className={`size-10 rounded-full mx-1 my-1 ${
                  move.move === "confront" ? "bg-red-500" : "bg-green-500"
                }`}
              ></div>
            ))}
          </div>

          <div className="flex justify-center">
            {player2Moves.map((move, index) => (
              <div
                key={index}
                className={`size-10 rounded-full mx-1 my-1 ${
                  move.move === "confront" ? "bg-red-500" : "bg-green-500"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex mt-8">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg mr-4 flex items-center"
          onClick={onConfront}
        >
          Confront
          {/* Add an icon here if needed */}
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg flex items-center"
          onClick={onCooperate}
        >
          Cooperate
          {/* Add an icon here if needed */}
        </button>
      </div>
    </div>
  );
};

export default Playground;
