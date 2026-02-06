import { Vec2i } from "../Vec2i";
import { Tile } from "../tiles/Tile";
import { MoveCommand, SpawnCommand } from "../TurnResult";
import { SpecialTileFactory } from "../spawn/SpecialTileFactory";
import { SpecialSpawnSpec } from "../spawn/SpecialSpawnPolicy";
import { BoardContext } from "./BoardContext";

export type GravityContext = Pick<BoardContext, "cols" | "rows" | "get" | "set">;

export class GravitySystem {
  constructor(private readonly tileFactory: SpecialTileFactory) {}

  public apply(
    context: GravityContext,
    createSpecialAt: Vec2i | null,
    specialSpec: SpecialSpawnSpec | null,
    randomNormalTile: () => Tile
  ): { moves: MoveCommand[]; spawns: SpawnCommand[]; tileUpdates: { at: Vec2i; tile: Tile }[] } {
    const moves: MoveCommand[] = [];
    const spawns: SpawnCommand[] = [];
    const tileUpdates: { at: Vec2i; tile: Tile }[] = [];
    let specialY = -1;

    if (createSpecialAt && specialSpec) {
      const clickX = createSpecialAt.x;
      const clickY = createSpecialAt.y;

      let tilesAbove = 0;
      for (let y = 0; y < clickY; y++) {
        if (context.get(clickX, y) !== null) {
          tilesAbove++;
        }
      }
      specialY = tilesAbove;
    }

    for (let x = 0; x < context.cols; x++) {
      const newCol: (Tile | null)[] = new Array(context.rows).fill(null);

      let writeY = 0;
      for (let y = 0; y < context.rows; y++) {
        const t = context.get(x, y);
        if (!t) continue;

        newCol[writeY] = t;

        if (writeY !== y) {
          moves.push({ from: { x, y }, to: { x, y: writeY } });
        }

        writeY++;
      }

      const isSpecialCol = createSpecialAt && createSpecialAt.x === x && !!specialSpec;

      let spawnIndex = 0;
      for (let y = writeY; y < context.rows; y++) {
        if (isSpecialCol && y === specialY && specialY >= writeY && specialSpec) {
          const specialTile = this.tileFactory.create(specialSpec.effect, specialSpec.radius);

          newCol[y] = specialTile;

          spawns.push({
            to: { x, y },
            tile: specialTile,
            fromY: context.rows + spawnIndex + 3,
          });

          spawnIndex++;
          continue;
        }

        const tile = randomNormalTile();
        newCol[y] = tile;

        spawns.push({
          to: { x, y },
          tile,
          fromY: context.rows + spawnIndex + 3,
        });

        spawnIndex++;
      }

      if (isSpecialCol && specialY >= 0 && specialY < context.rows && specialY < writeY && specialSpec) {
        if (newCol[specialY] !== null) {
          const specialTile = this.tileFactory.create(specialSpec.effect, specialSpec.radius);

          newCol[specialY] = specialTile;

          tileUpdates.push({
            at: { x, y: specialY },
            tile: specialTile,
          });
        }
      }

      for (let y = 0; y < context.rows; y++) {
        context.set(x, y, newCol[y]);
      }
    }

    return { moves, spawns, tileUpdates };
  }
}
