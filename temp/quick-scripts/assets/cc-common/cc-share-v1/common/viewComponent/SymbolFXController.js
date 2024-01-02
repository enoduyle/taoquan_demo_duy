(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/viewComponent/SymbolFXController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7b04b07SClFK44K0UO6g9Qw', 'SymbolFXController', __filename);
// cc-common/cc-share-v1/common/viewComponent/SymbolFXController.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        particleBotLeft: cc.Node,
        particleTopRight: cc.Node,
        effectDuration: 1,
        topLeft: cc.Vec2,
        topRight: cc.Vec2,
        botLeft: cc.Vec2,
        botRight: cc.Vec2
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var botLeftSeq = cc.sequence(cc.moveTo(this.effectDuration / 2, this.botRight).easing(cc.easeSineOut()), cc.moveTo(this.effectDuration / 2, this.topRight).easing(cc.easeSineOut()), cc.moveTo(this.effectDuration / 2, this.topLeft).easing(cc.easeSineOut()), cc.moveTo(this.effectDuration / 2, this.botLeft).easing(cc.easeSineOut()));
        var topRightSeq = cc.sequence(cc.moveTo(this.effectDuration / 2, this.topLeft).easing(cc.easeSineOut()), cc.moveTo(this.effectDuration / 2, this.botLeft).easing(cc.easeSineOut()), cc.moveTo(this.effectDuration / 2, this.botRight).easing(cc.easeSineOut()), cc.moveTo(this.effectDuration / 2, this.topRight).easing(cc.easeSineOut()));
        this._botleftAction = cc.repeatForever(botLeftSeq);
        this._topRightAction = cc.repeatForever(topRightSeq);
        this._isPlaying = false;
    },
    playEffect: function playEffect() {
        if (this._isPlaying) return;
        this.particleBotLeft.postion = this.botLeft;
        this.particleTopRight.postion = this.topRight;
        this.particleBotLeft.active = true;
        this.particleTopRight.active = true;

        this.particleBotLeft.runAction(this._botleftAction);
        this.particleTopRight.runAction(this._topRightAction);
        this._isPlaying = true;
    },
    stopEffect: function stopEffect() {
        if (this._isPlaying) {
            this.particleBotLeft.stopAction(this._botleftAction);
            this.particleTopRight.stopAction(this._topRightAction);
            this.particleBotLeft.active = false;
            this.particleTopRight.active = false;
            this._isPlaying = false;
        }
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
        //# sourceMappingURL=SymbolFXController.js.map
        