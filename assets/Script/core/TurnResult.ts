import { Tile } from "./Tile";
import { Vec2i } from "./Vec2i";

export interface MoveCommand {
  from: Vec2i;
  to: Vec2i;
}

export interface SpawnCommand {
  to: Vec2i;
  tile: Tile;
  fromY: number;
}

export interface TileUpdateCommand {
  at: Vec2i;
  tile: Tile;
}

export interface TurnResult {
  removed: Vec2i[];
  moves: MoveCommand[];
  spawns: SpawnCommand[];
  tileUpdates?: TileUpdateCommand[];
  groupSize: number;
}
