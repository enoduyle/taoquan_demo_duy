(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/gui/betLines/BetLineNumber.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ae899n1O0JAI5GjpBArx5aF', 'BetLineNumber', __filename);
// cc-common/cc-slotbase-v2/gui/betLines/BetLineNumber.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        background: cc.Node,
        label: cc.Label
    },

    setActiveBackground: function setActiveBackground(isActive) {
        this.background.active = isActive;
    },
    setText: function setText() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        this.label.string = text;
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
        //# sourceMappingURL=BetLineNumber.js.map
        