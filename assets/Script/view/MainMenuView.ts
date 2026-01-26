const { ccclass, property } = cc._decorator;

import { LevelManager } from "../utils/LevelManager";

@ccclass
export default class MainMenuView extends cc.Component {
  @property(cc.Button)
  playButton: cc.Button = null;
  
  @property(cc.Label)
  levelLabel: cc.Label = null;
  

  onLoad() {
    if (this.playButton) {
      this.playButton.node.on(cc.Node.EventType.TOUCH_END, this.onPlayClick, this);
    }
    
    this.updateLevelLabel();
  }
  
  private updateLevelLabel(): void {
    if (this.levelLabel) {
      const level = LevelManager.getCurrentLevel();
      this.levelLabel.string = `Уровень ${level}`;
    }
  }
  
  private onPlayClick(): void {
    cc.director.loadScene("MainScene");
  }
}
