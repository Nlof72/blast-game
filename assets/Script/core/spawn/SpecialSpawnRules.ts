import { SpecialEffect } from "../tiles/Tile";

export interface SpecialSpawnTier {
  min: number;
  max?: number;
  effects: SpecialEffect[];
  radius?: number;
}

export interface SpecialSpawnRules {
  tiers: SpecialSpawnTier[];
}
