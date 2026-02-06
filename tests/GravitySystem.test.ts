import { GravitySystem } from "../assets/Script/core/board/GravitySystem";
import { SpecialTileFactory } from "../assets/Script/core/spawn/SpecialTileFactory";
import { TestBoard, normal } from "./utils/TestBoard";
import { TestContext } from "./utils/TestContext";
import { SpecialEffect, Tile } from "../assets/Script/core/tiles/Tile";

const fixedNormal = (): Tile => ({ kind: "normal", color: 9 });

describe("GravitySystem", () => {
  it("drops tiles down and spawns new tiles", () => {
    const board = TestBoard.fromRows([
      [null],
      [normal(1)],
      [normal(2)],
    ]);
    const ctx = new TestContext(board);
    const gravity = new GravitySystem(new SpecialTileFactory());

    const result = gravity.apply(ctx, null, null, fixedNormal);

    expect(result.moves).toHaveLength(2);
    expect(result.spawns).toHaveLength(1);
    expect(board.get(0, 0)).not.toBeNull();
    expect(board.get(0, 1)).not.toBeNull();
    expect(board.get(0, 2)).not.toBeNull();
  });

  it("spawns special tile in clicked column", () => {
    const board = TestBoard.fromRows([
      [null],
      [null],
    ]);
    const ctx = new TestContext(board);
    const gravity = new GravitySystem(new SpecialTileFactory());

    const result = gravity.apply(
      ctx,
      { x: 0, y: 0 },
      { effect: SpecialEffect.ClearRow },
      fixedNormal
    );

    expect(result.spawns).toHaveLength(2);
    expect(result.spawns[0].tile.kind).toBe("special");
    expect(board.get(0, 0)?.kind).toBe("special");
  });
});
