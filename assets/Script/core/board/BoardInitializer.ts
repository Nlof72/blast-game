import { Tile } from "../tiles/Tile";
import { BoardContext } from "./BoardContext";

export type BoardInitContext = Pick<BoardContext, "cols" | "rows" | "set">;

export class BoardInitializer {
  public initRandom(context: BoardInitContext, randomNormalTile: () => Tile): void {
    for (let x = 0; x < context.cols; x++) {
      for (let y = 0; y < context.rows; y++) {
        context.set(x, y, randomNormalTile());
      }
    }
  }
}
