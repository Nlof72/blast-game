import { ShuffleResult } from "../ShuffleResult";
import { Vec2i } from "../Vec2i";
import { Rng } from "../../utils/Rng";
import { BoardContext } from "./BoardContext";
import { Tile } from "../tiles/Tile";

export type ShuffleContext = Pick<BoardContext, "cols" | "rows" | "get" | "set">;

export class ShuffleSystem {
  constructor(private readonly rng: Rng) {}

  public shuffle(context: ShuffleContext): ShuffleResult {
    const tiles: Tile[] = [];
    for (let x = 0; x < context.cols; x++) {
      for (let y = 0; y < context.rows; y++) {
        const t = context.get(x, y);
        if (t) tiles.push(t);
      }
    }

    for (let i = tiles.length - 1; i > 0; i--) {
      const j = this.rng.nextInt(i + 1);
      const tmp = tiles[i];
      tiles[i] = tiles[j];
      tiles[j] = tmp;
    }

    const changes: { at: Vec2i; tile: Tile }[] = [];
    let idx = 0;
    for (let x = 0; x < context.cols; x++) {
      for (let y = 0; y < context.rows; y++) {
        if (!context.get(x, y)) continue;
        const newTile = tiles[idx++];
        context.set(x, y, newTile);
        changes.push({ at: { x, y }, tile: newTile });
      }
    }

    return { changes };
  }
}
