import { MoveResolver } from "../assets/Script/core/board/MoveResolver";
import { GroupFinder } from "../assets/Script/core/board/GroupFinder";
import { EffectRegistry } from "../assets/Script/core/effects/EffectHandler";
import { ClearRowEffect } from "../assets/Script/core/effects/handlers/ClearRowEffect";
import { SpecialSpawnPolicy } from "../assets/Script/core/spawn/SpecialSpawnPolicy";
import { GravitySystem } from "../assets/Script/core/board/GravitySystem";
import { SpecialTileFactory } from "../assets/Script/core/spawn/SpecialTileFactory";
import { TestBoard, normal, special } from "./utils/TestBoard";
import { TestContext } from "./utils/TestContext";
import { FakeRng } from "./utils/FakeRng";
import { SpecialEffect } from "../assets/Script/core/tiles/Tile";
import { GameConfig } from "../assets/Script/core/GameConfig";
import { BoardRules } from "../assets/Script/core/BoardModel";
import { SpecialSpawnRules } from "../assets/Script/core/spawn/SpecialSpawnRules";

describe("MoveResolver", () => {
  const config: GameConfig = {
    cols: 2,
    rows: 2,
    colorsCount: 1,
    goalScore: 100,
    movesLimit: 10,
  };

  const spawnRules: SpecialSpawnRules = {
    tiers: [{ min: 2, effects: [SpecialEffect.ClearRow] }],
  };

  const rules: BoardRules = {
    minGroupSize: 2,
    bombRadius: 1,
    specialSpawnRules: spawnRules,
  };

  const buildResolver = () => {
    const rng = new FakeRng([0]);
    const effects = new EffectRegistry();
    effects.register(SpecialEffect.ClearRow, new ClearRowEffect());
    const groupFinder = new GroupFinder();
    const spawnPolicy = new SpecialSpawnPolicy(spawnRules);
    const gravity = new GravitySystem(new SpecialTileFactory());
    return new MoveResolver(config, rules, rng as any, effects, groupFinder, spawnPolicy, gravity);
  };

  it("returns null for small group", () => {
    const board = TestBoard.fromRows([
      [normal(0), null],
      [null, null],
    ]);
    const ctx = new TestContext(board);
    const resolver = buildResolver();
    expect(resolver.applyClick(ctx, 0, 0)).toBeNull();
  });

  it("normal click removes group and spawns", () => {
    const board = TestBoard.fromRows([
      [normal(0), normal(0)],
      [null, null],
    ]);
    const ctx = new TestContext(board);
    const resolver = buildResolver();
    const result = resolver.applyClick(ctx, 0, 0);
    expect(result).not.toBeNull();
    expect(result?.removed.length).toBe(2);
    expect(result?.groupSize).toBe(2);
    expect(result?.spawns.length).toBeGreaterThan(0);
    expect(result?.tileUpdates).toBeUndefined();
    const hasSpecialSpawn = result?.spawns.some((s) => s.tile.kind === "special") ?? false;
    expect(hasSpecialSpawn).toBe(true);
  });

  it("special click applies effect", () => {
    const board = TestBoard.fromRows([
      [special(SpecialEffect.ClearRow), normal(0)],
      [null, null],
    ]);
    const ctx = new TestContext(board);
    const resolver = buildResolver();
    const result = resolver.applyClick(ctx, 0, 0);
    expect(result).not.toBeNull();
    expect(result?.removed.length).toBe(2);
  });
});
