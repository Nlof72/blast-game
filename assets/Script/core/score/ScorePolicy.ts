export interface ScorePolicy {
  calcScore(groupSize: number): number;
}

export class QuadraticScorePolicy implements ScorePolicy {
  public calcScore(groupSize: number): number {
    return groupSize * groupSize * 5;
  }
}

export const DefaultScorePolicy = QuadraticScorePolicy;
