import { BoardContext } from "../../assets/Script/core/board/BoardContext";
import { Tile, SpecialEffect, SpecialTile } from "../../assets/Script/core/tiles/Tile";

export const normal = (color: number): Tile => ({ kind: "normal", color });
export const special = (effect: SpecialEffect, radius?: number): SpecialTile =>
  radius !== undefined ? { kind: "special", effect, radius } : { kind: "special", effect };

export class TestBoard implements BoardContext {
  public cols: number;
  public rows: number;
  private grid: (Tile | null)[][];

  constructor(cols: number, rows: number, fill: Tile | null = null) {
    this.cols = cols;
    this.rows = rows;
    this.grid = [];
    for (let x = 0; x < cols; x++) {
      const col: (Tile | null)[] = [];
      for (let y = 0; y < rows; y++) col.push(fill);
      this.grid.push(col);
    }
  }

  public static fromRows(rows: (Tile | null)[][]): TestBoard {
    const rowCount = rows.length;
    const colCount = rowCount > 0 ? rows[0].length : 0;
    const board = new TestBoard(colCount, rowCount, null);
    for (let y = 0; y < rowCount; y++) {
      for (let x = 0; x < colCount; x++) {
        board.set(x, y, rows[y][x] ?? null);
      }
    }
    return board;
  }

  public inBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
  }

  public get(x: number, y: number): Tile | null {
    if (!this.inBounds(x, y)) return null;
    return this.grid[x][y];
  }

  public set(x: number, y: number, tile: Tile | null): void {
    if (!this.inBounds(x, y)) return;
    this.grid[x][y] = tile;
  }

  public toRows(): (Tile | null)[][] {
    const out: (Tile | null)[][] = [];
    for (let y = 0; y < this.rows; y++) {
      const row: (Tile | null)[] = [];
      for (let x = 0; x < this.cols; x++) row.push(this.grid[x][y]);
      out.push(row);
    }
    return out;
  }
}
