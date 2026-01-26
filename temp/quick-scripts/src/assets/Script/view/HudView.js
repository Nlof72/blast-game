"use strict";
cc._RF.push(module, '9386d+0CfdNA4GniMXqO3B3', 'HudView');
// Script/view/HudView.ts

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
var HudView = /** @class */ (function (_super) {
    __extends(HudView, _super);
    function HudView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scoreLabel = null;
        _this.movesLabel = null;
        return _this;
    }
    HudView.prototype.setMoves = function (moves) {
        if (this.movesLabel)
            this.movesLabel.string = "" + moves;
    };
    HudView.prototype.setScore = function (score, goal) {
        if (this.scoreLabel) {
            var scoreVal = score != null ? score : 0;
            var goalVal = goal != null ? goal : 0;
            this.scoreLabel.string = "<size=50>\u041E\u0447\u043A\u0438:</size><br/><size=70>" + scoreVal + "/" + goalVal + "</size>";
        }
    };
    __decorate([
        property(cc.RichText)
    ], HudView.prototype, "scoreLabel", void 0);
    __decorate([
        property(cc.Label)
    ], HudView.prototype, "movesLabel", void 0);
    HudView = __decorate([
        ccclass
    ], HudView);
    return HudView;
}(cc.Component));
exports.default = HudView;

cc._RF.pop();