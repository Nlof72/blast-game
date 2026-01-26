
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