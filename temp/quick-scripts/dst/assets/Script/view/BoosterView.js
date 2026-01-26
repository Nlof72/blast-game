
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/view/BoosterView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdmlldy9Cb29zdGVyVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQW9HQztRQWxHQyxtQkFBYSxHQUFjLElBQUksQ0FBQztRQUdoQyxnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3Qix3QkFBa0IsR0FBYSxJQUFJLENBQUM7UUFHcEMscUJBQWUsR0FBYSxJQUFJLENBQUM7UUFFekIscUJBQWUsR0FBVyxDQUFDLENBQUM7UUFDNUIsa0JBQVksR0FBVyxDQUFDLENBQUM7UUFFekIsb0JBQWMsR0FBd0IsSUFBSSxDQUFDO1FBQzNDLGlCQUFXLEdBQXdCLElBQUksQ0FBQzs7SUFtRmxELENBQUM7SUFqRkMsNEJBQU0sR0FBTjtRQUFBLGlCQWdCQztRQWZDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO2dCQUN0RCxJQUFJLEtBQUksQ0FBQyxjQUFjLElBQUksS0FBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEVBQUU7b0JBQ25ELEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDdkI7WUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO2dCQUNuRCxJQUFJLEtBQUksQ0FBQyxXQUFXLElBQUksS0FBSSxDQUFDLFlBQVks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O2tCQXBHb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb29zdGVyVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gIHNodWZmbGVCdXR0b246IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgYm9tYkJ1dHRvbjogY2MuQnV0dG9uID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gIHNodWZmbGVCdXR0b25MYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgYm9tYkJ1dHRvbkxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBzaHVmZmxlVXNlc0xlZnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgYm9tYlVzZXNMZWZ0OiBudW1iZXIgPSAwO1xuXG4gIHByaXZhdGUgb25TaHVmZmxlQ2xpY2s6ICgoKSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIG9uQm9tYkNsaWNrOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcblxuICBvbkxvYWQoKSB7XG4gICAgaWYgKHRoaXMuc2h1ZmZsZUJ1dHRvbikge1xuICAgICAgdGhpcy5zaHVmZmxlQnV0dG9uLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9uU2h1ZmZsZUNsaWNrICYmIHRoaXMuc2h1ZmZsZVVzZXNMZWZ0ID4gMCkge1xuICAgICAgICAgIHRoaXMub25TaHVmZmxlQ2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYm9tYkJ1dHRvbikge1xuICAgICAgdGhpcy5ib21iQnV0dG9uLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9uQm9tYkNsaWNrICYmIHRoaXMuYm9tYlVzZXNMZWZ0ID4gMCkge1xuICAgICAgICAgIHRoaXMub25Cb21iQ2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgb25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnNodWZmbGVCdXR0b24pIHtcbiAgICAgIHRoaXMuc2h1ZmZsZUJ1dHRvbi5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5ib21iQnV0dG9uKSB7XG4gICAgICB0aGlzLmJvbWJCdXR0b24ubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaW5pdChcbiAgICBzaHVmZmxlVXNlczogbnVtYmVyLFxuICAgIGJvbWJVc2VzOiBudW1iZXIsXG4gICAgb25TaHVmZmxlQ2xpY2s6ICgpID0+IHZvaWQsXG4gICAgb25Cb21iQ2xpY2s6ICgpID0+IHZvaWRcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5zaHVmZmxlVXNlc0xlZnQgPSBzaHVmZmxlVXNlcztcbiAgICB0aGlzLmJvbWJVc2VzTGVmdCA9IGJvbWJVc2VzO1xuICAgIHRoaXMub25TaHVmZmxlQ2xpY2sgPSBvblNodWZmbGVDbGljaztcbiAgICB0aGlzLm9uQm9tYkNsaWNrID0gb25Cb21iQ2xpY2s7XG4gICAgdGhpcy51cGRhdGVCdXR0b25zKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0U2h1ZmZsZVVzZXModXNlczogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zaHVmZmxlVXNlc0xlZnQgPSB1c2VzO1xuICAgIHRoaXMudXBkYXRlQnV0dG9ucygpO1xuICB9XG5cbiAgcHVibGljIHNldEJvbWJVc2VzKHVzZXM6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuYm9tYlVzZXNMZWZ0ID0gdXNlcztcbiAgICB0aGlzLnVwZGF0ZUJ1dHRvbnMoKTtcbiAgfVxuXG4gIHB1YmxpYyBjYW5Vc2VTaHVmZmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNodWZmbGVVc2VzTGVmdCA+IDA7XG4gIH1cblxuICBwdWJsaWMgY2FuVXNlQm9tYigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ib21iVXNlc0xlZnQgPiAwO1xuICB9XG5cbiAgcHVibGljIGdldFNodWZmbGVVc2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2h1ZmZsZVVzZXNMZWZ0O1xuICB9XG5cbiAgcHVibGljIGdldEJvbWJVc2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYm9tYlVzZXNMZWZ0O1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVCdXR0b25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNodWZmbGVCdXR0b24pIHtcbiAgICAgIHRoaXMuc2h1ZmZsZUJ1dHRvbi5pbnRlcmFjdGFibGUgPSB0aGlzLnNodWZmbGVVc2VzTGVmdCA+IDA7XG4gICAgfVxuICAgIGlmICh0aGlzLnNodWZmbGVCdXR0b25MYWJlbCkge1xuICAgICAgdGhpcy5zaHVmZmxlQnV0dG9uTGFiZWwuc3RyaW5nID0gYCR7dGhpcy5zaHVmZmxlVXNlc0xlZnR9YDtcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuYm9tYkJ1dHRvbikge1xuICAgICAgdGhpcy5ib21iQnV0dG9uLmludGVyYWN0YWJsZSA9IHRoaXMuYm9tYlVzZXNMZWZ0ID4gMDtcbiAgICB9XG4gICAgaWYgKHRoaXMuYm9tYkJ1dHRvbkxhYmVsKSB7XG4gICAgICB0aGlzLmJvbWJCdXR0b25MYWJlbC5zdHJpbmcgPSBgJHt0aGlzLmJvbWJVc2VzTGVmdH1gO1xuICAgIH1cbiAgfVxufVxuIl19