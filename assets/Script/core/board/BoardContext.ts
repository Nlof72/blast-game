import { Tile } from "../tiles/Tile";

export interface BoardContext {
  cols: number;
  rows: number;
  get(x: number, y: number): Tile | null;
  set(x: number, y: number, tile: Tile | null): void;
  inBounds(x: number, y: number): boolean;
}
