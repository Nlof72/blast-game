
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/utils/LevelManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fad4ehbTpdGWazWvabs0Il7', 'LevelManager');
// Script/utils/LevelManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelManager = void 0;
var LevelManager = /** @class */ (function () {
    function LevelManager() {
    }
    LevelManager.getCurrentLevel = function () {
        return this.currentLevel;
    };
    LevelManager.setLevel = function (level) {
        this.currentLevel = level;
    };
    LevelManager.nextLevel = function () {
        this.currentLevel++;
    };
    LevelManager.getGoalForLevel = function (level) {
        var baseGoal = 500;
        return baseGoal + (level - 1) * 200;
    };
    LevelManager.getCurrentGoal = function () {
        return this.getGoalForLevel(this.currentLevel);
    };
    LevelManager.reset = function () {
        this.currentLevel = 1;
    };
    LevelManager.currentLevel = 1;
    return LevelManager;
}());
exports.LevelManager = LevelManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdXRpbHMvTGV2ZWxNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUEyQkEsQ0FBQztJQXhCZSw0QkFBZSxHQUE3QjtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRWEscUJBQVEsR0FBdEIsVUFBdUIsS0FBYTtRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRWEsc0JBQVMsR0FBdkI7UUFDRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVhLDRCQUFlLEdBQTdCLFVBQThCLEtBQWE7UUFDekMsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLE9BQU8sUUFBUSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN0QyxDQUFDO0lBRWEsMkJBQWMsR0FBNUI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFYSxrQkFBSyxHQUFuQjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUF6QmMseUJBQVksR0FBVyxDQUFDLENBQUM7SUEwQjFDLG1CQUFDO0NBM0JELEFBMkJDLElBQUE7QUEzQlksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTGV2ZWxNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBzdGF0aWMgY3VycmVudExldmVsOiBudW1iZXIgPSAxO1xuICBcbiAgcHVibGljIHN0YXRpYyBnZXRDdXJyZW50TGV2ZWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TGV2ZWw7XG4gIH1cbiAgXG4gIHB1YmxpYyBzdGF0aWMgc2V0TGV2ZWwobGV2ZWw6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudExldmVsID0gbGV2ZWw7XG4gIH1cbiAgXG4gIHB1YmxpYyBzdGF0aWMgbmV4dExldmVsKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudExldmVsKys7XG4gIH1cbiAgXG4gIHB1YmxpYyBzdGF0aWMgZ2V0R29hbEZvckxldmVsKGxldmVsOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGJhc2VHb2FsID0gNTAwO1xuICAgIHJldHVybiBiYXNlR29hbCArIChsZXZlbCAtIDEpICogMjAwO1xuICB9XG4gIFxuICBwdWJsaWMgc3RhdGljIGdldEN1cnJlbnRHb2FsKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0R29hbEZvckxldmVsKHRoaXMuY3VycmVudExldmVsKTtcbiAgfVxuICBcbiAgcHVibGljIHN0YXRpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRMZXZlbCA9IDE7XG4gIH1cbn1cbiJdfQ==