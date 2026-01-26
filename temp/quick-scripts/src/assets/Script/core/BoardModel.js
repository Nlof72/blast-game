"use strict";
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