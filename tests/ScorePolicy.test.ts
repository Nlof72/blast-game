import { GameController } from "../assets/Script/game/GameController";
import { GameConfig } from "../assets/Script/core/GameConfig";
import { ScorePolicy } from "../assets/Script/core/score/ScorePolicy";
import { BoardModel } from "../assets/Script/core/BoardModel";

class FixedScorePolicy implements ScorePolicy {
  constructor(private readonly value: number) {}
  public calcScore(_groupSize: number): number {
    return this.value;
  }
}

describe("ScorePolicy integration", () => {
  it("GameController uses injected ScorePolicy", () => {
    const config: GameConfig = {
      cols: 2,
      rows: 2,
      colorsCount: 2,
      goalScore: 100,
      movesLimit: 10,
    };

    const policy = new FixedScorePolicy(42);
    const controller = new GameController(config, policy);

    const fakeBoard = {
      applyClick: () => ({ removed: [], moves: [], spawns: [], groupSize: 3 }),
      hasAnyMoves: () => true,
      shuffle: () => ({ changes: [] }),
    } as unknown as BoardModel;

    controller.bindBoard(fakeBoard);
    controller.tryClick(0, 0);

    expect(controller.score).toBe(42);
  });
});
