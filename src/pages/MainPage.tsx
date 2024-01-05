import { FC, useEffect, useState } from "react";
import { getGameList } from "../api/getGames";
import { fromNow, prettyDate } from "../utils/time";
import { useNavigate } from "react-router-dom";

const MainPage: FC = () => {
  const [games, setGames] = useState<GameT[]>([]);

  const navigate = useNavigate();

  const handleJoinGame = (game: GameT) => {
    navigate(`/play?gameId=${game.game_id}`);
  };

  useEffect(() => {
    const fetchGames = async () => {
      const res = await getGameList();

      console.log("RES:", res);
      if (res?.data?.data?.games) setGames(res.data.data.games);

      return res;
    };

    fetchGames();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {games.map((game) => (
        <div
          key={game.game_id}
          className="border rounded-lg shadow-md flex flex-col items-center w-2/5 p-8 mb-4 bg-white"
          // className="flex justify-between"
        >
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="text-3xl">{game.name}</h2>
              <p className="text-sm text-neutral-600">ID: {game.game_id}</p>
              <p>{`${prettyDate(game.created_at)} (${fromNow(game.created_at)})`}</p>
            </div>
            {game.is_active && (
              <div className="ml-2 py-2 px-6 rounded-full bg-green-600 text-white text-center">Active</div>
            )}
          </div>
          <button
            onClick={() => handleJoinGame(game)}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out focus:outline-none"
          >
            Join Game Room
          </button>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
