(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/BetHistory/BetLineHistory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'eae645GvHdCM64S9+pQlnjt', 'BetLineHistory', __filename);
// cc-common/cc-slotbase-v2/slotGame/BetHistory/BetLineHistory.js

'use strict';

var ENABLE_COLOR = new cc.Color(255, 255, 255);
var DISABLE_COLOR = new cc.Color(100, 100, 100);

cc.Class({
    extends: cc.Component,

    properties: {
        lines: [cc.Node]
    },
    onLoad: function onLoad() {
        this.reset();
        this.node.on('SHOW_BET_LINE', this.showBetLine, this);
    },
    showBetLine: function showBetLine(betLine) {
        var _this = this;

        this.reset();
        var betLines = betLine ? betLine.replace('[', '').replace(']', '').replace(/ /g, '').split(',') : [];
        betLines.forEach(function (line) {
            _this.lines[line - 1].color = ENABLE_COLOR;
        });
    },
    reset: function reset() {
        this.lines.forEach(function (line) {
            line.color = DISABLE_COLOR;
        });
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
        //# sourceMappingURL=BetLineHistory.js.map
        