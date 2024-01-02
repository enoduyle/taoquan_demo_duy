(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/viewComponent/MakePersistent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '826fdH5qMJAv5mlM0oCW7VW', 'MakePersistent', __filename);
// cc-common/cc-share-v1/common/viewComponent/MakePersistent.js

"use strict";

cc.Class({
    extends: cc.Component,

    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
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
        //# sourceMappingURL=MakePersistent.js.map
        