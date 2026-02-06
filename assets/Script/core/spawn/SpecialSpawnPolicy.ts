import { Rng } from "../../utils/Rng";
import { SpecialSpawnRules } from "./SpecialSpawnRules";
import { SpecialEffect } from "../tiles/Tile";

export type SpecialSpawnSpec = { effect: SpecialEffect; radius?: number };

export class SpecialSpawnPolicy {
  constructor(private readonly rules: SpecialSpawnRules) {}

  public getSpecForGroup(groupSize: number, rng: Rng): SpecialSpawnSpec | null {
    for (const tier of this.rules.tiers) {
      if (groupSize < tier.min) continue;
      if (tier.max !== undefined && groupSize > tier.max) continue;
      if (!tier.effects || tier.effects.length === 0) return null;
      const effect = tier.effects[rng.nextInt(tier.effects.length)];
      return { effect, radius: tier.radius };
    }
    return null;
  }
}
