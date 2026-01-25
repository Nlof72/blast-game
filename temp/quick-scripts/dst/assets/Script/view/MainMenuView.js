
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/view/MainMenuView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'da24eb/8ThF/Y3/z4/F77op', 'MainMenuView');
// Script/view/MainMenuView.ts

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
var LevelManager_1 = require("../utils/LevelManager");
var MainMenuView = /** @class */ (function (_super) {
    __extends(MainMenuView, _super);
    function MainMenuView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playButton = null;
        _this.levelLabel = null;
        return _this;
    }
    MainMenuView.prototype.onLoad = function () {
        if (this.playButton) {
            this.playButton.node.on(cc.Node.EventType.TOUCH_END, this.onPlayClick, this);
        }
        this.updateLevelLabel();
    };
    MainMenuView.prototype.updateLevelLabel = function () {
        if (this.levelLabel) {
            var level = LevelManager_1.LevelManager.getCurrentLevel();
            this.levelLabel.string = "\u0423\u0440\u043E\u0432\u0435\u043D\u044C " + level;
        }
    };
    MainMenuView.prototype.onPlayClick = function () {
        cc.director.loadScene("main");
    };
    __decorate([
        property(cc.Button)
    ], MainMenuView.prototype, "playButton", void 0);
    __decorate([
        property(cc.Label)
    ], MainMenuView.prototype, "levelLabel", void 0);
    MainMenuView = __decorate([
        ccclass
    ], MainMenuView);
    return MainMenuView;
}(cc.Component));
exports.default = MainMenuView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdmlldy9NYWluTWVudVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsc0RBQXFEO0FBR3JEO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBeUJDO1FBdkJDLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLGdCQUFVLEdBQWEsSUFBSSxDQUFDOztJQW9COUIsQ0FBQztJQWxCQyw2QkFBTSxHQUFOO1FBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5RTtRQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyx1Q0FBZ0IsR0FBeEI7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBTSxLQUFLLEdBQUcsMkJBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxnREFBVyxLQUFPLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRU8sa0NBQVcsR0FBbkI7UUFDRSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBdEJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ1M7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDUztJQUxULFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0F5QmhDO0lBQUQsbUJBQUM7Q0F6QkQsQUF5QkMsQ0F6QnlDLEVBQUUsQ0FBQyxTQUFTLEdBeUJyRDtrQkF6Qm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vdXRpbHMvTGV2ZWxNYW5hZ2VyXCI7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTWVudVZpZXcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICBwbGF5QnV0dG9uOiBjYy5CdXR0b24gPSBudWxsO1xuICBcbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICBsZXZlbExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gIFxuICBvbkxvYWQoKSB7XG4gICAgaWYgKHRoaXMucGxheUJ1dHRvbikge1xuICAgICAgdGhpcy5wbGF5QnV0dG9uLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uUGxheUNsaWNrLCB0aGlzKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy51cGRhdGVMZXZlbExhYmVsKCk7XG4gIH1cbiAgXG4gIHByaXZhdGUgdXBkYXRlTGV2ZWxMYWJlbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5sZXZlbExhYmVsKSB7XG4gICAgICBjb25zdCBsZXZlbCA9IExldmVsTWFuYWdlci5nZXRDdXJyZW50TGV2ZWwoKTtcbiAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSBg0KPRgNC+0LLQtdC90YwgJHtsZXZlbH1gO1xuICAgIH1cbiAgfVxuICBcbiAgcHJpdmF0ZSBvblBsYXlDbGljaygpOiB2b2lkIHtcbiAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJtYWluXCIpO1xuICB9XG59XG4iXX0=