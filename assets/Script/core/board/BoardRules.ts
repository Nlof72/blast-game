import { SpecialSpawnRules } from "../spawn/SpecialSpawnRules";

export interface BoardRules {
  minGroupSize: number;
  bombRadius: number;
  specialSpawnRules: SpecialSpawnRules;
}
