import { EffectContext, EffectHandler } from "../EffectHandler";
import { Vec2i } from "../../Vec2i";
import { SpecialTile } from "../../tiles/Tile";

export class ClearBoardEffect implements EffectHandler {
  public computeArea(context: EffectContext, _pos: Vec2i, _tile: SpecialTile): Vec2i[] {
    const result: Vec2i[] = [];
    for (let x = 0; x < context.cols; x++) {
      for (let y = 0; y < context.rows; y++) {
        if (context.get(x, y)) result.push({ x, y });
      }
    }
    return result;
  }
}
