
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/core/BoardModel');
require('./assets/Script/core/GameConfig');
require('./assets/Script/core/ShuffleResult');
require('./assets/Script/core/Tile');
require('./assets/Script/core/TileType');
require('./assets/Script/core/TurnResult');
require('./assets/Script/core/Vec2i');
require('./assets/Script/game/GameController');
require('./assets/Script/utils/LevelManager');
require('./assets/Script/utils/Rng');
require('./assets/Script/view/BoardView');
require('./assets/Script/view/BoosterView');
require('./assets/Script/view/GameRoot');
require('./assets/Script/view/HudView');
require('./assets/Script/view/MainMenuView');
require('./assets/Script/view/PopupView');
require('./assets/Script/view/TileView');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/core/ShuffleResult.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd34f40C3ApC3Jc4Nr+SQlmB', 'ShuffleResult');
// Script/core/ShuffleResult.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29yZS9TaHVmZmxlUmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZWMyaSB9IGZyb20gXCIuL1ZlYzJpXCI7XG5pbXBvcnQgeyBUaWxlIH0gZnJvbSBcIi4vVGlsZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNodWZmbGVDaGFuZ2Uge1xuICBhdDogVmVjMmk7XG4gIHRpbGU6IFRpbGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2h1ZmZsZVJlc3VsdCB7XG4gIGNoYW5nZXM6IFNodWZmbGVDaGFuZ2VbXTtcbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/view/BoosterView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a2332aA/LlNgalLsVeX3Anv', 'BoosterView');
// Script/view/BoosterView.ts

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
var BoosterView = /** @class */ (function (_super) {
    __extends(BoosterView, _super);
    function BoosterView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shuffleButton = null;
        _this.bombButton = null;
        _this.shuffleButtonLabel = null;
        _this.bombButtonLabel = null;
        _this.shuffleUsesLeft = 0;
        _this.bombUsesLeft = 0;
        _this.onShuffleClick = null;
        _this.onBombClick = null;
        return _this;
    }
    BoosterView.prototype.onLoad = function () {
        var _this = this;
        if (this.shuffleButton) {
            this.shuffleButton.node.on(cc.Node.EventType.TOUCH_END, function () {
                if (_this.onShuffleClick && _this.shuffleUsesLeft > 0) {
                    _this.onShuffleClick();
                }
            }, this);
        }
        if (this.bombButton) {
            this.bombButton.node.on(cc.Node.EventType.TOUCH_END, function () {
                if (_this.onBombClick && _this.bombUsesLeft > 0) {
                    _this.onBombClick();
                }
            }, this);
        }
    };
    BoosterView.prototype.onDestroy = function () {
        if (this.shuffleButton) {
            this.shuffleButton.node.off(cc.Node.EventType.TOUCH_END);
        }
        if (this.bombButton) {
            this.bombButton.node.off(cc.Node.EventType.TOUCH_END);
        }
    };
    BoosterView.prototype.init = function (shuffleUses, bombUses, onShuffleClick, onBombClick) {
        this.shuffleUsesLeft = shuffleUses;
        this.bombUsesLeft = bombUses;
        this.onShuffleClick = onShuffleClick;
        this.onBombClick = onBombClick;
        this.updateButtons();
    };
    BoosterView.prototype.setShuffleUses = function (uses) {
        this.shuffleUsesLeft = uses;
        this.updateButtons();
    };
    BoosterView.prototype.setBombUses = function (uses) {
        this.bombUsesLeft = uses;
        this.updateButtons();
    };
    BoosterView.prototype.canUseShuffle = function () {
        return this.shuffleUsesLeft > 0;
    };
    BoosterView.prototype.canUseBomb = function () {
        return this.bombUsesLeft > 0;
    };
    BoosterView.prototype.getShuffleUses = function () {
        return this.shuffleUsesLeft;
    };
    BoosterView.prototype.getBombUses = function () {
        return this.bombUsesLeft;
    };
    BoosterView.prototype.updateButtons = function () {
        if (this.shuffleButton) {
            this.shuffleButton.interactable = this.shuffleUsesLeft > 0;
        }
        if (this.shuffleButtonLabel) {
            this.shuffleButtonLabel.string = "" + this.shuffleUsesLeft;
        }
        if (this.bombButton) {
            this.bombButton.interactable = this.bombUsesLeft > 0;
        }
        if (this.bombButtonLabel) {
            this.bombButtonLabel.string = "" + this.bombUsesLeft;
        }
    };
    __decorate([
        property(cc.Button)
    ], BoosterView.prototype, "shuffleButton", void 0);
    __decorate([
        property(cc.Button)
    ], BoosterView.prototype, "bombButton", void 0);
    __decorate([
        property(cc.Label)
    ], BoosterView.prototype, "shuffleButtonLabel", void 0);
    __decorate([
        property(cc.Label)
    ], BoosterView.prototype, "bombButtonLabel", void 0);
    BoosterView = __decorate([
        ccclass
    ], BoosterView);
    return BoosterView;
}(cc.Component));
exports.default = BoosterView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdmlldy9Cb29zdGVyVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQW9HQztRQWxHQyxtQkFBYSxHQUFjLElBQUksQ0FBQztRQUdoQyxnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3Qix3QkFBa0IsR0FBYSxJQUFJLENBQUM7UUFHcEMscUJBQWUsR0FBYSxJQUFJLENBQUM7UUFFekIscUJBQWUsR0FBVyxDQUFDLENBQUM7UUFDNUIsa0JBQVksR0FBVyxDQUFDLENBQUM7UUFFekIsb0JBQWMsR0FBd0IsSUFBSSxDQUFDO1FBQzNDLGlCQUFXLEdBQXdCLElBQUksQ0FBQzs7SUFtRmxELENBQUM7SUFqRkMsNEJBQU0sR0FBTjtRQUFBLGlCQWdCQztRQWZDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO2dCQUN0RCxJQUFJLEtBQUksQ0FBQyxjQUFjLElBQUksS0FBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEVBQUU7b0JBQ25ELEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDdkI7WUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO2dCQUNuRCxJQUFJLEtBQUksQ0FBQyxXQUFXLElBQUksS0FBSSxDQUFDLFlBQVks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O2tCQXBHb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb29zdGVyVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gIHNodWZmbGVCdXR0b246IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgYm9tYkJ1dHRvbjogY2MuQnV0dG9uID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gIHNodWZmbGVCdXR0b25MYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgYm9tYkJ1dHRvbkxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBzaHVmZmxlVXNlc0xlZnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgYm9tYlVzZXNMZWZ0OiBudW1iZXIgPSAwO1xuXG4gIHByaXZhdGUgb25TaHVmZmxlQ2xpY2s6ICgoKSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIG9uQm9tYkNsaWNrOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcblxuICBvbkxvYWQoKSB7XG4gICAgaWYgKHRoaXMuc2h1ZmZsZUJ1dHRvbikge1xuICAgICAgdGhpcy5zaHVmZmxlQnV0dG9uLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9uU2h1ZmZsZUNsaWNrICYmIHRoaXMuc2h1ZmZsZVVzZXNMZWZ0ID4gMCkge1xuICAgICAgICAgIHRoaXMub25TaHVmZmxlQ2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYm9tYkJ1dHRvbikge1xuICAgICAgdGhpcy5ib21iQnV0dG9uLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9uQm9tYkNsaWNrICYmIHRoaXMuYm9tYlVzZXNMZWZ0ID4gMCkge1xuICAgICAgICAgIHRoaXMub25Cb21iQ2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgb25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnNodWZmbGVCdXR0b24pIHtcbiAgICAgIHRoaXMuc2h1ZmZsZUJ1dHRvbi5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5ib21iQnV0dG9uKSB7XG4gICAgICB0aGlzLmJvbWJCdXR0b24ubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaW5pdChcbiAgICBzaHVmZmxlVXNlczogbnVtYmVyLFxuICAgIGJvbWJVc2VzOiBudW1iZXIsXG4gICAgb25TaHVmZmxlQ2xpY2s6ICgpID0+IHZvaWQsXG4gICAgb25Cb21iQ2xpY2s6ICgpID0+IHZvaWRcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5zaHVmZmxlVXNlc0xlZnQgPSBzaHVmZmxlVXNlcztcbiAgICB0aGlzLmJvbWJVc2VzTGVmdCA9IGJvbWJVc2VzO1xuICAgIHRoaXMub25TaHVmZmxlQ2xpY2sgPSBvblNodWZmbGVDbGljaztcbiAgICB0aGlzLm9uQm9tYkNsaWNrID0gb25Cb21iQ2xpY2s7XG4gICAgdGhpcy51cGRhdGVCdXR0b25zKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0U2h1ZmZsZVVzZXModXNlczogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zaHVmZmxlVXNlc0xlZnQgPSB1c2VzO1xuICAgIHRoaXMudXBkYXRlQnV0dG9ucygpO1xuICB9XG5cbiAgcHVibGljIHNldEJvbWJVc2VzKHVzZXM6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuYm9tYlVzZXNMZWZ0ID0gdXNlcztcbiAgICB0aGlzLnVwZGF0ZUJ1dHRvbnMoKTtcbiAgfVxuXG4gIHB1YmxpYyBjYW5Vc2VTaHVmZmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNodWZmbGVVc2VzTGVmdCA+IDA7XG4gIH1cblxuICBwdWJsaWMgY2FuVXNlQm9tYigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ib21iVXNlc0xlZnQgPiAwO1xuICB9XG5cbiAgcHVibGljIGdldFNodWZmbGVVc2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2h1ZmZsZVVzZXNMZWZ0O1xuICB9XG5cbiAgcHVibGljIGdldEJvbWJVc2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYm9tYlVzZXNMZWZ0O1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVCdXR0b25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNodWZmbGVCdXR0b24pIHtcbiAgICAgIHRoaXMuc2h1ZmZsZUJ1dHRvbi5pbnRlcmFjdGFibGUgPSB0aGlzLnNodWZmbGVVc2VzTGVmdCA+IDA7XG4gICAgfVxuICAgIGlmICh0aGlzLnNodWZmbGVCdXR0b25MYWJlbCkge1xuICAgICAgdGhpcy5zaHVmZmxlQnV0dG9uTGFiZWwuc3RyaW5nID0gYCR7dGhpcy5zaHVmZmxlVXNlc0xlZnR9YDtcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuYm9tYkJ1dHRvbikge1xuICAgICAgdGhpcy5ib21iQnV0dG9uLmludGVyYWN0YWJsZSA9IHRoaXMuYm9tYlVzZXNMZWZ0ID4gMDtcbiAgICB9XG4gICAgaWYgKHRoaXMuYm9tYkJ1dHRvbkxhYmVsKSB7XG4gICAgICB0aGlzLmJvbWJCdXR0b25MYWJlbC5zdHJpbmcgPSBgJHt0aGlzLmJvbWJVc2VzTGVmdH1gO1xuICAgIH1cbiAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/core/Vec2i.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd4bf0gmpZ9HQplx7xqhQA7k', 'Vec2i');
// Script/core/Vec2i.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyOf = void 0;
function keyOf(p) {
    return p.x + "_" + p.y;
}
exports.keyOf = keyOf;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29yZS9WZWMyaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLRSxTQUFnQixLQUFLLENBQUMsQ0FBUTtJQUM1QixPQUFVLENBQUMsQ0FBQyxDQUFDLFNBQUksQ0FBQyxDQUFDLENBQUcsQ0FBQztBQUN6QixDQUFDO0FBRkQsc0JBRUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFZlYzJpIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICB9XG4gIFxuICBleHBvcnQgZnVuY3Rpb24ga2V5T2YocDogVmVjMmkpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtwLnh9XyR7cC55fWA7XG4gIH0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/core/BoardModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '642adjbWQ9I85J0a59+I6HE', 'BoardModel');
// Script/core/BoardModel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardModel = void 0;
var Rng_1 = require("../utils/Rng");
var Tile_1 = require("./Tile");
var BoardModel = /** @class */ (function () {
    function BoardModel(config, rules, rng) {
        this.config = config;
        this.rules = rules;
        this.rng = rng !== null && rng !== void 0 ? rng : new Rng_1.Rng();
        this.grid = [];
        this.initEmpty();
    }
    BoardModel.prototype.getCols = function () { return this.config.cols; };
    BoardModel.prototype.getRows = function () { return this.config.rows; };
    BoardModel.prototype.initRandom = function () {
        for (var x = 0; x < this.config.cols; x++) {
            for (var y = 0; y < this.config.rows; y++) {
                this.grid[x][y] = this.randomNormalTile();
            }
        }
    };
    BoardModel.prototype.get = function (x, y) {
        if (!this.inBounds(x, y))
            return null;
        return this.grid[x][y];
    };
    BoardModel.prototype.set = function (x, y, value) {
        if (!this.inBounds(x, y))
            return;
        this.grid[x][y] = value;
    };
    BoardModel.prototype.applyClick = function (x, y) {
        if (!this.inBounds(x, y))
            return null;
        var cell = this.grid[x][y];
        if (cell === null)
            return null;
        if (cell.kind === "special") {
            return this.applySpecialEffect({ x: x, y: y }, cell);
        }
        return this.applyNormalGroup({ x: x, y: y }, cell.color);
    };
    BoardModel.prototype.hasAnyMoves = function () {
        for (var x = 0; x < this.config.cols; x++) {
            for (var y = 0; y < this.config.rows; y++) {
                var t = this.grid[x][y];
                if (t && t.kind === "special")
                    return true;
            }
        }
        var visited = this.makeVisited();
        for (var x = 0; x < this.config.cols; x++) {
            for (var y = 0; y < this.config.rows; y++) {
                if (visited[x][y])
                    continue;
                var t = this.grid[x][y];
                if (!t || t.kind !== "normal") {
                    visited[x][y] = true;
                    continue;
                }
                var stack = [{ x: x, y: y }];
                visited[x][y] = true;
                var size = 0;
                while (stack.length) {
                    var p = stack.pop();
                    size++;
                    if (size >= this.rules.minGroupSize)
                        return true;
                    for (var _i = 0, _a = this.neighbors4(p.x, p.y); _i < _a.length; _i++) {
                        var n = _a[_i];
                        if (visited[n.x][n.y])
                            continue;
                        var tn = this.grid[n.x][n.y];
                        if (!tn || tn.kind !== "normal" || tn.color !== t.color)
                            continue;
                        visited[n.x][n.y] = true;
                        stack.push(n);
                    }
                }
            }
        }
        return false;
    };
    BoardModel.prototype.shuffle = function () {
        var tiles = [];
        for (var x = 0; x < this.config.cols; x++) {
            for (var y = 0; y < this.config.rows; y++) {
                var t = this.grid[x][y];
                if (t)
                    tiles.push(t);
            }
        }
        for (var i = tiles.length - 1; i > 0; i--) {
            var j = this.rng.nextInt(i + 1);
            var tmp = tiles[i];
            tiles[i] = tiles[j];
            tiles[j] = tmp;
        }
        var changes = [];
        var idx = 0;
        for (var x = 0; x < this.config.cols; x++) {
            for (var y = 0; y < this.config.rows; y++) {
                if (!this.grid[x][y])
                    continue;
                var newTile = tiles[idx++];
                this.grid[x][y] = newTile;
                changes.push({ at: { x: x, y: y }, tile: newTile });
            }
        }
        return { changes: changes };
    };
    BoardModel.prototype.applyBombEffect = function (x, y, radius) {
        if (!this.inBounds(x, y))
            return null;
        var toRemove = [];
        for (var dx = -radius; dx <= radius; dx++) {
            for (var dy = -radius; dy <= radius; dy++) {
                var px = x + dx;
                var py = y + dy;
                if (this.inBounds(px, py) && this.grid[px][py] !== null) {
                    toRemove.push({ x: px, y: py });
                }
            }
        }
        if (toRemove.length === 0)
            return null;
        for (var _i = 0, toRemove_1 = toRemove; _i < toRemove_1.length; _i++) {
            var p = toRemove_1[_i];
            this.grid[p.x][p.y] = null;
        }
        return this.applyGravityAndSpawn(toRemove, toRemove.length);
    };
    BoardModel.prototype.applyNormalGroup = function (click, color) {
        var group = this.getNormalGroup(click.x, click.y, color);
        if (group.length < this.rules.minGroupSize)
            return null;
        for (var _i = 0, group_1 = group; _i < group_1.length; _i++) {
            var p = group_1[_i];
            this.grid[p.x][p.y] = null;
        }
        var shouldCreateSpecial = group.length >= 5;
        return this.applyGravityAndSpawn(group, group.length, shouldCreateSpecial ? click : null, shouldCreateSpecial ? group.length : 0);
    };
    BoardModel.prototype.getNormalGroup = function (startX, startY, color) {
        var t0 = this.grid[startX][startY];
        if (!t0 || t0.kind !== "normal" || t0.color !== color)
            return [];
        var visited = this.makeVisited();
        var stack = [{ x: startX, y: startY }];
        var group = [];
        visited[startX][startY] = true;
        while (stack.length) {
            var p = stack.pop();
            group.push(p);
            for (var _i = 0, _a = this.neighbors4(p.x, p.y); _i < _a.length; _i++) {
                var n = _a[_i];
                if (visited[n.x][n.y])
                    continue;
                var tn = this.grid[n.x][n.y];
                if (!tn || tn.kind !== "normal" || tn.color !== color)
                    continue;
                visited[n.x][n.y] = true;
                stack.push(n);
            }
        }
        return group;
    };
    BoardModel.prototype.applySpecialEffect = function (pos, tile) {
        var toRemove = this.computeEffectArea(pos, tile);
        if (toRemove.length === 0) {
            return null;
        }
        for (var _i = 0, toRemove_2 = toRemove; _i < toRemove_2.length; _i++) {
            var p = toRemove_2[_i];
            this.grid[p.x][p.y] = null;
        }
        var result = this.applyGravityAndSpawn(toRemove, toRemove.length);
        return result;
    };
    BoardModel.prototype.computeEffectArea = function (pos, tile) {
        var _this = this;
        var _a;
        var currentTile = this.grid[pos.x][pos.y];
        if (!currentTile || currentTile.kind !== "special") {
            return [];
        }
        var result = [];
        var added = new Set();
        var add = function (x, y) {
            if (!_this.inBounds(x, y))
                return;
            var c = _this.grid[x][y];
            if (!c)
                return;
            var key = x + "_" + y;
            if (added.has(key))
                return;
            added.add(key);
            result.push({ x: x, y: y });
        };
        add(pos.x, pos.y);
        switch (tile.effect) {
            case Tile_1.SpecialEffect.ClearRow: {
                for (var x = 0; x < this.config.cols; x++) {
                    add(x, pos.y);
                }
                break;
            }
            case Tile_1.SpecialEffect.ClearColumn: {
                for (var y = 0; y < this.config.rows; y++) {
                    add(pos.x, y);
                }
                break;
            }
            case Tile_1.SpecialEffect.BombRadius: {
                var R = (_a = tile.radius) !== null && _a !== void 0 ? _a : this.rules.bombRadius;
                for (var dx = -R; dx <= R; dx++) {
                    for (var dy = -R; dy <= R; dy++) {
                        add(pos.x + dx, pos.y + dy);
                    }
                }
                break;
            }
            case Tile_1.SpecialEffect.ClearBoard: {
                for (var x = 0; x < this.config.cols; x++) {
                    for (var y = 0; y < this.config.rows; y++) {
                        add(x, y);
                    }
                }
                break;
            }
        }
        return result;
    };
    BoardModel.prototype.applyGravityAndSpawn = function (removed, groupSize, createSpecialAt, specialGroupSize) {
        if (createSpecialAt === void 0) { createSpecialAt = null; }
        if (specialGroupSize === void 0) { specialGroupSize = 0; }
        var moves = [];
        var spawns = [];
        var tileUpdates = [];
        var specialY = -1;
        if (createSpecialAt && specialGroupSize > 0) {
            var clickX = createSpecialAt.x;
            var clickY = createSpecialAt.y;
            var tilesAbove = 0;
            for (var y = 0; y < clickY; y++) {
                if (this.grid[clickX][y] !== null) {
                    tilesAbove++;
                }
            }
            specialY = tilesAbove;
        }
        for (var x = 0; x < this.config.cols; x++) {
            var newCol = new Array(this.config.rows).fill(null);
            var writeY = 0;
            for (var y = 0; y < this.config.rows; y++) {
                var t = this.grid[x][y];
                if (!t)
                    continue;
                newCol[writeY] = t;
                if (writeY !== y) {
                    moves.push({ from: { x: x, y: y }, to: { x: x, y: writeY } });
                }
                writeY++;
            }
            var isSpecialCol = createSpecialAt && createSpecialAt.x === x && specialGroupSize > 0;
            var spawnIndex = 0;
            for (var y = writeY; y < this.config.rows; y++) {
                if (isSpecialCol && y === specialY && specialY >= writeY) {
                    var effectData = this.selectSpecialEffectByGroupSize(specialGroupSize);
                    var specialTile = effectData.radius !== undefined
                        ? { kind: "special", effect: effectData.effect, radius: effectData.radius }
                        : { kind: "special", effect: effectData.effect };
                    newCol[y] = specialTile;
                    spawns.push({
                        to: { x: x, y: y },
                        tile: specialTile,
                        fromY: this.config.rows + spawnIndex + 3,
                    });
                    spawnIndex++;
                    continue;
                }
                var tile = this.randomNormalTile();
                newCol[y] = tile;
                spawns.push({
                    to: { x: x, y: y },
                    tile: tile,
                    fromY: this.config.rows + spawnIndex + 3,
                });
                spawnIndex++;
            }
            if (isSpecialCol && specialY >= 0 && specialY < this.config.rows && specialY < writeY) {
                if (newCol[specialY] !== null) {
                    var effectData = this.selectSpecialEffectByGroupSize(specialGroupSize);
                    var specialTile = effectData.radius !== undefined
                        ? { kind: "special", effect: effectData.effect, radius: effectData.radius }
                        : { kind: "special", effect: effectData.effect };
                    newCol[specialY] = specialTile;
                    tileUpdates.push({
                        at: { x: x, y: specialY },
                        tile: specialTile
                    });
                }
            }
            for (var y = 0; y < this.config.rows; y++) {
                this.grid[x][y] = newCol[y];
            }
        }
        return { removed: removed, moves: moves, spawns: spawns, tileUpdates: tileUpdates.length > 0 ? tileUpdates : undefined, groupSize: groupSize };
    };
    BoardModel.prototype.randomNormalTile = function () {
        var color = this.rng.nextInt(this.config.colorsCount);
        return { kind: "normal", color: color };
    };
    BoardModel.prototype.selectSpecialEffectByGroupSize = function (groupSize) {
        if (groupSize >= 5 && groupSize <= 6) {
            var effects = [Tile_1.SpecialEffect.ClearRow, Tile_1.SpecialEffect.ClearColumn];
            return { effect: effects[this.rng.nextInt(effects.length)] };
        }
        else if (groupSize >= 7 && groupSize <= 8) {
            return { effect: Tile_1.SpecialEffect.BombRadius, radius: 1 };
        }
        else if (groupSize >= 9) {
            return { effect: Tile_1.SpecialEffect.ClearBoard };
        }
        return { effect: Tile_1.SpecialEffect.ClearRow };
    };
    BoardModel.prototype.initEmpty = function () {
        this.grid = [];
        for (var x = 0; x < this.config.cols; x++) {
            var col = [];
            for (var y = 0; y < this.config.rows; y++)
                col.push(null);
            this.grid.push(col);
        }
    };
    BoardModel.prototype.inBounds = function (x, y) {
        return x >= 0 && x < this.config.cols && y >= 0 && y < this.config.rows;
    };
    BoardModel.prototype.neighbors4 = function (x, y) {
        var out = [];
        if (this.inBounds(x - 1, y))
            out.push({ x: x - 1, y: y });
        if (this.inBounds(x + 1, y))
            out.push({ x: x + 1, y: y });
        if (this.inBounds(x, y - 1))
            out.push({ x: x, y: y - 1 });
        if (this.inBounds(x, y + 1))
            out.push({ x: x, y: y + 1 });
        return out;
    };
    BoardModel.prototype.makeVisited = function () {
        var visited = [];
        for (var x = 0; x < this.config.cols; x++) {
            var col = [];
            for (var y = 0; y < this.config.rows; y++)
                col.push(false);
            visited.push(col);
        }
        return visited;
    };
    return BoardModel;
}());
exports.BoardModel = BoardModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29yZS9Cb2FyZE1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLG9DQUFtQztBQUduQywrQkFBNkM7QUFVN0M7SUFJRSxvQkFBb0IsTUFBa0IsRUFBVSxLQUFpQixFQUFFLEdBQVM7UUFBeEQsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDL0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLGFBQUgsR0FBRyxjQUFILEdBQUcsR0FBSSxJQUFJLFNBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFTSw0QkFBTyxHQUFkLGNBQTJCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlDLDRCQUFPLEdBQWQsY0FBMkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFOUMsK0JBQVUsR0FBakI7UUFDRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNDO1NBQ0Y7SUFDSCxDQUFDO0lBRU0sd0JBQUcsR0FBVixVQUFXLENBQVMsRUFBRSxDQUFTO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVNLHdCQUFHLEdBQVYsVUFBVyxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQVc7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVNLCtCQUFVLEdBQWpCLFVBQWtCLENBQVMsRUFBRSxDQUFTO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUV0QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksSUFBSSxLQUFLLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQztRQUUvQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxHQUFBLEVBQUUsQ0FBQyxHQUFBLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNoRDtRQUVELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxHQUFBLEVBQUUsQ0FBQyxHQUFBLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLGdDQUFXLEdBQWxCO1FBQ0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekMsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTO29CQUFFLE9BQU8sSUFBSSxDQUFDO2FBQzVDO1NBQ0Y7UUFFRCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFFLFNBQVM7Z0JBQzVCLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQzdCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLFNBQVM7aUJBQ1Y7Z0JBRUQsSUFBTSxLQUFLLEdBQVksQ0FBQyxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDckIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUViLE9BQU8sS0FBSyxDQUFDLE1BQU0sRUFBRTtvQkFDbkIsSUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRyxDQUFDO29CQUN2QixJQUFJLEVBQUUsQ0FBQztvQkFDUCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7d0JBQUUsT0FBTyxJQUFJLENBQUM7b0JBRWpELEtBQWdCLFVBQXlCLEVBQXpCLEtBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBekIsY0FBeUIsRUFBekIsSUFBeUIsRUFBRTt3QkFBdEMsSUFBTSxDQUFDLFNBQUE7d0JBQ1YsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUUsU0FBUzt3QkFDaEMsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLEtBQUs7NEJBQUUsU0FBUzt3QkFFbEUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNmO2lCQUNGO2FBQ0Y7U0FDRjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVNLDRCQUFPLEdBQWQ7UUFDRSxJQUFNLEtBQUssR0FBVyxFQUFFLENBQUM7UUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekMsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDO29CQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEI7U0FDRjtRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUNoQjtRQUVELElBQU0sT0FBTyxHQUFnQyxFQUFFLENBQUM7UUFDaEQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFFLFNBQVM7Z0JBQy9CLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztnQkFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsR0FBQSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7YUFDL0M7U0FDRjtRQUVELE9BQU8sRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxvQ0FBZSxHQUF0QixVQUF1QixDQUFTLEVBQUUsQ0FBUyxFQUFFLE1BQWM7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXRDLElBQU0sUUFBUSxHQUFZLEVBQUUsQ0FBQztRQUM3QixLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDekMsS0FBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFO2dCQUN6QyxJQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNsQixJQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNsQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUN2RCxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDakM7YUFDRjtTQUNGO1FBRUQsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUV2QyxLQUFnQixVQUFRLEVBQVIscUJBQVEsRUFBUixzQkFBUSxFQUFSLElBQVEsRUFBRTtZQUFyQixJQUFNLENBQUMsaUJBQUE7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzVCO1FBRUQsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU8scUNBQWdCLEdBQXhCLFVBQXlCLEtBQVksRUFBRSxLQUFhO1FBQ2xELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7WUFBRSxPQUFPLElBQUksQ0FBQztRQUV4RCxLQUFnQixVQUFLLEVBQUwsZUFBSyxFQUFMLG1CQUFLLEVBQUwsSUFBSyxFQUFFO1lBQWxCLElBQU0sQ0FBQyxjQUFBO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUM1QjtRQUVELElBQU0sbUJBQW1CLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwSSxDQUFDO0lBRU8sbUNBQWMsR0FBdEIsVUFBdUIsTUFBYyxFQUFFLE1BQWMsRUFBRSxLQUFhO1FBQ2xFLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLEtBQUs7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUVqRSxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsSUFBTSxLQUFLLEdBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDbEQsSUFBTSxLQUFLLEdBQVksRUFBRSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFL0IsT0FBTyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ25CLElBQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUcsQ0FBQztZQUN2QixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWQsS0FBZ0IsVUFBeUIsRUFBekIsS0FBQSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUF6QixjQUF5QixFQUF6QixJQUF5QixFQUFFO2dCQUF0QyxJQUFNLENBQUMsU0FBQTtnQkFDVixJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBRSxTQUFTO2dCQUNoQyxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksRUFBRSxDQUFDLEtBQUssS0FBSyxLQUFLO29CQUFFLFNBQVM7Z0JBRWhFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDekIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNmO1NBQ0Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTyx1Q0FBa0IsR0FBMUIsVUFBMkIsR0FBVSxFQUFFLElBQWdDO1FBQ3JFLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFbkQsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsS0FBZ0IsVUFBUSxFQUFSLHFCQUFRLEVBQVIsc0JBQVEsRUFBUixJQUFRLEVBQUU7WUFBckIsSUFBTSxDQUFDLGlCQUFBO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUM1QjtRQUVELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BFLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxzQ0FBaUIsR0FBekIsVUFBMEIsR0FBVSxFQUFFLElBQWdDO1FBQXRFLGlCQXNEQzs7UUFyREMsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDbEQsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQU0sTUFBTSxHQUFZLEVBQUUsQ0FBQztRQUMzQixJQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBRWhDLElBQU0sR0FBRyxHQUFHLFVBQUMsQ0FBUyxFQUFFLENBQVM7WUFDL0IsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFBRSxPQUFPO1lBQ2pDLElBQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLENBQUM7Z0JBQUUsT0FBTztZQUNmLElBQU0sR0FBRyxHQUFNLENBQUMsU0FBSSxDQUFHLENBQUM7WUFDeEIsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPO1lBQzNCLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFBLEVBQUUsQ0FBQyxHQUFBLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQztRQUVGLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQixRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbkIsS0FBSyxvQkFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3pDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNmO2dCQUNELE1BQU07YUFDUDtZQUNELEtBQUssb0JBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDZjtnQkFDRCxNQUFNO2FBQ1A7WUFDRCxLQUFLLG9CQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzdCLElBQU0sQ0FBQyxTQUFHLElBQUksQ0FBQyxNQUFNLG1DQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2dCQUMvQyxLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7b0JBQy9CLEtBQUssSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTt3QkFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7cUJBQzdCO2lCQUNGO2dCQUNELE1BQU07YUFDUDtZQUNELEtBQUssb0JBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3pDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ1g7aUJBQ0Y7Z0JBQ0QsTUFBTTthQUNQO1NBQ0Y7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU8seUNBQW9CLEdBQTVCLFVBQTZCLE9BQWdCLEVBQUUsU0FBaUIsRUFBRSxlQUFvQyxFQUFFLGdCQUE0QjtRQUFsRSxnQ0FBQSxFQUFBLHNCQUFvQztRQUFFLGlDQUFBLEVBQUEsb0JBQTRCO1FBQ2xJLElBQU0sS0FBSyxHQUFrQixFQUFFLENBQUM7UUFDaEMsSUFBTSxNQUFNLEdBQW1CLEVBQUUsQ0FBQztRQUNsQyxJQUFNLFdBQVcsR0FBZ0MsRUFBRSxDQUFDO1FBQ3BELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWxCLElBQUksZUFBZSxJQUFJLGdCQUFnQixHQUFHLENBQUMsRUFBRTtZQUMzQyxJQUFNLE1BQU0sR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFFakMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9CLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQ2pDLFVBQVUsRUFBRSxDQUFDO2lCQUNkO2FBQ0Y7WUFDRCxRQUFRLEdBQUcsVUFBVSxDQUFDO1NBQ3ZCO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQU0sTUFBTSxHQUFXLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTlELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekMsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLENBQUM7b0JBQUUsU0FBUztnQkFFakIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFbkIsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUNoQixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFBLEVBQUUsQ0FBQyxHQUFBLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUN0RDtnQkFFRCxNQUFNLEVBQUUsQ0FBQzthQUNWO1lBRUQsSUFBTSxZQUFZLEdBQUcsZUFBZSxJQUFJLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztZQUV4RixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5QyxJQUFJLFlBQVksSUFBSSxDQUFDLEtBQUssUUFBUSxJQUFJLFFBQVEsSUFBSSxNQUFNLEVBQUU7b0JBQ3hELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUN6RSxJQUFNLFdBQVcsR0FBUyxVQUFVLENBQUMsTUFBTSxLQUFLLFNBQVM7d0JBQ3ZELENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUU7d0JBQzNFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFFbkQsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztvQkFFeEIsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDVixFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUEsRUFBRSxDQUFDLEdBQUEsRUFBRTt3QkFDWixJQUFJLEVBQUUsV0FBVzt3QkFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxDQUFDO3FCQUN6QyxDQUFDLENBQUM7b0JBRUgsVUFBVSxFQUFFLENBQUM7b0JBQ2IsU0FBUztpQkFDVjtnQkFFRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDckMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFFakIsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDVixFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUEsRUFBRSxDQUFDLEdBQUEsRUFBRTtvQkFDWixJQUFJLE1BQUE7b0JBQ0osS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxDQUFDO2lCQUN6QyxDQUFDLENBQUM7Z0JBRUgsVUFBVSxFQUFFLENBQUM7YUFDZDtZQUVELElBQUksWUFBWSxJQUFJLFFBQVEsSUFBSSxDQUFDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLFFBQVEsR0FBRyxNQUFNLEVBQUU7Z0JBQ3JGLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtvQkFDN0IsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQ3pFLElBQU0sV0FBVyxHQUFTLFVBQVUsQ0FBQyxNQUFNLEtBQUssU0FBUzt3QkFDdkQsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRTt3QkFDM0UsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUVuRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxDQUFDO29CQUUvQixXQUFXLENBQUMsSUFBSSxDQUFDO3dCQUNmLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUU7d0JBQ3RCLElBQUksRUFBRSxXQUFXO3FCQUNsQixDQUFDLENBQUM7aUJBQ0o7YUFDRjtZQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0I7U0FDRjtRQUVELE9BQU8sRUFBRSxPQUFPLFNBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLFNBQVMsV0FBQSxFQUFFLENBQUM7SUFDOUcsQ0FBQztJQUVPLHFDQUFnQixHQUF4QjtRQUNFLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEQsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRU8sbURBQThCLEdBQXRDLFVBQXVDLFNBQWlCO1FBQ3RELElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFO1lBQ3BDLElBQU0sT0FBTyxHQUFHLENBQUMsb0JBQWEsQ0FBQyxRQUFRLEVBQUUsb0JBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQzlEO2FBQU0sSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUU7WUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxvQkFBYSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDeEQ7YUFBTSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUU7WUFDekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxvQkFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxvQkFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFTyw4QkFBUyxHQUFqQjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQU0sR0FBRyxHQUFXLEVBQUUsQ0FBQztZQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFO2dCQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRU8sNkJBQVEsR0FBaEIsVUFBaUIsQ0FBUyxFQUFFLENBQVM7UUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUMxRSxDQUFDO0lBRU8sK0JBQVUsR0FBbEIsVUFBbUIsQ0FBUyxFQUFFLENBQVM7UUFDckMsSUFBTSxHQUFHLEdBQVksRUFBRSxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUEsRUFBRSxDQUFDLENBQUM7UUFDdkQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFBLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRU8sZ0NBQVcsR0FBbkI7UUFDRSxJQUFNLE9BQU8sR0FBZ0IsRUFBRSxDQUFDO1FBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFNLEdBQUcsR0FBYyxFQUFFLENBQUM7WUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRTtnQkFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkI7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQXRZQSxBQXNZQyxJQUFBO0FBdFlZLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZUNvbmZpZyB9IGZyb20gXCIuL0dhbWVDb25maWdcIjtcbmltcG9ydCB7IFZlYzJpIH0gZnJvbSBcIi4vVmVjMmlcIjtcbmltcG9ydCB7IFJuZyB9IGZyb20gXCIuLi91dGlscy9SbmdcIjtcbmltcG9ydCB7IFR1cm5SZXN1bHQsIE1vdmVDb21tYW5kLCBTcGF3bkNvbW1hbmQgfSBmcm9tIFwiLi9UdXJuUmVzdWx0XCI7XG5pbXBvcnQgeyBTaHVmZmxlUmVzdWx0IH0gZnJvbSBcIi4vU2h1ZmZsZVJlc3VsdFwiO1xuaW1wb3J0IHsgVGlsZSwgU3BlY2lhbEVmZmVjdCB9IGZyb20gXCIuL1RpbGVcIjtcblxudHlwZSBDZWxsID0gVGlsZSB8IG51bGw7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQm9hcmRSdWxlcyB7XG4gIG1pbkdyb3VwU2l6ZTogbnVtYmVyO1xuICBib21iUmFkaXVzOiBudW1iZXI7XG4gIHN1cGVyTWluR3JvdXA6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEJvYXJkTW9kZWwge1xuICBwcml2YXRlIGdyaWQ6IENlbGxbXVtdO1xuICBwcml2YXRlIHJuZzogUm5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBHYW1lQ29uZmlnLCBwcml2YXRlIHJ1bGVzOiBCb2FyZFJ1bGVzLCBybmc/OiBSbmcpIHtcbiAgICB0aGlzLnJuZyA9IHJuZyA/PyBuZXcgUm5nKCk7XG4gICAgdGhpcy5ncmlkID0gW107XG4gICAgdGhpcy5pbml0RW1wdHkoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb2xzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNvbmZpZy5jb2xzOyB9XG4gIHB1YmxpYyBnZXRSb3dzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNvbmZpZy5yb3dzOyB9XG5cbiAgcHVibGljIGluaXRSYW5kb20oKTogdm9pZCB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5jb25maWcucm93czsgeSsrKSB7XG4gICAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IHRoaXMucmFuZG9tTm9ybWFsVGlsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBDZWxsIHtcbiAgICBpZiAoIXRoaXMuaW5Cb3VuZHMoeCwgeSkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLmdyaWRbeF1beV07XG4gIH1cblxuICBwdWJsaWMgc2V0KHg6IG51bWJlciwgeTogbnVtYmVyLCB2YWx1ZTogQ2VsbCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pbkJvdW5kcyh4LCB5KSkgcmV0dXJuO1xuICAgIHRoaXMuZ3JpZFt4XVt5XSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGFwcGx5Q2xpY2soeDogbnVtYmVyLCB5OiBudW1iZXIpOiBUdXJuUmVzdWx0IHwgbnVsbCB7XG4gICAgaWYgKCF0aGlzLmluQm91bmRzKHgsIHkpKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWRbeF1beV07XG4gICAgaWYgKGNlbGwgPT09IG51bGwpIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGNlbGwua2luZCA9PT0gXCJzcGVjaWFsXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLmFwcGx5U3BlY2lhbEVmZmVjdCh7IHgsIHkgfSwgY2VsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlOb3JtYWxHcm91cCh7IHgsIHkgfSwgY2VsbC5jb2xvcik7XG4gIH1cblxuICBwdWJsaWMgaGFzQW55TW92ZXMoKTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5jb25maWcucm93czsgeSsrKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzLmdyaWRbeF1beV07XG4gICAgICAgIGlmICh0ICYmIHQua2luZCA9PT0gXCJzcGVjaWFsXCIpIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHZpc2l0ZWQgPSB0aGlzLm1ha2VWaXNpdGVkKCk7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5jb25maWcucm93czsgeSsrKSB7XG4gICAgICAgIGlmICh2aXNpdGVkW3hdW3ldKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgdCA9IHRoaXMuZ3JpZFt4XVt5XTtcbiAgICAgICAgaWYgKCF0IHx8IHQua2luZCAhPT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIHZpc2l0ZWRbeF1beV0gPSB0cnVlO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RhY2s6IFZlYzJpW10gPSBbeyB4LCB5IH1dO1xuICAgICAgICB2aXNpdGVkW3hdW3ldID0gdHJ1ZTtcbiAgICAgICAgbGV0IHNpemUgPSAwO1xuXG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBwID0gc3RhY2sucG9wKCkhO1xuICAgICAgICAgIHNpemUrKztcbiAgICAgICAgICBpZiAoc2l6ZSA+PSB0aGlzLnJ1bGVzLm1pbkdyb3VwU2l6ZSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IG4gb2YgdGhpcy5uZWlnaGJvcnM0KHAueCwgcC55KSkge1xuICAgICAgICAgICAgaWYgKHZpc2l0ZWRbbi54XVtuLnldKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHRuID0gdGhpcy5ncmlkW24ueF1bbi55XTtcbiAgICAgICAgICAgIGlmICghdG4gfHwgdG4ua2luZCAhPT0gXCJub3JtYWxcIiB8fCB0bi5jb2xvciAhPT0gdC5jb2xvcikgY29udGludWU7XG5cbiAgICAgICAgICAgIHZpc2l0ZWRbbi54XVtuLnldID0gdHJ1ZTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHNodWZmbGUoKTogU2h1ZmZsZVJlc3VsdCB7XG4gICAgY29uc3QgdGlsZXM6IFRpbGVbXSA9IFtdO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5jb25maWcuY29sczsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuY29uZmlnLnJvd3M7IHkrKykge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy5ncmlkW3hdW3ldO1xuICAgICAgICBpZiAodCkgdGlsZXMucHVzaCh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gdGlsZXMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgY29uc3QgaiA9IHRoaXMucm5nLm5leHRJbnQoaSArIDEpO1xuICAgICAgY29uc3QgdG1wID0gdGlsZXNbaV07XG4gICAgICB0aWxlc1tpXSA9IHRpbGVzW2pdO1xuICAgICAgdGlsZXNbal0gPSB0bXA7XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlczogeyBhdDogVmVjMmk7IHRpbGU6IFRpbGUgfVtdID0gW107XG4gICAgbGV0IGlkeCA9IDA7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5jb25maWcucm93czsgeSsrKSB7XG4gICAgICAgIGlmICghdGhpcy5ncmlkW3hdW3ldKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgbmV3VGlsZSA9IHRpbGVzW2lkeCsrXTtcbiAgICAgICAgdGhpcy5ncmlkW3hdW3ldID0gbmV3VGlsZTtcbiAgICAgICAgY2hhbmdlcy5wdXNoKHsgYXQ6IHsgeCwgeSB9LCB0aWxlOiBuZXdUaWxlIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IGNoYW5nZXMgfTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseUJvbWJFZmZlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHJhZGl1czogbnVtYmVyKTogVHVyblJlc3VsdCB8IG51bGwge1xuICAgIGlmICghdGhpcy5pbkJvdW5kcyh4LCB5KSkgcmV0dXJuIG51bGw7XG4gICAgXG4gICAgY29uc3QgdG9SZW1vdmU6IFZlYzJpW10gPSBbXTtcbiAgICBmb3IgKGxldCBkeCA9IC1yYWRpdXM7IGR4IDw9IHJhZGl1czsgZHgrKykge1xuICAgICAgZm9yIChsZXQgZHkgPSAtcmFkaXVzOyBkeSA8PSByYWRpdXM7IGR5KyspIHtcbiAgICAgICAgY29uc3QgcHggPSB4ICsgZHg7XG4gICAgICAgIGNvbnN0IHB5ID0geSArIGR5O1xuICAgICAgICBpZiAodGhpcy5pbkJvdW5kcyhweCwgcHkpICYmIHRoaXMuZ3JpZFtweF1bcHldICE9PSBudWxsKSB7XG4gICAgICAgICAgdG9SZW1vdmUucHVzaCh7IHg6IHB4LCB5OiBweSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpZiAodG9SZW1vdmUubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHAgb2YgdG9SZW1vdmUpIHtcbiAgICAgIHRoaXMuZ3JpZFtwLnhdW3AueV0gPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdGhpcy5hcHBseUdyYXZpdHlBbmRTcGF3bih0b1JlbW92ZSwgdG9SZW1vdmUubGVuZ3RoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlOb3JtYWxHcm91cChjbGljazogVmVjMmksIGNvbG9yOiBudW1iZXIpOiBUdXJuUmVzdWx0IHwgbnVsbCB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdldE5vcm1hbEdyb3VwKGNsaWNrLngsIGNsaWNrLnksIGNvbG9yKTtcbiAgICBpZiAoZ3JvdXAubGVuZ3RoIDwgdGhpcy5ydWxlcy5taW5Hcm91cFNpemUpIHJldHVybiBudWxsO1xuXG4gICAgZm9yIChjb25zdCBwIG9mIGdyb3VwKSB7XG4gICAgICB0aGlzLmdyaWRbcC54XVtwLnldID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzaG91bGRDcmVhdGVTcGVjaWFsID0gZ3JvdXAubGVuZ3RoID49IDU7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlHcmF2aXR5QW5kU3Bhd24oZ3JvdXAsIGdyb3VwLmxlbmd0aCwgc2hvdWxkQ3JlYXRlU3BlY2lhbCA/IGNsaWNrIDogbnVsbCwgc2hvdWxkQ3JlYXRlU3BlY2lhbCA/IGdyb3VwLmxlbmd0aCA6IDApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROb3JtYWxHcm91cChzdGFydFg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIGNvbG9yOiBudW1iZXIpOiBWZWMyaVtdIHtcbiAgICBjb25zdCB0MCA9IHRoaXMuZ3JpZFtzdGFydFhdW3N0YXJ0WV07XG4gICAgaWYgKCF0MCB8fCB0MC5raW5kICE9PSBcIm5vcm1hbFwiIHx8IHQwLmNvbG9yICE9PSBjb2xvcikgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgdmlzaXRlZCA9IHRoaXMubWFrZVZpc2l0ZWQoKTtcbiAgICBjb25zdCBzdGFjazogVmVjMmlbXSA9IFt7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH1dO1xuICAgIGNvbnN0IGdyb3VwOiBWZWMyaVtdID0gW107XG4gICAgdmlzaXRlZFtzdGFydFhdW3N0YXJ0WV0gPSB0cnVlO1xuXG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgY29uc3QgcCA9IHN0YWNrLnBvcCgpITtcbiAgICAgIGdyb3VwLnB1c2gocCk7XG5cbiAgICAgIGZvciAoY29uc3QgbiBvZiB0aGlzLm5laWdoYm9yczQocC54LCBwLnkpKSB7XG4gICAgICAgIGlmICh2aXNpdGVkW24ueF1bbi55XSkgY29udGludWU7XG4gICAgICAgIGNvbnN0IHRuID0gdGhpcy5ncmlkW24ueF1bbi55XTtcbiAgICAgICAgaWYgKCF0biB8fCB0bi5raW5kICE9PSBcIm5vcm1hbFwiIHx8IHRuLmNvbG9yICE9PSBjb2xvcikgY29udGludWU7XG5cbiAgICAgICAgdmlzaXRlZFtuLnhdW24ueV0gPSB0cnVlO1xuICAgICAgICBzdGFjay5wdXNoKG4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlTcGVjaWFsRWZmZWN0KHBvczogVmVjMmksIHRpbGU6IFRpbGUgJiB7IGtpbmQ6IFwic3BlY2lhbFwiIH0pOiBUdXJuUmVzdWx0IHwgbnVsbCB7XG4gICAgY29uc3QgdG9SZW1vdmUgPSB0aGlzLmNvbXB1dGVFZmZlY3RBcmVhKHBvcywgdGlsZSk7XG5cbiAgICBpZiAodG9SZW1vdmUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHAgb2YgdG9SZW1vdmUpIHtcbiAgICAgIHRoaXMuZ3JpZFtwLnhdW3AueV0gPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuYXBwbHlHcmF2aXR5QW5kU3Bhd24odG9SZW1vdmUsIHRvUmVtb3ZlLmxlbmd0aCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgY29tcHV0ZUVmZmVjdEFyZWEocG9zOiBWZWMyaSwgdGlsZTogVGlsZSAmIHsga2luZDogXCJzcGVjaWFsXCIgfSk6IFZlYzJpW10ge1xuICAgIGNvbnN0IGN1cnJlbnRUaWxlID0gdGhpcy5ncmlkW3Bvcy54XVtwb3MueV07XG4gICAgaWYgKCFjdXJyZW50VGlsZSB8fCBjdXJyZW50VGlsZS5raW5kICE9PSBcInNwZWNpYWxcIikge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdDogVmVjMmlbXSA9IFtdO1xuICAgIGNvbnN0IGFkZGVkID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgXG4gICAgY29uc3QgYWRkID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaW5Cb3VuZHMoeCwgeSkpIHJldHVybjtcbiAgICAgIGNvbnN0IGMgPSB0aGlzLmdyaWRbeF1beV07XG4gICAgICBpZiAoIWMpIHJldHVybjtcbiAgICAgIGNvbnN0IGtleSA9IGAke3h9XyR7eX1gO1xuICAgICAgaWYgKGFkZGVkLmhhcyhrZXkpKSByZXR1cm47XG4gICAgICBhZGRlZC5hZGQoa2V5KTtcbiAgICAgIHJlc3VsdC5wdXNoKHsgeCwgeSB9KTtcbiAgICB9O1xuXG4gICAgYWRkKHBvcy54LCBwb3MueSk7XG5cbiAgICBzd2l0Y2ggKHRpbGUuZWZmZWN0KSB7XG4gICAgICBjYXNlIFNwZWNpYWxFZmZlY3QuQ2xlYXJSb3c6IHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgICAgICBhZGQoeCwgcG9zLnkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBTcGVjaWFsRWZmZWN0LkNsZWFyQ29sdW1uOiB7XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5jb25maWcucm93czsgeSsrKSB7XG4gICAgICAgICAgYWRkKHBvcy54LCB5KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgU3BlY2lhbEVmZmVjdC5Cb21iUmFkaXVzOiB7XG4gICAgICAgIGNvbnN0IFIgPSB0aWxlLnJhZGl1cyA/PyB0aGlzLnJ1bGVzLmJvbWJSYWRpdXM7XG4gICAgICAgIGZvciAobGV0IGR4ID0gLVI7IGR4IDw9IFI7IGR4KyspIHtcbiAgICAgICAgICBmb3IgKGxldCBkeSA9IC1SOyBkeSA8PSBSOyBkeSsrKSB7XG4gICAgICAgICAgICBhZGQocG9zLnggKyBkeCwgcG9zLnkgKyBkeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBTcGVjaWFsRWZmZWN0LkNsZWFyQm9hcmQ6IHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuY29uZmlnLnJvd3M7IHkrKykge1xuICAgICAgICAgICAgYWRkKHgsIHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUdyYXZpdHlBbmRTcGF3bihyZW1vdmVkOiBWZWMyaVtdLCBncm91cFNpemU6IG51bWJlciwgY3JlYXRlU3BlY2lhbEF0OiBWZWMyaSB8IG51bGwgPSBudWxsLCBzcGVjaWFsR3JvdXBTaXplOiBudW1iZXIgPSAwKTogVHVyblJlc3VsdCB7XG4gICAgY29uc3QgbW92ZXM6IE1vdmVDb21tYW5kW10gPSBbXTtcbiAgICBjb25zdCBzcGF3bnM6IFNwYXduQ29tbWFuZFtdID0gW107XG4gICAgY29uc3QgdGlsZVVwZGF0ZXM6IHsgYXQ6IFZlYzJpOyB0aWxlOiBUaWxlIH1bXSA9IFtdO1xuICAgIGxldCBzcGVjaWFsWSA9IC0xO1xuXG4gICAgaWYgKGNyZWF0ZVNwZWNpYWxBdCAmJiBzcGVjaWFsR3JvdXBTaXplID4gMCkge1xuICAgICAgY29uc3QgY2xpY2tYID0gY3JlYXRlU3BlY2lhbEF0Lng7XG4gICAgICBjb25zdCBjbGlja1kgPSBjcmVhdGVTcGVjaWFsQXQueTtcbiAgICAgIFxuICAgICAgbGV0IHRpbGVzQWJvdmUgPSAwO1xuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBjbGlja1k7IHkrKykge1xuICAgICAgICBpZiAodGhpcy5ncmlkW2NsaWNrWF1beV0gIT09IG51bGwpIHtcbiAgICAgICAgICB0aWxlc0Fib3ZlKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNwZWNpYWxZID0gdGlsZXNBYm92ZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuY29uZmlnLmNvbHM7IHgrKykge1xuICAgICAgY29uc3QgbmV3Q29sOiBDZWxsW10gPSBuZXcgQXJyYXkodGhpcy5jb25maWcucm93cykuZmlsbChudWxsKTtcblxuICAgICAgbGV0IHdyaXRlWSA9IDA7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuY29uZmlnLnJvd3M7IHkrKykge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy5ncmlkW3hdW3ldO1xuICAgICAgICBpZiAoIXQpIGNvbnRpbnVlO1xuXG4gICAgICAgIG5ld0NvbFt3cml0ZVldID0gdDtcblxuICAgICAgICBpZiAod3JpdGVZICE9PSB5KSB7XG4gICAgICAgICAgbW92ZXMucHVzaCh7IGZyb206IHsgeCwgeSB9LCB0bzogeyB4LCB5OiB3cml0ZVkgfSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdyaXRlWSsrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpc1NwZWNpYWxDb2wgPSBjcmVhdGVTcGVjaWFsQXQgJiYgY3JlYXRlU3BlY2lhbEF0LnggPT09IHggJiYgc3BlY2lhbEdyb3VwU2l6ZSA+IDA7XG5cbiAgICAgIGxldCBzcGF3bkluZGV4ID0gMDtcbiAgICAgIGZvciAobGV0IHkgPSB3cml0ZVk7IHkgPCB0aGlzLmNvbmZpZy5yb3dzOyB5KyspIHtcbiAgICAgICAgaWYgKGlzU3BlY2lhbENvbCAmJiB5ID09PSBzcGVjaWFsWSAmJiBzcGVjaWFsWSA+PSB3cml0ZVkpIHtcbiAgICAgICAgICBjb25zdCBlZmZlY3REYXRhID0gdGhpcy5zZWxlY3RTcGVjaWFsRWZmZWN0QnlHcm91cFNpemUoc3BlY2lhbEdyb3VwU2l6ZSk7XG4gICAgICAgICAgY29uc3Qgc3BlY2lhbFRpbGU6IFRpbGUgPSBlZmZlY3REYXRhLnJhZGl1cyAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHsga2luZDogXCJzcGVjaWFsXCIsIGVmZmVjdDogZWZmZWN0RGF0YS5lZmZlY3QsIHJhZGl1czogZWZmZWN0RGF0YS5yYWRpdXMgfVxuICAgICAgICAgICAgOiB7IGtpbmQ6IFwic3BlY2lhbFwiLCBlZmZlY3Q6IGVmZmVjdERhdGEuZWZmZWN0IH07XG4gICAgICAgICAgXG4gICAgICAgICAgbmV3Q29sW3ldID0gc3BlY2lhbFRpbGU7XG4gICAgICAgICAgXG4gICAgICAgICAgc3Bhd25zLnB1c2goe1xuICAgICAgICAgICAgdG86IHsgeCwgeSB9LFxuICAgICAgICAgICAgdGlsZTogc3BlY2lhbFRpbGUsXG4gICAgICAgICAgICBmcm9tWTogdGhpcy5jb25maWcucm93cyArIHNwYXduSW5kZXggKyAzLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIFxuICAgICAgICAgIHNwYXduSW5kZXgrKztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgdGlsZSA9IHRoaXMucmFuZG9tTm9ybWFsVGlsZSgpO1xuICAgICAgICBuZXdDb2xbeV0gPSB0aWxlO1xuXG4gICAgICAgIHNwYXducy5wdXNoKHtcbiAgICAgICAgICB0bzogeyB4LCB5IH0sXG4gICAgICAgICAgdGlsZSxcbiAgICAgICAgICBmcm9tWTogdGhpcy5jb25maWcucm93cyArIHNwYXduSW5kZXggKyAzLFxuICAgICAgICB9KTtcblxuICAgICAgICBzcGF3bkluZGV4Kys7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1NwZWNpYWxDb2wgJiYgc3BlY2lhbFkgPj0gMCAmJiBzcGVjaWFsWSA8IHRoaXMuY29uZmlnLnJvd3MgJiYgc3BlY2lhbFkgPCB3cml0ZVkpIHtcbiAgICAgICAgaWYgKG5ld0NvbFtzcGVjaWFsWV0gIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBlZmZlY3REYXRhID0gdGhpcy5zZWxlY3RTcGVjaWFsRWZmZWN0QnlHcm91cFNpemUoc3BlY2lhbEdyb3VwU2l6ZSk7XG4gICAgICAgICAgY29uc3Qgc3BlY2lhbFRpbGU6IFRpbGUgPSBlZmZlY3REYXRhLnJhZGl1cyAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHsga2luZDogXCJzcGVjaWFsXCIsIGVmZmVjdDogZWZmZWN0RGF0YS5lZmZlY3QsIHJhZGl1czogZWZmZWN0RGF0YS5yYWRpdXMgfVxuICAgICAgICAgICAgOiB7IGtpbmQ6IFwic3BlY2lhbFwiLCBlZmZlY3Q6IGVmZmVjdERhdGEuZWZmZWN0IH07XG5cbiAgICAgICAgICBuZXdDb2xbc3BlY2lhbFldID0gc3BlY2lhbFRpbGU7XG5cbiAgICAgICAgICB0aWxlVXBkYXRlcy5wdXNoKHtcbiAgICAgICAgICAgIGF0OiB7IHgsIHk6IHNwZWNpYWxZIH0sXG4gICAgICAgICAgICB0aWxlOiBzcGVjaWFsVGlsZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5jb25maWcucm93czsgeSsrKSB7XG4gICAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IG5ld0NvbFt5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyByZW1vdmVkLCBtb3Zlcywgc3Bhd25zLCB0aWxlVXBkYXRlczogdGlsZVVwZGF0ZXMubGVuZ3RoID4gMCA/IHRpbGVVcGRhdGVzIDogdW5kZWZpbmVkLCBncm91cFNpemUgfTtcbiAgfVxuXG4gIHByaXZhdGUgcmFuZG9tTm9ybWFsVGlsZSgpOiBUaWxlIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMucm5nLm5leHRJbnQodGhpcy5jb25maWcuY29sb3JzQ291bnQpO1xuICAgIHJldHVybiB7IGtpbmQ6IFwibm9ybWFsXCIsIGNvbG9yIH07XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdFNwZWNpYWxFZmZlY3RCeUdyb3VwU2l6ZShncm91cFNpemU6IG51bWJlcik6IHsgZWZmZWN0OiBTcGVjaWFsRWZmZWN0OyByYWRpdXM/OiBudW1iZXIgfSB7XG4gICAgaWYgKGdyb3VwU2l6ZSA+PSA1ICYmIGdyb3VwU2l6ZSA8PSA2KSB7XG4gICAgICBjb25zdCBlZmZlY3RzID0gW1NwZWNpYWxFZmZlY3QuQ2xlYXJSb3csIFNwZWNpYWxFZmZlY3QuQ2xlYXJDb2x1bW5dO1xuICAgICAgcmV0dXJuIHsgZWZmZWN0OiBlZmZlY3RzW3RoaXMucm5nLm5leHRJbnQoZWZmZWN0cy5sZW5ndGgpXSB9O1xuICAgIH0gZWxzZSBpZiAoZ3JvdXBTaXplID49IDcgJiYgZ3JvdXBTaXplIDw9IDgpIHtcbiAgICAgIHJldHVybiB7IGVmZmVjdDogU3BlY2lhbEVmZmVjdC5Cb21iUmFkaXVzLCByYWRpdXM6IDEgfTtcbiAgICB9IGVsc2UgaWYgKGdyb3VwU2l6ZSA+PSA5KSB7XG4gICAgICByZXR1cm4geyBlZmZlY3Q6IFNwZWNpYWxFZmZlY3QuQ2xlYXJCb2FyZCB9O1xuICAgIH1cbiAgICByZXR1cm4geyBlZmZlY3Q6IFNwZWNpYWxFZmZlY3QuQ2xlYXJSb3cgfTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEVtcHR5KCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5jb25maWcuY29sczsgeCsrKSB7XG4gICAgICBjb25zdCBjb2w6IENlbGxbXSA9IFtdO1xuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmNvbmZpZy5yb3dzOyB5KyspIGNvbC5wdXNoKG51bGwpO1xuICAgICAgdGhpcy5ncmlkLnB1c2goY29sKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluQm91bmRzKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHggPj0gMCAmJiB4IDwgdGhpcy5jb25maWcuY29scyAmJiB5ID49IDAgJiYgeSA8IHRoaXMuY29uZmlnLnJvd3M7XG4gIH1cblxuICBwcml2YXRlIG5laWdoYm9yczQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBWZWMyaVtdIHtcbiAgICBjb25zdCBvdXQ6IFZlYzJpW10gPSBbXTtcbiAgICBpZiAodGhpcy5pbkJvdW5kcyh4IC0gMSwgeSkpIG91dC5wdXNoKHsgeDogeCAtIDEsIHkgfSk7XG4gICAgaWYgKHRoaXMuaW5Cb3VuZHMoeCArIDEsIHkpKSBvdXQucHVzaCh7IHg6IHggKyAxLCB5IH0pO1xuICAgIGlmICh0aGlzLmluQm91bmRzKHgsIHkgLSAxKSkgb3V0LnB1c2goeyB4LCB5OiB5IC0gMSB9KTtcbiAgICBpZiAodGhpcy5pbkJvdW5kcyh4LCB5ICsgMSkpIG91dC5wdXNoKHsgeCwgeTogeSArIDEgfSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZVZpc2l0ZWQoKTogYm9vbGVhbltdW10ge1xuICAgIGNvbnN0IHZpc2l0ZWQ6IGJvb2xlYW5bXVtdID0gW107XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgIGNvbnN0IGNvbDogYm9vbGVhbltdID0gW107XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuY29uZmlnLnJvd3M7IHkrKykgY29sLnB1c2goZmFsc2UpO1xuICAgICAgdmlzaXRlZC5wdXNoKGNvbCk7XG4gICAgfVxuICAgIHJldHVybiB2aXNpdGVkO1xuICB9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

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
        cc.director.loadScene("MainScene");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdmlldy9NYWluTWVudVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsc0RBQXFEO0FBR3JEO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBMEJDO1FBeEJDLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLGdCQUFVLEdBQWEsSUFBSSxDQUFDOztJQXFCOUIsQ0FBQztJQWxCQyw2QkFBTSxHQUFOO1FBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5RTtRQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyx1Q0FBZ0IsR0FBeEI7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBTSxLQUFLLEdBQUcsMkJBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxnREFBVyxLQUFPLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRU8sa0NBQVcsR0FBbkI7UUFDRSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBdkJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ1M7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDUztJQUxULFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0EwQmhDO0lBQUQsbUJBQUM7Q0ExQkQsQUEwQkMsQ0ExQnlDLEVBQUUsQ0FBQyxTQUFTLEdBMEJyRDtrQkExQm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vdXRpbHMvTGV2ZWxNYW5hZ2VyXCI7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTWVudVZpZXcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICBwbGF5QnV0dG9uOiBjYy5CdXR0b24gPSBudWxsO1xuICBcbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICBsZXZlbExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gIFxuXG4gIG9uTG9hZCgpIHtcbiAgICBpZiAodGhpcy5wbGF5QnV0dG9uKSB7XG4gICAgICB0aGlzLnBsYXlCdXR0b24ubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25QbGF5Q2xpY2ssIHRoaXMpO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLnVwZGF0ZUxldmVsTGFiZWwoKTtcbiAgfVxuICBcbiAgcHJpdmF0ZSB1cGRhdGVMZXZlbExhYmVsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxldmVsTGFiZWwpIHtcbiAgICAgIGNvbnN0IGxldmVsID0gTGV2ZWxNYW5hZ2VyLmdldEN1cnJlbnRMZXZlbCgpO1xuICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9IGDQo9GA0L7QstC10L3RjCAke2xldmVsfWA7XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIG9uUGxheUNsaWNrKCk6IHZvaWQge1xuICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/utils/Rng.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b06f5lIYM1IwqIUD7x7OVRH', 'Rng');
// Script/utils/Rng.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rng = void 0;
var Rng = /** @class */ (function () {
    function Rng() {
    }
    Rng.prototype.nextInt = function (maxExclusive) {
        return Math.floor(Math.random() * maxExclusive);
    };
    return Rng;
}());
exports.Rng = Rng;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdXRpbHMvUm5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFJRSxDQUFDO0lBSFEscUJBQU8sR0FBZCxVQUFlLFlBQW9CO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsWUFBWSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNILFVBQUM7QUFBRCxDQUpGLEFBSUcsSUFBQTtBQUpVLGtCQUFHIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFJuZyB7XG4gICAgcHVibGljIG5leHRJbnQobWF4RXhjbHVzaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heEV4Y2x1c2l2ZSk7XG4gICAgfVxuICB9XG4gICJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/view/TileView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '478c9n2sDtDrLAFkbprk7yY', 'TileView');
// Script/view/TileView.ts

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
var TileView = /** @class */ (function (_super) {
    __extends(TileView, _super);
    function TileView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this.coord = { x: 0, y: 0 };
        _this.tile = { kind: "normal", color: 0 };
        _this.normalFrames = [];
        _this.specialFrames = [];
        _this.clickHandler = null;
        return _this;
    }
    TileView.prototype.onLoad = function () {
        if (!this.sprite)
            this.sprite = this.getComponent(cc.Sprite);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    };
    TileView.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    };
    TileView.prototype.init = function (coord, tile, normalFrames, specialFrames, clickHandler) {
        this.coord = { x: coord.x, y: coord.y };
        this.normalFrames = normalFrames;
        this.specialFrames = specialFrames;
        this.clickHandler = clickHandler;
        this.setTile(tile);
    };
    TileView.prototype.setCoord = function (coord) {
        this.coord = { x: coord.x, y: coord.y };
    };
    TileView.prototype.getCoord = function () {
        return { x: this.coord.x, y: this.coord.y };
    };
    TileView.prototype.setTile = function (tile) {
        var _a, _b;
        this.tile = tile;
        if (!this.sprite)
            this.sprite = this.getComponent(cc.Sprite);
        if (!this.sprite)
            return;
        this.sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        if (tile.kind === "normal") {
            var idx_1 = tile.color;
            var frame_1 = (_a = this.normalFrames[idx_1]) !== null && _a !== void 0 ? _a : this.normalFrames[0];
            if (!frame_1)
                cc.error("[TileView] normalFrames not set");
            this.sprite.spriteFrame = frame_1;
            return;
        }
        var idx = tile.effect;
        var frame = this.specialFrames[idx];
        if (!frame) {
            cc.error("[TileView] specialFrames missing for effect index:", idx);
            this.sprite.spriteFrame = (_b = this.normalFrames[this.normalFrames.length - 1]) !== null && _b !== void 0 ? _b : null;
            return;
        }
        this.sprite.spriteFrame = frame;
    };
    TileView.prototype.onTouchEnd = function () {
        if (!this.clickHandler)
            return;
        this.clickHandler(this.coord.x, this.coord.y);
    };
    __decorate([
        property(cc.Sprite)
    ], TileView.prototype, "sprite", void 0);
    TileView = __decorate([
        ccclass
    ], TileView);
    return TileView;
}(cc.Component));
exports.default = TileView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdmlldy9UaWxlVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQU01QztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQXlFQztRQXZFQyxZQUFNLEdBQWMsSUFBSSxDQUFDO1FBRWpCLFdBQUssR0FBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzlCLFVBQUksR0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBRTFDLGtCQUFZLEdBQXFCLEVBQUUsQ0FBQztRQUNwQyxtQkFBYSxHQUFxQixFQUFFLENBQUM7UUFFckMsa0JBQVksR0FBNEMsSUFBSSxDQUFDOztJQStEdkUsQ0FBQztJQTdEQyx5QkFBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTSx1QkFBSSxHQUFYLFVBQ0UsS0FBWSxFQUNaLElBQVUsRUFDVixZQUE4QixF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c291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbXBvcnQgeyBUaWxlLCBTcGVjaWFsRWZmZWN0IH0gZnJvbSBcIi4uL2NvcmUvVGlsZVwiO1xuaW1wb3J0IHsgVmVjMmkgfSBmcm9tIFwiLi4vY29yZS9WZWMyaVwiO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZVZpZXcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICBzcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgcHJpdmF0ZSBjb29yZDogVmVjMmkgPSB7IHg6IDAsIHk6IDAgfTtcbiAgcHJpdmF0ZSB0aWxlOiBUaWxlID0geyBraW5kOiBcIm5vcm1hbFwiLCBjb2xvcjogMCB9O1xuXG4gIHByaXZhdGUgbm9ybWFsRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gIHByaXZhdGUgc3BlY2lhbEZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gIHByaXZhdGUgY2xpY2tIYW5kbGVyOiAoKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xuXG4gIG9uTG9hZCgpIHtcbiAgICBpZiAoIXRoaXMuc3ByaXRlKSB0aGlzLnNwcml0ZSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcbiAgfVxuXG4gIG9uRGVzdHJveSgpIHtcbiAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0KFxuICAgIGNvb3JkOiBWZWMyaSxcbiAgICB0aWxlOiBUaWxlLFxuICAgIG5vcm1hbEZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSxcbiAgICBzcGVjaWFsRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdLFxuICAgIGNsaWNrSGFuZGxlcjogKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB2b2lkXG4gICk6IHZvaWQge1xuICAgIHRoaXMuY29vcmQgPSB7IHg6IGNvb3JkLngsIHk6IGNvb3JkLnkgfTtcbiAgICB0aGlzLm5vcm1hbEZyYW1lcyA9IG5vcm1hbEZyYW1lcztcbiAgICB0aGlzLnNwZWNpYWxGcmFtZXMgPSBzcGVjaWFsRnJhbWVzO1xuICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gY2xpY2tIYW5kbGVyO1xuXG4gICAgdGhpcy5zZXRUaWxlKHRpbGUpO1xuICB9XG5cbiAgcHVibGljIHNldENvb3JkKGNvb3JkOiBWZWMyaSk6IHZvaWQge1xuICAgIHRoaXMuY29vcmQgPSB7IHg6IGNvb3JkLngsIHk6IGNvb3JkLnkgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb29yZCgpOiBWZWMyaSB7XG4gICAgcmV0dXJuIHsgeDogdGhpcy5jb29yZC54LCB5OiB0aGlzLmNvb3JkLnkgfTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRUaWxlKHRpbGU6IFRpbGUpOiB2b2lkIHtcbiAgICB0aGlzLnRpbGUgPSB0aWxlO1xuICAgIGlmICghdGhpcy5zcHJpdGUpIHRoaXMuc3ByaXRlID0gdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICBpZiAoIXRoaXMuc3ByaXRlKSByZXR1cm47XG5cbiAgICB0aGlzLnNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XG5cbiAgICBpZiAodGlsZS5raW5kID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICBjb25zdCBpZHggPSB0aWxlLmNvbG9yO1xuICAgICAgY29uc3QgZnJhbWUgPSB0aGlzLm5vcm1hbEZyYW1lc1tpZHhdID8/IHRoaXMubm9ybWFsRnJhbWVzWzBdO1xuICAgICAgaWYgKCFmcmFtZSkgY2MuZXJyb3IoXCJbVGlsZVZpZXddIG5vcm1hbEZyYW1lcyBub3Qgc2V0XCIpO1xuICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSBmcmFtZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpZHggPSB0aWxlLmVmZmVjdCBhcyBudW1iZXI7XG4gICAgY29uc3QgZnJhbWUgPSB0aGlzLnNwZWNpYWxGcmFtZXNbaWR4XTtcbiAgICBpZiAoIWZyYW1lKSB7XG4gICAgICBjYy5lcnJvcihcIltUaWxlVmlld10gc3BlY2lhbEZyYW1lcyBtaXNzaW5nIGZvciBlZmZlY3QgaW5kZXg6XCIsIGlkeCk7XG4gICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMubm9ybWFsRnJhbWVzW3RoaXMubm9ybWFsRnJhbWVzLmxlbmd0aCAtIDFdID8/IG51bGw7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gZnJhbWU7XG4gIH1cblxuICBwcml2YXRlIG9uVG91Y2hFbmQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNsaWNrSGFuZGxlcikgcmV0dXJuO1xuICAgIHRoaXMuY2xpY2tIYW5kbGVyKHRoaXMuY29vcmQueCwgdGhpcy5jb29yZC55KTtcbiAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/view/PopupView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '01feapoOtlPLLFAsRvqveL1', 'PopupView');
// Script/view/PopupView.ts

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
var PopupView = /** @class */ (function (_super) {
    __extends(PopupView, _super);
    function PopupView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.messageLabel = null;
        _this.levelLabel = null;
        _this.nextLevelButton = null;
        _this.restartButton = null;
        _this.onNextLevelCallback = null;
        _this.onRestartCallback = null;
        return _this;
    }
    PopupView.prototype.onLoad = function () {
        this.setupButtons();
    };
    PopupView.prototype.setupButtons = function () {
        var _this = this;
        if (this.nextLevelButton && this.nextLevelButton.node) {
            this.nextLevelButton.node.off(cc.Node.EventType.TOUCH_END);
            this.nextLevelButton.node.on(cc.Node.EventType.TOUCH_END, function () {
                if (_this.onNextLevelCallback) {
                    _this.onNextLevelCallback();
                }
            }, this);
        }
        if (this.restartButton && this.restartButton.node) {
            this.restartButton.node.off(cc.Node.EventType.TOUCH_END);
            this.restartButton.node.on(cc.Node.EventType.TOUCH_END, function () {
                if (_this.onRestartCallback) {
                    _this.onRestartCallback();
                }
            }, this);
        }
    };
    PopupView.prototype.onDestroy = function () {
        if (this.nextLevelButton && this.nextLevelButton.node) {
            this.nextLevelButton.node.off(cc.Node.EventType.TOUCH_END);
        }
        if (this.restartButton && this.restartButton.node) {
            this.restartButton.node.off(cc.Node.EventType.TOUCH_END);
        }
    };
    PopupView.prototype.show = function (message, showNextLevel, onNextLevel, showRestart, onRestart, level, levelLabelText) {
        if (showNextLevel === void 0) { showNextLevel = false; }
        if (showRestart === void 0) { showRestart = false; }
        this.node.active = true;
        if (this.messageLabel)
            this.messageLabel.string = message;
        if (this.levelLabel && level !== undefined) {
            var labelText = levelLabelText || "\u0423\u0440\u043E\u0432\u0435\u043D\u044C " + level;
            this.levelLabel.string = labelText;
        }
        this.onNextLevelCallback = onNextLevel || null;
        this.onRestartCallback = onRestart || null;
        if (this.nextLevelButton) {
            this.nextLevelButton.node.active = showNextLevel;
            this.nextLevelButton.interactable = showNextLevel;
        }
        if (this.restartButton) {
            this.restartButton.node.active = showRestart;
            this.restartButton.interactable = showRestart;
        }
        this.setupButtons();
    };
    PopupView.prototype.hide = function () {
        this.node.active = false;
        if (this.nextLevelButton) {
            this.nextLevelButton.node.active = false;
        }
        if (this.restartButton) {
            this.restartButton.node.active = false;
        }
        this.onNextLevelCallback = null;
        this.onRestartCallback = null;
    };
    __decorate([
        property(cc.Label)
    ], PopupView.prototype, "messageLabel", void 0);
    __decorate([
        property(cc.Label)
    ], PopupView.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.Button)
    ], PopupView.prototype, "nextLevelButton", void 0);
    __decorate([
        property(cc.Button)
    ], PopupView.prototype, "restartButton", void 0);
    PopupView = __decorate([
        ccclass
    ], PopupView);
    return PopupView;
}(cc.Component));
exports.default = PopupView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdmlldy9Qb3B1cFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUE4RUM7UUE3RXFCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBQzlCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBQzNCLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBQ2xDLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBRTdDLHlCQUFtQixHQUF3QixJQUFJLENBQUM7UUFDaEQsdUJBQWlCLEdBQXdCLElBQUksQ0FBQzs7SUF1RXhELENBQUM7SUFyRUMsMEJBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sZ0NBQVksR0FBcEI7UUFBQSxpQkFrQkM7UUFqQkMsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFO1lBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO2dCQUN4RCxJQUFJLEtBQUksQ0FBQyxtQkFBbUIsRUFBRTtvQkFDNUIsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7aUJBQzVCO1lBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDakQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3RELElBQUksS0FBSSxDQUFDLGlCQUFpQixFQUFFO29CQUMxQixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztpQkFDMUI7WUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDVjtJQUNILENBQUM7SUFFRCw2QkFBUyxHQUFUO1FBQ0UsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFO1lBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRTtZQUNqRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDMUQ7SUFDSCxDQUFDO0lBRU0sd0JBQUksR0FBWCxVQUFZLE9BQWUsRUFBRSxhQUE4QixFQUFFLFdBQXdCLEVBQUUsV0FBNEIsRUFBRSxTQUFzQixFQUFFLEtBQWMsRUFBRSxjQUF1QjtRQUF2Siw4QkFBQSxFQUFBLHFCQUE4QjtRQUE0Qiw0QkFBQSxFQUFBLG1CQUE0QjtRQUNqSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUUxRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUMxQyxJQUFNLFNBQVMsR0FBRyxjQUFjLElBQUksZ0RBQVcsS0FBTyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztTQUNwQztRQUVELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxXQUFXLElBQUksSUFBSSxDQUFDO1FBQy9DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDO1FBRTNDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO1lBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQztTQUNuRDtRQUVELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1lBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztTQUMvQztRQUVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU0sd0JBQUksR0FBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUMxQztRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUE1RW1CO1FBQW5CLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUErQjtJQUM5QjtRQUFuQixRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFBNkI7SUFDM0I7UUFBcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQW1DO0lBQ2xDO1FBQXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUFpQztJQUpsQyxTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBOEU3QjtJQUFELGdCQUFDO0NBOUVELEFBOEVDLENBOUVzQyxFQUFFLENBQUMsU0FBUyxHQThFbEQ7a0JBOUVvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gIEBwcm9wZXJ0eShjYy5MYWJlbCkgbWVzc2FnZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gIEBwcm9wZXJ0eShjYy5MYWJlbCkgbGV2ZWxMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICBAcHJvcGVydHkoY2MuQnV0dG9uKSBuZXh0TGV2ZWxCdXR0b246IGNjLkJ1dHRvbiA9IG51bGw7XG4gIEBwcm9wZXJ0eShjYy5CdXR0b24pIHJlc3RhcnRCdXR0b246IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgcHJpdmF0ZSBvbk5leHRMZXZlbENhbGxiYWNrOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBvblJlc3RhcnRDYWxsYmFjazogKCgpID0+IHZvaWQpIHwgbnVsbCA9IG51bGw7XG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuc2V0dXBCdXR0b25zKCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwQnV0dG9ucygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uZXh0TGV2ZWxCdXR0b24gJiYgdGhpcy5uZXh0TGV2ZWxCdXR0b24ubm9kZSkge1xuICAgICAgdGhpcy5uZXh0TGV2ZWxCdXR0b24ubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EKTtcbiAgICAgIHRoaXMubmV4dExldmVsQnV0dG9uLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9uTmV4dExldmVsQ2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzLm9uTmV4dExldmVsQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVzdGFydEJ1dHRvbiAmJiB0aGlzLnJlc3RhcnRCdXR0b24ubm9kZSkge1xuICAgICAgdGhpcy5yZXN0YXJ0QnV0dG9uLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCk7XG4gICAgICB0aGlzLnJlc3RhcnRCdXR0b24ubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub25SZXN0YXJ0Q2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzLm9uUmVzdGFydENhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG9uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5uZXh0TGV2ZWxCdXR0b24gJiYgdGhpcy5uZXh0TGV2ZWxCdXR0b24ubm9kZSkge1xuICAgICAgdGhpcy5uZXh0TGV2ZWxCdXR0b24ubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVzdGFydEJ1dHRvbiAmJiB0aGlzLnJlc3RhcnRCdXR0b24ubm9kZSkge1xuICAgICAgdGhpcy5yZXN0YXJ0QnV0dG9uLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNob3cobWVzc2FnZTogc3RyaW5nLCBzaG93TmV4dExldmVsOiBib29sZWFuID0gZmFsc2UsIG9uTmV4dExldmVsPzogKCkgPT4gdm9pZCwgc2hvd1Jlc3RhcnQ6IGJvb2xlYW4gPSBmYWxzZSwgb25SZXN0YXJ0PzogKCkgPT4gdm9pZCwgbGV2ZWw/OiBudW1iZXIsIGxldmVsTGFiZWxUZXh0Pzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgaWYgKHRoaXMubWVzc2FnZUxhYmVsKSB0aGlzLm1lc3NhZ2VMYWJlbC5zdHJpbmcgPSBtZXNzYWdlO1xuXG4gICAgaWYgKHRoaXMubGV2ZWxMYWJlbCAmJiBsZXZlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBsYWJlbFRleHQgPSBsZXZlbExhYmVsVGV4dCB8fCBg0KPRgNC+0LLQtdC90YwgJHtsZXZlbH1gO1xuICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9IGxhYmVsVGV4dDtcbiAgICB9XG5cbiAgICB0aGlzLm9uTmV4dExldmVsQ2FsbGJhY2sgPSBvbk5leHRMZXZlbCB8fCBudWxsO1xuICAgIHRoaXMub25SZXN0YXJ0Q2FsbGJhY2sgPSBvblJlc3RhcnQgfHwgbnVsbDtcblxuICAgIGlmICh0aGlzLm5leHRMZXZlbEJ1dHRvbikge1xuICAgICAgdGhpcy5uZXh0TGV2ZWxCdXR0b24ubm9kZS5hY3RpdmUgPSBzaG93TmV4dExldmVsO1xuICAgICAgdGhpcy5uZXh0TGV2ZWxCdXR0b24uaW50ZXJhY3RhYmxlID0gc2hvd05leHRMZXZlbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZXN0YXJ0QnV0dG9uKSB7XG4gICAgICB0aGlzLnJlc3RhcnRCdXR0b24ubm9kZS5hY3RpdmUgPSBzaG93UmVzdGFydDtcbiAgICAgIHRoaXMucmVzdGFydEJ1dHRvbi5pbnRlcmFjdGFibGUgPSBzaG93UmVzdGFydDtcbiAgICB9XG5cbiAgICB0aGlzLnNldHVwQnV0dG9ucygpO1xuICB9XG5cbiAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLm5leHRMZXZlbEJ1dHRvbikge1xuICAgICAgdGhpcy5uZXh0TGV2ZWxCdXR0b24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVzdGFydEJ1dHRvbikge1xuICAgICAgdGhpcy5yZXN0YXJ0QnV0dG9uLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMub25OZXh0TGV2ZWxDYWxsYmFjayA9IG51bGw7XG4gICAgdGhpcy5vblJlc3RhcnRDYWxsYmFjayA9IG51bGw7XG4gIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/core/TurnResult.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ac0f8zOjbpECou+GZ4GKZgF', 'TurnResult');
// Script/core/TurnResult.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29yZS9UdXJuUmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaWxlIH0gZnJvbSBcIi4vVGlsZVwiO1xuaW1wb3J0IHsgVmVjMmkgfSBmcm9tIFwiLi9WZWMyaVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vdmVDb21tYW5kIHtcbiAgZnJvbTogVmVjMmk7XG4gIHRvOiBWZWMyaTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTcGF3bkNvbW1hbmQge1xuICB0bzogVmVjMmk7XG4gIHRpbGU6IFRpbGU7XG4gIGZyb21ZOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGlsZVVwZGF0ZUNvbW1hbmQge1xuICBhdDogVmVjMmk7XG4gIHRpbGU6IFRpbGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHVyblJlc3VsdCB7XG4gIHJlbW92ZWQ6IFZlYzJpW107XG4gIG1vdmVzOiBNb3ZlQ29tbWFuZFtdO1xuICBzcGF3bnM6IFNwYXduQ29tbWFuZFtdO1xuICB0aWxlVXBkYXRlcz86IFRpbGVVcGRhdGVDb21tYW5kW107XG4gIGdyb3VwU2l6ZTogbnVtYmVyO1xufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/core/GameConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70900S2StNMVr2xDRuZbXTT', 'GameConfig');
// Script/core/GameConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultConfig = void 0;
exports.DefaultConfig = {
    cols: 8,
    rows: 10,
    colorsCount: 5,
    goalScore: 500,
    movesLimit: 20,
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29yZS9HYW1lQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFlLFFBQUEsYUFBYSxHQUFlO0lBQ3ZDLElBQUksRUFBRSxDQUFDO0lBQ1AsSUFBSSxFQUFFLEVBQUU7SUFDUixXQUFXLEVBQUUsQ0FBQztJQUNkLFNBQVMsRUFBRSxHQUFHO0lBQ2QsVUFBVSxFQUFFLEVBQUU7Q0FDZixDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBHYW1lQ29uZmlnIHtcbiAgY29sczogbnVtYmVyO1xuICByb3dzOiBudW1iZXI7XG4gIGNvbG9yc0NvdW50OiBudW1iZXI7XG4gIGdvYWxTY29yZTogbnVtYmVyO1xuICBtb3Zlc0xpbWl0OiBudW1iZXI7XG59XG4gIFxuICBleHBvcnQgY29uc3QgRGVmYXVsdENvbmZpZzogR2FtZUNvbmZpZyA9IHtcbiAgICBjb2xzOiA4LFxuICAgIHJvd3M6IDEwLFxuICAgIGNvbG9yc0NvdW50OiA1LFxuICAgIGdvYWxTY29yZTogNTAwLFxuICAgIG1vdmVzTGltaXQ6IDIwLFxuICB9OyJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/core/TileType.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8c79aUR7eBCiasNx11fhgn+', 'TileType');
// Script/core/TileType.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileType = void 0;
var TileType;
(function (TileType) {
    TileType[TileType["Color0"] = 0] = "Color0";
    TileType[TileType["Color1"] = 1] = "Color1";
    TileType[TileType["Color2"] = 2] = "Color2";
    TileType[TileType["Color3"] = 3] = "Color3";
    TileType[TileType["Color4"] = 4] = "Color4";
})(TileType = exports.TileType || (exports.TileType = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29yZS9UaWxlVHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFZLFFBTVQ7QUFOSCxXQUFZLFFBQVE7SUFDaEIsMkNBQVUsQ0FBQTtJQUNWLDJDQUFVLENBQUE7SUFDViwyQ0FBVSxDQUFBO0lBQ1YsMkNBQVUsQ0FBQTtJQUNWLDJDQUFVLENBQUE7QUFDWixDQUFDLEVBTlMsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFNakIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBUaWxlVHlwZSB7XG4gICAgQ29sb3IwID0gMCxcbiAgICBDb2xvcjEgPSAxLFxuICAgIENvbG9yMiA9IDIsXG4gICAgQ29sb3IzID0gMyxcbiAgICBDb2xvcjQgPSA0LFxuICB9Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/view/BoardView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ef4de4POndM4pyzaVHxWfdj', 'BoardView');
// Script/view/BoardView.ts

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
var Vec2i_1 = require("../core/Vec2i");
var TileView_1 = require("./TileView");
var BoardView = /** @class */ (function (_super) {
    __extends(BoardView, _super);
    function BoardView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tilePrefab = null;
        _this.normalFrames = [];
        _this.specialFrames = [];
        _this.tileSize = 64;
        _this.spacing = 6;
        _this.removeDuration = 0.12;
        _this.fallDuration = 0.18;
        _this.spawnDuration = 0.20;
        _this.board = null;
        _this.cols = 0;
        _this.rows = 0;
        _this.tiles = new Map();
        _this.onTileClick = null;
        _this.inputEnabled = true;
        return _this;
    }
    BoardView.prototype.setInputEnabled = function (enabled) {
        this.inputEnabled = enabled;
    };
    BoardView.prototype.init = function (board, onTileClick) {
        var _this = this;
        this.board = board;
        this.cols = board.getCols();
        this.rows = board.getRows();
        this.onTileClick = function (x, y) {
            if (!_this.inputEnabled)
                return;
            onTileClick === null || onTileClick === void 0 ? void 0 : onTileClick(x, y);
        };
        this.rebuildAll();
    };
    BoardView.prototype.rebuildAll = function () {
        this.node.removeAllChildren();
        this.tiles.clear();
        for (var x = 0; x < this.cols; x++) {
            for (var y = 0; y < this.rows; y++) {
                var type = this.board.get(x, y);
                if (type === null)
                    continue;
                var tile = this.createTile({ x: x, y: y }, type);
                void tile;
            }
        }
    };
    BoardView.prototype.applyTurnResultAnimated = function (result) {
        var _this = this;
        var removedNodes = [];
        for (var _i = 0, _a = result.removed; _i < _a.length; _i++) {
            var p = _a[_i];
            var k = Vec2i_1.keyOf(p);
            var tv = this.tiles.get(k);
            if (tv) {
                this.tiles.delete(k);
                removedNodes.push(tv.node);
            }
        }
        var moveAnims = [];
        for (var _b = 0, _c = result.moves; _b < _c.length; _b++) {
            var mv = _c[_b];
            var fromK = Vec2i_1.keyOf(mv.from);
            var toK = Vec2i_1.keyOf(mv.to);
            var tv = this.tiles.get(fromK);
            if (!tv)
                continue;
            this.tiles.delete(fromK);
            tv.setCoord(mv.to);
            this.tiles.set(toK, tv);
            moveAnims.push({
                node: tv.node,
                toPos: this.coordToLocalPos(mv.to.x, mv.to.y),
            });
        }
        if (result.tileUpdates) {
            for (var _d = 0, _e = result.tileUpdates; _d < _e.length; _d++) {
                var update = _e[_d];
                var k = Vec2i_1.keyOf(update.at);
                var tv = this.tiles.get(k);
                if (tv) {
                    tv.setTile(update.tile);
                }
            }
        }
        var spawnAnims = [];
        for (var _f = 0, _g = result.spawns; _f < _g.length; _f++) {
            var sp = _g[_f];
            var startPos = this.coordToLocalPosFloat(sp.to.x, sp.fromY);
            var endPos = this.coordToLocalPos(sp.to.x, sp.to.y);
            var tv = this.createTile(sp.to, sp.tile);
            tv.node.setPosition(startPos);
            tv.node.scaleX = 0.9;
            tv.node.scaleY = 0.9;
            spawnAnims.push({ node: tv.node, toPos: endPos });
        }
        return this.animateRemoved(removedNodes)
            .then(function () { return _this.animateMoves(moveAnims); })
            .then(function () { return _this.animateSpawns(spawnAnims); });
    };
    BoardView.prototype.applyShuffleAnimated = function (result) {
        var _this = this;
        return new Promise(function (resolve) {
            cc.tween(_this.node)
                .to(0.08, { opacity: 120 })
                .call(function () {
                for (var _i = 0, _a = result.changes; _i < _a.length; _i++) {
                    var ch = _a[_i];
                    var tv = _this.tiles.get(Vec2i_1.keyOf(ch.at));
                    if (tv)
                        tv.setTile(ch.tile);
                }
            })
                .to(0.08, { opacity: 255 })
                .call(function () { return resolve(); })
                .start();
        });
    };
    BoardView.prototype.animateRemoved = function (nodes) {
        var _this = this;
        return new Promise(function (resolve) {
            if (nodes.length === 0)
                return resolve();
            var pending = nodes.length;
            var done = function () {
                pending--;
                if (pending <= 0)
                    resolve();
            };
            var _loop_1 = function (n) {
                cc.tween(n)
                    .to(_this.removeDuration, { scaleX: 0, scaleY: 0, opacity: 0 })
                    .call(function () {
                    n.destroy();
                    done();
                })
                    .start();
            };
            for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                var n = nodes_1[_i];
                _loop_1(n);
            }
        });
    };
    BoardView.prototype.animateMoves = function (anims) {
        var _this = this;
        return new Promise(function (resolve) {
            if (anims.length === 0)
                return resolve();
            var pending = anims.length;
            var done = function () {
                pending--;
                if (pending <= 0)
                    resolve();
            };
            for (var _i = 0, anims_1 = anims; _i < anims_1.length; _i++) {
                var a = anims_1[_i];
                cc.tween(a.node)
                    .to(_this.fallDuration, { position: a.toPos }, { easing: "quadIn" })
                    .call(done)
                    .start();
            }
        });
    };
    BoardView.prototype.animateSpawns = function (anims) {
        var _this = this;
        return new Promise(function (resolve) {
            if (anims.length === 0)
                return resolve();
            var pending = anims.length;
            var done = function () {
                pending--;
                if (pending <= 0)
                    resolve();
            };
            for (var _i = 0, anims_2 = anims; _i < anims_2.length; _i++) {
                var a = anims_2[_i];
                cc.tween(a.node)
                    .to(_this.spawnDuration, { position: a.toPos, scaleX: 1, scaleY: 1 }, { easing: "quadIn" })
                    .call(done)
                    .start();
            }
        });
    };
    BoardView.prototype.fitToArea = function (areaSize) {
        var step = this.tileSize + this.spacing;
        var boardW = this.cols * step - this.spacing;
        var boardH = this.rows * step - this.spacing;
        var padding = 0.95;
        var scaleX = (areaSize.width / boardW) * padding;
        var scaleY = (areaSize.height / boardH) * padding;
        var s = Math.min(scaleX, scaleY);
        this.node.scaleX = s;
        this.node.scaleY = s;
    };
    BoardView.prototype.createTile = function (coord, tile) {
        var _this = this;
        var node = cc.instantiate(this.tilePrefab);
        node.parent = this.node;
        node.setContentSize(this.tileSize, this.tileSize);
        node.opacity = 255;
        node.scaleX = 1;
        node.scaleY = 1;
        node.setPosition(this.coordToLocalPos(coord.x, coord.y));
        var tv = node.getComponent(TileView_1.default);
        tv.init(coord, tile, this.normalFrames, this.specialFrames, function (x, y) {
            var _a;
            (_a = _this.onTileClick) === null || _a === void 0 ? void 0 : _a.call(_this, x, y);
        });
        this.tiles.set(Vec2i_1.keyOf(coord), tv);
        return tv;
    };
    BoardView.prototype.coordToLocalPos = function (x, y) {
        return this.coordToLocalPosFloat(x, y);
    };
    BoardView.prototype.coordToLocalPosFloat = function (x, y) {
        var step = this.tileSize + this.spacing;
        var totalW = this.cols * step - this.spacing;
        var totalH = this.rows * step - this.spacing;
        var originX = -totalW / 2 + this.tileSize / 2;
        var originY = -totalH / 2 + this.tileSize / 2;
        var px = originX + x * step;
        var py = originY + y * step;
        return cc.v3(px, py, 0);
    };
    __decorate([
        property(cc.Prefab)
    ], BoardView.prototype, "tilePrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BoardView.prototype, "normalFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BoardView.prototype, "specialFrames", void 0);
    __decorate([
        property
    ], BoardView.prototype, "tileSize", void 0);
    __decorate([
        property
    ], BoardView.prototype, "spacing", void 0);
    __decorate([
        property
    ], BoardView.prototype, "removeDuration", void 0);
    __decorate([
        property
    ], BoardView.prototype, "fallDuration", void 0);
    __decorate([
        property
    ], BoardView.prototype, "spawnDuration", void 0);
    BoardView = __decorate([
        ccclass
    ], BoardView);
    return BoardView;
}(cc.Component));
exports.default = BoardView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdmlldy9Cb2FyZFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUMsdUNBQTZDO0FBRTdDLHVDQUFrQztBQU1sQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQTZQQztRQTNQQyxnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFxQixFQUFFLENBQUM7UUFHcEMsbUJBQWEsR0FBcUIsRUFBRSxDQUFDO1FBR3JDLGNBQVEsR0FBVyxFQUFFLENBQUM7UUFHdEIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUdwQixvQkFBYyxHQUFXLElBQUksQ0FBQztRQUc5QixrQkFBWSxHQUFXLElBQUksQ0FBQztRQUc1QixtQkFBYSxHQUFXLElBQUksQ0FBQztRQUVyQixXQUFLLEdBQWUsSUFBSSxDQUFDO1FBQ3pCLFVBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsVUFBSSxHQUFXLENBQUMsQ0FBQztRQUVqQixXQUFLLEdBQTBCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDekMsaUJBQVcsR0FBNEMsSUFBSSxDQUFDO1FBRTVELGtCQUFZLEdBQVksSUFBSSxDQUFDOztJQTZOdkMsQ0FBQztJQTNOUSxtQ0FBZSxHQUF0QixVQUF1QixPQUFnQjtRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztJQUM5QixDQUFDO0lBRU0sd0JBQUksR0FBWCxVQUFZLEtBQWlCLEVBQUUsV0FBMkM7UUFBMUUsaUJBV0M7UUFWQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFP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QUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUUvQyxJQUFNLE9BQU8sR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWhELElBQU0sRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQU0sRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTlCLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUExUEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDUztJQUc3QjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzttREFDUztJQUdwQztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztvREFDVTtJQUdyQztRQURDLFFBQVE7K0NBQ2E7SUFHdEI7UUFEQyxRQUFROzhDQUNXO0lBR3BCO1FBREMsUUFBUTtxREFDcUI7SUFHOUI7UUFEQyxRQUFRO21EQUNtQjtJQUc1QjtRQURDLFFBQVE7b0RBQ29CO0lBdkJWLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0E2UDdCO0lBQUQsZ0JBQUM7Q0E3UEQsQUE2UEMsQ0E3UHNDLEVBQUUsQ0FBQyxTQUFTLEdBNlBsRDtrQkE3UG9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbXBvcnQgeyBCb2FyZE1vZGVsIH0gZnJvbSBcIi4uL2NvcmUvQm9hcmRNb2RlbFwiO1xuaW1wb3J0IHsga2V5T2YsIFZlYzJpIH0gZnJvbSBcIi4uL2NvcmUvVmVjMmlcIjtcbmltcG9ydCB7IFR1cm5SZXN1bHQgfSBmcm9tIFwiLi4vY29yZS9UdXJuUmVzdWx0XCI7XG5pbXBvcnQgVGlsZVZpZXcgZnJvbSBcIi4vVGlsZVZpZXdcIjtcbmltcG9ydCB7IFNodWZmbGVSZXN1bHQgfSBmcm9tIFwiLi4vY29yZS9TaHVmZmxlUmVzdWx0XCI7XG5pbXBvcnQgeyBUaWxlIH0gZnJvbSBcIi4uL2NvcmUvVGlsZVwiO1xuXG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZFZpZXcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICB0aWxlUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICBub3JtYWxGcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgc3BlY2lhbEZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gIEBwcm9wZXJ0eVxuICB0aWxlU2l6ZTogbnVtYmVyID0gNjQ7XG5cbiAgQHByb3BlcnR5XG4gIHNwYWNpbmc6IG51bWJlciA9IDY7XG5cbiAgQHByb3BlcnR5XG4gIHJlbW92ZUR1cmF0aW9uOiBudW1iZXIgPSAwLjEyO1xuXG4gIEBwcm9wZXJ0eVxuICBmYWxsRHVyYXRpb246IG51bWJlciA9IDAuMTg7XG5cbiAgQHByb3BlcnR5XG4gIHNwYXduRHVyYXRpb246IG51bWJlciA9IDAuMjA7XG5cbiAgcHJpdmF0ZSBib2FyZDogQm9hcmRNb2RlbCA9IG51bGw7XG4gIHByaXZhdGUgY29sczogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSByb3dzOiBudW1iZXIgPSAwO1xuXG4gIHByaXZhdGUgdGlsZXM6IE1hcDxzdHJpbmcsIFRpbGVWaWV3PiA9IG5ldyBNYXAoKTtcbiAgcHJpdmF0ZSBvblRpbGVDbGljazogKCh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIGlucHV0RW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgcHVibGljIHNldElucHV0RW5hYmxlZChlbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dEVuYWJsZWQgPSBlbmFibGVkO1xuICB9XG5cbiAgcHVibGljIGluaXQoYm9hcmQ6IEJvYXJkTW9kZWwsIG9uVGlsZUNsaWNrOiAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgdGhpcy5jb2xzID0gYm9hcmQuZ2V0Q29scygpO1xuICAgIHRoaXMucm93cyA9IGJvYXJkLmdldFJvd3MoKTtcblxuICAgIHRoaXMub25UaWxlQ2xpY2sgPSAoeCwgeSkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlucHV0RW5hYmxlZCkgcmV0dXJuO1xuICAgICAgb25UaWxlQ2xpY2s/Lih4LCB5KTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZWJ1aWxkQWxsKCk7XG4gIH1cblxuICBwdWJsaWMgcmVidWlsZEFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICB0aGlzLnRpbGVzLmNsZWFyKCk7XG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuY29sczsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMucm93czsgeSsrKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmJvYXJkLmdldCh4LCB5KTtcbiAgICAgICAgaWYgKHR5cGUgPT09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IHRpbGUgPSB0aGlzLmNyZWF0ZVRpbGUoeyB4LCB5IH0sIHR5cGUgYXMgYW55KTtcbiAgICAgICAgdm9pZCB0aWxlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhcHBseVR1cm5SZXN1bHRBbmltYXRlZChyZXN1bHQ6IFR1cm5SZXN1bHQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCByZW1vdmVkTm9kZXM6IGNjLk5vZGVbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgcCBvZiByZXN1bHQucmVtb3ZlZCkge1xuICAgICAgY29uc3QgayA9IGtleU9mKHApO1xuICAgICAgY29uc3QgdHYgPSB0aGlzLnRpbGVzLmdldChrKTtcbiAgICAgIGlmICh0dikge1xuICAgICAgICB0aGlzLnRpbGVzLmRlbGV0ZShrKTtcbiAgICAgICAgcmVtb3ZlZE5vZGVzLnB1c2godHYubm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbW92ZUFuaW1zOiB7IG5vZGU6IGNjLk5vZGU7IHRvUG9zOiBjYy5WZWMzIH1bXSA9IFtdO1xuICAgIGZvciAoY29uc3QgbXYgb2YgcmVzdWx0Lm1vdmVzKSB7XG4gICAgICBjb25zdCBmcm9tSyA9IGtleU9mKG12LmZyb20pO1xuICAgICAgY29uc3QgdG9LID0ga2V5T2YobXYudG8pO1xuXG4gICAgICBjb25zdCB0diA9IHRoaXMudGlsZXMuZ2V0KGZyb21LKTtcbiAgICAgIGlmICghdHYpIGNvbnRpbnVlO1xuXG4gICAgICB0aGlzLnRpbGVzLmRlbGV0ZShmcm9tSyk7XG4gICAgICB0di5zZXRDb29yZChtdi50byk7XG4gICAgICB0aGlzLnRpbGVzLnNldCh0b0ssIHR2KTtcblxuICAgICAgbW92ZUFuaW1zLnB1c2goe1xuICAgICAgICBub2RlOiB0di5ub2RlLFxuICAgICAgICB0b1BvczogdGhpcy5jb29yZFRvTG9jYWxQb3MobXYudG8ueCwgbXYudG8ueSksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LnRpbGVVcGRhdGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IHVwZGF0ZSBvZiByZXN1bHQudGlsZVVwZGF0ZXMpIHtcbiAgICAgICAgY29uc3QgayA9IGtleU9mKHVwZGF0ZS5hdCk7XG4gICAgICAgIGNvbnN0IHR2ID0gdGhpcy50aWxlcy5nZXQoayk7XG4gICAgICAgIGlmICh0dikge1xuICAgICAgICAgIHR2LnNldFRpbGUodXBkYXRlLnRpbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3Bhd25BbmltczogeyBub2RlOiBjYy5Ob2RlOyB0b1BvczogY2MuVmVjMyB9W10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IHNwIG9mIHJlc3VsdC5zcGF3bnMpIHtcbiAgICAgIGNvbnN0IHN0YXJ0UG9zID0gdGhpcy5jb29yZFRvTG9jYWxQb3NGbG9hdChzcC50by54LCBzcC5mcm9tWSk7XG4gICAgICBjb25zdCBlbmRQb3MgPSB0aGlzLmNvb3JkVG9Mb2NhbFBvcyhzcC50by54LCBzcC50by55KTtcblxuICAgICAgY29uc3QgdHYgPSB0aGlzLmNyZWF0ZVRpbGUoc3AudG8sIHNwLnRpbGUpO1xuICAgICAgdHYubm9kZS5zZXRQb3NpdGlvbihzdGFydFBvcyk7XG5cbiAgICAgIHR2Lm5vZGUuc2NhbGVYID0gMC45O1xuICAgICAgdHYubm9kZS5zY2FsZVkgPSAwLjk7XG5cbiAgICAgIHNwYXduQW5pbXMucHVzaCh7IG5vZGU6IHR2Lm5vZGUsIHRvUG9zOiBlbmRQb3MgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYW5pbWF0ZVJlbW92ZWQocmVtb3ZlZE5vZGVzKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5hbmltYXRlTW92ZXMobW92ZUFuaW1zKSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMuYW5pbWF0ZVNwYXducyhzcGF3bkFuaW1zKSk7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlTaHVmZmxlQW5pbWF0ZWQocmVzdWx0OiBTaHVmZmxlUmVzdWx0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXG4gICAgICAgIC50bygwLjA4LCB7IG9wYWNpdHk6IDEyMCB9KVxuICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgZm9yIChjb25zdCBjaCBvZiByZXN1bHQuY2hhbmdlcykge1xuICAgICAgICAgICAgY29uc3QgdHYgPSB0aGlzLnRpbGVzLmdldChrZXlPZihjaC5hdCkpO1xuICAgICAgICAgICAgaWYgKHR2KSB0di5zZXRUaWxlKGNoLnRpbGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRvKDAuMDgsIHsgb3BhY2l0eTogMjU1IH0pXG4gICAgICAgIC5jYWxsKCgpID0+IHJlc29sdmUoKSlcbiAgICAgICAgLnN0YXJ0KCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGVSZW1vdmVkKG5vZGVzOiBjYy5Ob2RlW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmIChub2Rlcy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgIGxldCBwZW5kaW5nID0gbm9kZXMubGVuZ3RoO1xuICAgICAgY29uc3QgZG9uZSA9ICgpID0+IHtcbiAgICAgICAgcGVuZGluZy0tO1xuICAgICAgICBpZiAocGVuZGluZyA8PSAwKSByZXNvbHZlKCk7XG4gICAgICB9O1xuXG4gICAgICBmb3IgKGNvbnN0IG4gb2Ygbm9kZXMpIHtcbiAgICAgICAgY2MudHdlZW4obilcbiAgICAgICAgICAudG8odGhpcy5yZW1vdmVEdXJhdGlvbiwgeyBzY2FsZVg6IDAsIHNjYWxlWTogMCwgb3BhY2l0eTogMCB9KVxuICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIG4uZGVzdHJveSgpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGVNb3ZlcyhhbmltczogeyBub2RlOiBjYy5Ob2RlOyB0b1BvczogY2MuVmVjMyB9W10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmIChhbmltcy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgIGxldCBwZW5kaW5nID0gYW5pbXMubGVuZ3RoO1xuICAgICAgY29uc3QgZG9uZSA9ICgpID0+IHtcbiAgICAgICAgcGVuZGluZy0tO1xuICAgICAgICBpZiAocGVuZGluZyA8PSAwKSByZXNvbHZlKCk7XG4gICAgICB9O1xuXG4gICAgICBmb3IgKGNvbnN0IGEgb2YgYW5pbXMpIHtcbiAgICAgICAgY2MudHdlZW4oYS5ub2RlKVxuICAgICAgICAgIC50byh0aGlzLmZhbGxEdXJhdGlvbiwgeyBwb3NpdGlvbjogYS50b1BvcyB9LCB7IGVhc2luZzogXCJxdWFkSW5cIiB9KVxuICAgICAgICAgIC5jYWxsKGRvbmUpXG4gICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGVTcGF3bnMoYW5pbXM6IHsgbm9kZTogY2MuTm9kZTsgdG9Qb3M6IGNjLlZlYzMgfVtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAoYW5pbXMubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICBsZXQgcGVuZGluZyA9IGFuaW1zLmxlbmd0aDtcbiAgICAgIGNvbnN0IGRvbmUgPSAoKSA9PiB7XG4gICAgICAgIHBlbmRpbmctLTtcbiAgICAgICAgaWYgKHBlbmRpbmcgPD0gMCkgcmVzb2x2ZSgpO1xuICAgICAgfTtcblxuICAgICAgZm9yIChjb25zdCBhIG9mIGFuaW1zKSB7XG4gICAgICAgIGNjLnR3ZWVuKGEubm9kZSlcbiAgICAgICAgICAudG8odGhpcy5zcGF3bkR1cmF0aW9uLCB7IHBvc2l0aW9uOiBhLnRvUG9zLCBzY2FsZVg6IDEsIHNjYWxlWTogMSB9LCB7IGVhc2luZzogXCJxdWFkSW5cIiB9KVxuICAgICAgICAgIC5jYWxsKGRvbmUpXG4gICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZml0VG9BcmVhKGFyZWFTaXplOiBjYy5TaXplKTogdm9pZCB7XG4gICAgY29uc3Qgc3RlcCA9IHRoaXMudGlsZVNpemUgKyB0aGlzLnNwYWNpbmc7XG4gICAgY29uc3QgYm9hcmRXID0gdGhpcy5jb2xzICogc3RlcCAtIHRoaXMuc3BhY2luZztcbiAgICBjb25zdCBib2FyZEggPSB0aGlzLnJvd3MgKiBzdGVwIC0gdGhpcy5zcGFjaW5nO1xuXG4gICAgY29uc3QgcGFkZGluZyA9IDAuOTU7XG4gIFxuICAgIGNvbnN0IHNjYWxlWCA9IChhcmVhU2l6ZS53aWR0aCAvIGJvYXJkVykgKiBwYWRkaW5nO1xuICAgIGNvbnN0IHNjYWxlWSA9IChhcmVhU2l6ZS5oZWlnaHQgLyBib2FyZEgpICogcGFkZGluZztcbiAgXG4gICAgY29uc3QgcyA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKTtcbiAgICB0aGlzLm5vZGUuc2NhbGVYID0gcztcbiAgICB0aGlzLm5vZGUuc2NhbGVZID0gcztcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVGlsZShjb29yZDogVmVjMmksIHRpbGU6IFRpbGUpOiBUaWxlVmlldyB7XG4gICAgY29uc3Qgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGlsZVByZWZhYik7XG4gICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG5cbiAgICBub2RlLnNldENvbnRlbnRTaXplKHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xuICAgIG5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICBub2RlLnNjYWxlWCA9IDE7XG4gICAgbm9kZS5zY2FsZVkgPSAxO1xuXG4gICAgbm9kZS5zZXRQb3NpdGlvbih0aGlzLmNvb3JkVG9Mb2NhbFBvcyhjb29yZC54LCBjb29yZC55KSk7XG5cbiAgICBjb25zdCB0diA9IG5vZGUuZ2V0Q29tcG9uZW50KFRpbGVWaWV3KTtcbiAgICB0di5pbml0KGNvb3JkLCB0aWxlLCB0aGlzLm5vcm1hbEZyYW1lcywgdGhpcy5zcGVjaWFsRnJhbWVzLCAoeCwgeSkgPT4ge1xuICAgICAgdGhpcy5vblRpbGVDbGljaz8uKHgsIHkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy50aWxlcy5zZXQoa2V5T2YoY29vcmQpLCB0dik7XG4gICAgcmV0dXJuIHR2O1xuICB9XG5cbiAgcHJpdmF0ZSBjb29yZFRvTG9jYWxQb3MoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBjYy5WZWMzIHtcbiAgICByZXR1cm4gdGhpcy5jb29yZFRvTG9jYWxQb3NGbG9hdCh4LCB5KTtcbiAgfVxuXG4gIHByaXZhdGUgY29vcmRUb0xvY2FsUG9zRmxvYXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBjYy5WZWMzIHtcbiAgICBjb25zdCBzdGVwID0gdGhpcy50aWxlU2l6ZSArIHRoaXMuc3BhY2luZztcblxuICAgIGNvbnN0IHRvdGFsVyA9IHRoaXMuY29scyAqIHN0ZXAgLSB0aGlzLnNwYWNpbmc7XG4gICAgY29uc3QgdG90YWxIID0gdGhpcy5yb3dzICogc3RlcCAtIHRoaXMuc3BhY2luZztcblxuICAgIGNvbnN0IG9yaWdpblggPSAtdG90YWxXIC8gMiArIHRoaXMudGlsZVNpemUgLyAyO1xuICAgIGNvbnN0IG9yaWdpblkgPSAtdG90YWxIIC8gMiArIHRoaXMudGlsZVNpemUgLyAyO1xuXG4gICAgY29uc3QgcHggPSBvcmlnaW5YICsgeCAqIHN0ZXA7XG4gICAgY29uc3QgcHkgPSBvcmlnaW5ZICsgeSAqIHN0ZXA7XG5cbiAgICByZXR1cm4gY2MudjMocHgsIHB5LCAwKTtcbiAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/core/Tile.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '953cdsJe79ONZTq5WEymHaR', 'Tile');
// Script/core/Tile.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialEffect = void 0;
var SpecialEffect;
(function (SpecialEffect) {
    SpecialEffect[SpecialEffect["ClearRow"] = 0] = "ClearRow";
    SpecialEffect[SpecialEffect["ClearColumn"] = 1] = "ClearColumn";
    SpecialEffect[SpecialEffect["BombRadius"] = 2] = "BombRadius";
    SpecialEffect[SpecialEffect["ClearBoard"] = 3] = "ClearBoard";
})(SpecialEffect = exports.SpecialEffect || (exports.SpecialEffect = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29yZS9UaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQVksYUFLVDtBQUxILFdBQVksYUFBYTtJQUNyQix5REFBWSxDQUFBO0lBQ1osK0RBQWUsQ0FBQTtJQUNmLDZEQUFjLENBQUE7SUFDZCw2REFBYyxDQUFBO0FBQ2hCLENBQUMsRUFMUyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUt0QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIFNwZWNpYWxFZmZlY3Qge1xuICAgIENsZWFyUm93ID0gMCxcbiAgICBDbGVhckNvbHVtbiA9IDEsXG4gICAgQm9tYlJhZGl1cyA9IDIsXG4gICAgQ2xlYXJCb2FyZCA9IDMsXG4gIH1cbiAgXG5leHBvcnQgdHlwZSBUaWxlID1cbnwgeyBraW5kOiBcIm5vcm1hbFwiOyBjb2xvcjogbnVtYmVyIH1cbnwgeyBraW5kOiBcInNwZWNpYWxcIjsgZWZmZWN0OiBTcGVjaWFsRWZmZWN0OyByYWRpdXM/OiBudW1iZXIgfTtcbiAgIl19
//------QC-SOURCE-SPLIT------
