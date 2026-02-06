import { EffectContext, EffectHandler } from "../EffectHandler";
import { Vec2i } from "../../Vec2i";
import { SpecialTile } from "../../tiles/Tile";

export class ClearColumnEffect implements EffectHandler {
  public computeArea(context: EffectContext, pos: Vec2i, _tile: SpecialTile): Vec2i[] {
    const result: Vec2i[] = [];
    for (let y = 0; y < context.rows; y++) {
      if (context.get(pos.x, y)) result.push({ x: pos.x, y });
    }
    return result;
  }
}
