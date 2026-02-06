import { BombSystem } from "../assets/Script/core/board/BombSystem";
import { TestBoard, normal } from "./utils/TestBoard";
import { TurnResult } from "../assets/Script/core/TurnResult";

const emptyResult = (removed: any[], groupSize: number): TurnResult => ({
  removed,
  moves: [],
  spawns: [],
  groupSize,
});

describe("BombSystem", () => {
  it("removes 3x3 at center", () => {
    const board = TestBoard.fromRows([
      [normal(0), normal(0), normal(0)],
      [normal(0), normal(0), normal(0)],
      [normal(0), normal(0), normal(0)],
    ]);
    const bomb = new BombSystem();
    const result = bomb.apply(board, { x: 1, y: 1 }, 1, emptyResult);
    expect(result).not.toBeNull();
    expect(result?.removed.length).toBe(9);
  });

  it("respects edges", () => {
    const board = TestBoard.fromRows([
      [normal(0), normal(0), normal(0)],
      [normal(0), normal(0), normal(0)],
      [normal(0), normal(0), normal(0)],
    ]);
    const bomb = new BombSystem();
    const result = bomb.apply(board, { x: 0, y: 0 }, 1, emptyResult);
    expect(result).not.toBeNull();
    expect(result?.removed.length).toBe(4);
  });
});
