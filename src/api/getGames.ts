import { fetcher } from "./config";

export const getGameList = async () => {
  return await fetcher.get("/game");
};
