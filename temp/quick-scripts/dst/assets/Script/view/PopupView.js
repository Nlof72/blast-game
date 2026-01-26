
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/view/PopupView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdmlldy9Qb3B1cFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUE4RUM7UUE3RXFCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBQzlCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBQzNCLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBQ2xDLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBRTdDLHlCQUFtQixHQUF3QixJQUFJLENBQUM7UUFDaEQsdUJBQWlCLEdBQXdCLElBQUksQ0FBQzs7SUF1RXhELENBQUM7SUFyRUMsMEJBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sZ0NBQVksR0FBcEI7UUFBQSxpQkFrQkM7UUFqQkMsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFO1lBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO2dCQUN4RCxJQUFJLEtBQUksQ0FBQyxtQkFBbUIsRUFBRTtvQkFDNUIsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7aUJBQzVCO1lBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFD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QVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUErQjtJQUM5QjtRQUFuQixRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFBNkI7SUFDM0I7UUFBcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQW1DO0lBQ2xDO1FBQXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUFpQztJQUpsQyxTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBOEU3QjtJQUFELGdCQUFDO0NBOUVELEFBOEVDLENBOUVzQyxFQUFFLENBQUMsU0FBUyxHQThFbEQ7a0JBOUVvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gIEBwcm9wZXJ0eShjYy5MYWJlbCkgbWVzc2FnZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gIEBwcm9wZXJ0eShjYy5MYWJlbCkgbGV2ZWxMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICBAcHJvcGVydHkoY2MuQnV0dG9uKSBuZXh0TGV2ZWxCdXR0b246IGNjLkJ1dHRvbiA9IG51bGw7XG4gIEBwcm9wZXJ0eShjYy5CdXR0b24pIHJlc3RhcnRCdXR0b246IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgcHJpdmF0ZSBvbk5leHRMZXZlbENhbGxiYWNrOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBvblJlc3RhcnRDYWxsYmFjazogKCgpID0+IHZvaWQpIHwgbnVsbCA9IG51bGw7XG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuc2V0dXBCdXR0b25zKCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwQnV0dG9ucygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uZXh0TGV2ZWxCdXR0b24gJiYgdGhpcy5uZXh0TGV2ZWxCdXR0b24ubm9kZSkge1xuICAgICAgdGhpcy5uZXh0TGV2ZWxCdXR0b24ubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EKTtcbiAgICAgIHRoaXMubmV4dExldmVsQnV0dG9uLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9uTmV4dExldmVsQ2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzLm9uTmV4dExldmVsQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVzdGFydEJ1dHRvbiAmJiB0aGlzLnJlc3RhcnRCdXR0b24ubm9kZSkge1xuICAgICAgdGhpcy5yZXN0YXJ0QnV0dG9uLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCk7XG4gICAgICB0aGlzLnJlc3RhcnRCdXR0b24ubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub25SZXN0YXJ0Q2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzLm9uUmVzdGFydENhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG9uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5uZXh0TGV2ZWxCdXR0b24gJiYgdGhpcy5uZXh0TGV2ZWxCdXR0b24ubm9kZSkge1xuICAgICAgdGhpcy5uZXh0TGV2ZWxCdXR0b24ubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVzdGFydEJ1dHRvbiAmJiB0aGlzLnJlc3RhcnRCdXR0b24ubm9kZSkge1xuICAgICAgdGhpcy5yZXN0YXJ0QnV0dG9uLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNob3cobWVzc2FnZTogc3RyaW5nLCBzaG93TmV4dExldmVsOiBib29sZWFuID0gZmFsc2UsIG9uTmV4dExldmVsPzogKCkgPT4gdm9pZCwgc2hvd1Jlc3RhcnQ6IGJvb2xlYW4gPSBmYWxzZSwgb25SZXN0YXJ0PzogKCkgPT4gdm9pZCwgbGV2ZWw/OiBudW1iZXIsIGxldmVsTGFiZWxUZXh0Pzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgaWYgKHRoaXMubWVzc2FnZUxhYmVsKSB0aGlzLm1lc3NhZ2VMYWJlbC5zdHJpbmcgPSBtZXNzYWdlO1xuXG4gICAgaWYgKHRoaXMubGV2ZWxMYWJlbCAmJiBsZXZlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBsYWJlbFRleHQgPSBsZXZlbExhYmVsVGV4dCB8fCBg0KPRgNC+0LLQtdC90YwgJHtsZXZlbH1gO1xuICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9IGxhYmVsVGV4dDtcbiAgICB9XG5cbiAgICB0aGlzLm9uTmV4dExldmVsQ2FsbGJhY2sgPSBvbk5leHRMZXZlbCB8fCBudWxsO1xuICAgIHRoaXMub25SZXN0YXJ0Q2FsbGJhY2sgPSBvblJlc3RhcnQgfHwgbnVsbDtcblxuICAgIGlmICh0aGlzLm5leHRMZXZlbEJ1dHRvbikge1xuICAgICAgdGhpcy5uZXh0TGV2ZWxCdXR0b24ubm9kZS5hY3RpdmUgPSBzaG93TmV4dExldmVsO1xuICAgICAgdGhpcy5uZXh0TGV2ZWxCdXR0b24uaW50ZXJhY3RhYmxlID0gc2hvd05leHRMZXZlbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZXN0YXJ0QnV0dG9uKSB7XG4gICAgICB0aGlzLnJlc3RhcnRCdXR0b24ubm9kZS5hY3RpdmUgPSBzaG93UmVzdGFydDtcbiAgICAgIHRoaXMucmVzdGFydEJ1dHRvbi5pbnRlcmFjdGFibGUgPSBzaG93UmVzdGFydDtcbiAgICB9XG5cbiAgICB0aGlzLnNldHVwQnV0dG9ucygpO1xuICB9XG5cbiAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLm5leHRMZXZlbEJ1dHRvbikge1xuICAgICAgdGhpcy5uZXh0TGV2ZWxCdXR0b24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVzdGFydEJ1dHRvbikge1xuICAgICAgdGhpcy5yZXN0YXJ0QnV0dG9uLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMub25OZXh0TGV2ZWxDYWxsYmFjayA9IG51bGw7XG4gICAgdGhpcy5vblJlc3RhcnRDYWxsYmFjayA9IG51bGw7XG4gIH1cbn1cbiJdfQ==