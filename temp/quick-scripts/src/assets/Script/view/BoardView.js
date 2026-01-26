"use strict";
cc._RF.push(module, 'ef4de4POndM4pyzaVHxWfdj', 'BoardView');
// Script/view/BoardView.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Vec2i_1 = require("../core/Vec2i");
var TileView_1 = require("./TileView");
var BoardView = /** @class */ (function (_super) {
    __extends(BoardView, _super);
    function BoardView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tilePrefab = null;
        _this.normalFrames = [];
        _this.specialFrames = [];
        _this.tileSize = 64;
        _this.spacing = 6;
        _this.removeDuration = 0.12;
        _this.fallDuration = 0.18;
        _this.spawnDuration = 0.20;
        _this.board = null;
        _this.cols = 0;
        _this.rows = 0;
        _this.tiles = new Map();
        _this.onTileClick = null;
        _this.inputEnabled = true;
        return _this;
    }
    BoardView.prototype.setInputEnabled = function (enabled) {
        this.inputEnabled = enabled;
    };
    BoardView.prototype.init = function (board, onTileClick) {
        var _this = this;
        this.board = board;
        this.cols = board.getCols();
        this.rows = board.getRows();
        this.onTileClick = function (x, y) {
            if (!_this.inputEnabled)
                return;
            onTileClick === null || onTileClick === void 0 ? void 0 : onTileClick(x, y);
        };
        this.rebuildAll();
    };
    BoardView.prototype.rebuildAll = function () {
        this.node.removeAllChildren();
        this.tiles.clear();
        for (var x = 0; x < this.cols; x++) {
            for (var y = 0; y < this.rows; y++) {
                var type = this.board.get(x, y);
                if (type === null)
                    continue;
                var tile = this.createTile({ x: x, y: y }, type);
                void tile;
            }
        }
    };
    BoardView.prototype.applyTurnResultAnimated = function (result) {
        var _this = this;
        var removedNodes = [];
        for (var _i = 0, _a = result.removed; _i < _a.length; _i++) {
            var p = _a[_i];
            var k = Vec2i_1.keyOf(p);
            var tv = this.tiles.get(k);
            if (tv) {
                this.tiles.delete(k);
                removedNodes.push(tv.node);
            }
        }
        var moveAnims = [];
        for (var _b = 0, _c = result.moves; _b < _c.length; _b++) {
            var mv = _c[_b];
            var fromK = Vec2i_1.keyOf(mv.from);
            var toK = Vec2i_1.keyOf(mv.to);
            var tv = this.tiles.get(fromK);
            if (!tv)
                continue;
            this.tiles.delete(fromK);
            tv.setCoord(mv.to);
            this.tiles.set(toK, tv);
            moveAnims.push({
                node: tv.node,
                toPos: this.coordToLocalPos(mv.to.x, mv.to.y),
            });
        }
        if (result.tileUpdates) {
            for (var _d = 0, _e = result.tileUpdates; _d < _e.length; _d++) {
                var update = _e[_d];
                var k = Vec2i_1.keyOf(update.at);
                var tv = this.tiles.get(k);
                if (tv) {
                    tv.setTile(update.tile);
                }
            }
        }
        var spawnAnims = [];
        for (var _f = 0, _g = result.spawns; _f < _g.length; _f++) {
            var sp = _g[_f];
            var startPos = this.coordToLocalPosFloat(sp.to.x, sp.fromY);
            var endPos = this.coordToLocalPos(sp.to.x, sp.to.y);
            var tv = this.createTile(sp.to, sp.tile);
            tv.node.setPosition(startPos);
            tv.node.scaleX = 0.9;
            tv.node.scaleY = 0.9;
            spawnAnims.push({ node: tv.node, toPos: endPos });
        }
        return this.animateRemoved(removedNodes)
            .then(function () { return _this.animateMoves(moveAnims); })
            .then(function () { return _this.animateSpawns(spawnAnims); });
    };
    BoardView.prototype.applyShuffleAnimated = function (result) {
        var _this = this;
        return new Promise(function (resolve) {
            cc.tween(_this.node)
                .to(0.08, { opacity: 120 })
                .call(function () {
                for (var _i = 0, _a = result.changes; _i < _a.length; _i++) {
                    var ch = _a[_i];
                    var tv = _this.tiles.get(Vec2i_1.keyOf(ch.at));
                    if (tv)
                        tv.setTile(ch.tile);
                }
            })
                .to(0.08, { opacity: 255 })
                .call(function () { return resolve(); })
                .start();
        });
    };
    BoardView.prototype.animateRemoved = function (nodes) {
        var _this = this;
        return new Promise(function (resolve) {
            if (nodes.length === 0)
                return resolve();
            var pending = nodes.length;
            var done = function () {
                pending--;
                if (pending <= 0)
                    resolve();
            };
            var _loop_1 = function (n) {
                cc.tween(n)
                    .to(_this.removeDuration, { scaleX: 0, scaleY: 0, opacity: 0 })
                    .call(function () {
                    n.destroy();
                    done();
                })
                    .start();
            };
            for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                var n = nodes_1[_i];
                _loop_1(n);
            }
        });
    };
    BoardView.prototype.animateMoves = function (anims) {
        var _this = this;
        return new Promise(function (resolve) {
            if (anims.length === 0)
                return resolve();
            var pending = anims.length;
            var done = function () {
                pending--;
                if (pending <= 0)
                    resolve();
            };
            for (var _i = 0, anims_1 = anims; _i < anims_1.length; _i++) {
                var a = anims_1[_i];
                cc.tween(a.node)
                    .to(_this.fallDuration, { position: a.toPos }, { easing: "quadIn" })
                    .call(done)
                    .start();
            }
        });
    };
    BoardView.prototype.animateSpawns = function (anims) {
        var _this = this;
        return new Promise(function (resolve) {
            if (anims.length === 0)
                return resolve();
            var pending = anims.length;
            var done = function () {
                pending--;
                if (pending <= 0)
                    resolve();
            };
            for (var _i = 0, anims_2 = anims; _i < anims_2.length; _i++) {
                var a = anims_2[_i];
                cc.tween(a.node)
                    .to(_this.spawnDuration, { position: a.toPos, scaleX: 1, scaleY: 1 }, { easing: "quadIn" })
                    .call(done)
                    .start();
            }
        });
    };
    BoardView.prototype.fitToArea = function (areaSize) {
        var step = this.tileSize + this.spacing;
        var boardW = this.cols * step - this.spacing;
        var boardH = this.rows * step - this.spacing;
        var padding = 0.95;
        var scaleX = (areaSize.width / boardW) * padding;
        var scaleY = (areaSize.height / boardH) * padding;
        var s = Math.min(scaleX, scaleY);
        this.node.scaleX = s;
        this.node.scaleY = s;
    };
    BoardView.prototype.createTile = function (coord, tile) {
        var _this = this;
        var node = cc.instantiate(this.tilePrefab);
        node.parent = this.node;
        node.setContentSize(this.tileSize, this.tileSize);
        node.opacity = 255;
        node.scaleX = 1;
        node.scaleY = 1;
        node.setPosition(this.coordToLocalPos(coord.x, coord.y));
        var tv = node.getComponent(TileView_1.default);
        tv.init(coord, tile, this.normalFrames, this.specialFrames, function (x, y) {
            var _a;
            (_a = _this.onTileClick) === null || _a === void 0 ? void 0 : _a.call(_this, x, y);
        });
        this.tiles.set(Vec2i_1.keyOf(coord), tv);
        return tv;
    };
    BoardView.prototype.coordToLocalPos = function (x, y) {
        return this.coordToLocalPosFloat(x, y);
    };
    BoardView.prototype.coordToLocalPosFloat = function (x, y) {
        var step = this.tileSize + this.spacing;
        var totalW = this.cols * step - this.spacing;
        var totalH = this.rows * step - this.spacing;
        var originX = -totalW / 2 + this.tileSize / 2;
        var originY = -totalH / 2 + this.tileSize / 2;
        var px = originX + x * step;
        var py = originY + y * step;
        return cc.v3(px, py, 0);
    };
    __decorate([
        property(cc.Prefab)
    ], BoardView.prototype, "tilePrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BoardView.prototype, "normalFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BoardView.prototype, "specialFrames", void 0);
    __decorate([
        property
    ], BoardView.prototype, "tileSize", void 0);
    __decorate([
        property
    ], BoardView.prototype, "spacing", void 0);
    __decorate([
        property
    ], BoardView.prototype, "removeDuration", void 0);
    __decorate([
        property
    ], BoardView.prototype, "fallDuration", void 0);
    __decorate([
        property
    ], BoardView.prototype, "spawnDuration", void 0);
    BoardView = __decorate([
        ccclass
    ], BoardView);
    return BoardView;
}(cc.Component));
exports.default = BoardView;

cc._RF.pop();