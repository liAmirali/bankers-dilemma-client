type GameT = {
  game_id: number | string;
  name: string;
  is_active: boolean;
  created_at: string;
};

type GameRoomDetails = {
  players: [PlayerDataT | null, PlayerDataT | null];
  isStarted: boolean;
  playersCount: number;
};

type MoveOption = "confront" | "cooperate";

type PlayerDataT = {
  sid: string;
  score: number;
  latestMove: MoveOption | null;
};

type PlayerMoveT = {
  sid: string;
  move: MoveOption;
  score: number;
};

type TurnResultT = {
  gameId: number;
  moves: [PlayerMoveT, PlayerMoveT];
};

type MessageT = {
  message: string;
  code: number;
};
