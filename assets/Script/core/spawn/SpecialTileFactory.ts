import { SpecialTile } from "../tiles/Tile";
import { SpecialEffect } from "../tiles/Tile";

export class SpecialTileFactory {
  public create(effect: SpecialEffect, radius?: number): SpecialTile {
    return radius !== undefined
      ? { kind: "special", effect, radius }
      : { kind: "special", effect };
  }
}
