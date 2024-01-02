"use strict";
cc._RF.push(module, '95123Wa+RZM4KRAOga26XVi', 'globalState');
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