const { ccclass, property } = cc._decorator;

@ccclass
export default class HudView extends cc.Component {
  @property(cc.RichText) scoreLabel: cc.RichText = null;
  @property(cc.Label) movesLabel: cc.Label = null;

  public setMoves(moves: number): void {
    if (this.movesLabel) this.movesLabel.string = `${moves}`;
  }

  public setScore(score: number, goal: number): void {
    if (this.scoreLabel) {
      const scoreVal = score != null ? score : 0;
      const goalVal = goal != null ? goal : 0;
      this.scoreLabel.string = `<size=50>Очки:</size><br/><size=70>${scoreVal}/${goalVal}</size>`;
    }
  }
}
