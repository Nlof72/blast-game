import { BoardContext } from "../../assets/Script/core/board/BoardContext";
import { Tile } from "../../assets/Script/core/tiles/Tile";
import { TestBoard } from "./TestBoard";

export class TestContext implements BoardContext {
  public cols: number;
  public rows: number;

  constructor(private readonly board: TestBoard) {
    this.cols = board.cols;
    this.rows = board.rows;
  }

  public inBounds(x: number, y: number): boolean {
    return this.board.inBounds(x, y);
  }

  public get(x: number, y: number): Tile | null {
    return this.board.get(x, y);
  }

  public set(x: number, y: number, tile: Tile | null): void {
    this.board.set(x, y, tile);
  }
}
