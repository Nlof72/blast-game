
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/view/HudView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdmlldy9IdWRWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBZUM7UUFkd0IsZ0JBQVUsR0FBZ0IsSUFBSSxDQUFDO1FBQ2xDLGdCQUFVLEdBQWEsSUFBSSxDQUFDOztJQWFsRCxDQUFDO0lBWFEsMEJBQVEsR0FBZixVQUFnQixLQUFhO1FBQzNCLElBQUksSUFBSSxDQUFDLFVBQVU7WUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFHLEtBQU8sQ0FBQztJQUMzRCxDQUFDO0lBRU0sMEJBQVEsR0FBZixVQUFnQixLQUFhLEVBQUUsSUFBWTtRQUN6QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBTSxRQUFRLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsNERBQXNDLFFBQVEsU0FBSSxPQUFPLFlBQVMsQ0FBQztTQUM3RjtJQUNILENBQUM7SUFic0I7UUFBdEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7K0NBQWdDO0lBQ2xDO1FBQW5CLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUE2QjtJQUY3QixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBZTNCO0lBQUQsY0FBQztDQWZELEFBZUMsQ0Fmb0MsRUFBRSxDQUFDLFNBQVMsR0FlaEQ7a0JBZm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHVkVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gIEBwcm9wZXJ0eShjYy5SaWNoVGV4dCkgc2NvcmVMYWJlbDogY2MuUmljaFRleHQgPSBudWxsO1xuICBAcHJvcGVydHkoY2MuTGFiZWwpIG1vdmVzTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICBwdWJsaWMgc2V0TW92ZXMobW92ZXM6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vdmVzTGFiZWwpIHRoaXMubW92ZXNMYWJlbC5zdHJpbmcgPSBgJHttb3Zlc31gO1xuICB9XG5cbiAgcHVibGljIHNldFNjb3JlKHNjb3JlOiBudW1iZXIsIGdvYWw6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnNjb3JlTGFiZWwpIHtcbiAgICAgIGNvbnN0IHNjb3JlVmFsID0gc2NvcmUgIT0gbnVsbCA/IHNjb3JlIDogMDtcbiAgICAgIGNvbnN0IGdvYWxWYWwgPSBnb2FsICE9IG51bGwgPyBnb2FsIDogMDtcbiAgICAgIHRoaXMuc2NvcmVMYWJlbC5zdHJpbmcgPSBgPHNpemU9NTA+0J7Rh9C60Lg6PC9zaXplPjxici8+PHNpemU9NzA+JHtzY29yZVZhbH0vJHtnb2FsVmFsfTwvc2l6ZT5gO1xuICAgIH1cbiAgfVxufVxuIl19