import { Rng } from "../../utils/Rng";
import { SpecialSpawnRules } from "./SpecialSpawnRules";
import { SpecialEffect } from "../tiles/Tile";

export type SpecialSpawnSpec = { effect: SpecialEffect; radius?: number };

export class SpecialSpawnPolicy {
  constructor(private readonly rules: SpecialSpawnRules) {
    this.validateRules();
  }

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

  private validateRules(): void {
    if (!this.rules || !Array.isArray(this.rules.tiers) || this.rules.tiers.length === 0) {
      cc.warn("[SpecialSpawnPolicy] No tiers configured for special spawn rules.");
      return;
    }
    for (const tier of this.rules.tiers) {
      if (tier.min < 0) {
        cc.warn("[SpecialSpawnPolicy] tier.min should be >= 0:", tier.min);
      }
      if (tier.max !== undefined && tier.max < tier.min) {
        cc.warn("[SpecialSpawnPolicy] tier.max < tier.min:", tier.max, tier.min);
      }
      if (!tier.effects || tier.effects.length === 0) {
        cc.warn("[SpecialSpawnPolicy] tier has no effects:", tier);
      }
    }
  }
}
