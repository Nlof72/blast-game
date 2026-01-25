export enum SpecialEffect {
    ClearRow = 0,
    ClearColumn = 1,
    BombRadius = 2,
    ClearBoard = 3,
  }
  
export type Tile =
| { kind: "normal"; color: number }
| { kind: "special"; effect: SpecialEffect; radius?: number };
  