
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/view/BoardView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdmlldy9Cb2FyZFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUMsdUNBQTZDO0FBRTdDLHVDQUFrQztBQU1sQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQTZQQztRQTNQQyxnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFxQixFQUFFLENBQUM7UUFHcEMsbUJBQWEsR0FBcUIsRUFBRSxDQUFDO1FBR3JDLGNBQVEsR0FBVyxFQUFFLENBQUM7UUFHdEIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUdwQixvQkFBYyxHQUFXLElBQUksQ0FBQztRQUc5QixrQkFBWSxHQUFXLElBQUksQ0FBQztRQUc1QixtQkFBYSxHQUFXLElBQUksQ0FBQztRQUVyQixXQUFLLEdBQWUsSUFBSSxDQUFDO1FBQ3pCLFVBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsVUFBSSxHQUFXLENBQUMsQ0FBQztRQUVqQixXQUFLLEdBQTBCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDekMsaUJBQVcsR0FBNEMsSUFBSSxDQUFDO1FBRTVELGtCQUFZLEdBQVksSUFBSSxDQUFDOztJQTZOdkMsQ0FBQztJQTNOUSxtQ0FBZSxHQUF0QixVQUF1QixPQUFnQjtRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztJQUM5QixDQUFDO0lBRU0sd0JBQUksR0FBWCxVQUFZLEtBQWlCLEVBQUUsV0FBMkM7UUFBMUUsaUJBV0M7UUFWQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFP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QUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUUvQyxJQUFNLE9BQU8sR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWhELElBQU0sRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQU0sRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTlCLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUExUEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDUztJQUc3QjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzttREFDUztJQUdwQztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztvREFDVTtJQUdyQztRQURDLFFBQVE7K0NBQ2E7SUFHdEI7UUFEQyxRQUFROzhDQUNXO0lBR3BCO1FBREMsUUFBUTtxREFDcUI7SUFHOUI7UUFEQyxRQUFRO21EQUNtQjtJQUc1QjtRQURDLFFBQVE7b0RBQ29CO0lBdkJWLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0E2UDdCO0lBQUQsZ0JBQUM7Q0E3UEQsQUE2UEMsQ0E3UHNDLEVBQUUsQ0FBQyxTQUFTLEdBNlBsRDtrQkE3UG9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbXBvcnQgeyBCb2FyZE1vZGVsIH0gZnJvbSBcIi4uL2NvcmUvQm9hcmRNb2RlbFwiO1xuaW1wb3J0IHsga2V5T2YsIFZlYzJpIH0gZnJvbSBcIi4uL2NvcmUvVmVjMmlcIjtcbmltcG9ydCB7IFR1cm5SZXN1bHQgfSBmcm9tIFwiLi4vY29yZS9UdXJuUmVzdWx0XCI7XG5pbXBvcnQgVGlsZVZpZXcgZnJvbSBcIi4vVGlsZVZpZXdcIjtcbmltcG9ydCB7IFNodWZmbGVSZXN1bHQgfSBmcm9tIFwiLi4vY29yZS9TaHVmZmxlUmVzdWx0XCI7XG5pbXBvcnQgeyBUaWxlIH0gZnJvbSBcIi4uL2NvcmUvVGlsZVwiO1xuXG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZFZpZXcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICB0aWxlUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICBub3JtYWxGcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgc3BlY2lhbEZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gIEBwcm9wZXJ0eVxuICB0aWxlU2l6ZTogbnVtYmVyID0gNjQ7XG5cbiAgQHByb3BlcnR5XG4gIHNwYWNpbmc6IG51bWJlciA9IDY7XG5cbiAgQHByb3BlcnR5XG4gIHJlbW92ZUR1cmF0aW9uOiBudW1iZXIgPSAwLjEyO1xuXG4gIEBwcm9wZXJ0eVxuICBmYWxsRHVyYXRpb246IG51bWJlciA9IDAuMTg7XG5cbiAgQHByb3BlcnR5XG4gIHNwYXduRHVyYXRpb246IG51bWJlciA9IDAuMjA7XG5cbiAgcHJpdmF0ZSBib2FyZDogQm9hcmRNb2RlbCA9IG51bGw7XG4gIHByaXZhdGUgY29sczogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSByb3dzOiBudW1iZXIgPSAwO1xuXG4gIHByaXZhdGUgdGlsZXM6IE1hcDxzdHJpbmcsIFRpbGVWaWV3PiA9IG5ldyBNYXAoKTtcbiAgcHJpdmF0ZSBvblRpbGVDbGljazogKCh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIGlucHV0RW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgcHVibGljIHNldElucHV0RW5hYmxlZChlbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dEVuYWJsZWQgPSBlbmFibGVkO1xuICB9XG5cbiAgcHVibGljIGluaXQoYm9hcmQ6IEJvYXJkTW9kZWwsIG9uVGlsZUNsaWNrOiAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgdGhpcy5jb2xzID0gYm9hcmQuZ2V0Q29scygpO1xuICAgIHRoaXMucm93cyA9IGJvYXJkLmdldFJvd3MoKTtcblxuICAgIHRoaXMub25UaWxlQ2xpY2sgPSAoeCwgeSkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlucHV0RW5hYmxlZCkgcmV0dXJuO1xuICAgICAgb25UaWxlQ2xpY2s/Lih4LCB5KTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZWJ1aWxkQWxsKCk7XG4gIH1cblxuICBwdWJsaWMgcmVidWlsZEFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICB0aGlzLnRpbGVzLmNsZWFyKCk7XG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuY29sczsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMucm93czsgeSsrKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmJvYXJkLmdldCh4LCB5KTtcbiAgICAgICAgaWYgKHR5cGUgPT09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IHRpbGUgPSB0aGlzLmNyZWF0ZVRpbGUoeyB4LCB5IH0sIHR5cGUgYXMgYW55KTtcbiAgICAgICAgdm9pZCB0aWxlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhcHBseVR1cm5SZXN1bHRBbmltYXRlZChyZXN1bHQ6IFR1cm5SZXN1bHQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCByZW1vdmVkTm9kZXM6IGNjLk5vZGVbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgcCBvZiByZXN1bHQucmVtb3ZlZCkge1xuICAgICAgY29uc3QgayA9IGtleU9mKHApO1xuICAgICAgY29uc3QgdHYgPSB0aGlzLnRpbGVzLmdldChrKTtcbiAgICAgIGlmICh0dikge1xuICAgICAgICB0aGlzLnRpbGVzLmRlbGV0ZShrKTtcbiAgICAgICAgcmVtb3ZlZE5vZGVzLnB1c2godHYubm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbW92ZUFuaW1zOiB7IG5vZGU6IGNjLk5vZGU7IHRvUG9zOiBjYy5WZWMzIH1bXSA9IFtdO1xuICAgIGZvciAoY29uc3QgbXYgb2YgcmVzdWx0Lm1vdmVzKSB7XG4gICAgICBjb25zdCBmcm9tSyA9IGtleU9mKG12LmZyb20pO1xuICAgICAgY29uc3QgdG9LID0ga2V5T2YobXYudG8pO1xuXG4gICAgICBjb25zdCB0diA9IHRoaXMudGlsZXMuZ2V0KGZyb21LKTtcbiAgICAgIGlmICghdHYpIGNvbnRpbnVlO1xuXG4gICAgICB0aGlzLnRpbGVzLmRlbGV0ZShmcm9tSyk7XG4gICAgICB0di5zZXRDb29yZChtdi50byk7XG4gICAgICB0aGlzLnRpbGVzLnNldCh0b0ssIHR2KTtcblxuICAgICAgbW92ZUFuaW1zLnB1c2goe1xuICAgICAgICBub2RlOiB0di5ub2RlLFxuICAgICAgICB0b1BvczogdGhpcy5jb29yZFRvTG9jYWxQb3MobXYudG8ueCwgbXYudG8ueSksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LnRpbGVVcGRhdGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IHVwZGF0ZSBvZiByZXN1bHQudGlsZVVwZGF0ZXMpIHtcbiAgICAgICAgY29uc3QgayA9IGtleU9mKHVwZGF0ZS5hdCk7XG4gICAgICAgIGNvbnN0IHR2ID0gdGhpcy50aWxlcy5nZXQoayk7XG4gICAgICAgIGlmICh0dikge1xuICAgICAgICAgIHR2LnNldFRpbGUodXBkYXRlLnRpbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3Bhd25BbmltczogeyBub2RlOiBjYy5Ob2RlOyB0b1BvczogY2MuVmVjMyB9W10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IHNwIG9mIHJlc3VsdC5zcGF3bnMpIHtcbiAgICAgIGNvbnN0IHN0YXJ0UG9zID0gdGhpcy5jb29yZFRvTG9jYWxQb3NGbG9hdChzcC50by54LCBzcC5mcm9tWSk7XG4gICAgICBjb25zdCBlbmRQb3MgPSB0aGlzLmNvb3JkVG9Mb2NhbFBvcyhzcC50by54LCBzcC50by55KTtcblxuICAgICAgY29uc3QgdHYgPSB0aGlzLmNyZWF0ZVRpbGUoc3AudG8sIHNwLnRpbGUpO1xuICAgICAgdHYubm9kZS5zZXRQb3NpdGlvbihzdGFydFBvcyk7XG5cbiAgICAgIHR2Lm5vZGUuc2NhbGVYID0gMC45O1xuICAgICAgdHYubm9kZS5zY2FsZVkgPSAwLjk7XG5cbiAgICAgIHNwYXduQW5pbXMucHVzaCh7IG5vZGU6IHR2Lm5vZGUsIHRvUG9zOiBlbmRQb3MgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYW5pbWF0ZVJlbW92ZWQocmVtb3ZlZE5vZGVzKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5hbmltYXRlTW92ZXMobW92ZUFuaW1zKSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMuYW5pbWF0ZVNwYXducyhzcGF3bkFuaW1zKSk7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlTaHVmZmxlQW5pbWF0ZWQocmVzdWx0OiBTaHVmZmxlUmVzdWx0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXG4gICAgICAgIC50bygwLjA4LCB7IG9wYWNpdHk6IDEyMCB9KVxuICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgZm9yIChjb25zdCBjaCBvZiByZXN1bHQuY2hhbmdlcykge1xuICAgICAgICAgICAgY29uc3QgdHYgPSB0aGlzLnRpbGVzLmdldChrZXlPZihjaC5hdCkpO1xuICAgICAgICAgICAgaWYgKHR2KSB0di5zZXRUaWxlKGNoLnRpbGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRvKDAuMDgsIHsgb3BhY2l0eTogMjU1IH0pXG4gICAgICAgIC5jYWxsKCgpID0+IHJlc29sdmUoKSlcbiAgICAgICAgLnN0YXJ0KCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGVSZW1vdmVkKG5vZGVzOiBjYy5Ob2RlW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmIChub2Rlcy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgIGxldCBwZW5kaW5nID0gbm9kZXMubGVuZ3RoO1xuICAgICAgY29uc3QgZG9uZSA9ICgpID0+IHtcbiAgICAgICAgcGVuZGluZy0tO1xuICAgICAgICBpZiAocGVuZGluZyA8PSAwKSByZXNvbHZlKCk7XG4gICAgICB9O1xuXG4gICAgICBmb3IgKGNvbnN0IG4gb2Ygbm9kZXMpIHtcbiAgICAgICAgY2MudHdlZW4obilcbiAgICAgICAgICAudG8odGhpcy5yZW1vdmVEdXJhdGlvbiwgeyBzY2FsZVg6IDAsIHNjYWxlWTogMCwgb3BhY2l0eTogMCB9KVxuICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIG4uZGVzdHJveSgpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGVNb3ZlcyhhbmltczogeyBub2RlOiBjYy5Ob2RlOyB0b1BvczogY2MuVmVjMyB9W10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmIChhbmltcy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgIGxldCBwZW5kaW5nID0gYW5pbXMubGVuZ3RoO1xuICAgICAgY29uc3QgZG9uZSA9ICgpID0+IHtcbiAgICAgICAgcGVuZGluZy0tO1xuICAgICAgICBpZiAocGVuZGluZyA8PSAwKSByZXNvbHZlKCk7XG4gICAgICB9O1xuXG4gICAgICBmb3IgKGNvbnN0IGEgb2YgYW5pbXMpIHtcbiAgICAgICAgY2MudHdlZW4oYS5ub2RlKVxuICAgICAgICAgIC50byh0aGlzLmZhbGxEdXJhdGlvbiwgeyBwb3NpdGlvbjogYS50b1BvcyB9LCB7IGVhc2luZzogXCJxdWFkSW5cIiB9KVxuICAgICAgICAgIC5jYWxsKGRvbmUpXG4gICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGVTcGF3bnMoYW5pbXM6IHsgbm9kZTogY2MuTm9kZTsgdG9Qb3M6IGNjLlZlYzMgfVtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAoYW5pbXMubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICBsZXQgcGVuZGluZyA9IGFuaW1zLmxlbmd0aDtcbiAgICAgIGNvbnN0IGRvbmUgPSAoKSA9PiB7XG4gICAgICAgIHBlbmRpbmctLTtcbiAgICAgICAgaWYgKHBlbmRpbmcgPD0gMCkgcmVzb2x2ZSgpO1xuICAgICAgfTtcblxuICAgICAgZm9yIChjb25zdCBhIG9mIGFuaW1zKSB7XG4gICAgICAgIGNjLnR3ZWVuKGEubm9kZSlcbiAgICAgICAgICAudG8odGhpcy5zcGF3bkR1cmF0aW9uLCB7IHBvc2l0aW9uOiBhLnRvUG9zLCBzY2FsZVg6IDEsIHNjYWxlWTogMSB9LCB7IGVhc2luZzogXCJxdWFkSW5cIiB9KVxuICAgICAgICAgIC5jYWxsKGRvbmUpXG4gICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZml0VG9BcmVhKGFyZWFTaXplOiBjYy5TaXplKTogdm9pZCB7XG4gICAgY29uc3Qgc3RlcCA9IHRoaXMudGlsZVNpemUgKyB0aGlzLnNwYWNpbmc7XG4gICAgY29uc3QgYm9hcmRXID0gdGhpcy5jb2xzICogc3RlcCAtIHRoaXMuc3BhY2luZztcbiAgICBjb25zdCBib2FyZEggPSB0aGlzLnJvd3MgKiBzdGVwIC0gdGhpcy5zcGFjaW5nO1xuXG4gICAgY29uc3QgcGFkZGluZyA9IDAuOTU7XG4gIFxuICAgIGNvbnN0IHNjYWxlWCA9IChhcmVhU2l6ZS53aWR0aCAvIGJvYXJkVykgKiBwYWRkaW5nO1xuICAgIGNvbnN0IHNjYWxlWSA9IChhcmVhU2l6ZS5oZWlnaHQgLyBib2FyZEgpICogcGFkZGluZztcbiAgXG4gICAgY29uc3QgcyA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKTtcbiAgICB0aGlzLm5vZGUuc2NhbGVYID0gcztcbiAgICB0aGlzLm5vZGUuc2NhbGVZID0gcztcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVGlsZShjb29yZDogVmVjMmksIHRpbGU6IFRpbGUpOiBUaWxlVmlldyB7XG4gICAgY29uc3Qgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGlsZVByZWZhYik7XG4gICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG5cbiAgICBub2RlLnNldENvbnRlbnRTaXplKHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xuICAgIG5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICBub2RlLnNjYWxlWCA9IDE7XG4gICAgbm9kZS5zY2FsZVkgPSAxO1xuXG4gICAgbm9kZS5zZXRQb3NpdGlvbih0aGlzLmNvb3JkVG9Mb2NhbFBvcyhjb29yZC54LCBjb29yZC55KSk7XG5cbiAgICBjb25zdCB0diA9IG5vZGUuZ2V0Q29tcG9uZW50KFRpbGVWaWV3KTtcbiAgICB0di5pbml0KGNvb3JkLCB0aWxlLCB0aGlzLm5vcm1hbEZyYW1lcywgdGhpcy5zcGVjaWFsRnJhbWVzLCAoeCwgeSkgPT4ge1xuICAgICAgdGhpcy5vblRpbGVDbGljaz8uKHgsIHkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy50aWxlcy5zZXQoa2V5T2YoY29vcmQpLCB0dik7XG4gICAgcmV0dXJuIHR2O1xuICB9XG5cbiAgcHJpdmF0ZSBjb29yZFRvTG9jYWxQb3MoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBjYy5WZWMzIHtcbiAgICByZXR1cm4gdGhpcy5jb29yZFRvTG9jYWxQb3NGbG9hdCh4LCB5KTtcbiAgfVxuXG4gIHByaXZhdGUgY29vcmRUb0xvY2FsUG9zRmxvYXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBjYy5WZWMzIHtcbiAgICBjb25zdCBzdGVwID0gdGhpcy50aWxlU2l6ZSArIHRoaXMuc3BhY2luZztcblxuICAgIGNvbnN0IHRvdGFsVyA9IHRoaXMuY29scyAqIHN0ZXAgLSB0aGlzLnNwYWNpbmc7XG4gICAgY29uc3QgdG90YWxIID0gdGhpcy5yb3dzICogc3RlcCAtIHRoaXMuc3BhY2luZztcblxuICAgIGNvbnN0IG9yaWdpblggPSAtdG90YWxXIC8gMiArIHRoaXMudGlsZVNpemUgLyAyO1xuICAgIGNvbnN0IG9yaWdpblkgPSAtdG90YWxIIC8gMiArIHRoaXMudGlsZVNpemUgLyAyO1xuXG4gICAgY29uc3QgcHggPSBvcmlnaW5YICsgeCAqIHN0ZXA7XG4gICAgY29uc3QgcHkgPSBvcmlnaW5ZICsgeSAqIHN0ZXA7XG5cbiAgICByZXR1cm4gY2MudjMocHgsIHB5LCAwKTtcbiAgfVxufVxuIl19