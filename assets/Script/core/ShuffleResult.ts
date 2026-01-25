import { Vec2i } from "./Vec2i";
import { Tile } from "./Tile";

export interface ShuffleChange {
  at: Vec2i;
  tile: Tile;
}

export interface ShuffleResult {
  changes: ShuffleChange[];
}
