(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/globalState.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '95123Wa+RZM4KRAOga26XVi', 'globalState', __filename);
// cc-common/cc-share-v1/common/globalState.js

"use strict";

function globalState() {
    var _this = this;

    this.enableFirstSceneLoad = true;

    var getStatusFirstSceneLoad = function getStatusFirstSceneLoad() {
        return _this.enableFirstSceneLoad;
    };

    var setStatusFirstSceneLoad = function setStatusFirstSceneLoad(status) {
        _this.enableFirstSceneLoad = status;
    };

    return {
        getStatusFirstSceneLoad: getStatusFirstSceneLoad,
        setStatusFirstSceneLoad: setStatusFirstSceneLoad
    };
}

module.exports = new globalState();

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
        //# sourceMappingURL=globalState.js.map
        