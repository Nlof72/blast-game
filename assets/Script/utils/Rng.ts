export class Rng {
    public nextInt(maxExclusive: number): number {
      return Math.floor(Math.random() * maxExclusive);
    }
  }
  