export interface GameConfig {
  cols: number;
  rows: number;
  colorsCount: number;
  goalScore: number;
  movesLimit: number;
}
  
  export const DefaultConfig: GameConfig = {
    cols: 8,
    rows: 10,
    colorsCount: 5,
    goalScore: 500,
    movesLimit: 20,
  };