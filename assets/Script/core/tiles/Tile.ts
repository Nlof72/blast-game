export enum SpecialEffect {
  ClearRow = 0,
  ClearColumn = 1,
  BombRadius = 2,
  ClearBoard = 3,
}

export type NormalTile = { kind: "normal"; color: number };
export type SpecialTile = { kind: "special"; effect: SpecialEffect; radius?: number };

export type Tile = NormalTile | SpecialTile;
