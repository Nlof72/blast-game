const { ccclass, property } = cc._decorator;

@ccclass
export default class BoosterView extends cc.Component {
  @property(cc.Button)
  shuffleButton: cc.Button = null;

  @property(cc.Button)
  bombButton: cc.Button = null;

  @property(cc.Label)
  shuffleButtonLabel: cc.Label = null;

  @property(cc.Label)
  bombButtonLabel: cc.Label = null;

  private shuffleUsesLeft: number = 0;
  private bombUsesLeft: number = 0;

  private onShuffleClick: (() => void) | null = null;
  private onBombClick: (() => void) | null = null;

  onLoad() {
    if (this.shuffleButton) {
      this.shuffleButton.node.on(cc.Node.EventType.TOUCH_END, () => {
        if (this.onShuffleClick && this.shuffleUsesLeft > 0) {
          this.onShuffleClick();
        }
      }, this);
    }

    if (this.bombButton) {
      this.bombButton.node.on(cc.Node.EventType.TOUCH_END, () => {
        if (this.onBombClick && this.bombUsesLeft > 0) {
          this.onBombClick();
        }
      }, this);
    }
  }

  onDestroy() {
    if (this.shuffleButton) {
      this.shuffleButton.node.off(cc.Node.EventType.TOUCH_END);
    }
    if (this.bombButton) {
      this.bombButton.node.off(cc.Node.EventType.TOUCH_END);
    }
  }

  public init(
    shuffleUses: number,
    bombUses: number,
    onShuffleClick: () => void,
    onBombClick: () => void
  ): void {
    this.shuffleUsesLeft = shuffleUses;
    this.bombUsesLeft = bombUses;
    this.onShuffleClick = onShuffleClick;
    this.onBombClick = onBombClick;
    this.updateButtons();
  }

  public setShuffleUses(uses: number): void {
    this.shuffleUsesLeft = uses;
    this.updateButtons();
  }

  public setBombUses(uses: number): void {
    this.bombUsesLeft = uses;
    this.updateButtons();
  }

  public canUseShuffle(): boolean {
    return this.shuffleUsesLeft > 0;
  }

  public canUseBomb(): boolean {
    return this.bombUsesLeft > 0;
  }

  public getShuffleUses(): number {
    return this.shuffleUsesLeft;
  }

  public getBombUses(): number {
    return this.bombUsesLeft;
  }

  private updateButtons(): void {
    if (this.shuffleButton) {
      this.shuffleButton.interactable = this.shuffleUsesLeft > 0;
    }
    if (this.shuffleButtonLabel) {
      this.shuffleButtonLabel.string = `${this.shuffleUsesLeft}`;
    }
    
    if (this.bombButton) {
      this.bombButton.interactable = this.bombUsesLeft > 0;
    }
    if (this.bombButtonLabel) {
      this.bombButtonLabel.string = `${this.bombUsesLeft}`;
    }
  }
}
