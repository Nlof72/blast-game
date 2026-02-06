const { ccclass, property } = cc._decorator;

import { Tile, SpecialEffect } from "../core/tiles/Tile";
import { Vec2i } from "../core/Vec2i";

@ccclass
export default class TileView extends cc.Component {
  @property(cc.Sprite)
  sprite: cc.Sprite = null;

  private coord: Vec2i = { x: 0, y: 0 };
  private tile: Tile = { kind: "normal", color: 0 };

  private normalFrames: cc.SpriteFrame[] = [];
  private specialFramesByEffect: Map<SpecialEffect, cc.SpriteFrame> = new Map();
  private defaultSpecialFrame: cc.SpriteFrame | null = null;

  private clickHandler: ((x: number, y: number) => void) | null = null;

  onLoad() {
    if (!this.sprite) this.sprite = this.getComponent(cc.Sprite);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  onDestroy() {
    this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  public init(
    coord: Vec2i,
    tile: Tile,
    normalFrames: cc.SpriteFrame[],
    specialFramesByEffect: Map<SpecialEffect, cc.SpriteFrame>,
    clickHandler: (x: number, y: number) => void,
    defaultSpecialFrame: cc.SpriteFrame | null = null
  ): void {
    this.coord = { x: coord.x, y: coord.y };
    this.normalFrames = normalFrames;
    this.specialFramesByEffect = specialFramesByEffect;
    this.clickHandler = clickHandler;
    this.defaultSpecialFrame = defaultSpecialFrame;

    this.setTile(tile);
  }

  public setCoord(coord: Vec2i): void {
    this.coord = { x: coord.x, y: coord.y };
  }

  public getCoord(): Vec2i {
    return { x: this.coord.x, y: this.coord.y };
  }

  public setTile(tile: Tile): void {
    this.tile = tile;
    if (!this.sprite) this.sprite = this.getComponent(cc.Sprite);
    if (!this.sprite) return;

    this.sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;

    if (tile.kind === "normal") {
      const idx = tile.color;
      const frame = this.normalFrames[idx] ?? this.normalFrames[0];
      if (!frame) cc.error("[TileView] normalFrames not set");
      this.sprite.spriteFrame = frame;
      return;
    }

    const frame = this.specialFramesByEffect.get(tile.effect);
    if (!frame) {
      cc.error("[TileView] specialFrames missing for effect:", tile.effect);
      this.sprite.spriteFrame = this.defaultSpecialFrame ?? this.normalFrames[this.normalFrames.length - 1] ?? null;
      return;
    }
    this.sprite.spriteFrame = frame;
  }

  private onTouchEnd(): void {
    if (!this.clickHandler) return;
    this.clickHandler(this.coord.x, this.coord.y);
  }
}
