"use strict";
cc._RF.push(module, '01feapoOtlPLLFAsRvqveL1', 'PopupView');
// Script/view/PopupView.ts

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
var PopupView = /** @class */ (function (_super) {
    __extends(PopupView, _super);
    function PopupView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.messageLabel = null;
        _this.levelLabel = null;
        _this.nextLevelButton = null;
        _this.restartButton = null;
        _this.onNextLevelCallback = null;
        _this.onRestartCallback = null;
        return _this;
    }
    PopupView.prototype.onLoad = function () {
        this.setupButtons();
    };
    PopupView.prototype.setupButtons = function () {
        var _this = this;
        if (this.nextLevelButton && this.nextLevelButton.node) {
            this.nextLevelButton.node.off(cc.Node.EventType.TOUCH_END);
            this.nextLevelButton.node.on(cc.Node.EventType.TOUCH_END, function () {
                if (_this.onNextLevelCallback) {
                    _this.onNextLevelCallback();
                }
            }, this);
        }
        if (this.restartButton && this.restartButton.node) {
            this.restartButton.node.off(cc.Node.EventType.TOUCH_END);
            this.restartButton.node.on(cc.Node.EventType.TOUCH_END, function () {
                if (_this.onRestartCallback) {
                    _this.onRestartCallback();
                }
            }, this);
        }
    };
    PopupView.prototype.onDestroy = function () {
        if (this.nextLevelButton && this.nextLevelButton.node) {
            this.nextLevelButton.node.off(cc.Node.EventType.TOUCH_END);
        }
        if (this.restartButton && this.restartButton.node) {
            this.restartButton.node.off(cc.Node.EventType.TOUCH_END);
        }
    };
    PopupView.prototype.show = function (message, showNextLevel, onNextLevel, showRestart, onRestart, level, levelLabelText) {
        if (showNextLevel === void 0) { showNextLevel = false; }
        if (showRestart === void 0) { showRestart = false; }
        this.node.active = true;
        if (this.messageLabel)
            this.messageLabel.string = message;
        if (this.levelLabel && level !== undefined) {
            var labelText = levelLabelText || "\u0423\u0440\u043E\u0432\u0435\u043D\u044C " + level;
            this.levelLabel.string = labelText;
        }
        this.onNextLevelCallback = onNextLevel || null;
        this.onRestartCallback = onRestart || null;
        if (this.nextLevelButton) {
            this.nextLevelButton.node.active = showNextLevel;
            this.nextLevelButton.interactable = showNextLevel;
        }
        if (this.restartButton) {
            this.restartButton.node.active = showRestart;
            this.restartButton.interactable = showRestart;
        }
        this.setupButtons();
    };
    PopupView.prototype.hide = function () {
        this.node.active = false;
        if (this.nextLevelButton) {
            this.nextLevelButton.node.active = false;
        }
        if (this.restartButton) {
            this.restartButton.node.active = false;
        }
        this.onNextLevelCallback = null;
        this.onRestartCallback = null;
    };
    __decorate([
        property(cc.Label)
    ], PopupView.prototype, "messageLabel", void 0);
    __decorate([
        property(cc.Label)
    ], PopupView.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.Button)
    ], PopupView.prototype, "nextLevelButton", void 0);
    __decorate([
        property(cc.Button)
    ], PopupView.prototype, "restartButton", void 0);
    PopupView = __decorate([
        ccclass
    ], PopupView);
    return PopupView;
}(cc.Component));
exports.default = PopupView;

cc._RF.pop();