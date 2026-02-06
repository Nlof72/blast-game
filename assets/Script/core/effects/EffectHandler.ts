import { Vec2i } from "../Vec2i";
import { SpecialTile } from "../tiles/Tile";
import { BoardContext } from "../board/BoardContext";

export type EffectContext = Pick<BoardContext, "cols" | "rows" | "inBounds" | "get">;

export interface EffectHandler {
  computeArea(context: EffectContext, pos: Vec2i, tile: SpecialTile): Vec2i[];
}

export class EffectRegistry {
  private handlers = new Map<number, EffectHandler>();

  public register(effect: number, handler: EffectHandler): void {
    this.handlers.set(effect, handler);
  }

  public get(effect: number): EffectHandler | undefined {
    return this.handlers.get(effect);
  }
}
