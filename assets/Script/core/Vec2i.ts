export interface Vec2i {
    x: number;
    y: number;
  }
  
  export function keyOf(p: Vec2i): string {
    return `${p.x}_${p.y}`;
  }