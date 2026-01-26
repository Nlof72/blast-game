"use strict";
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