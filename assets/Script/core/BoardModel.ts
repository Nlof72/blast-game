import { GameConfig } from "./GameConfig";
import { Rng } from "../utils/Rng";
import { TurnResult } from "./TurnResult";
import { ShuffleResult } from "./ShuffleResult";
import { SpecialEffect, Tile } from "./tiles/Tile";
import { EffectRegistry } from "./effects/EffectHandler";
import { BoardRules } from "./board/BoardRules";
import { ClearRowEffect } from "./effects/handlers/ClearRowEffect";
import { ClearColumnEffect } from "./effects/handlers/ClearColumnEffect";
import { BombRadiusEffect } from "./effects/handlers/BombRadiusEffect";
import { ClearBoardEffect } from "./effects/handlers/ClearBoardEffect";
import { SpecialSpawnPolicy } from "./spawn/SpecialSpawnPolicy";
import { SpecialTileFactory } from "./spawn/SpecialTileFactory";
import { GroupFinder } from "./board/GroupFinder";
import { GravitySystem } from "./board/GravitySystem";
import { ShuffleSystem } from "./board/ShuffleSystem";
import { BombSystem } from "./board/BombSystem";
import { MoveResolver } from "./board/MoveResolver";
import { MoveAvailability } from "./board/MoveAvailability";
import { BoardInitializer } from "./board/BoardInitializer";
import { NormalTileFactory } from "./spawn/NormalTileFactory";

type Cell = Tile | null;

export { BoardRules } from "./board/BoardRules";

export class BoardModel {
  private grid: Cell[][];
  private rng: Rng;
  private effects: EffectRegistry;
  private groupFinder: GroupFinder;
  private gravity: GravitySystem;
  private shuffleSystem: ShuffleSystem;
  private bombSystem: BombSystem;
  private spawnPolicy: SpecialSpawnPolicy;
  private tileFactory: SpecialTileFactory;
  private moveResolver: MoveResolver;
  private moveAvailability: MoveAvailability;
  private boardInitializer: BoardInitializer;
  private normalTileFactory: NormalTileFactory;
  private readonly moveContext = {
    cols: 0,
    rows: 0,
    get: (x: number, y: number) => this.get(x, y),
    set: (x: number, y: number, tile: Tile | null) => this.set(x, y, tile),
    inBounds: (x: number, y: number) => this.inBounds(x, y),
  };
  private readonly readContext = {
    cols: 0,
    rows: 0,
    get: (x: number, y: number) => this.get(x, y),
    inBounds: (x: number, y: number) => this.inBounds(x, y),
  };
  private readonly writeContext = {
    cols: 0,
    rows: 0,
    set: (x: number, y: number, tile: Tile | null) => this.set(x, y, tile),
  };
  private readonly randomNormalTileFn = () => this.randomNormalTile();

  constructor(private config: GameConfig, private rules: BoardRules, rng?: Rng) {
    this.rng = rng ?? new Rng();
    this.grid = [];
    this.initEmpty();
    this.moveContext.cols = this.config.cols;
    this.moveContext.rows = this.config.rows;
    this.readContext.cols = this.config.cols;
    this.readContext.rows = this.config.rows;
    this.writeContext.cols = this.config.cols;
    this.writeContext.rows = this.config.rows;

    this.effects = new EffectRegistry();
    this.effects.register(SpecialEffect.ClearRow, new ClearRowEffect());
    this.effects.register(SpecialEffect.ClearColumn, new ClearColumnEffect());
    this.effects.register(SpecialEffect.BombRadius, new BombRadiusEffect(this.rules.bombRadius));
    this.effects.register(SpecialEffect.ClearBoard, new ClearBoardEffect());

    this.groupFinder = new GroupFinder();
    this.spawnPolicy = new SpecialSpawnPolicy(this.rules.specialSpawnRules);
    this.tileFactory = new SpecialTileFactory();
    this.normalTileFactory = new NormalTileFactory(this.config, this.rng);
    this.gravity = new GravitySystem(this.tileFactory);
    this.shuffleSystem = new ShuffleSystem(this.rng);
    this.bombSystem = new BombSystem();
    this.boardInitializer = new BoardInitializer();
    this.moveResolver = new MoveResolver(
      this.config,
      this.rules,
      this.rng,
      this.effects,
      this.groupFinder,
      this.spawnPolicy,
      this.gravity
    );
    this.moveAvailability = new MoveAvailability(this.groupFinder);
  }

  public getCols(): number { return this.config.cols; }
  public getRows(): number { return this.config.rows; }

  public initRandom(): void {
    this.boardInitializer.initRandom(
      this.writeContext,
      this.randomNormalTileFn
    );
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
    return this.moveResolver.applyClick(
      this.moveContext,
      x,
      y
    );
  }

  public hasAnyMoves(): boolean {
    return this.moveAvailability.hasAnyMoves(
      this.readContext,
      this.rules.minGroupSize
    );
  }

  public shuffle(): ShuffleResult {
    return this.shuffleSystem.shuffle({
      cols: this.moveContext.cols,
      rows: this.moveContext.rows,
      get: this.moveContext.get,
      set: this.moveContext.set,
    });
  }

  public applyBombEffect(x: number, y: number, radius: number): TurnResult | null {
    return this.bombSystem.apply(
      this.moveContext,
      { x, y },
      radius,
      (removed, groupSize) =>
        this.moveResolver.applyGravity(removed, groupSize, this.moveContext)
    );
  }

  private randomNormalTile(): Tile {
    return this.normalTileFactory.create();
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
}
