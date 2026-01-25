
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/GameController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvZ2FtZS9HYW1lQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxJQUFZLFVBSVg7QUFKRCxXQUFZLFVBQVU7SUFDcEIsaUNBQW1CLENBQUE7SUFDbkIseUJBQVcsQ0FBQTtJQUNYLDJCQUFhLENBQUE7QUFDZixDQUFDLEVBSlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFJckI7QUFPRDtJQVVFLHdCQUFvQixNQUFrQjtRQUFsQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBVC9CLFVBQUssR0FBVyxDQUFDLENBQUM7UUFFbEIsV0FBTSxHQUFlLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFFdkMsVUFBSyxHQUFzQixJQUFJLENBQUM7UUFDaEMsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDZixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBSXRDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNyQyxDQUFDO0lBRU0sa0NBQVMsR0FBaEIsVUFBaUIsS0FBaUI7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVNLDhCQUFLLEdBQVo7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxnQ0FBTyxHQUFkO1FBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRU0saUNBQVEsR0FBZixVQUFnQixDQUFTLEVBQUUsQ0FBUztRQUNsQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLE9BQU87WUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDNUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRXBELElBQU0sUUFBUSxHQUFvQixFQUFFLENBQUM7UUFFckMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsVUFBQSxFQUFFLENBQUM7U0FDakM7UUFFRCxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDN0IsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLENBQUM7U0FDM0I7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztZQUM5QixPQUFPLEVBQUUsSUFBSSxNQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsQ0FBQztTQUMzQjtRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUIsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVNLDRDQUFtQixHQUExQjtRQUNFLElBQU0sUUFBUSxHQUFvQixFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU8sdUNBQWMsR0FBdEIsVUFBdUIsUUFBeUI7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTztRQUN4QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRS9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN0RSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztZQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUNyQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztTQUMvQjtJQUNILENBQUM7SUFFTSxrQ0FBUyxHQUFoQixVQUFpQixTQUFpQjtRQUNoQyxPQUFPLFNBQVMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDSCxxQkFBQztBQUFELENBbEZBLEFBa0ZDLElBQUE7QUFsRlksd0NBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uL2NvcmUvR2FtZUNvbmZpZ1wiO1xuaW1wb3J0IHsgQm9hcmRNb2RlbCB9IGZyb20gXCIuLi9jb3JlL0JvYXJkTW9kZWxcIjtcbmltcG9ydCB7IFR1cm5SZXN1bHQgfSBmcm9tIFwiLi4vY29yZS9UdXJuUmVzdWx0XCI7XG5pbXBvcnQgeyBTaHVmZmxlUmVzdWx0IH0gZnJvbSBcIi4uL2NvcmUvU2h1ZmZsZVJlc3VsdFwiO1xuXG5cbmV4cG9ydCBlbnVtIEdhbWVTdGF0dXMge1xuICBQbGF5aW5nID0gXCJQbGF5aW5nXCIsXG4gIFdpbiA9IFwiV2luXCIsXG4gIExvc2UgPSBcIkxvc2VcIixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDbGlja1Jlc29sdXRpb24ge1xuICB0dXJuOiBUdXJuUmVzdWx0IHwgbnVsbDtcbiAgc2h1ZmZsZXM6IFNodWZmbGVSZXN1bHRbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEdhbWVDb250cm9sbGVyIHtcbiAgcHVibGljIHNjb3JlOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgbW92ZXNMZWZ0OiBudW1iZXI7XG4gIHB1YmxpYyBzdGF0dXM6IEdhbWVTdGF0dXMgPSBHYW1lU3RhdHVzLlBsYXlpbmc7XG5cbiAgcHJpdmF0ZSBib2FyZDogQm9hcmRNb2RlbCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHNodWZmbGVVc2VkOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHJlYWRvbmx5IG1heFNodWZmbGU6IG51bWJlciA9IDM7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogR2FtZUNvbmZpZykge1xuICAgIHRoaXMubW92ZXNMZWZ0ID0gY29uZmlnLm1vdmVzTGltaXQ7XG4gIH1cblxuICBwdWJsaWMgYmluZEJvYXJkKGJvYXJkOiBCb2FyZE1vZGVsKTogdm9pZCB7XG4gICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgIHRoaXMubW92ZXNMZWZ0ID0gdGhpcy5jb25maWcubW92ZXNMaW1pdDtcbiAgICB0aGlzLnN0YXR1cyA9IEdhbWVTdGF0dXMuUGxheWluZztcbiAgICB0aGlzLnNodWZmbGVVc2VkID0gMDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRHb2FsKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmdvYWxTY29yZTtcbiAgfVxuXG4gIHB1YmxpYyB0cnlDbGljayh4OiBudW1iZXIsIHk6IG51bWJlcik6IENsaWNrUmVzb2x1dGlvbiB7XG4gICAgaWYgKHRoaXMuc3RhdHVzICE9PSBHYW1lU3RhdHVzLlBsYXlpbmcpIHJldHVybiB7IHR1cm46IG51bGwsIHNodWZmbGVzOiBbXSB9O1xuICAgIGlmICghdGhpcy5ib2FyZCkgdGhyb3cgbmV3IEVycm9yKFwiQm9hcmQgbm90IGJvdW5kXCIpO1xuICBcbiAgICBjb25zdCBzaHVmZmxlczogU2h1ZmZsZVJlc3VsdFtdID0gW107XG4gIFxuICAgIGNvbnN0IHR1cm4gPSB0aGlzLmJvYXJkLmFwcGx5Q2xpY2soeCwgeSk7XG4gICAgaWYgKCF0dXJuKSB7XG4gICAgICB0aGlzLnJlc29sdmVOb01vdmVzKHNodWZmbGVzKTtcbiAgICAgIHJldHVybiB7IHR1cm46IG51bGwsIHNodWZmbGVzIH07XG4gICAgfVxuXG4gICAgdGhpcy5tb3Zlc0xlZnQgLT0gMTtcbiAgICB0aGlzLnNjb3JlICs9IHRoaXMuY2FsY1Njb3JlKHR1cm4uZ3JvdXBTaXplKTtcblxuICAgIGlmICh0aGlzLnNjb3JlID49IHRoaXMuY29uZmlnLmdvYWxTY29yZSkge1xuICAgICAgdGhpcy5zdGF0dXMgPSBHYW1lU3RhdHVzLldpbjtcbiAgICAgIHJldHVybiB7IHR1cm4sIHNodWZmbGVzIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubW92ZXNMZWZ0IDw9IDApIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gR2FtZVN0YXR1cy5Mb3NlO1xuICAgICAgcmV0dXJuIHsgdHVybiwgc2h1ZmZsZXMgfTtcbiAgICB9XG5cbiAgICB0aGlzLnJlc29sdmVOb01vdmVzKHNodWZmbGVzKTtcbiAgXG4gICAgcmV0dXJuIHsgdHVybiwgc2h1ZmZsZXMgfTtcbiAgfVxuXG4gIHB1YmxpYyBlbnN1cmVQbGF5YWJsZVN0YXJ0KCk6IFNodWZmbGVSZXN1bHRbXSB7XG4gICAgY29uc3Qgc2h1ZmZsZXM6IFNodWZmbGVSZXN1bHRbXSA9IFtdO1xuICAgIHRoaXMucmVzb2x2ZU5vTW92ZXMoc2h1ZmZsZXMpO1xuICAgIHJldHVybiBzaHVmZmxlcztcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZU5vTW92ZXMoc2h1ZmZsZXM6IFNodWZmbGVSZXN1bHRbXSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ib2FyZCkgcmV0dXJuO1xuICAgIGlmICh0aGlzLnN0YXR1cyAhPT0gR2FtZVN0YXR1cy5QbGF5aW5nKSByZXR1cm47XG4gIFxuICAgIHdoaWxlICghdGhpcy5ib2FyZC5oYXNBbnlNb3ZlcygpICYmIHRoaXMuc2h1ZmZsZVVzZWQgPCB0aGlzLm1heFNodWZmbGUpIHtcbiAgICAgIHRoaXMuc2h1ZmZsZVVzZWQgKz0gMTtcbiAgICAgIHNodWZmbGVzLnB1c2godGhpcy5ib2FyZC5zaHVmZmxlKCkpO1xuICAgIH1cbiAgXG4gICAgaWYgKCF0aGlzLmJvYXJkLmhhc0FueU1vdmVzKCkpIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gR2FtZVN0YXR1cy5Mb3NlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjYWxjU2NvcmUoZ3JvdXBTaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBncm91cFNpemUgKiBncm91cFNpemUgKiA1O1xuICB9XG59XG4iXX0=