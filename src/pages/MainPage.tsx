import { FC, useEffect, useState } from "react";
import { getGameList } from "../api/getGames";
import { fromNow, prettyDate } from "../utils/time";

const MainPage: FC = () => {
  const [games, setGames] = useState<GameT[]>([]);

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
    <div className="text-white flex flex-col items-center">
      {games.map((game) => (
        <div
          key={game.game_id}
          className="border rounded-lg shadow-md shadow-white flex flex-col items-center w-2/5 p-4 mb-4"
        >
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="text-3xl">{game.name}</h2>
              <p className="text-sm text-neutral-300">ID: {game.game_id}</p>
              <p>{`${prettyDate(game.created_at)} (${fromNow(game.created_at)})`}</p>
            </div>
            {game.is_active && (
              <div className="ml-2 p-2 rounded-full bg-green-600 text-center">Active</div>
            )}
          </div>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out focus:outline-none">
            Join Game Room
          </button>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
