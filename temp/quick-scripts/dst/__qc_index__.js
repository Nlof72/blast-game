
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