import { GroupFinder } from "../assets/Script/core/board/GroupFinder";
import { TestBoard, normal } from "./utils/TestBoard";
import { TestContext } from "./utils/TestContext";

describe("GroupFinder", () => {
  it("returns single tile group", () => {
    const board = TestBoard.fromRows([
      [normal(1), null],
      [null, null],
    ]);
    const ctx = new TestContext(board);
    const group = new GroupFinder().getNormalGroup(ctx, 0, 0, 1);
    expect(group).toHaveLength(1);
  });

  it("finds L-shape group", () => {
    const board = TestBoard.fromRows([
      [normal(2), normal(2), null],
      [normal(2), null, null],
      [null, null, null],
    ]);
    const ctx = new TestContext(board);
    const group = new GroupFinder().getNormalGroup(ctx, 0, 0, 2);
    expect(group).toHaveLength(3);
  });

  it("does not connect diagonals", () => {
    const board = TestBoard.fromRows([
      [normal(3), null],
      [null, normal(3)],
    ]);
    const ctx = new TestContext(board);
    const group = new GroupFinder().getNormalGroup(ctx, 0, 0, 3);
    expect(group).toHaveLength(1);
  });

  it("respects color separation", () => {
    const board = TestBoard.fromRows([
      [normal(1), normal(2), null],
      [normal(1), normal(2), null],
      [null, null, null],
    ]);
    const ctx = new TestContext(board);
    const group = new GroupFinder().getNormalGroup(ctx, 0, 0, 1);
    expect(group).toHaveLength(2);
  });
});
