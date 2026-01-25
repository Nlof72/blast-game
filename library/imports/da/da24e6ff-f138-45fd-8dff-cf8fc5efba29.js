"use strict";
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