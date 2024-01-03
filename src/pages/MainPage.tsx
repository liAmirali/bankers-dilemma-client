import { FC, useEffect, useState } from "react";
import { getGameList } from "../api/getGames";

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
    <div>
      {games.map((game) => (
        <div key={game.game_id}>
          <h2>{game.name}</h2>
          <p>{game.created_at}</p>
          <p>ID: {game.game_id}</p>
          {game.is_active && <p>Active</p>}
        </div>
      ))}
    </div>
  );
};

export default MainPage;
