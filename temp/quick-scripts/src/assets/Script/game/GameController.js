"use strict";
cc._RF.push(module, 'df38eo8FWpOF42RvAtLp628', 'GameController');
// Script/game/GameController.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = exports.GameStatus = void 0;
var GameStatus;
(function (GameStatus) {
    GameStatus["Playing"] = "Playing";
    GameStatus["Win"] = "Win";
    GameStatus["Lose"] = "Lose";
})(GameStatus = exports.GameStatus || (exports.GameStatus = {}));
var GameController = /** @class */ (function () {
    function GameController(config) {
        this.config = config;
        this.score = 0;
        this.status = GameStatus.Playing;
        this.board = null;
        this.shuffleUsed = 0;
        this.maxShuffle = 3;
        this.movesLeft = config.movesLimit;
    }
    GameController.prototype.bindBoard = function (board) {
        this.board = board;
    };
    GameController.prototype.reset = function () {
        this.score = 0;
        this.movesLeft = this.config.movesLimit;
        this.status = GameStatus.Playing;
        this.shuffleUsed = 0;
    };
    GameController.prototype.getGoal = function () {
        return this.config.goalScore;
    };
    GameController.prototype.tryClick = function (x, y) {
        if (this.status !== GameStatus.Playing)
            return { turn: null, shuffles: [] };
        if (!this.board)
            throw new Error("Board not bound");
        var shuffles = [];
        var turn = this.board.applyClick(x, y);
        if (!turn) {
            this.resolveNoMoves(shuffles);
            return { turn: null, shuffles: shuffles };
        }
        this.movesLeft -= 1;
        this.score += this.calcScore(turn.groupSize);
        if (this.score >= this.config.goalScore) {
            this.status = GameStatus.Win;
            return { turn: turn, shuffles: shuffles };
        }
        if (this.movesLeft <= 0) {
            this.status = GameStatus.Lose;
            return { turn: turn, shuffles: shuffles };
        }
        this.resolveNoMoves(shuffles);
        return { turn: turn, shuffles: shuffles };
    };
    GameController.prototype.ensurePlayableStart = function () {
        var shuffles = [];
        this.resolveNoMoves(shuffles);
        return shuffles;
    };
    GameController.prototype.resolveNoMoves = function (shuffles) {
        if (!this.board)
            return;
        if (this.status !== GameStatus.Playing)
            return;
        while (!this.board.hasAnyMoves() && this.shuffleUsed < this.maxShuffle) {
            this.shuffleUsed += 1;
            shuffles.push(this.board.shuffle());
        }
        if (!this.board.hasAnyMoves()) {
            this.status = GameStatus.Lose;
        }
    };
    GameController.prototype.calcScore = function (groupSize) {
        return groupSize * groupSize * 5;
    };
    return GameController;
}());
exports.GameController = GameController;

cc._RF.pop();