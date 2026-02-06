import { Vec2i } from "../Vec2i";
import { TurnResult } from "../TurnResult";
import { GameConfig } from "../GameConfig";
import { BoardRules } from "./BoardRules";
import { Tile, SpecialEffect } from "../tiles/Tile";
import { BoardContext } from "./BoardContext";
import { GroupFinder } from "./GroupFinder";
import { EffectRegistry } from "../effects/EffectHandler";
import { SpecialSpawnPolicy } from "../spawn/SpecialSpawnPolicy";
import { GravitySystem } from "./GravitySystem";
import { Rng } from "../../utils/Rng";

export type MoveContext = BoardContext;

export class MoveResolver {
  private readonly randomNormalTileFn = () => this.randomNormalTile();

  constructor(
    private readonly config: GameConfig,
    private readonly rules: BoardRules,
    private readonly rng: Rng,
    private readonly effects: EffectRegistry,
    private readonly groupFinder: GroupFinder,
    private readonly spawnPolicy: SpecialSpawnPolicy,
    private readonly gravity: GravitySystem
  ) {}

  public applyClick(context: MoveContext, x: number, y: number): TurnResult | null {
    if (!context.inBounds(x, y)) return null;

    const cell = context.get(x, y);
    if (cell === null) return null;

    if (cell.kind === "special") {
      return this.applySpecialEffect(context, { x, y }, cell);
    }

    return this.applyNormalGroup(context, { x, y }, cell.color);
  }

  public applyGravity(removed: Vec2i[], groupSize: number, context: MoveContext): TurnResult {
    return this.applyGravityAndSpawn(removed, groupSize, context, null, null);
  }

  private applyNormalGroup(context: MoveContext, click: Vec2i, color: number): TurnResult | null {
    const group = this.groupFinder.getNormalGroup(context, click.x, click.y, color);
    if (group.length < this.rules.minGroupSize) return null;

    for (const p of group) {
      context.set(p.x, p.y, null);
    }

    const specialSpec = this.spawnPolicy.getSpecForGroup(group.length, this.rng);
    return this.applyGravityAndSpawn(group, group.length, context, specialSpec ? click : null, specialSpec);
  }

  private applySpecialEffect(
    context: MoveContext,
    pos: Vec2i,
    tile: Tile & { kind: "special" }
  ): TurnResult | null {
    const handler = this.effects.get(tile.effect);
    if (!handler) return null;

    const toRemove = handler.computeArea(context, pos, tile);

    if (toRemove.length === 0) {
      return null;
    }

    for (const p of toRemove) {
      context.set(p.x, p.y, null);
    }

    return this.applyGravityAndSpawn(toRemove, toRemove.length, context, null, null);
  }

  private applyGravityAndSpawn(
    removed: Vec2i[],
    groupSize: number,
    context: MoveContext,
    createSpecialAt: Vec2i | null,
    specialSpec: { effect: SpecialEffect; radius?: number } | null
  ): TurnResult {
    const result = this.gravity.apply(context, createSpecialAt, specialSpec, this.randomNormalTileFn);

    return {
      removed,
      moves: result.moves,
      spawns: result.spawns,
      tileUpdates: result.tileUpdates.length > 0 ? result.tileUpdates : undefined,
      groupSize,
    };
  }

  private randomNormalTile(): Tile {
    const color = this.rng.nextInt(this.config.colorsCount);
    return { kind: "normal", color };
  }
}
