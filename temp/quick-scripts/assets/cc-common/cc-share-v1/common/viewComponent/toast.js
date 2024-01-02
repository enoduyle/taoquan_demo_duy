(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/viewComponent/toast.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3cc91pRNydNL5bAHO3LpyB0', 'toast', __filename);
// cc-common/cc-share-v1/common/viewComponent/toast.js

'use strict';

cc.Class({
    extends: cc.Component,
    // use this for initialization
    init: function init(data) {
        this.getComponent(cc.RichText).string = data;
        this.getComponent(cc.Animation).play('toastMoving');
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
        //# sourceMappingURL=toast.js.map
        