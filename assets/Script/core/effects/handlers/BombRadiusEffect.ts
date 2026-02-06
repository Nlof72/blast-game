import { EffectContext, EffectHandler } from "../EffectHandler";
import { Vec2i } from "../../Vec2i";
import { SpecialTile } from "../../tiles/Tile";

export class BombRadiusEffect implements EffectHandler {
  constructor(private readonly defaultRadius: number) {}

  public computeArea(context: EffectContext, pos: Vec2i, tile: SpecialTile): Vec2i[] {
    const radius = tile.radius ?? this.defaultRadius;
    const result: Vec2i[] = [];

    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        const x = pos.x + dx;
        const y = pos.y + dy;
        if (!context.inBounds(x, y)) continue;
        if (!context.get(x, y)) continue;
        result.push({ x, y });
      }
    }

    return result;
  }
}
