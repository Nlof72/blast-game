"use strict";
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