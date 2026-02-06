import { GameConfig } from "../core/GameConfig";
import { BoardModel } from "../core/BoardModel";
import { TurnResult } from "../core/TurnResult";
import { ShuffleResult } from "../core/ShuffleResult";
import { DefaultScorePolicy, ScorePolicy } from "../core/score/ScorePolicy";


export enum GameStatus {
  Playing = "Playing",
  Win = "Win",
  Lose = "Lose",
}

export interface ClickResolution {
  turn: TurnResult | null;
  shuffles: ShuffleResult[];
}

export class GameController {
  public score: number = 0;
  public movesLeft: number;
  public status: GameStatus = GameStatus.Playing;

  private board: BoardModel | null = null;
  private shuffleUsed: number = 0;
  private readonly maxShuffle: number = 3;
  private readonly scorePolicy: ScorePolicy;


  constructor(private config: GameConfig, scorePolicy: ScorePolicy = new DefaultScorePolicy()) {
    this.movesLeft = config.movesLimit;
    this.scorePolicy = scorePolicy;
  }

  public bindBoard(board: BoardModel): void {
    this.board = board;
  }

  public reset(): void {
    this.score = 0;
    this.movesLeft = this.config.movesLimit;
    this.status = GameStatus.Playing;
    this.shuffleUsed = 0;
  }

  public getGoal(): number {
    return this.config.goalScore;
  }

  public tryClick(x: number, y: number): ClickResolution {
    if (this.status !== GameStatus.Playing) return { turn: null, shuffles: [] };
    if (!this.board) throw new Error("Board not bound");
  
    const shuffles: ShuffleResult[] = [];
  
    const turn = this.board.applyClick(x, y);
    if (!turn) {
      this.resolveNoMoves(shuffles);
      return { turn: null, shuffles };
    }

    this.movesLeft -= 1;
    this.score += this.calcScore(turn.groupSize);

    if (this.score >= this.config.goalScore) {
      this.status = GameStatus.Win;
      return { turn, shuffles };
    }

    if (this.movesLeft <= 0) {
      this.status = GameStatus.Lose;
      return { turn, shuffles };
    }

    this.resolveNoMoves(shuffles);
  
    return { turn, shuffles };
  }

  public ensurePlayableStart(): ShuffleResult[] {
    const shuffles: ShuffleResult[] = [];
    this.resolveNoMoves(shuffles);
    return shuffles;
  }

  private resolveNoMoves(shuffles: ShuffleResult[]): void {
    if (!this.board) return;
    if (this.status !== GameStatus.Playing) return;
  
    while (!this.board.hasAnyMoves() && this.shuffleUsed < this.maxShuffle) {
      this.shuffleUsed += 1;
      shuffles.push(this.board.shuffle());
    }
  
    if (!this.board.hasAnyMoves()) {
      this.status = GameStatus.Lose;
    }
  }

  public calcScore(groupSize: number): number {
    return this.scorePolicy.calcScore(groupSize);
  }
}
