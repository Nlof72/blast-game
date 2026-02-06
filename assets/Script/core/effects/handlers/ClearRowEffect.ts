import { EffectContext, EffectHandler } from "../EffectHandler";
import { Vec2i } from "../../Vec2i";
import { SpecialTile } from "../../tiles/Tile";

export class ClearRowEffect implements EffectHandler {
  public computeArea(context: EffectContext, pos: Vec2i, _tile: SpecialTile): Vec2i[] {
    const result: Vec2i[] = [];
    for (let x = 0; x < context.cols; x++) {
      if (context.get(x, pos.y)) result.push({ x, y: pos.y });
    }
    return result;
  }
}
