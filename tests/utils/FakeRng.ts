export class FakeRng {
  private index = 0;

  constructor(private readonly values: number[] = [0]) {}

  public nextInt(maxExclusive: number): number {
    if (maxExclusive <= 0) return 0;
    const value = this.values[this.index++ % this.values.length];
    const normalized = ((value % maxExclusive) + maxExclusive) % maxExclusive;
    return normalized;
  }
}
