(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/GameModeBasic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4e10cNEhKlAZa0yU+eUIapC', 'GameModeBasic', __filename);
// cc-common/cc-slotbase-v2/component/GameModeBasic.js

'use strict';

cc.Class({
    extends: cc.Component,
    properties: {
        winAmount: cc.Node,
        introTips: cc.Node
    },
    onLoad: function onLoad() {
        this.node.hide = this.hide.bind(this);
        this.node.show = this.show.bind(this);
        this.node.getWinAmount = this.getWinAmount.bind(this);
        this.node.on("HIDE_INTRO", this.hideIntro.bind(this));
    },
    getWinAmount: function getWinAmount() {
        return this.winAmount;
    },
    hide: function hide() {
        this.node.emit('GAME_HIDE');
        this.node.active = false;
    },
    show: function show() {
        this.node.emit('GAME_SHOW');
        this.node.active = true;
        this.node.opacity = 255;
    },
    hideIntro: function hideIntro() {
        this.introTips && this.introTips.emit("HIDE_INTRO");
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameModeBasic.js.map
        