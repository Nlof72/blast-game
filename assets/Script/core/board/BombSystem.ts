import { Vec2i } from "../Vec2i";
import { TurnResult } from "../TurnResult";
import { BoardContext } from "./BoardContext";

export type BombContext = BoardContext;

export class BombSystem {
  public apply(
    context: BombContext,
    center: Vec2i,
    radius: number,
    applyGravity: (removed: Vec2i[], groupSize: number) => TurnResult
  ): TurnResult | null {
    if (!context.inBounds(center.x, center.y)) return null;

    const toRemove: Vec2i[] = [];
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        const x = center.x + dx;
        const y = center.y + dy;
        if (!context.inBounds(x, y)) continue;
        if (context.get(x, y) === null) continue;
        toRemove.push({ x, y });
      }
    }

    if (toRemove.length === 0) return null;

    for (const p of toRemove) {
      context.set(p.x, p.y, null);
    }

    return applyGravity(toRemove, toRemove.length);
  }
}
