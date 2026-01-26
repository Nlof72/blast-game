"use strict";
cc._RF.push(module, '478c9n2sDtDrLAFkbprk7yY', 'TileView');
// Script/view/TileView.ts

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
var TileView = /** @class */ (function (_super) {
    __extends(TileView, _super);
    function TileView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this.coord = { x: 0, y: 0 };
        _this.tile = { kind: "normal", color: 0 };
        _this.normalFrames = [];
        _this.specialFrames = [];
        _this.clickHandler = null;
        return _this;
    }
    TileView.prototype.onLoad = function () {
        if (!this.sprite)
            this.sprite = this.getComponent(cc.Sprite);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    };
    TileView.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    };
    TileView.prototype.init = function (coord, tile, normalFrames, specialFrames, clickHandler) {
        this.coord = { x: coord.x, y: coord.y };
        this.normalFrames = normalFrames;
        this.specialFrames = specialFrames;
        this.clickHandler = clickHandler;
        this.setTile(tile);
    };
    TileView.prototype.setCoord = function (coord) {
        this.coord = { x: coord.x, y: coord.y };
    };
    TileView.prototype.getCoord = function () {
        return { x: this.coord.x, y: this.coord.y };
    };
    TileView.prototype.setTile = function (tile) {
        var _a, _b;
        this.tile = tile;
        if (!this.sprite)
            this.sprite = this.getComponent(cc.Sprite);
        if (!this.sprite)
            return;
        this.sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        if (tile.kind === "normal") {
            var idx_1 = tile.color;
            var frame_1 = (_a = this.normalFrames[idx_1]) !== null && _a !== void 0 ? _a : this.normalFrames[0];
            if (!frame_1)
                cc.error("[TileView] normalFrames not set");
            this.sprite.spriteFrame = frame_1;
            return;
        }
        var idx = tile.effect;
        var frame = this.specialFrames[idx];
        if (!frame) {
            cc.error("[TileView] specialFrames missing for effect index:", idx);
            this.sprite.spriteFrame = (_b = this.normalFrames[this.normalFrames.length - 1]) !== null && _b !== void 0 ? _b : null;
            return;
        }
        this.sprite.spriteFrame = frame;
    };
    TileView.prototype.onTouchEnd = function () {
        if (!this.clickHandler)
            return;
        this.clickHandler(this.coord.x, this.coord.y);
    };
    __decorate([
        property(cc.Sprite)
    ], TileView.prototype, "sprite", void 0);
    TileView = __decorate([
        ccclass
    ], TileView);
    return TileView;
}(cc.Component));
exports.default = TileView;

cc._RF.pop();