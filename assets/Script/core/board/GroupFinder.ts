import { Vec2i } from "../Vec2i";
import { BoardContext } from "./BoardContext";

export type GroupFinderContext = Pick<BoardContext, "cols" | "rows" | "get" | "inBounds">;

export class GroupFinder {
  public getNormalGroup(context: GroupFinderContext, startX: number, startY: number, color: number): Vec2i[] {
    const t0 = context.get(startX, startY);
    if (!t0 || t0.kind !== "normal" || t0.color !== color) return [];

    const visited = this.makeVisited(context.cols, context.rows);
    const stack: Vec2i[] = [{ x: startX, y: startY }];
    const group: Vec2i[] = [];
    visited[startX][startY] = true;

    while (stack.length) {
      const p = stack.pop()!;
      group.push(p);

      for (const n of this.neighbors4(context, p.x, p.y)) {
        if (visited[n.x][n.y]) continue;
        const tn = context.get(n.x, n.y);
        if (!tn || tn.kind !== "normal" || tn.color !== color) continue;

        visited[n.x][n.y] = true;
        stack.push(n);
      }
    }

    return group;
  }

  public hasAnyNormalGroup(context: GroupFinderContext, minGroupSize: number): boolean {
    const visited = this.makeVisited(context.cols, context.rows);
    for (let x = 0; x < context.cols; x++) {
      for (let y = 0; y < context.rows; y++) {
        if (visited[x][y]) continue;
        const t = context.get(x, y);
        if (!t || t.kind !== "normal") {
          visited[x][y] = true;
          continue;
        }

        const stack: Vec2i[] = [{ x, y }];
        visited[x][y] = true;
        let size = 0;

        while (stack.length) {
          const p = stack.pop()!;
          size++;
          if (size >= minGroupSize) return true;

          for (const n of this.neighbors4(context, p.x, p.y)) {
            if (visited[n.x][n.y]) continue;
            const tn = context.get(n.x, n.y);
            if (!tn || tn.kind !== "normal" || tn.color !== t.color) continue;

            visited[n.x][n.y] = true;
            stack.push(n);
          }
        }
      }
    }

    return false;
  }

  private neighbors4(context: GroupFinderContext, x: number, y: number): Vec2i[] {
    const out: Vec2i[] = [];
    if (context.inBounds(x - 1, y)) out.push({ x: x - 1, y });
    if (context.inBounds(x + 1, y)) out.push({ x: x + 1, y });
    if (context.inBounds(x, y - 1)) out.push({ x, y: y - 1 });
    if (context.inBounds(x, y + 1)) out.push({ x, y: y + 1 });
    return out;
  }

  private makeVisited(cols: number, rows: number): boolean[][] {
    const visited: boolean[][] = [];
    for (let x = 0; x < cols; x++) {
      const col: boolean[] = [];
      for (let y = 0; y < rows; y++) col.push(false);
      visited.push(col);
    }
    return visited;
  }
}
