
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/view/TileView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdmlldy9UaWxlVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQU01QztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQXlFQztRQXZFQyxZQUFNLEdBQWMsSUFBSSxDQUFDO1FBRWpCLFdBQUssR0FBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzlCLFVBQUksR0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBRTFDLGtCQUFZLEdBQXFCLEVBQUUsQ0FBQztRQUNwQyxtQkFBYSxHQUFxQixFQUFFLENBQUM7UUFFckMsa0JBQVksR0FBNEMsSUFBSSxDQUFDOztJQStEdkUsQ0FBQztJQTdEQyx5QkFBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTSx1QkFBSSxHQUFYLFVBQ0UsS0FBWSxFQUNaLElBQVUsRUFDVixZQUE4QixF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c291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbXBvcnQgeyBUaWxlLCBTcGVjaWFsRWZmZWN0IH0gZnJvbSBcIi4uL2NvcmUvVGlsZVwiO1xuaW1wb3J0IHsgVmVjMmkgfSBmcm9tIFwiLi4vY29yZS9WZWMyaVwiO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZVZpZXcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICBzcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgcHJpdmF0ZSBjb29yZDogVmVjMmkgPSB7IHg6IDAsIHk6IDAgfTtcbiAgcHJpdmF0ZSB0aWxlOiBUaWxlID0geyBraW5kOiBcIm5vcm1hbFwiLCBjb2xvcjogMCB9O1xuXG4gIHByaXZhdGUgbm9ybWFsRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gIHByaXZhdGUgc3BlY2lhbEZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gIHByaXZhdGUgY2xpY2tIYW5kbGVyOiAoKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xuXG4gIG9uTG9hZCgpIHtcbiAgICBpZiAoIXRoaXMuc3ByaXRlKSB0aGlzLnNwcml0ZSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcbiAgfVxuXG4gIG9uRGVzdHJveSgpIHtcbiAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0KFxuICAgIGNvb3JkOiBWZWMyaSxcbiAgICB0aWxlOiBUaWxlLFxuICAgIG5vcm1hbEZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSxcbiAgICBzcGVjaWFsRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdLFxuICAgIGNsaWNrSGFuZGxlcjogKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB2b2lkXG4gICk6IHZvaWQge1xuICAgIHRoaXMuY29vcmQgPSB7IHg6IGNvb3JkLngsIHk6IGNvb3JkLnkgfTtcbiAgICB0aGlzLm5vcm1hbEZyYW1lcyA9IG5vcm1hbEZyYW1lcztcbiAgICB0aGlzLnNwZWNpYWxGcmFtZXMgPSBzcGVjaWFsRnJhbWVzO1xuICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gY2xpY2tIYW5kbGVyO1xuXG4gICAgdGhpcy5zZXRUaWxlKHRpbGUpO1xuICB9XG5cbiAgcHVibGljIHNldENvb3JkKGNvb3JkOiBWZWMyaSk6IHZvaWQge1xuICAgIHRoaXMuY29vcmQgPSB7IHg6IGNvb3JkLngsIHk6IGNvb3JkLnkgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb29yZCgpOiBWZWMyaSB7XG4gICAgcmV0dXJuIHsgeDogdGhpcy5jb29yZC54LCB5OiB0aGlzLmNvb3JkLnkgfTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRUaWxlKHRpbGU6IFRpbGUpOiB2b2lkIHtcbiAgICB0aGlzLnRpbGUgPSB0aWxlO1xuICAgIGlmICghdGhpcy5zcHJpdGUpIHRoaXMuc3ByaXRlID0gdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICBpZiAoIXRoaXMuc3ByaXRlKSByZXR1cm47XG5cbiAgICB0aGlzLnNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XG5cbiAgICBpZiAodGlsZS5raW5kID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICBjb25zdCBpZHggPSB0aWxlLmNvbG9yO1xuICAgICAgY29uc3QgZnJhbWUgPSB0aGlzLm5vcm1hbEZyYW1lc1tpZHhdID8/IHRoaXMubm9ybWFsRnJhbWVzWzBdO1xuICAgICAgaWYgKCFmcmFtZSkgY2MuZXJyb3IoXCJbVGlsZVZpZXddIG5vcm1hbEZyYW1lcyBub3Qgc2V0XCIpO1xuICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSBmcmFtZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpZHggPSB0aWxlLmVmZmVjdCBhcyBudW1iZXI7XG4gICAgY29uc3QgZnJhbWUgPSB0aGlzLnNwZWNpYWxGcmFtZXNbaWR4XTtcbiAgICBpZiAoIWZyYW1lKSB7XG4gICAgICBjYy5lcnJvcihcIltUaWxlVmlld10gc3BlY2lhbEZyYW1lcyBtaXNzaW5nIGZvciBlZmZlY3QgaW5kZXg6XCIsIGlkeCk7XG4gICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMubm9ybWFsRnJhbWVzW3RoaXMubm9ybWFsRnJhbWVzLmxlbmd0aCAtIDFdID8/IG51bGw7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gZnJhbWU7XG4gIH1cblxuICBwcml2YXRlIG9uVG91Y2hFbmQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNsaWNrSGFuZGxlcikgcmV0dXJuO1xuICAgIHRoaXMuY2xpY2tIYW5kbGVyKHRoaXMuY29vcmQueCwgdGhpcy5jb29yZC55KTtcbiAgfVxufVxuIl19