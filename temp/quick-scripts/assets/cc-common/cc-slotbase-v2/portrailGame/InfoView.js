(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/portrailGame/InfoView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c804cUhtwtATp/LCquvXUfy', 'InfoView', __filename);
// cc-common/cc-slotbase-v2/portrailGame/InfoView.js

'use strict';

cc.Class({
    extends: require('BaseViewPopup'),

    properties: {
        scrollView: cc.ScrollView
    },

    enter: function enter() {
        this._super();
        if (this.scrollView) {
            this.scrollView.scrollToTop();
        }
    },
    exit: function exit() {
        this._super();
        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
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
        //# sourceMappingURL=InfoView.js.map
        