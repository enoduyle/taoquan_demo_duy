(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/ExtendScripts/ExtendSlotSymbol.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '646aaocmCFINqLgewwc/hb6', 'ExtendSlotSymbol', __filename);
// cc-common/cc-slot-base-test/ExtendScripts/ExtendSlotSymbol.js

"use strict";

var DIM_COLOR = new cc.Color(100, 100, 100);
var WHITE_COLOR = cc.Color.WHITE;

cc.Class({
    extends: require('SlotSymbol'),

    properties: {
        blurNamePrefix: ""
    },

    onLoad: function onLoad() {
        this._super();
        this.node.on("INIT_FOR_PAYLINE", this.initForPayline, this);
    },
    initForPayline: function initForPayline() {
        var isAnimated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this._isAnimated = isAnimated;
    },
    changeToBlurSymbol: function changeToBlurSymbol(symbolName) {
        this._super(this.blurNamePrefix + symbolName);
    },
    blinkHighlight: function blinkHighlight() {
        this.node.opacity = 255;
        this.staticSymbol.active = true;
        this.staticSymbol.color = WHITE_COLOR;
    },
    enableHighlight: function enableHighlight() {
        this.node.active = true;
        this.staticSymbol.color = WHITE_COLOR;
        this.staticSymbol.active = !this._isAnimated;
    },
    disableHighlight: function disableHighlight() {
        this.staticSymbol.color = DIM_COLOR;
    },
    reset: function reset() {
        this.staticSymbol.color = WHITE_COLOR;
        this.staticSymbol.active = true;
        this.staticSymbol.opacity = 255;
        this.node.opacity = 255;
        this._isPlayAnim = false;
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
        //# sourceMappingURL=ExtendSlotSymbol.js.map
        