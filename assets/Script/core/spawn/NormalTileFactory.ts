import { GameConfig } from "../GameConfig";
import { Rng } from "../../utils/Rng";
import { Tile } from "../tiles/Tile";

export class NormalTileFactory {
  constructor(private readonly config: GameConfig, private readonly rng: Rng) {}

  public create(): Tile {
    const color = this.rng.nextInt(this.config.colorsCount);
    return { kind: "normal", color };
  }
}
