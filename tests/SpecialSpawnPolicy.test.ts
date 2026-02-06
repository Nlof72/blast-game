import { SpecialSpawnPolicy } from "../assets/Script/core/spawn/SpecialSpawnPolicy";
import { SpecialEffect } from "../assets/Script/core/tiles/Tile";
import { FakeRng } from "./utils/FakeRng";
import { SpecialSpawnRules } from "../assets/Script/core/spawn/SpecialSpawnRules";

const rules: SpecialSpawnRules = {
  tiers: [
    { min: 5, max: 6, effects: [SpecialEffect.ClearRow, SpecialEffect.ClearColumn] },
    { min: 7, max: 8, effects: [SpecialEffect.BombRadius], radius: 1 },
    { min: 9, effects: [SpecialEffect.ClearBoard] },
  ],
};

describe("SpecialSpawnPolicy", () => {
  it("returns null for small groups", () => {
    const policy = new SpecialSpawnPolicy(rules);
    const rng = new FakeRng([0]);
    expect(policy.getSpecForGroup(4, rng)).toBeNull();
  });

  it("selects effect from tier list", () => {
    const policy = new SpecialSpawnPolicy(rules);
    const rng = new FakeRng([1]);
    const spec = policy.getSpecForGroup(5, rng);
    expect(spec?.effect).toBe(SpecialEffect.ClearColumn);
  });

  it("returns BombRadius with radius for mid tier", () => {
    const policy = new SpecialSpawnPolicy(rules);
    const rng = new FakeRng([0]);
    const spec = policy.getSpecForGroup(7, rng);
    expect(spec?.effect).toBe(SpecialEffect.BombRadius);
    expect(spec?.radius).toBe(1);
  });

  it("returns ClearBoard for large groups", () => {
    const policy = new SpecialSpawnPolicy(rules);
    const rng = new FakeRng([0]);
    const spec = policy.getSpecForGroup(9, rng);
    expect(spec?.effect).toBe(SpecialEffect.ClearBoard);
  });
});
