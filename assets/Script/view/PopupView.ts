const { ccclass, property } = cc._decorator;

@ccclass
export default class PopupView extends cc.Component {
  @property(cc.Label) messageLabel: cc.Label = null;
  @property(cc.Label) levelLabel: cc.Label = null;
  @property(cc.Button) nextLevelButton: cc.Button = null;
  @property(cc.Button) restartButton: cc.Button = null;

  private onNextLevelCallback: (() => void) | null = null;
  private onRestartCallback: (() => void) | null = null;

  onLoad() {
    this.setupButtons();
  }

  private setupButtons(): void {
    if (this.nextLevelButton && this.nextLevelButton.node) {
      this.nextLevelButton.node.off(cc.Node.EventType.TOUCH_END);
      this.nextLevelButton.node.on(cc.Node.EventType.TOUCH_END, () => {
        if (this.onNextLevelCallback) {
          this.onNextLevelCallback();
        }
      }, this);
    }

    if (this.restartButton && this.restartButton.node) {
      this.restartButton.node.off(cc.Node.EventType.TOUCH_END);
      this.restartButton.node.on(cc.Node.EventType.TOUCH_END, () => {
        if (this.onRestartCallback) {
          this.onRestartCallback();
        }
      }, this);
    }
  }

  onDestroy() {
    if (this.nextLevelButton && this.nextLevelButton.node) {
      this.nextLevelButton.node.off(cc.Node.EventType.TOUCH_END);
    }
    if (this.restartButton && this.restartButton.node) {
      this.restartButton.node.off(cc.Node.EventType.TOUCH_END);
    }
  }

  public show(message: string, showNextLevel: boolean = false, onNextLevel?: () => void, showRestart: boolean = false, onRestart?: () => void, level?: number, levelLabelText?: string): void {
    this.node.active = true;
    if (this.messageLabel) this.messageLabel.string = message;

    if (this.levelLabel && level !== undefined) {
      const labelText = levelLabelText || `Уровень ${level}`;
      this.levelLabel.string = labelText;
    }

    this.onNextLevelCallback = onNextLevel || null;
    this.onRestartCallback = onRestart || null;

    if (this.nextLevelButton) {
      this.nextLevelButton.node.active = showNextLevel;
      this.nextLevelButton.interactable = showNextLevel;
    }

    if (this.restartButton) {
      this.restartButton.node.active = showRestart;
      this.restartButton.interactable = showRestart;
    }

    this.setupButtons();
  }

  public hide(): void {
    this.node.active = false;
    if (this.nextLevelButton) {
      this.nextLevelButton.node.active = false;
    }
    if (this.restartButton) {
      this.restartButton.node.active = false;
    }
    this.onNextLevelCallback = null;
    this.onRestartCallback = null;
  }
}
