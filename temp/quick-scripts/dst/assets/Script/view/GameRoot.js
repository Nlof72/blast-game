
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/view/GameRoot.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f1130gDX11JQbj/h2HtIdU9', 'GameRoot');
// Script/view/GameRoot.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BoardModel_1 = require("../core/BoardModel");
var GameController_1 = require("../game/GameController");
var LevelManager_1 = require("../utils/LevelManager");
var BoardView_1 = require("./BoardView");
var HudView_1 = require("./HudView");
var PopupView_1 = require("./PopupView");
var BoosterView_1 = require("./BoosterView");
var InputMode;
(function (InputMode) {
    InputMode["Normal"] = "Normal";
    InputMode["Bomb"] = "Bomb";
})(InputMode || (InputMode = {}));
var GameRoot = /** @class */ (function (_super) {
    __extends(GameRoot, _super);
    function GameRoot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boardView = null;
        _this.hudView = null;
        _this.popupView = null;
        _this.boosterView = null;
        _this.boardArea = null;
        _this.bombModeIndicator = null;
        _this.cols = 8;
        _this.rows = 10;
        _this.colorsCount = 5;
        _this.goalScore = 500;
        _this.movesLimit = 20;
        _this.minGroupSize = 2;
        _this.bombRadius = 2;
        _this.superMinGroup = 6;
        _this.shuffleBoosterUses = 3;
        _this.bombBoosterUses = 3;
        _this.isBusy = false;
        _this.inputMode = InputMode.Normal;
        return _this;
    }
    GameRoot.prototype.onLoad = function () {
        this.startNewGame();
    };
    GameRoot.prototype.startNewGame = function () {
        var _this = this;
        var _a;
        (_a = this.popupView) === null || _a === void 0 ? void 0 : _a.hide();
        this.updateBombModeIndicator();
        this.isBusy = false;
        this.inputMode = InputMode.Normal;
        var config = {
            cols: this.cols,
            rows: this.rows,
            colorsCount: this.colorsCount,
            goalScore: LevelManager_1.LevelManager.getCurrentGoal(),
            movesLimit: this.movesLimit
        };
        var rules = {
            minGroupSize: this.minGroupSize,
            bombRadius: this.bombRadius,
            superMinGroup: this.superMinGroup
        };
        this.controller = new GameController_1.GameController(config);
        this.board = new BoardModel_1.BoardModel(config, rules);
        this.board.initRandom();
        this.controller.bindBoard(this.board);
        if (this.boosterView) {
            this.boosterView.init(this.shuffleBoosterUses, this.bombBoosterUses, function () { return _this.onShuffleButtonClick(); }, function () { return _this.onBombButtonClick(); });
        }
        var startShuffles = this.controller.ensurePlayableStart();
        this.boardView.init(this.board, function (x, y) { return void _this.onTileClicked(x, y); });
        this.applyLayout();
        for (var _i = 0, startShuffles_1 = startShuffles; _i < startShuffles_1.length; _i++) {
            var s = startShuffles_1[_i];
            void this.boardView.applyShuffleAnimated(s);
        }
        this.boardView.rebuildAll();
        this.refreshHud();
    };
    GameRoot.prototype.applyLayout = function () {
        var size = this.boardArea.getContentSize();
        this.boardView.fitToArea(size);
    };
    GameRoot.prototype.onTileClicked = function (x, y) {
        return __awaiter(this, void 0, Promise, function () {
            var turn, res, _i, _a, s;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isBusy)
                            return [2 /*return*/];
                        if (this.controller.status !== GameController_1.GameStatus.Playing)
                            return [2 /*return*/];
                        if (!(this.inputMode === InputMode.Bomb)) return [3 /*break*/, 3];
                        turn = this.board.applyBombEffect(x, y, this.bombRadius);
                        if (!turn) return [3 /*break*/, 2];
                        this.isBusy = true;
                        this.boardView.setInputEnabled(false);
                        this.controller.score += this.controller.calcScore(turn.groupSize);
                        if (this.controller.score >= this.controller.getGoal()) {
                            this.controller.status = GameController_1.GameStatus.Win;
                        }
                        return [4 /*yield*/, this.boardView.applyTurnResultAnimated(turn)];
                    case 1:
                        _b.sent();
                        if (this.boosterView) {
                            this.boosterView.setBombUses(this.boosterView.getBombUses() - 1);
                        }
                        this.boardView.setInputEnabled(true);
                        this.isBusy = false;
                        this.refreshHud();
                        this.checkEnd();
                        _b.label = 2;
                    case 2:
                        this.inputMode = InputMode.Normal;
                        this.updateBombModeIndicator();
                        return [2 /*return*/];
                    case 3:
                        res = this.controller.tryClick(x, y);
                        if (!res.turn && res.shuffles.length === 0) {
                            this.refreshHud();
                            this.checkEnd();
                            return [2 /*return*/];
                        }
                        this.isBusy = true;
                        this.boardView.setInputEnabled(false);
                        if (!res.turn) return [3 /*break*/, 5];
                        this.refreshHud();
                        return [4 /*yield*/, this.boardView.applyTurnResultAnimated(res.turn)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i = 0, _a = res.shuffles;
                        _b.label = 6;
                    case 6:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        s = _a[_i];
                        return [4 /*yield*/, this.boardView.applyShuffleAnimated(s)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9:
                        this.boardView.setInputEnabled(true);
                        this.isBusy = false;
                        this.refreshHud();
                        this.checkEnd();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameRoot.prototype.onShuffleButtonClick = function () {
        return __awaiter(this, void 0, Promise, function () {
            var shuffleResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isBusy)
                            return [2 /*return*/];
                        if (this.controller.status !== GameController_1.GameStatus.Playing)
                            return [2 /*return*/];
                        if (!this.boosterView || !this.boosterView.canUseShuffle())
                            return [2 /*return*/];
                        this.isBusy = true;
                        this.boardView.setInputEnabled(false);
                        shuffleResult = this.board.shuffle();
                        return [4 /*yield*/, this.boardView.applyShuffleAnimated(shuffleResult)];
                    case 1:
                        _a.sent();
                        this.boosterView.setShuffleUses(this.boosterView.getShuffleUses() - 1);
                        this.boardView.setInputEnabled(true);
                        this.isBusy = false;
                        this.refreshHud();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameRoot.prototype.onBombButtonClick = function () {
        if (this.isBusy)
            return;
        if (this.controller.status !== GameController_1.GameStatus.Playing)
            return;
        if (!this.boosterView || !this.boosterView.canUseBomb())
            return;
        this.inputMode = InputMode.Bomb;
        this.updateBombModeIndicator();
    };
    GameRoot.prototype.onEnable = function () {
        cc.view.on("canvas-resize", this.onCanvasResize, this);
    };
    GameRoot.prototype.onDisable = function () {
        cc.view.off("canvas-resize", this.onCanvasResize, this);
    };
    GameRoot.prototype.onCanvasResize = function () {
        this.applyLayout();
    };
    GameRoot.prototype.refreshHud = function () {
        if (!this.hudView || !this.controller)
            return;
        var goal = this.controller.getGoal();
        if (goal == null) {
            cc.error("[GameRoot] getGoal() returned null/undefined");
            return;
        }
        this.hudView.setScore(this.controller.score, goal);
        this.hudView.setMoves(this.controller.movesLeft);
    };
    GameRoot.prototype.checkEnd = function () {
        var _this = this;
        if (!this.popupView)
            return;
        var currentLevel = LevelManager_1.LevelManager.getCurrentLevel();
        if (this.controller.status === GameController_1.GameStatus.Win) {
            var nextLevel = currentLevel + 1;
            this.popupView.show("ПОБЕДА", true, function () { return _this.onNextLevelClick(); }, false, undefined, nextLevel, "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C " + nextLevel);
        }
        else if (this.controller.status === GameController_1.GameStatus.Lose) {
            this.popupView.show("ПОРАЖЕНИЕ", false, undefined, true, function () { return _this.onRestartClick(); }, currentLevel, "\u0414\u043E\u0441\u0442\u0438\u0433\u043D\u0443\u0442\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C " + currentLevel);
        }
    };
    GameRoot.prototype.onNextLevelClick = function () {
        LevelManager_1.LevelManager.nextLevel();
        this.startNewGame();
    };
    GameRoot.prototype.onRestartClick = function () {
        var _a;
        LevelManager_1.LevelManager.reset();
        (_a = this.popupView) === null || _a === void 0 ? void 0 : _a.hide();
        this.startNewGame();
    };
    GameRoot.prototype.updateBombModeIndicator = function () {
        if (this.bombModeIndicator) {
            this.bombModeIndicator.active = this.inputMode === InputMode.Bomb;
        }
    };
    __decorate([
        property(BoardView_1.default)
    ], GameRoot.prototype, "boardView", void 0);
    __decorate([
        property(HudView_1.default)
    ], GameRoot.prototype, "hudView", void 0);
    __decorate([
        property(PopupView_1.default)
    ], GameRoot.prototype, "popupView", void 0);
    __decorate([
        property(BoosterView_1.default)
    ], GameRoot.prototype, "boosterView", void 0);
    __decorate([
        property(cc.Node)
    ], GameRoot.prototype, "boardArea", void 0);
    __decorate([
        property(cc.Node)
    ], GameRoot.prototype, "bombModeIndicator", void 0);
    __decorate([
        property
    ], GameRoot.prototype, "cols", void 0);
    __decorate([
        property
    ], GameRoot.prototype, "rows", void 0);
    __decorate([
        property
    ], GameRoot.prototype, "colorsCount", void 0);
    __decorate([
        property
    ], GameRoot.prototype, "goalScore", void 0);
    __decorate([
        property
    ], GameRoot.prototype, "movesLimit", void 0);
    __decorate([
        property
    ], GameRoot.prototype, "minGroupSize", void 0);
    __decorate([
        property
    ], GameRoot.prototype, "bombRadius", void 0);
    __decorate([
        property
    ], GameRoot.prototype, "superMinGroup", void 0);
    __decorate([
        property
    ], GameRoot.prototype, "shuffleBoosterUses", void 0);
    __decorate([
        property
    ], GameRoot.prototype, "bombBoosterUses", void 0);
    GameRoot = __decorate([
        ccclass
    ], GameRoot);
    return GameRoot;
}(cc.Component));
exports.default = GameRoot;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdmlldy9HYW1lUm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QyxpREFBNEQ7QUFDNUQseURBQW9FO0FBQ3BFLHNEQUFxRDtBQUNyRCx5Q0FBb0M7QUFDcEMscUNBQWdDO0FBQ2hDLHlDQUFvQztBQUNwQyw2Q0FBd0M7QUFFeEMsSUFBSyxTQUdKO0FBSEQsV0FBSyxTQUFTO0lBQ1osOEJBQWlCLENBQUE7SUFDakIsMEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFISSxTQUFTLEtBQVQsU0FBUyxRQUdiO0FBR0Q7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUFnUEM7UUEvT3NCLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFDOUIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUN0QixlQUFTLEdBQWMsSUFBSSxDQUFDO1FBQzFCLGlCQUFXLEdBQWdCLElBQUksQ0FBQztRQUVwQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLHVCQUFpQixHQUFZLElBQUksQ0FBQztRQUdyRCxVQUFJLEdBQVcsQ0FBQyxDQUFDO1FBR2pCLFVBQUksR0FBVyxFQUFFLENBQUM7UUFHbEIsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFHeEIsZUFBUyxHQUFXLEdBQUcsQ0FBQztRQUd4QixnQkFBVSxHQUFXLEVBQUUsQ0FBQztRQUd4QixrQkFBWSxHQUFXLENBQUMsQ0FBQztRQUd6QixnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUd2QixtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUcxQix3QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFHL0IscUJBQWUsR0FBVyxDQUFDLENBQUM7UUFLcEIsWUFBTSxHQUFZLEtBQUssQ0FB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UUFBdEIsUUFBUSxDQUFDLHFCQUFXLENBQUM7aURBQWlDO0lBRXBDO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUEyQjtJQUUxQjtRQUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFBbUM7SUFHckQ7UUFEQyxRQUFROzBDQUNRO0lBR2pCO1FBREMsUUFBUTswQ0FDUztJQUdsQjtRQURDLFFBQVE7aURBQ2U7SUFHeEI7UUFEQyxRQUFROytDQUNlO0lBR3hCO1FBREMsUUFBUTtnREFDZTtJQUd4QjtRQURDLFFBQVE7a0RBQ2dCO0lBR3pCO1FBREMsUUFBUTtnREFDYztJQUd2QjtRQURDLFFBQVE7bURBQ2lCO0lBRzFCO1FBREMsUUFBUTt3REFDc0I7SUFHL0I7UUFEQyxRQUFRO3FEQUNtQjtJQXRDVCxRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBZ1A1QjtJQUFELGVBQUM7Q0FoUEQsQUFnUEMsQ0FoUHFDLEVBQUUsQ0FBQyxTQUFTLEdBZ1BqRDtrQkFoUG9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbXBvcnQgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uL2NvcmUvR2FtZUNvbmZpZ1wiO1xuaW1wb3J0IHsgQm9hcmRNb2RlbCwgQm9hcmRSdWxlcyB9IGZyb20gXCIuLi9jb3JlL0JvYXJkTW9kZWxcIjtcbmltcG9ydCB7IEdhbWVDb250cm9sbGVyLCBHYW1lU3RhdHVzIH0gZnJvbSBcIi4uL2dhbWUvR2FtZUNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi91dGlscy9MZXZlbE1hbmFnZXJcIjtcbmltcG9ydCBCb2FyZFZpZXcgZnJvbSBcIi4vQm9hcmRWaWV3XCI7XG5pbXBvcnQgSHVkVmlldyBmcm9tIFwiLi9IdWRWaWV3XCI7XG5pbXBvcnQgUG9wdXBWaWV3IGZyb20gXCIuL1BvcHVwVmlld1wiO1xuaW1wb3J0IEJvb3N0ZXJWaWV3IGZyb20gXCIuL0Jvb3N0ZXJWaWV3XCI7XG5cbmVudW0gSW5wdXRNb2RlIHtcbiAgTm9ybWFsID0gXCJOb3JtYWxcIixcbiAgQm9tYiA9IFwiQm9tYlwiXG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lUm9vdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gIEBwcm9wZXJ0eShCb2FyZFZpZXcpIGJvYXJkVmlldzogQm9hcmRWaWV3ID0gbnVsbDtcbiAgQHByb3BlcnR5KEh1ZFZpZXcpIGh1ZFZpZXc6IEh1ZFZpZXcgPSBudWxsO1xuICBAcHJvcGVydHkoUG9wdXBWaWV3KSBwb3B1cFZpZXc6IFBvcHVwVmlldyA9IG51bGw7XG4gIEBwcm9wZXJ0eShCb29zdGVyVmlldykgYm9vc3RlclZpZXc6IEJvb3N0ZXJWaWV3ID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuTm9kZSkgYm9hcmRBcmVhOiBjYy5Ob2RlID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuTm9kZSkgYm9tYk1vZGVJbmRpY2F0b3I6IGNjLk5vZGUgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eVxuICBjb2xzOiBudW1iZXIgPSA4O1xuXG4gIEBwcm9wZXJ0eVxuICByb3dzOiBudW1iZXIgPSAxMDtcblxuICBAcHJvcGVydHlcbiAgY29sb3JzQ291bnQ6IG51bWJlciA9IDU7XG5cbiAgQHByb3BlcnR5XG4gIGdvYWxTY29yZTogbnVtYmVyID0gNTAwO1xuXG4gIEBwcm9wZXJ0eVxuICBtb3Zlc0xpbWl0OiBudW1iZXIgPSAyMDtcblxuICBAcHJvcGVydHlcbiAgbWluR3JvdXBTaXplOiBudW1iZXIgPSAyO1xuXG4gIEBwcm9wZXJ0eVxuICBib21iUmFkaXVzOiBudW1iZXIgPSAyO1xuXG4gIEBwcm9wZXJ0eVxuICBzdXBlck1pbkdyb3VwOiBudW1iZXIgPSA2O1xuXG4gIEBwcm9wZXJ0eVxuICBzaHVmZmxlQm9vc3RlclVzZXM6IG51bWJlciA9IDM7XG5cbiAgQHByb3BlcnR5XG4gIGJvbWJCb29zdGVyVXNlczogbnVtYmVyID0gMztcblxuICBwcml2YXRlIGNvbnRyb2xsZXI6IEdhbWVDb250cm9sbGVyO1xuICBwcml2YXRlIGJvYXJkOiBCb2FyZE1vZGVsO1xuXG4gIHByaXZhdGUgaXNCdXN5OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaW5wdXRNb2RlOiBJbnB1dE1vZGUgPSBJbnB1dE1vZGUuTm9ybWFsO1xuXG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLnN0YXJ0TmV3R2FtZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydE5ld0dhbWUoKTogdm9pZCB7XG4gICAgdGhpcy5wb3B1cFZpZXc/LmhpZGUoKTtcbiAgICB0aGlzLnVwZGF0ZUJvbWJNb2RlSW5kaWNhdG9yKCk7XG4gICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICB0aGlzLmlucHV0TW9kZSA9IElucHV0TW9kZS5Ob3JtYWw7XG5cbiAgICBjb25zdCBjb25maWc6IEdhbWVDb25maWcgPSB7XG4gICAgICBjb2xzOiB0aGlzLmNvbHMsXG4gICAgICByb3dzOiB0aGlzLnJvd3MsXG4gICAgICBjb2xvcnNDb3VudDogdGhpcy5jb2xvcnNDb3VudCxcbiAgICAgIGdvYWxTY29yZTogTGV2ZWxNYW5hZ2VyLmdldEN1cnJlbnRHb2FsKCksXG4gICAgICBtb3Zlc0xpbWl0OiB0aGlzLm1vdmVzTGltaXRcbiAgICB9O1xuXG4gICAgY29uc3QgcnVsZXM6IEJvYXJkUnVsZXMgPSB7XG4gICAgICBtaW5Hcm91cFNpemU6IHRoaXMubWluR3JvdXBTaXplLFxuICAgICAgYm9tYlJhZGl1czogdGhpcy5ib21iUmFkaXVzLFxuICAgICAgc3VwZXJNaW5Hcm91cDogdGhpcy5zdXBlck1pbkdyb3VwXG4gICAgfTtcblxuICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBHYW1lQ29udHJvbGxlcihjb25maWcpO1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmRNb2RlbChjb25maWcsIHJ1bGVzKTtcbiAgICB0aGlzLmJvYXJkLmluaXRSYW5kb20oKTtcblxuICAgIHRoaXMuY29udHJvbGxlci5iaW5kQm9hcmQodGhpcy5ib2FyZCk7XG5cbiAgICBpZiAodGhpcy5ib29zdGVyVmlldykge1xuICAgICAgdGhpcy5ib29zdGVyVmlldy5pbml0KFxuICAgICAgICB0aGlzLnNodWZmbGVCb29zdGVyVXNlcyxcbiAgICAgICAgdGhpcy5ib21iQm9vc3RlclVzZXMsXG4gICAgICAgICgpID0+IHRoaXMub25TaHVmZmxlQnV0dG9uQ2xpY2soKSxcbiAgICAgICAgKCkgPT4gdGhpcy5vbkJvbWJCdXR0b25DbGljaygpXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0U2h1ZmZsZXMgPSB0aGlzLmNvbnRyb2xsZXIuZW5zdXJlUGxheWFibGVTdGFydCgpO1xuICAgIHRoaXMuYm9hcmRWaWV3LmluaXQodGhpcy5ib2FyZCwgKHgsIHkpID0+IHZvaWQgdGhpcy5vblRpbGVDbGlja2VkKHgsIHkpKTtcbiAgICB0aGlzLmFwcGx5TGF5b3V0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHMgb2Ygc3RhcnRTaHVmZmxlcykge1xuICAgICAgdm9pZCB0aGlzLmJvYXJkVmlldy5hcHBseVNodWZmbGVBbmltYXRlZChzKTtcbiAgICB9XG5cbiAgICB0aGlzLmJvYXJkVmlldy5yZWJ1aWxkQWxsKCk7XG5cbiAgICB0aGlzLnJlZnJlc2hIdWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlMYXlvdXQoKTogdm9pZCB7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuYm9hcmRBcmVhLmdldENvbnRlbnRTaXplKCk7XG4gICAgdGhpcy5ib2FyZFZpZXcuZml0VG9BcmVhKHNpemUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBvblRpbGVDbGlja2VkKHg6IG51bWJlciwgeTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuaXNCdXN5KSByZXR1cm47XG4gICAgaWYgKHRoaXMuY29udHJvbGxlci5zdGF0dXMgIT09IEdhbWVTdGF0dXMuUGxheWluZykgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuaW5wdXRNb2RlID09PSBJbnB1dE1vZGUuQm9tYikge1xuICAgICAgY29uc3QgdHVybiA9IHRoaXMuYm9hcmQuYXBwbHlCb21iRWZmZWN0KHgsIHksIHRoaXMuYm9tYlJhZGl1cyk7XG4gICAgICBpZiAodHVybikge1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgIHRoaXMuYm9hcmRWaWV3LnNldElucHV0RW5hYmxlZChmYWxzZSk7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci5zY29yZSArPSB0aGlzLmNvbnRyb2xsZXIuY2FsY1Njb3JlKHR1cm4uZ3JvdXBTaXplKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuc2NvcmUgPj0gdGhpcy5jb250cm9sbGVyLmdldEdvYWwoKSkge1xuICAgICAgICAgIHRoaXMuY29udHJvbGxlci5zdGF0dXMgPSBHYW1lU3RhdHVzLldpbjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgdGhpcy5ib2FyZFZpZXcuYXBwbHlUdXJuUmVzdWx0QW5pbWF0ZWQodHVybik7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5ib29zdGVyVmlldykge1xuICAgICAgICAgIHRoaXMuYm9vc3RlclZpZXcuc2V0Qm9tYlVzZXModGhpcy5ib29zdGVyVmlldy5nZXRCb21iVXNlcygpIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYm9hcmRWaWV3LnNldElucHV0RW5hYmxlZCh0cnVlKTtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWZyZXNoSHVkKCk7XG4gICAgICAgIHRoaXMuY2hlY2tFbmQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5wdXRNb2RlID0gSW5wdXRNb2RlLk5vcm1hbDtcbiAgICAgIHRoaXMudXBkYXRlQm9tYk1vZGVJbmRpY2F0b3IoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIGNvbnN0IHJlcyA9IHRoaXMuY29udHJvbGxlci50cnlDbGljayh4LCB5KTtcbiAgXG4gICAgaWYgKCFyZXMudHVybiAmJiByZXMuc2h1ZmZsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnJlZnJlc2hIdWQoKTtcbiAgICAgIHRoaXMuY2hlY2tFbmQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICB0aGlzLmJvYXJkVmlldy5zZXRJbnB1dEVuYWJsZWQoZmFsc2UpO1xuICBcbiAgICBpZiAocmVzLnR1cm4pIHtcbiAgICAgIHRoaXMucmVmcmVzaEh1ZCgpO1xuICAgICAgYXdhaXQgdGhpcy5ib2FyZFZpZXcuYXBwbHlUdXJuUmVzdWx0QW5pbWF0ZWQocmVzLnR1cm4pO1xuICAgIH1cbiAgXG4gICAgZm9yIChjb25zdCBzIG9mIHJlcy5zaHVmZmxlcykge1xuICAgICAgYXdhaXQgdGhpcy5ib2FyZFZpZXcuYXBwbHlTaHVmZmxlQW5pbWF0ZWQocyk7XG4gICAgfVxuICBcbiAgICB0aGlzLmJvYXJkVmlldy5zZXRJbnB1dEVuYWJsZWQodHJ1ZSk7XG4gICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgXG4gICAgdGhpcy5yZWZyZXNoSHVkKCk7XG4gICAgdGhpcy5jaGVja0VuZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBvblNodWZmbGVCdXR0b25DbGljaygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5pc0J1c3kpIHJldHVybjtcbiAgICBpZiAodGhpcy5jb250cm9sbGVyLnN0YXR1cyAhPT0gR2FtZVN0YXR1cy5QbGF5aW5nKSByZXR1cm47XG4gICAgaWYgKCF0aGlzLmJvb3N0ZXJWaWV3IHx8ICF0aGlzLmJvb3N0ZXJWaWV3LmNhblVzZVNodWZmbGUoKSkgcmV0dXJuO1xuXG4gICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgIHRoaXMuYm9hcmRWaWV3LnNldElucHV0RW5hYmxlZChmYWxzZSk7XG5cbiAgICBjb25zdCBzaHVmZmxlUmVzdWx0ID0gdGhpcy5ib2FyZC5zaHVmZmxlKCk7XG4gICAgYXdhaXQgdGhpcy5ib2FyZFZpZXcuYXBwbHlTaHVmZmxlQW5pbWF0ZWQoc2h1ZmZsZVJlc3VsdCk7XG5cbiAgICB0aGlzLmJvb3N0ZXJWaWV3LnNldFNodWZmbGVVc2VzKHRoaXMuYm9vc3RlclZpZXcuZ2V0U2h1ZmZsZVVzZXMoKSAtIDEpO1xuXG4gICAgdGhpcy5ib2FyZFZpZXcuc2V0SW5wdXRFbmFibGVkKHRydWUpO1xuICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgdGhpcy5yZWZyZXNoSHVkKCk7XG4gIH1cblxuICBwcml2YXRlIG9uQm9tYkJ1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzQnVzeSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuc3RhdHVzICE9PSBHYW1lU3RhdHVzLlBsYXlpbmcpIHJldHVybjtcbiAgICBpZiAoIXRoaXMuYm9vc3RlclZpZXcgfHwgIXRoaXMuYm9vc3RlclZpZXcuY2FuVXNlQm9tYigpKSByZXR1cm47XG5cbiAgICB0aGlzLmlucHV0TW9kZSA9IElucHV0TW9kZS5Cb21iO1xuICAgIHRoaXMudXBkYXRlQm9tYk1vZGVJbmRpY2F0b3IoKTtcbiAgfVxuICBcbiAgb25FbmFibGUoKSB7XG4gICAgY2Mudmlldy5vbihcImNhbnZhcy1yZXNpemVcIiwgdGhpcy5vbkNhbnZhc1Jlc2l6ZSwgdGhpcyk7XG4gIH1cbiAgXG4gIG9uRGlzYWJsZSgpIHtcbiAgICBjYy52aWV3Lm9mZihcImNhbnZhcy1yZXNpemVcIiwgdGhpcy5vbkNhbnZhc1Jlc2l6ZSwgdGhpcyk7XG4gIH1cbiAgXG4gIHByaXZhdGUgb25DYW52YXNSZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5hcHBseUxheW91dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoSHVkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5odWRWaWV3IHx8ICF0aGlzLmNvbnRyb2xsZXIpIHJldHVybjtcbiAgICBjb25zdCBnb2FsID0gdGhpcy5jb250cm9sbGVyLmdldEdvYWwoKTtcbiAgICBpZiAoZ29hbCA9PSBudWxsKSB7XG4gICAgICBjYy5lcnJvcihcIltHYW1lUm9vdF0gZ2V0R29hbCgpIHJldHVybmVkIG51bGwvdW5kZWZpbmVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmh1ZFZpZXcuc2V0U2NvcmUodGhpcy5jb250cm9sbGVyLnNjb3JlLCBnb2FsKTtcbiAgICB0aGlzLmh1ZFZpZXcuc2V0TW92ZXModGhpcy5jb250cm9sbGVyLm1vdmVzTGVmdCk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRW5kKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wb3B1cFZpZXcpIHJldHVybjtcblxuICAgIGNvbnN0IGN1cnJlbnRMZXZlbCA9IExldmVsTWFuYWdlci5nZXRDdXJyZW50TGV2ZWwoKTtcblxuICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuc3RhdHVzID09PSBHYW1lU3RhdHVzLldpbikge1xuICAgICAgY29uc3QgbmV4dExldmVsID0gY3VycmVudExldmVsICsgMTtcbiAgICAgIHRoaXMucG9wdXBWaWV3LnNob3coXCLQn9Ce0JHQldCU0JBcIiwgdHJ1ZSwgKCkgPT4gdGhpcy5vbk5leHRMZXZlbENsaWNrKCksIGZhbHNlLCB1bmRlZmluZWQsIG5leHRMZXZlbCwgYNCh0LvQtdC00YPRjtGJ0LjQuSDRg9GA0L7QstC10L3RjCAke25leHRMZXZlbH1gKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29udHJvbGxlci5zdGF0dXMgPT09IEdhbWVTdGF0dXMuTG9zZSkge1xuICAgICAgdGhpcy5wb3B1cFZpZXcuc2hvdyhcItCf0J7QoNCQ0JbQldCd0JjQlVwiLCBmYWxzZSwgdW5kZWZpbmVkLCB0cnVlLCAoKSA9PiB0aGlzLm9uUmVzdGFydENsaWNrKCksIGN1cnJlbnRMZXZlbCwgYNCU0L7RgdGC0LjQs9C90YPRgtGL0Lkg0YPRgNC+0LLQtdC90YwgJHtjdXJyZW50TGV2ZWx9YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbk5leHRMZXZlbENsaWNrKCk6IHZvaWQge1xuICAgIExldmVsTWFuYWdlci5uZXh0TGV2ZWwoKTtcbiAgICB0aGlzLnN0YXJ0TmV3R2FtZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblJlc3RhcnRDbGljaygpOiB2b2lkIHtcbiAgICBMZXZlbE1hbmFnZXIucmVzZXQoKTtcbiAgICB0aGlzLnBvcHVwVmlldz8uaGlkZSgpO1xuICAgIHRoaXMuc3RhcnROZXdHYW1lKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUJvbWJNb2RlSW5kaWNhdG9yKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJvbWJNb2RlSW5kaWNhdG9yKSB7XG4gICAgICB0aGlzLmJvbWJNb2RlSW5kaWNhdG9yLmFjdGl2ZSA9IHRoaXMuaW5wdXRNb2RlID09PSBJbnB1dE1vZGUuQm9tYjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==