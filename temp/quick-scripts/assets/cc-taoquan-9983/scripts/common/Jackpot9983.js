(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/Jackpot9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ca674AbvKxBqIvzqWXVu/Ri', 'Jackpot9983', __filename);
// cc-taoquan-9983/scripts/common/Jackpot9983.js

"use strict";

cc.Class({
    extends: require('Jackpot'),

    properties: {},

    onLoad: function onLoad() {
        this._super();
        this.node.on("UPDATE_VALUE_JACKPOT", this.updateValueJP, this);
    },
    renderJackpot: function renderJackpot() {
        if (this.isPausedJP) return;
        this.renderJP({
            node: this.grand,
            value: this.jackpotData[this.JP_Names[0]]
        });
        this.renderJP({
            node: this.major,
            value: this.jackpotData[this.JP_Names[1]]
        });
    },
    updateValueJP: function updateValueJP() {
        var isGrand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var value = arguments[1];

        if (isGrand) {
            this.renderJP({
                node: this.grand,
                value: value,
                time: 100
            });
        } else {
            this.renderJP({
                node: this.major,
                value: value,
                time: 100
            });
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
        //# sourceMappingURL=Jackpot9983.js.map
        