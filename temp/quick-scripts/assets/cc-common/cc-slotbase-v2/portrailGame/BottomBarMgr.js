(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/portrailGame/BottomBarMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1326eTUqg9M+IjCIzpVNc8/', 'BottomBarMgr', __filename);
// cc-common/cc-slotbase-v2/portrailGame/BottomBarMgr.js

'use strict';

var TweenView = require('TweenView');
cc.Class({
    extends: TweenView,

    properties: {
        movingGroup: cc.Node
    },

    show: function show() {
        var onStartCB = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var onCompleteCB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (this.movingGroup) {
            this.movingGroup.show();
        }
        this._super(onStartCB, onCompleteCB);
    },
    hide: function hide() {
        var onStartCB = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var onCompleteCB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (this.movingGroup) {
            this.movingGroup.hide();
        }
        this._super(onStartCB, onCompleteCB);
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
        //# sourceMappingURL=BottomBarMgr.js.map
        