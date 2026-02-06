import { GroupFinder } from "./GroupFinder";
import { BoardContext } from "./BoardContext";

export type MoveAvailabilityContext = Pick<BoardContext, "cols" | "rows" | "get" | "inBounds">;

export class MoveAvailability {
  constructor(private readonly groupFinder: GroupFinder) {}

  public hasAnyMoves(context: MoveAvailabilityContext, minGroupSize: number): boolean {
    for (let x = 0; x < context.cols; x++) {
      for (let y = 0; y < context.rows; y++) {
        const t = context.get(x, y);
        if (t && t.kind === "special") return true;
      }
    }

    return this.groupFinder.hasAnyNormalGroup(context, minGroupSize);
  }
}
