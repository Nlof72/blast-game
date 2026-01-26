"use strict";
cc._RF.push(module, 'a2332aA/LlNgalLsVeX3Anv', 'BoosterView');
// Script/view/BoosterView.ts

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
var BoosterView = /** @class */ (function (_super) {
    __extends(BoosterView, _super);
    function BoosterView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shuffleButton = null;
        _this.bombButton = null;
        _this.shuffleButtonLabel = null;
        _this.bombButtonLabel = null;
        _this.shuffleUsesLeft = 0;
        _this.bombUsesLeft = 0;
        _this.onShuffleClick = null;
        _this.onBombClick = null;
        return _this;
    }
    BoosterView.prototype.onLoad = function () {
        var _this = this;
        if (this.shuffleButton) {
            this.shuffleButton.node.on(cc.Node.EventType.TOUCH_END, function () {
                if (_this.onShuffleClick && _this.shuffleUsesLeft > 0) {
                    _this.onShuffleClick();
                }
            }, this);
        }
        if (this.bombButton) {
            this.bombButton.node.on(cc.Node.EventType.TOUCH_END, function () {
                if (_this.onBombClick && _this.bombUsesLeft > 0) {
                    _this.onBombClick();
                }
            }, this);
        }
    };
    BoosterView.prototype.onDestroy = function () {
        if (this.shuffleButton) {
            this.shuffleButton.node.off(cc.Node.EventType.TOUCH_END);
        }
        if (this.bombButton) {
            this.bombButton.node.off(cc.Node.EventType.TOUCH_END);
        }
    };
    BoosterView.prototype.init = function (shuffleUses, bombUses, onShuffleClick, onBombClick) {
        this.shuffleUsesLeft = shuffleUses;
        this.bombUsesLeft = bombUses;
        this.onShuffleClick = onShuffleClick;
        this.onBombClick = onBombClick;
        this.updateButtons();
    };
    BoosterView.prototype.setShuffleUses = function (uses) {
        this.shuffleUsesLeft = uses;
        this.updateButtons();
    };
    BoosterView.prototype.setBombUses = function (uses) {
        this.bombUsesLeft = uses;
        this.updateButtons();
    };
    BoosterView.prototype.canUseShuffle = function () {
        return this.shuffleUsesLeft > 0;
    };
    BoosterView.prototype.canUseBomb = function () {
        return this.bombUsesLeft > 0;
    };
    BoosterView.prototype.getShuffleUses = function () {
        return this.shuffleUsesLeft;
    };
    BoosterView.prototype.getBombUses = function () {
        return this.bombUsesLeft;
    };
    BoosterView.prototype.updateButtons = function () {
        if (this.shuffleButton) {
            this.shuffleButton.interactable = this.shuffleUsesLeft > 0;
        }
        if (this.shuffleButtonLabel) {
            this.shuffleButtonLabel.string = "" + this.shuffleUsesLeft;
        }
        if (this.bombButton) {
            this.bombButton.interactable = this.bombUsesLeft > 0;
        }
        if (this.bombButtonLabel) {
            this.bombButtonLabel.string = "" + this.bombUsesLeft;
        }
    };
    __decorate([
        property(cc.Button)
    ], BoosterView.prototype, "shuffleButton", void 0);
    __decorate([
        property(cc.Button)
    ], BoosterView.prototype, "bombButton", void 0);
    __decorate([
        property(cc.Label)
    ], BoosterView.prototype, "shuffleButtonLabel", void 0);
    __decorate([
        property(cc.Label)
    ], BoosterView.prototype, "bombButtonLabel", void 0);
    BoosterView = __decorate([
        ccclass
    ], BoosterView);
    return BoosterView;
}(cc.Component));
exports.default = BoosterView;

cc._RF.pop();