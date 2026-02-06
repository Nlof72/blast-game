import { ClearRowEffect } from "../assets/Script/core/effects/handlers/ClearRowEffect";
import { ClearColumnEffect } from "../assets/Script/core/effects/handlers/ClearColumnEffect";
import { BombRadiusEffect } from "../assets/Script/core/effects/handlers/BombRadiusEffect";
import { ClearBoardEffect } from "../assets/Script/core/effects/handlers/ClearBoardEffect";
import { TestBoard, normal, special } from "./utils/TestBoard";
import { TestContext } from "./utils/TestContext";
import { SpecialEffect } from "../assets/Script/core/tiles/Tile";
import { Vec2i } from "../assets/Script/core/Vec2i";

const toKeySet = (points: Vec2i[]) => new Set(points.map((p) => `${p.x},${p.y}`));

const allFilled3x3 = () =>
  TestBoard.fromRows([
    [normal(0), normal(0), normal(0)],
    [normal(0), normal(0), normal(0)],
    [normal(0), normal(0), normal(0)],
  ]);

describe("EffectHandlers", () => {
  it("ClearRow clears only non-null tiles in row", () => {
    const board = TestBoard.fromRows([
      [normal(1), null, null],
      [normal(2), normal(2), normal(2)],
      [null, null, normal(3)],
    ]);
    const ctx = new TestContext(board);
    const effect = new ClearRowEffect();
    const result = effect.computeArea(ctx, { x: 1, y: 1 }, special(SpecialEffect.ClearRow));
    const keys = toKeySet(result);
    expect(keys).toEqual(new Set(["0,1", "1,1", "2,1"]));
  });

  it("ClearColumn clears only non-null tiles in column", () => {
    const board = TestBoard.fromRows([
      [normal(1), normal(1), null],
      [null, normal(2), null],
      [normal(3), normal(3), normal(3)],
    ]);
    const ctx = new TestContext(board);
    const effect = new ClearColumnEffect();
    const result = effect.computeArea(ctx, { x: 0, y: 1 }, special(SpecialEffect.ClearColumn));
    const keys = toKeySet(result);
    expect(keys).toEqual(new Set(["0,0", "0,2"]));
  });

  it("BombRadius clears 3x3 in center", () => {
    const board = allFilled3x3();
    const ctx = new TestContext(board);
    const effect = new BombRadiusEffect(1);
    const result = effect.computeArea(ctx, { x: 1, y: 1 }, special(SpecialEffect.BombRadius, 1));
    expect(result).toHaveLength(9);
  });

  it("BombRadius respects edges", () => {
    const board = allFilled3x3();
    const ctx = new TestContext(board);
    const effect = new BombRadiusEffect(1);
    const result = effect.computeArea(ctx, { x: 0, y: 0 }, special(SpecialEffect.BombRadius, 1));
    const keys = toKeySet(result);
    expect(keys).toEqual(new Set(["0,0", "0,1", "1,0", "1,1"]));
  });

  it("ClearBoard clears all non-null tiles", () => {
    const board = allFilled3x3();
    const ctx = new TestContext(board);
    const effect = new ClearBoardEffect();
    const result = effect.computeArea(ctx, { x: 1, y: 1 }, special(SpecialEffect.ClearBoard));
    expect(result).toHaveLength(9);
  });
});
