import { GameConfig } from "./GameConfig";
import { Vec2i } from "./Vec2i";
import { Rng } from "../utils/Rng";
import { TurnResult, MoveCommand, SpawnCommand } from "./TurnResult";
import { ShuffleResult } from "./ShuffleResult";
import { Tile, SpecialEffect } from "./Tile";

type Cell = Tile | null;

export interface BoardRules {
  minGroupSize: number;
  bombRadius: number;
  superMinGroup: number;
}

export class BoardModel {
  private grid: Cell[][];
  private rng: Rng;

  constructor(private config: GameConfig, private rules: BoardRules, rng?: Rng) {
    this.rng = rng ?? new Rng();
    this.grid = [];
    this.initEmpty();
  }

  public getCols(): number { return this.config.cols; }
  public getRows(): number { return this.config.rows; }

  public initRandom(): void {
    for (let x = 0; x < this.config.cols; x++) {
      for (let y = 0; y < this.config.rows; y++) {
        this.grid[x][y] = this.randomNormalTile();
      }
    }
  }

  public get(x: number, y: number): Cell {
    if (!this.inBounds(x, y)) return null;
    return this.grid[x][y];
  }

  public set(x: number, y: number, value: Cell): void {
    if (!this.inBounds(x, y)) return;
    this.grid[x][y] = value;
  }

  public applyClick(x: number, y: number): TurnResult | null {
    if (!this.inBounds(x, y)) return null;

    const cell = this.grid[x][y];
    if (cell === null) return null;

    if (cell.kind === "special") {
      return this.applySpecialEffect({ x, y }, cell);
    }

    return this.applyNormalGroup({ x, y }, cell.color);
  }

  public hasAnyMoves(): boolean {
    for (let x = 0; x < this.config.cols; x++) {
      for (let y = 0; y < this.config.rows; y++) {
        const t = this.grid[x][y];
        if (t && t.kind === "special") return true;
      }
    }

    const visited = this.makeVisited();
    for (let x = 0; x < this.config.cols; x++) {
      for (let y = 0; y < this.config.rows; y++) {
        if (visited[x][y]) continue;
        const t = this.grid[x][y];
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
          if (size >= this.rules.minGroupSize) return true;

          for (const n of this.neighbors4(p.x, p.y)) {
            if (visited[n.x][n.y]) continue;
            const tn = this.grid[n.x][n.y];
            if (!tn || tn.kind !== "normal" || tn.color !== t.color) continue;

            visited[n.x][n.y] = true;
            stack.push(n);
          }
        }
      }
    }

    return false;
  }

  public shuffle(): ShuffleResult {
    const tiles: Tile[] = [];
    for (let x = 0; x < this.config.cols; x++) {
      for (let y = 0; y < this.config.rows; y++) {
        const t = this.grid[x][y];
        if (t) tiles.push(t);
      }
    }

    for (let i = tiles.length - 1; i > 0; i--) {
      const j = this.rng.nextInt(i + 1);
      const tmp = tiles[i];
      tiles[i] = tiles[j];
      tiles[j] = tmp;
    }

    const changes: { at: Vec2i; tile: Tile }[] = [];
    let idx = 0;
    for (let x = 0; x < this.config.cols; x++) {
      for (let y = 0; y < this.config.rows; y++) {
        if (!this.grid[x][y]) continue;
        const newTile = tiles[idx++];
        this.grid[x][y] = newTile;
        changes.push({ at: { x, y }, tile: newTile });
      }
    }

    return { changes };
  }

  public applyBombEffect(x: number, y: number, radius: number): TurnResult | null {
    if (!this.inBounds(x, y)) return null;
    
    const toRemove: Vec2i[] = [];
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        const px = x + dx;
        const py = y + dy;
        if (this.inBounds(px, py) && this.grid[px][py] !== null) {
          toRemove.push({ x: px, y: py });
        }
      }
    }
    
    if (toRemove.length === 0) return null;
    
    for (const p of toRemove) {
      this.grid[p.x][p.y] = null;
    }
    
    return this.applyGravityAndSpawn(toRemove, toRemove.length);
  }

  private applyNormalGroup(click: Vec2i, color: number): TurnResult | null {
    const group = this.getNormalGroup(click.x, click.y, color);
    if (group.length < this.rules.minGroupSize) return null;

    for (const p of group) {
      this.grid[p.x][p.y] = null;
    }

    const shouldCreateSpecial = group.length >= 5;
    return this.applyGravityAndSpawn(group, group.length, shouldCreateSpecial ? click : null, shouldCreateSpecial ? group.length : 0);
  }

  private getNormalGroup(startX: number, startY: number, color: number): Vec2i[] {
    const t0 = this.grid[startX][startY];
    if (!t0 || t0.kind !== "normal" || t0.color !== color) return [];

    const visited = this.makeVisited();
    const stack: Vec2i[] = [{ x: startX, y: startY }];
    const group: Vec2i[] = [];
    visited[startX][startY] = true;

    while (stack.length) {
      const p = stack.pop()!;
      group.push(p);

      for (const n of this.neighbors4(p.x, p.y)) {
        if (visited[n.x][n.y]) continue;
        const tn = this.grid[n.x][n.y];
        if (!tn || tn.kind !== "normal" || tn.color !== color) continue;

        visited[n.x][n.y] = true;
        stack.push(n);
      }
    }

    return group;
  }

  private applySpecialEffect(pos: Vec2i, tile: Tile & { kind: "special" }): TurnResult | null {
    const toRemove = this.computeEffectArea(pos, tile);

    if (toRemove.length === 0) {
      return null;
    }

    for (const p of toRemove) {
      this.grid[p.x][p.y] = null;
    }

    const result = this.applyGravityAndSpawn(toRemove, toRemove.length);
    return result;
  }

  private computeEffectArea(pos: Vec2i, tile: Tile & { kind: "special" }): Vec2i[] {
    const currentTile = this.grid[pos.x][pos.y];
    if (!currentTile || currentTile.kind !== "special") {
      return [];
    }

    const result: Vec2i[] = [];
    const added = new Set<string>();
    
    const add = (x: number, y: number) => {
      if (!this.inBounds(x, y)) return;
      const c = this.grid[x][y];
      if (!c) return;
      const key = `${x}_${y}`;
      if (added.has(key)) return;
      added.add(key);
      result.push({ x, y });
    };

    add(pos.x, pos.y);

    switch (tile.effect) {
      case SpecialEffect.ClearRow: {
        for (let x = 0; x < this.config.cols; x++) {
          add(x, pos.y);
        }
        break;
      }
      case SpecialEffect.ClearColumn: {
        for (let y = 0; y < this.config.rows; y++) {
          add(pos.x, y);
        }
        break;
      }
      case SpecialEffect.BombRadius: {
        const R = tile.radius ?? this.rules.bombRadius;
        for (let dx = -R; dx <= R; dx++) {
          for (let dy = -R; dy <= R; dy++) {
            add(pos.x + dx, pos.y + dy);
          }
        }
        break;
      }
      case SpecialEffect.ClearBoard: {
        for (let x = 0; x < this.config.cols; x++) {
          for (let y = 0; y < this.config.rows; y++) {
            add(x, y);
          }
        }
        break;
      }
    }

    return result;
  }

  private applyGravityAndSpawn(removed: Vec2i[], groupSize: number, createSpecialAt: Vec2i | null = null, specialGroupSize: number = 0): TurnResult {
    const moves: MoveCommand[] = [];
    const spawns: SpawnCommand[] = [];
    const tileUpdates: { at: Vec2i; tile: Tile }[] = [];
    let specialY = -1;

    if (createSpecialAt && specialGroupSize > 0) {
      const clickX = createSpecialAt.x;
      const clickY = createSpecialAt.y;
      
      let tilesAbove = 0;
      for (let y = 0; y < clickY; y++) {
        if (this.grid[clickX][y] !== null) {
          tilesAbove++;
        }
      }
      specialY = tilesAbove;
    }

    for (let x = 0; x < this.config.cols; x++) {
      const newCol: Cell[] = new Array(this.config.rows).fill(null);

      let writeY = 0;
      for (let y = 0; y < this.config.rows; y++) {
        const t = this.grid[x][y];
        if (!t) continue;

        newCol[writeY] = t;

        if (writeY !== y) {
          moves.push({ from: { x, y }, to: { x, y: writeY } });
        }

        writeY++;
      }

      const isSpecialCol = createSpecialAt && createSpecialAt.x === x && specialGroupSize > 0;

      let spawnIndex = 0;
      for (let y = writeY; y < this.config.rows; y++) {
        if (isSpecialCol && y === specialY && specialY >= writeY) {
          const effectData = this.selectSpecialEffectByGroupSize(specialGroupSize);
          const specialTile: Tile = effectData.radius !== undefined
            ? { kind: "special", effect: effectData.effect, radius: effectData.radius }
            : { kind: "special", effect: effectData.effect };
          
          newCol[y] = specialTile;
          
          spawns.push({
            to: { x, y },
            tile: specialTile,
            fromY: this.config.rows + spawnIndex + 3,
          });
          
          spawnIndex++;
          continue;
        }
        
        const tile = this.randomNormalTile();
        newCol[y] = tile;

        spawns.push({
          to: { x, y },
          tile,
          fromY: this.config.rows + spawnIndex + 3,
        });

        spawnIndex++;
      }

      if (isSpecialCol && specialY >= 0 && specialY < this.config.rows && specialY < writeY) {
        if (newCol[specialY] !== null) {
          const effectData = this.selectSpecialEffectByGroupSize(specialGroupSize);
          const specialTile: Tile = effectData.radius !== undefined
            ? { kind: "special", effect: effectData.effect, radius: effectData.radius }
            : { kind: "special", effect: effectData.effect };

          newCol[specialY] = specialTile;

          tileUpdates.push({
            at: { x, y: specialY },
            tile: specialTile
          });
        }
      }

      for (let y = 0; y < this.config.rows; y++) {
        this.grid[x][y] = newCol[y];
      }
    }

    return { removed, moves, spawns, tileUpdates: tileUpdates.length > 0 ? tileUpdates : undefined, groupSize };
  }

  private randomNormalTile(): Tile {
    const color = this.rng.nextInt(this.config.colorsCount);
    return { kind: "normal", color };
  }

  private selectSpecialEffectByGroupSize(groupSize: number): { effect: SpecialEffect; radius?: number } {
    if (groupSize >= 5 && groupSize <= 6) {
      const effects = [SpecialEffect.ClearRow, SpecialEffect.ClearColumn];
      return { effect: effects[this.rng.nextInt(effects.length)] };
    } else if (groupSize >= 7 && groupSize <= 8) {
      return { effect: SpecialEffect.BombRadius, radius: 1 };
    } else if (groupSize >= 9) {
      return { effect: SpecialEffect.ClearBoard };
    }
    return { effect: SpecialEffect.ClearRow };
  }

  private initEmpty(): void {
    this.grid = [];
    for (let x = 0; x < this.config.cols; x++) {
      const col: Cell[] = [];
      for (let y = 0; y < this.config.rows; y++) col.push(null);
      this.grid.push(col);
    }
  }

  private inBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.config.cols && y >= 0 && y < this.config.rows;
  }

  private neighbors4(x: number, y: number): Vec2i[] {
    const out: Vec2i[] = [];
    if (this.inBounds(x - 1, y)) out.push({ x: x - 1, y });
    if (this.inBounds(x + 1, y)) out.push({ x: x + 1, y });
    if (this.inBounds(x, y - 1)) out.push({ x, y: y - 1 });
    if (this.inBounds(x, y + 1)) out.push({ x, y: y + 1 });
    return out;
  }

  private makeVisited(): boolean[][] {
    const visited: boolean[][] = [];
    for (let x = 0; x < this.config.cols; x++) {
      const col: boolean[] = [];
      for (let y = 0; y < this.config.rows; y++) col.push(false);
      visited.push(col);
    }
    return visited;
  }
}
