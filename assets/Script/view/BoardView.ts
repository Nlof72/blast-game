const { ccclass, property } = cc._decorator;

import { BoardModel } from "../core/BoardModel";
import { keyOf, Vec2i } from "../core/Vec2i";
import { TurnResult } from "../core/TurnResult";
import TileView from "./TileView";
import { ShuffleResult } from "../core/ShuffleResult";
import { Tile, SpecialEffect } from "../core/tiles/Tile";


@ccclass
export default class BoardView extends cc.Component {
  @property(cc.Prefab)
  tilePrefab: cc.Prefab = null;

  @property([cc.SpriteFrame])
  normalFrames: cc.SpriteFrame[] = [];

  @property([cc.Integer])
  specialEffectKeys: number[] = [];

  @property([cc.SpriteFrame])
  specialEffectFrames: cc.SpriteFrame[] = [];

  @property(cc.SpriteFrame)
  defaultSpecialFrame: cc.SpriteFrame = null;

  @property
  tileSize: number = 64;

  @property
  spacing: number = 6;

  @property
  removeDuration: number = 0.12;

  @property
  fallDuration: number = 0.18;

  @property
  spawnDuration: number = 0.20;

  private board: BoardModel = null;
  private cols: number = 0;
  private rows: number = 0;
  private specialFramesByEffect: Map<SpecialEffect, cc.SpriteFrame> = new Map();

  private tiles: Map<string, TileView> = new Map();
  private onTileClick: ((x: number, y: number) => void) | null = null;

  private inputEnabled: boolean = true;

  public setInputEnabled(enabled: boolean): void {
    this.inputEnabled = enabled;
  }

  public init(board: BoardModel, onTileClick: (x: number, y: number) => void): void {
    this.board = board;
    this.cols = board.getCols();
    this.rows = board.getRows();
    this.buildSpecialFrameMap();

    this.onTileClick = (x, y) => {
      if (!this.inputEnabled) return;
      onTileClick?.(x, y);
    };

    this.rebuildAll();
  }

  public rebuildAll(): void {
    this.node.removeAllChildren();
    this.tiles.clear();

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        const type = this.board.get(x, y);
        if (type === null) continue;

        const tile = this.createTile({ x, y }, type as any);
        void tile;
      }
    }
  }

  public applyTurnResultAnimated(result: TurnResult): Promise<void> {
    const removedNodes: cc.Node[] = [];
    for (const p of result.removed) {
      const k = keyOf(p);
      const tv = this.tiles.get(k);
      if (tv) {
        this.tiles.delete(k);
        removedNodes.push(tv.node);
      }
    }

    const moveAnims: { node: cc.Node; toPos: cc.Vec3 }[] = [];
    for (const mv of result.moves) {
      const fromK = keyOf(mv.from);
      const toK = keyOf(mv.to);

      const tv = this.tiles.get(fromK);
      if (!tv) continue;

      this.tiles.delete(fromK);
      tv.setCoord(mv.to);
      this.tiles.set(toK, tv);

      moveAnims.push({
        node: tv.node,
        toPos: this.coordToLocalPos(mv.to.x, mv.to.y),
      });
    }

    if (result.tileUpdates) {
      for (const update of result.tileUpdates) {
        const k = keyOf(update.at);
        const tv = this.tiles.get(k);
        if (tv) {
          tv.setTile(update.tile);
        }
      }
    }

    const spawnAnims: { node: cc.Node; toPos: cc.Vec3 }[] = [];
    for (const sp of result.spawns) {
      const startPos = this.coordToLocalPosFloat(sp.to.x, sp.fromY);
      const endPos = this.coordToLocalPos(sp.to.x, sp.to.y);

      const tv = this.createTile(sp.to, sp.tile);
      tv.node.setPosition(startPos);

      tv.node.scaleX = 0.9;
      tv.node.scaleY = 0.9;

      spawnAnims.push({ node: tv.node, toPos: endPos });
    }

    return this.animateRemoved(removedNodes)
      .then(() => this.animateMoves(moveAnims))
      .then(() => this.animateSpawns(spawnAnims));
  }

  public applyShuffleAnimated(result: ShuffleResult): Promise<void> {
    return new Promise((resolve) => {
      cc.tween(this.node)
        .to(0.08, { opacity: 120 })
        .call(() => {
          for (const ch of result.changes) {
            const tv = this.tiles.get(keyOf(ch.at));
            if (tv) tv.setTile(ch.tile);
          }
        })
        .to(0.08, { opacity: 255 })
        .call(() => resolve())
        .start();
    });
  }

  private animateRemoved(nodes: cc.Node[]): Promise<void> {
    return new Promise((resolve) => {
      if (nodes.length === 0) return resolve();

      let pending = nodes.length;
      const done = () => {
        pending--;
        if (pending <= 0) resolve();
      };

      for (const n of nodes) {
        cc.tween(n)
          .to(this.removeDuration, { scaleX: 0, scaleY: 0, opacity: 0 })
          .call(() => {
            n.destroy();
            done();
          })
          .start();
      }
    });
  }

  private animateMoves(anims: { node: cc.Node; toPos: cc.Vec3 }[]): Promise<void> {
    return new Promise((resolve) => {
      if (anims.length === 0) return resolve();

      let pending = anims.length;
      const done = () => {
        pending--;
        if (pending <= 0) resolve();
      };

      for (const a of anims) {
        cc.tween(a.node)
          .to(this.fallDuration, { position: a.toPos }, { easing: "quadIn" })
          .call(done)
          .start();
      }
    });
  }

  private animateSpawns(anims: { node: cc.Node; toPos: cc.Vec3 }[]): Promise<void> {
    return new Promise((resolve) => {
      if (anims.length === 0) return resolve();

      let pending = anims.length;
      const done = () => {
        pending--;
        if (pending <= 0) resolve();
      };

      for (const a of anims) {
        cc.tween(a.node)
          .to(this.spawnDuration, { position: a.toPos, scaleX: 1, scaleY: 1 }, { easing: "quadIn" })
          .call(done)
          .start();
      }
    });
  }

  public fitToArea(areaSize: cc.Size): void {
    const step = this.tileSize + this.spacing;
    const boardW = this.cols * step - this.spacing;
    const boardH = this.rows * step - this.spacing;

    const padding = 0.95;
  
    const scaleX = (areaSize.width / boardW) * padding;
    const scaleY = (areaSize.height / boardH) * padding;
  
    const s = Math.min(scaleX, scaleY);
    this.node.scaleX = s;
    this.node.scaleY = s;
  }

  private createTile(coord: Vec2i, tile: Tile): TileView {
    const node = cc.instantiate(this.tilePrefab);
    node.parent = this.node;

    node.setContentSize(this.tileSize, this.tileSize);
    node.opacity = 255;
    node.scaleX = 1;
    node.scaleY = 1;

    node.setPosition(this.coordToLocalPos(coord.x, coord.y));

    const tv = node.getComponent(TileView);
    tv.init(
      coord,
      tile,
      this.normalFrames,
      this.specialFramesByEffect,
      (x, y) => {
        this.onTileClick?.(x, y);
      },
      this.defaultSpecialFrame
    );

    this.tiles.set(keyOf(coord), tv);
    return tv;
  }

  private buildSpecialFrameMap(): void {
    this.specialFramesByEffect.clear();
    const len = Math.min(this.specialEffectKeys.length, this.specialEffectFrames.length);
    for (let i = 0; i < len; i++) {
      const effect = this.specialEffectKeys[i] as SpecialEffect;
      const frame = this.specialEffectFrames[i];
      if (frame == null) continue;
      if (this.specialFramesByEffect.has(effect)) {
        cc.warn("[BoardView] duplicate special effect frame for:", effect);
      }
      this.specialFramesByEffect.set(effect, frame);
    }
  }

  private coordToLocalPos(x: number, y: number): cc.Vec3 {
    return this.coordToLocalPosFloat(x, y);
  }

  private coordToLocalPosFloat(x: number, y: number): cc.Vec3 {
    const step = this.tileSize + this.spacing;

    const totalW = this.cols * step - this.spacing;
    const totalH = this.rows * step - this.spacing;

    const originX = -totalW / 2 + this.tileSize / 2;
    const originY = -totalH / 2 + this.tileSize / 2;

    const px = originX + x * step;
    const py = originY + y * step;

    return cc.v3(px, py, 0);
  }
}
