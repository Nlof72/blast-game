import { MoveAvailability } from "../assets/Script/core/board/MoveAvailability";
import { GroupFinder } from "../assets/Script/core/board/GroupFinder";
import { TestBoard, normal, special } from "./utils/TestBoard";
import { TestContext } from "./utils/TestContext";
import { SpecialEffect } from "../assets/Script/core/tiles/Tile";

describe("MoveAvailability", () => {
  it("returns false when no groups and no specials", () => {
    const board = TestBoard.fromRows([
      [normal(1), normal(2)],
      [normal(3), normal(4)],
    ]);
    const ctx = new TestContext(board);
    const availability = new MoveAvailability(new GroupFinder());
    expect(availability.hasAnyMoves(ctx, 2)).toBe(false);
  });

  it("returns true when there is a valid group", () => {
    const board = TestBoard.fromRows([
      [normal(1), normal(1)],
      [normal(2), normal(3)],
    ]);
    const ctx = new TestContext(board);
    const availability = new MoveAvailability(new GroupFinder());
    expect(availability.hasAnyMoves(ctx, 2)).toBe(true);
  });

  it("returns true when there is a special tile", () => {
    const board = TestBoard.fromRows([
      [special(SpecialEffect.ClearRow), normal(2)],
      [normal(3), normal(4)],
    ]);
    const ctx = new TestContext(board);
    const availability = new MoveAvailability(new GroupFinder());
    expect(availability.hasAnyMoves(ctx, 2)).toBe(true);
  });
});
