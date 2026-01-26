
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29yZS9Cb2FyZE1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLG9DQUFtQztBQUduQywrQkFBNkM7QUFVN0M7SUFJRSxvQkFBb0IsTUFBa0IsRUFBVSxLQUFpQixFQUFFLEdBQVM7UUFBeEQsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDL0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLGFBQUgsR0FBRyxjQUFILEdBQUcsR0FBSSxJQUFJLFNBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFTSw0QkFBTyxHQUFkLGNBQTJCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlDLDRCQUFPLEdBQWQsY0FBMkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFOUMsK0JBQVUsR0FBakI7UUFDRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNDO1NBQ0Y7SUFDSCxDQUFDO0lBRU0sd0JBQUcsR0FBVixVQUFXLENBQVMsRUFBRSxDQUFTO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFD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QUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkI7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQXRZQSxBQXNZQyxJQUFBO0FBdFlZLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZUNvbmZpZyB9IGZyb20gXCIuL0dhbWVDb25maWdcIjtcbmltcG9ydCB7IFZlYzJpIH0gZnJvbSBcIi4vVmVjMmlcIjtcbmltcG9ydCB7IFJuZyB9IGZyb20gXCIuLi91dGlscy9SbmdcIjtcbmltcG9ydCB7IFR1cm5SZXN1bHQsIE1vdmVDb21tYW5kLCBTcGF3bkNvbW1hbmQgfSBmcm9tIFwiLi9UdXJuUmVzdWx0XCI7XG5pbXBvcnQgeyBTaHVmZmxlUmVzdWx0IH0gZnJvbSBcIi4vU2h1ZmZsZVJlc3VsdFwiO1xuaW1wb3J0IHsgVGlsZSwgU3BlY2lhbEVmZmVjdCB9IGZyb20gXCIuL1RpbGVcIjtcblxudHlwZSBDZWxsID0gVGlsZSB8IG51bGw7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQm9hcmRSdWxlcyB7XG4gIG1pbkdyb3VwU2l6ZTogbnVtYmVyO1xuICBib21iUmFkaXVzOiBudW1iZXI7XG4gIHN1cGVyTWluR3JvdXA6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEJvYXJkTW9kZWwge1xuICBwcml2YXRlIGdyaWQ6IENlbGxbXVtdO1xuICBwcml2YXRlIHJuZzogUm5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBHYW1lQ29uZmlnLCBwcml2YXRlIHJ1bGVzOiBCb2FyZFJ1bGVzLCBybmc/OiBSbmcpIHtcbiAgICB0aGlzLnJuZyA9IHJuZyA/PyBuZXcgUm5nKCk7XG4gICAgdGhpcy5ncmlkID0gW107XG4gICAgdGhpcy5pbml0RW1wdHkoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb2xzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNvbmZpZy5jb2xzOyB9XG4gIHB1YmxpYyBnZXRSb3dzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNvbmZpZy5yb3dzOyB9XG5cbiAgcHVibGljIGluaXRSYW5kb20oKTogdm9pZCB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5jb25maWcucm93czsgeSsrKSB7XG4gICAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IHRoaXMucmFuZG9tTm9ybWFsVGlsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBDZWxsIHtcbiAgICBpZiAoIXRoaXMuaW5Cb3VuZHMoeCwgeSkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLmdyaWRbeF1beV07XG4gIH1cblxuICBwdWJsaWMgc2V0KHg6IG51bWJlciwgeTogbnVtYmVyLCB2YWx1ZTogQ2VsbCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pbkJvdW5kcyh4LCB5KSkgcmV0dXJuO1xuICAgIHRoaXMuZ3JpZFt4XVt5XSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGFwcGx5Q2xpY2soeDogbnVtYmVyLCB5OiBudW1iZXIpOiBUdXJuUmVzdWx0IHwgbnVsbCB7XG4gICAgaWYgKCF0aGlzLmluQm91bmRzKHgsIHkpKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWRbeF1beV07XG4gICAgaWYgKGNlbGwgPT09IG51bGwpIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGNlbGwua2luZCA9PT0gXCJzcGVjaWFsXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLmFwcGx5U3BlY2lhbEVmZmVjdCh7IHgsIHkgfSwgY2VsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlOb3JtYWxHcm91cCh7IHgsIHkgfSwgY2VsbC5jb2xvcik7XG4gIH1cblxuICBwdWJsaWMgaGFzQW55TW92ZXMoKTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5jb25maWcucm93czsgeSsrKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzLmdyaWRbeF1beV07XG4gICAgICAgIGlmICh0ICYmIHQua2luZCA9PT0gXCJzcGVjaWFsXCIpIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHZpc2l0ZWQgPSB0aGlzLm1ha2VWaXNpdGVkKCk7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5jb25maWcucm93czsgeSsrKSB7XG4gICAgICAgIGlmICh2aXNpdGVkW3hdW3ldKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgdCA9IHRoaXMuZ3JpZFt4XVt5XTtcbiAgICAgICAgaWYgKCF0IHx8IHQua2luZCAhPT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIHZpc2l0ZWRbeF1beV0gPSB0cnVlO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RhY2s6IFZlYzJpW10gPSBbeyB4LCB5IH1dO1xuICAgICAgICB2aXNpdGVkW3hdW3ldID0gdHJ1ZTtcbiAgICAgICAgbGV0IHNpemUgPSAwO1xuXG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBwID0gc3RhY2sucG9wKCkhO1xuICAgICAgICAgIHNpemUrKztcbiAgICAgICAgICBpZiAoc2l6ZSA+PSB0aGlzLnJ1bGVzLm1pbkdyb3VwU2l6ZSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IG4gb2YgdGhpcy5uZWlnaGJvcnM0KHAueCwgcC55KSkge1xuICAgICAgICAgICAgaWYgKHZpc2l0ZWRbbi54XVtuLnldKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHRuID0gdGhpcy5ncmlkW24ueF1bbi55XTtcbiAgICAgICAgICAgIGlmICghdG4gfHwgdG4ua2luZCAhPT0gXCJub3JtYWxcIiB8fCB0bi5jb2xvciAhPT0gdC5jb2xvcikgY29udGludWU7XG5cbiAgICAgICAgICAgIHZpc2l0ZWRbbi54XVtuLnldID0gdHJ1ZTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHNodWZmbGUoKTogU2h1ZmZsZVJlc3VsdCB7XG4gICAgY29uc3QgdGlsZXM6IFRpbGVbXSA9IFtdO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5jb25maWcuY29sczsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuY29uZmlnLnJvd3M7IHkrKykge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy5ncmlkW3hdW3ldO1xuICAgICAgICBpZiAodCkgdGlsZXMucHVzaCh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gdGlsZXMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgY29uc3QgaiA9IHRoaXMucm5nLm5leHRJbnQoaSArIDEpO1xuICAgICAgY29uc3QgdG1wID0gdGlsZXNbaV07XG4gICAgICB0aWxlc1tpXSA9IHRpbGVzW2pdO1xuICAgICAgdGlsZXNbal0gPSB0bXA7XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlczogeyBhdDogVmVjMmk7IHRpbGU6IFRpbGUgfVtdID0gW107XG4gICAgbGV0IGlkeCA9IDA7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5jb25maWcucm93czsgeSsrKSB7XG4gICAgICAgIGlmICghdGhpcy5ncmlkW3hdW3ldKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgbmV3VGlsZSA9IHRpbGVzW2lkeCsrXTtcbiAgICAgICAgdGhpcy5ncmlkW3hdW3ldID0gbmV3VGlsZTtcbiAgICAgICAgY2hhbmdlcy5wdXNoKHsgYXQ6IHsgeCwgeSB9LCB0aWxlOiBuZXdUaWxlIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IGNoYW5nZXMgfTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseUJvbWJFZmZlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHJhZGl1czogbnVtYmVyKTogVHVyblJlc3VsdCB8IG51bGwge1xuICAgIGlmICghdGhpcy5pbkJvdW5kcyh4LCB5KSkgcmV0dXJuIG51bGw7XG4gICAgXG4gICAgY29uc3QgdG9SZW1vdmU6IFZlYzJpW10gPSBbXTtcbiAgICBmb3IgKGxldCBkeCA9IC1yYWRpdXM7IGR4IDw9IHJhZGl1czsgZHgrKykge1xuICAgICAgZm9yIChsZXQgZHkgPSAtcmFkaXVzOyBkeSA8PSByYWRpdXM7IGR5KyspIHtcbiAgICAgICAgY29uc3QgcHggPSB4ICsgZHg7XG4gICAgICAgIGNvbnN0IHB5ID0geSArIGR5O1xuICAgICAgICBpZiAodGhpcy5pbkJvdW5kcyhweCwgcHkpICYmIHRoaXMuZ3JpZFtweF1bcHldICE9PSBudWxsKSB7XG4gICAgICAgICAgdG9SZW1vdmUucHVzaCh7IHg6IHB4LCB5OiBweSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpZiAodG9SZW1vdmUubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHAgb2YgdG9SZW1vdmUpIHtcbiAgICAgIHRoaXMuZ3JpZFtwLnhdW3AueV0gPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdGhpcy5hcHBseUdyYXZpdHlBbmRTcGF3bih0b1JlbW92ZSwgdG9SZW1vdmUubGVuZ3RoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlOb3JtYWxHcm91cChjbGljazogVmVjMmksIGNvbG9yOiBudW1iZXIpOiBUdXJuUmVzdWx0IHwgbnVsbCB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdldE5vcm1hbEdyb3VwKGNsaWNrLngsIGNsaWNrLnksIGNvbG9yKTtcbiAgICBpZiAoZ3JvdXAubGVuZ3RoIDwgdGhpcy5ydWxlcy5taW5Hcm91cFNpemUpIHJldHVybiBudWxsO1xuXG4gICAgZm9yIChjb25zdCBwIG9mIGdyb3VwKSB7XG4gICAgICB0aGlzLmdyaWRbcC54XVtwLnldID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzaG91bGRDcmVhdGVTcGVjaWFsID0gZ3JvdXAubGVuZ3RoID49IDU7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlHcmF2aXR5QW5kU3Bhd24oZ3JvdXAsIGdyb3VwLmxlbmd0aCwgc2hvdWxkQ3JlYXRlU3BlY2lhbCA/IGNsaWNrIDogbnVsbCwgc2hvdWxkQ3JlYXRlU3BlY2lhbCA/IGdyb3VwLmxlbmd0aCA6IDApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROb3JtYWxHcm91cChzdGFydFg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIGNvbG9yOiBudW1iZXIpOiBWZWMyaVtdIHtcbiAgICBjb25zdCB0MCA9IHRoaXMuZ3JpZFtzdGFydFhdW3N0YXJ0WV07XG4gICAgaWYgKCF0MCB8fCB0MC5raW5kICE9PSBcIm5vcm1hbFwiIHx8IHQwLmNvbG9yICE9PSBjb2xvcikgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgdmlzaXRlZCA9IHRoaXMubWFrZVZpc2l0ZWQoKTtcbiAgICBjb25zdCBzdGFjazogVmVjMmlbXSA9IFt7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH1dO1xuICAgIGNvbnN0IGdyb3VwOiBWZWMyaVtdID0gW107XG4gICAgdmlzaXRlZFtzdGFydFhdW3N0YXJ0WV0gPSB0cnVlO1xuXG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgY29uc3QgcCA9IHN0YWNrLnBvcCgpITtcbiAgICAgIGdyb3VwLnB1c2gocCk7XG5cbiAgICAgIGZvciAoY29uc3QgbiBvZiB0aGlzLm5laWdoYm9yczQocC54LCBwLnkpKSB7XG4gICAgICAgIGlmICh2aXNpdGVkW24ueF1bbi55XSkgY29udGludWU7XG4gICAgICAgIGNvbnN0IHRuID0gdGhpcy5ncmlkW24ueF1bbi55XTtcbiAgICAgICAgaWYgKCF0biB8fCB0bi5raW5kICE9PSBcIm5vcm1hbFwiIHx8IHRuLmNvbG9yICE9PSBjb2xvcikgY29udGludWU7XG5cbiAgICAgICAgdmlzaXRlZFtuLnhdW24ueV0gPSB0cnVlO1xuICAgICAgICBzdGFjay5wdXNoKG4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlTcGVjaWFsRWZmZWN0KHBvczogVmVjMmksIHRpbGU6IFRpbGUgJiB7IGtpbmQ6IFwic3BlY2lhbFwiIH0pOiBUdXJuUmVzdWx0IHwgbnVsbCB7XG4gICAgY29uc3QgdG9SZW1vdmUgPSB0aGlzLmNvbXB1dGVFZmZlY3RBcmVhKHBvcywgdGlsZSk7XG5cbiAgICBpZiAodG9SZW1vdmUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHAgb2YgdG9SZW1vdmUpIHtcbiAgICAgIHRoaXMuZ3JpZFtwLnhdW3AueV0gPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuYXBwbHlHcmF2aXR5QW5kU3Bhd24odG9SZW1vdmUsIHRvUmVtb3ZlLmxlbmd0aCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgY29tcHV0ZUVmZmVjdEFyZWEocG9zOiBWZWMyaSwgdGlsZTogVGlsZSAmIHsga2luZDogXCJzcGVjaWFsXCIgfSk6IFZlYzJpW10ge1xuICAgIGNvbnN0IGN1cnJlbnRUaWxlID0gdGhpcy5ncmlkW3Bvcy54XVtwb3MueV07XG4gICAgaWYgKCFjdXJyZW50VGlsZSB8fCBjdXJyZW50VGlsZS5raW5kICE9PSBcInNwZWNpYWxcIikge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdDogVmVjMmlbXSA9IFtdO1xuICAgIGNvbnN0IGFkZGVkID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgXG4gICAgY29uc3QgYWRkID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaW5Cb3VuZHMoeCwgeSkpIHJldHVybjtcbiAgICAgIGNvbnN0IGMgPSB0aGlzLmdyaWRbeF1beV07XG4gICAgICBpZiAoIWMpIHJldHVybjtcbiAgICAgIGNvbnN0IGtleSA9IGAke3h9XyR7eX1gO1xuICAgICAgaWYgKGFkZGVkLmhhcyhrZXkpKSByZXR1cm47XG4gICAgICBhZGRlZC5hZGQoa2V5KTtcbiAgICAgIHJlc3VsdC5wdXNoKHsgeCwgeSB9KTtcbiAgICB9O1xuXG4gICAgYWRkKHBvcy54LCBwb3MueSk7XG5cbiAgICBzd2l0Y2ggKHRpbGUuZWZmZWN0KSB7XG4gICAgICBjYXNlIFNwZWNpYWxFZmZlY3QuQ2xlYXJSb3c6IHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgICAgICBhZGQoeCwgcG9zLnkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBTcGVjaWFsRWZmZWN0LkNsZWFyQ29sdW1uOiB7XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5jb25maWcucm93czsgeSsrKSB7XG4gICAgICAgICAgYWRkKHBvcy54LCB5KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgU3BlY2lhbEVmZmVjdC5Cb21iUmFkaXVzOiB7XG4gICAgICAgIGNvbnN0IFIgPSB0aWxlLnJhZGl1cyA/PyB0aGlzLnJ1bGVzLmJvbWJSYWRpdXM7XG4gICAgICAgIGZvciAobGV0IGR4ID0gLVI7IGR4IDw9IFI7IGR4KyspIHtcbiAgICAgICAgICBmb3IgKGxldCBkeSA9IC1SOyBkeSA8PSBSOyBkeSsrKSB7XG4gICAgICAgICAgICBhZGQocG9zLnggKyBkeCwgcG9zLnkgKyBkeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBTcGVjaWFsRWZmZWN0LkNsZWFyQm9hcmQ6IHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuY29uZmlnLnJvd3M7IHkrKykge1xuICAgICAgICAgICAgYWRkKHgsIHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUdyYXZpdHlBbmRTcGF3bihyZW1vdmVkOiBWZWMyaVtdLCBncm91cFNpemU6IG51bWJlciwgY3JlYXRlU3BlY2lhbEF0OiBWZWMyaSB8IG51bGwgPSBudWxsLCBzcGVjaWFsR3JvdXBTaXplOiBudW1iZXIgPSAwKTogVHVyblJlc3VsdCB7XG4gICAgY29uc3QgbW92ZXM6IE1vdmVDb21tYW5kW10gPSBbXTtcbiAgICBjb25zdCBzcGF3bnM6IFNwYXduQ29tbWFuZFtdID0gW107XG4gICAgY29uc3QgdGlsZVVwZGF0ZXM6IHsgYXQ6IFZlYzJpOyB0aWxlOiBUaWxlIH1bXSA9IFtdO1xuICAgIGxldCBzcGVjaWFsWSA9IC0xO1xuXG4gICAgaWYgKGNyZWF0ZVNwZWNpYWxBdCAmJiBzcGVjaWFsR3JvdXBTaXplID4gMCkge1xuICAgICAgY29uc3QgY2xpY2tYID0gY3JlYXRlU3BlY2lhbEF0Lng7XG4gICAgICBjb25zdCBjbGlja1kgPSBjcmVhdGVTcGVjaWFsQXQueTtcbiAgICAgIFxuICAgICAgbGV0IHRpbGVzQWJvdmUgPSAwO1xuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBjbGlja1k7IHkrKykge1xuICAgICAgICBpZiAodGhpcy5ncmlkW2NsaWNrWF1beV0gIT09IG51bGwpIHtcbiAgICAgICAgICB0aWxlc0Fib3ZlKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNwZWNpYWxZID0gdGlsZXNBYm92ZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuY29uZmlnLmNvbHM7IHgrKykge1xuICAgICAgY29uc3QgbmV3Q29sOiBDZWxsW10gPSBuZXcgQXJyYXkodGhpcy5jb25maWcucm93cykuZmlsbChudWxsKTtcblxuICAgICAgbGV0IHdyaXRlWSA9IDA7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuY29uZmlnLnJvd3M7IHkrKykge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy5ncmlkW3hdW3ldO1xuICAgICAgICBpZiAoIXQpIGNvbnRpbnVlO1xuXG4gICAgICAgIG5ld0NvbFt3cml0ZVldID0gdDtcblxuICAgICAgICBpZiAod3JpdGVZICE9PSB5KSB7XG4gICAgICAgICAgbW92ZXMucHVzaCh7IGZyb206IHsgeCwgeSB9LCB0bzogeyB4LCB5OiB3cml0ZVkgfSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdyaXRlWSsrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpc1NwZWNpYWxDb2wgPSBjcmVhdGVTcGVjaWFsQXQgJiYgY3JlYXRlU3BlY2lhbEF0LnggPT09IHggJiYgc3BlY2lhbEdyb3VwU2l6ZSA+IDA7XG5cbiAgICAgIGxldCBzcGF3bkluZGV4ID0gMDtcbiAgICAgIGZvciAobGV0IHkgPSB3cml0ZVk7IHkgPCB0aGlzLmNvbmZpZy5yb3dzOyB5KyspIHtcbiAgICAgICAgaWYgKGlzU3BlY2lhbENvbCAmJiB5ID09PSBzcGVjaWFsWSAmJiBzcGVjaWFsWSA+PSB3cml0ZVkpIHtcbiAgICAgICAgICBjb25zdCBlZmZlY3REYXRhID0gdGhpcy5zZWxlY3RTcGVjaWFsRWZmZWN0QnlHcm91cFNpemUoc3BlY2lhbEdyb3VwU2l6ZSk7XG4gICAgICAgICAgY29uc3Qgc3BlY2lhbFRpbGU6IFRpbGUgPSBlZmZlY3REYXRhLnJhZGl1cyAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHsga2luZDogXCJzcGVjaWFsXCIsIGVmZmVjdDogZWZmZWN0RGF0YS5lZmZlY3QsIHJhZGl1czogZWZmZWN0RGF0YS5yYWRpdXMgfVxuICAgICAgICAgICAgOiB7IGtpbmQ6IFwic3BlY2lhbFwiLCBlZmZlY3Q6IGVmZmVjdERhdGEuZWZmZWN0IH07XG4gICAgICAgICAgXG4gICAgICAgICAgbmV3Q29sW3ldID0gc3BlY2lhbFRpbGU7XG4gICAgICAgICAgXG4gICAgICAgICAgc3Bhd25zLnB1c2goe1xuICAgICAgICAgICAgdG86IHsgeCwgeSB9LFxuICAgICAgICAgICAgdGlsZTogc3BlY2lhbFRpbGUsXG4gICAgICAgICAgICBmcm9tWTogdGhpcy5jb25maWcucm93cyArIHNwYXduSW5kZXggKyAzLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIFxuICAgICAgICAgIHNwYXduSW5kZXgrKztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgdGlsZSA9IHRoaXMucmFuZG9tTm9ybWFsVGlsZSgpO1xuICAgICAgICBuZXdDb2xbeV0gPSB0aWxlO1xuXG4gICAgICAgIHNwYXducy5wdXNoKHtcbiAgICAgICAgICB0bzogeyB4LCB5IH0sXG4gICAgICAgICAgdGlsZSxcbiAgICAgICAgICBmcm9tWTogdGhpcy5jb25maWcucm93cyArIHNwYXduSW5kZXggKyAzLFxuICAgICAgICB9KTtcblxuICAgICAgICBzcGF3bkluZGV4Kys7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1NwZWNpYWxDb2wgJiYgc3BlY2lhbFkgPj0gMCAmJiBzcGVjaWFsWSA8IHRoaXMuY29uZmlnLnJvd3MgJiYgc3BlY2lhbFkgPCB3cml0ZVkpIHtcbiAgICAgICAgaWYgKG5ld0NvbFtzcGVjaWFsWV0gIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBlZmZlY3REYXRhID0gdGhpcy5zZWxlY3RTcGVjaWFsRWZmZWN0QnlHcm91cFNpemUoc3BlY2lhbEdyb3VwU2l6ZSk7XG4gICAgICAgICAgY29uc3Qgc3BlY2lhbFRpbGU6IFRpbGUgPSBlZmZlY3REYXRhLnJhZGl1cyAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHsga2luZDogXCJzcGVjaWFsXCIsIGVmZmVjdDogZWZmZWN0RGF0YS5lZmZlY3QsIHJhZGl1czogZWZmZWN0RGF0YS5yYWRpdXMgfVxuICAgICAgICAgICAgOiB7IGtpbmQ6IFwic3BlY2lhbFwiLCBlZmZlY3Q6IGVmZmVjdERhdGEuZWZmZWN0IH07XG5cbiAgICAgICAgICBuZXdDb2xbc3BlY2lhbFldID0gc3BlY2lhbFRpbGU7XG5cbiAgICAgICAgICB0aWxlVXBkYXRlcy5wdXNoKHtcbiAgICAgICAgICAgIGF0OiB7IHgsIHk6IHNwZWNpYWxZIH0sXG4gICAgICAgICAgICB0aWxlOiBzcGVjaWFsVGlsZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5jb25maWcucm93czsgeSsrKSB7XG4gICAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IG5ld0NvbFt5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyByZW1vdmVkLCBtb3Zlcywgc3Bhd25zLCB0aWxlVXBkYXRlczogdGlsZVVwZGF0ZXMubGVuZ3RoID4gMCA/IHRpbGVVcGRhdGVzIDogdW5kZWZpbmVkLCBncm91cFNpemUgfTtcbiAgfVxuXG4gIHByaXZhdGUgcmFuZG9tTm9ybWFsVGlsZSgpOiBUaWxlIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMucm5nLm5leHRJbnQodGhpcy5jb25maWcuY29sb3JzQ291bnQpO1xuICAgIHJldHVybiB7IGtpbmQ6IFwibm9ybWFsXCIsIGNvbG9yIH07XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdFNwZWNpYWxFZmZlY3RCeUdyb3VwU2l6ZShncm91cFNpemU6IG51bWJlcik6IHsgZWZmZWN0OiBTcGVjaWFsRWZmZWN0OyByYWRpdXM/OiBudW1iZXIgfSB7XG4gICAgaWYgKGdyb3VwU2l6ZSA+PSA1ICYmIGdyb3VwU2l6ZSA8PSA2KSB7XG4gICAgICBjb25zdCBlZmZlY3RzID0gW1NwZWNpYWxFZmZlY3QuQ2xlYXJSb3csIFNwZWNpYWxFZmZlY3QuQ2xlYXJDb2x1bW5dO1xuICAgICAgcmV0dXJuIHsgZWZmZWN0OiBlZmZlY3RzW3RoaXMucm5nLm5leHRJbnQoZWZmZWN0cy5sZW5ndGgpXSB9O1xuICAgIH0gZWxzZSBpZiAoZ3JvdXBTaXplID49IDcgJiYgZ3JvdXBTaXplIDw9IDgpIHtcbiAgICAgIHJldHVybiB7IGVmZmVjdDogU3BlY2lhbEVmZmVjdC5Cb21iUmFkaXVzLCByYWRpdXM6IDEgfTtcbiAgICB9IGVsc2UgaWYgKGdyb3VwU2l6ZSA+PSA5KSB7XG4gICAgICByZXR1cm4geyBlZmZlY3Q6IFNwZWNpYWxFZmZlY3QuQ2xlYXJCb2FyZCB9O1xuICAgIH1cbiAgICByZXR1cm4geyBlZmZlY3Q6IFNwZWNpYWxFZmZlY3QuQ2xlYXJSb3cgfTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEVtcHR5KCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5jb25maWcuY29sczsgeCsrKSB7XG4gICAgICBjb25zdCBjb2w6IENlbGxbXSA9IFtdO1xuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmNvbmZpZy5yb3dzOyB5KyspIGNvbC5wdXNoKG51bGwpO1xuICAgICAgdGhpcy5ncmlkLnB1c2goY29sKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluQm91bmRzKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHggPj0gMCAmJiB4IDwgdGhpcy5jb25maWcuY29scyAmJiB5ID49IDAgJiYgeSA8IHRoaXMuY29uZmlnLnJvd3M7XG4gIH1cblxuICBwcml2YXRlIG5laWdoYm9yczQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBWZWMyaVtdIHtcbiAgICBjb25zdCBvdXQ6IFZlYzJpW10gPSBbXTtcbiAgICBpZiAodGhpcy5pbkJvdW5kcyh4IC0gMSwgeSkpIG91dC5wdXNoKHsgeDogeCAtIDEsIHkgfSk7XG4gICAgaWYgKHRoaXMuaW5Cb3VuZHMoeCArIDEsIHkpKSBvdXQucHVzaCh7IHg6IHggKyAxLCB5IH0pO1xuICAgIGlmICh0aGlzLmluQm91bmRzKHgsIHkgLSAxKSkgb3V0LnB1c2goeyB4LCB5OiB5IC0gMSB9KTtcbiAgICBpZiAodGhpcy5pbkJvdW5kcyh4LCB5ICsgMSkpIG91dC5wdXNoKHsgeCwgeTogeSArIDEgfSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZVZpc2l0ZWQoKTogYm9vbGVhbltdW10ge1xuICAgIGNvbnN0IHZpc2l0ZWQ6IGJvb2xlYW5bXVtdID0gW107XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbmZpZy5jb2xzOyB4KyspIHtcbiAgICAgIGNvbnN0IGNvbDogYm9vbGVhbltdID0gW107XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuY29uZmlnLnJvd3M7IHkrKykgY29sLnB1c2goZmFsc2UpO1xuICAgICAgdmlzaXRlZC5wdXNoKGNvbCk7XG4gICAgfVxuICAgIHJldHVybiB2aXNpdGVkO1xuICB9XG59XG4iXX0=