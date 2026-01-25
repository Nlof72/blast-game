"use strict";
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