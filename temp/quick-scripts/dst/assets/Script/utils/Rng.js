
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