const { ccclass, property } = cc._decorator;

import { GameConfig } from "../core/GameConfig";
import { BoardModel, BoardRules } from "../core/BoardModel";
import { GameController, GameStatus } from "../game/GameController";
import { LevelManager } from "../utils/LevelManager";
import BoardView from "./BoardView";
import HudView from "./HudView";
import PopupView from "./PopupView";
import BoosterView from "./BoosterView";

enum InputMode {
  Normal = "Normal",
  Bomb = "Bomb"
}

@ccclass
export default class GameRoot extends cc.Component {
  @property(BoardView) boardView: BoardView = null;
  @property(HudView) hudView: HudView = null;
  @property(PopupView) popupView: PopupView = null;
  @property(BoosterView) boosterView: BoosterView = null;

  @property(cc.Node) boardArea: cc.Node = null;

  @property(cc.Node) bombModeIndicator: cc.Node = null;

  @property
  cols: number = 8;

  @property
  rows: number = 10;

  @property
  colorsCount: number = 5;

  @property
  goalScore: number = 500;

  @property
  movesLimit: number = 20;

  @property
  minGroupSize: number = 2;

  @property
  bombRadius: number = 2;

  @property
  superMinGroup: number = 6;

  @property
  shuffleBoosterUses: number = 3;

  @property
  bombBoosterUses: number = 3;

  private controller: GameController;
  private board: BoardModel;

  private isBusy: boolean = false;
  private inputMode: InputMode = InputMode.Normal;

  onLoad() {
    this.startNewGame();
  }

  private startNewGame(): void {
    this.popupView?.hide();
    this.updateBombModeIndicator();
    this.isBusy = false;
    this.inputMode = InputMode.Normal;

    const config: GameConfig = {
      cols: this.cols,
      rows: this.rows,
      colorsCount: this.colorsCount,
      goalScore: LevelManager.getCurrentGoal(),
      movesLimit: this.movesLimit
    };

    const rules: BoardRules = {
      minGroupSize: this.minGroupSize,
      bombRadius: this.bombRadius,
      superMinGroup: this.superMinGroup
    };

    this.controller = new GameController(config);
    this.board = new BoardModel(config, rules);
    this.board.initRandom();

    this.controller.bindBoard(this.board);

    if (this.boosterView) {
      this.boosterView.init(
        this.shuffleBoosterUses,
        this.bombBoosterUses,
        () => this.onShuffleButtonClick(),
        () => this.onBombButtonClick()
      );
    }

    const startShuffles = this.controller.ensurePlayableStart();
    this.boardView.init(this.board, (x, y) => void this.onTileClicked(x, y));
    this.applyLayout();

    for (const s of startShuffles) {
      void this.boardView.applyShuffleAnimated(s);
    }

    this.boardView.rebuildAll();

    this.refreshHud();
  }

  private applyLayout(): void {
    const size = this.boardArea.getContentSize();
    this.boardView.fitToArea(size);
  }

  private async onTileClicked(x: number, y: number): Promise<void> {
    if (this.isBusy) return;
    if (this.controller.status !== GameStatus.Playing) return;

    if (this.inputMode === InputMode.Bomb) {
      const turn = this.board.applyBombEffect(x, y, this.bombRadius);
      if (turn) {
        this.isBusy = true;
        this.boardView.setInputEnabled(false);
        this.controller.score += this.controller.calcScore(turn.groupSize);
        
        if (this.controller.score >= this.controller.getGoal()) {
          this.controller.status = GameStatus.Win;
        }
        
        await this.boardView.applyTurnResultAnimated(turn);
        
        if (this.boosterView) {
          this.boosterView.setBombUses(this.boosterView.getBombUses() - 1);
        }
        
        this.boardView.setInputEnabled(true);
        this.isBusy = false;
        this.refreshHud();
        this.checkEnd();
      }
      this.inputMode = InputMode.Normal;
      this.updateBombModeIndicator();
      return;
    }
  
    const res = this.controller.tryClick(x, y);
  
    if (!res.turn && res.shuffles.length === 0) {
      this.refreshHud();
      this.checkEnd();
      return;
    }
  
    this.isBusy = true;
    this.boardView.setInputEnabled(false);
  
    if (res.turn) {
      this.refreshHud();
      await this.boardView.applyTurnResultAnimated(res.turn);
    }
  
    for (const s of res.shuffles) {
      await this.boardView.applyShuffleAnimated(s);
    }
  
    this.boardView.setInputEnabled(true);
    this.isBusy = false;
  
    this.refreshHud();
    this.checkEnd();
  }

  private async onShuffleButtonClick(): Promise<void> {
    if (this.isBusy) return;
    if (this.controller.status !== GameStatus.Playing) return;
    if (!this.boosterView || !this.boosterView.canUseShuffle()) return;

    this.isBusy = true;
    this.boardView.setInputEnabled(false);

    const shuffleResult = this.board.shuffle();
    await this.boardView.applyShuffleAnimated(shuffleResult);

    this.boosterView.setShuffleUses(this.boosterView.getShuffleUses() - 1);

    this.boardView.setInputEnabled(true);
    this.isBusy = false;
    this.refreshHud();
  }

  private onBombButtonClick(): void {
    if (this.isBusy) return;
    if (this.controller.status !== GameStatus.Playing) return;
    if (!this.boosterView || !this.boosterView.canUseBomb()) return;

    this.inputMode = InputMode.Bomb;
    this.updateBombModeIndicator();
  }
  
  onEnable() {
    cc.view.on("canvas-resize", this.onCanvasResize, this);
  }
  
  onDisable() {
    cc.view.off("canvas-resize", this.onCanvasResize, this);
  }
  
  private onCanvasResize(): void {
    this.applyLayout();
  }

  private refreshHud(): void {
    if (!this.hudView || !this.controller) return;
    const goal = this.controller.getGoal();
    if (goal == null) {
      cc.error("[GameRoot] getGoal() returned null/undefined");
      return;
    }
    this.hudView.setScore(this.controller.score, goal);
    this.hudView.setMoves(this.controller.movesLeft);
  }

  private checkEnd(): void {
    if (!this.popupView) return;

    const currentLevel = LevelManager.getCurrentLevel();

    if (this.controller.status === GameStatus.Win) {
      const nextLevel = currentLevel + 1;
      this.popupView.show("ПОБЕДА", true, () => this.onNextLevelClick(), false, undefined, nextLevel, `Следующий уровень ${nextLevel}`);
    } else if (this.controller.status === GameStatus.Lose) {
      this.popupView.show("ПОРАЖЕНИЕ", false, undefined, true, () => this.onRestartClick(), currentLevel, `Достигнутый уровень ${currentLevel}`);
    }
  }

  private onNextLevelClick(): void {
    LevelManager.nextLevel();
    this.startNewGame();
  }

  private onRestartClick(): void {
    LevelManager.reset();
    this.popupView?.hide();
    this.startNewGame();
  }

  private updateBombModeIndicator(): void {
    if (this.bombModeIndicator) {
      this.bombModeIndicator.active = this.inputMode === InputMode.Bomb;
    }
  }
}
