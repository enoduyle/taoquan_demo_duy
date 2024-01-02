(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-network/authenPusher.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3aba4KDU2dLSLL0zKhv+Jh7', 'authenPusher', __filename);
// cc-common/cc-network/authenPusher.js

'use strict';

function connectingPusher() {
    var globalNetwork = require('globalNetwork');
    var settingPusher = function settingPusher(_ref) {
        var token = _ref.token;
        var loginSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            USER_TOKEN = _loadConfigAsync$getC.USER_TOKEN;

        cc.sys.localStorage.setItem(USER_TOKEN, token);
        loginSuccess();
    };
    var leavePusher = function leavePusher() {
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC2 = loadConfigAsync.getConfig(),
            USER_TOKEN = _loadConfigAsync$getC2.USER_TOKEN;

        cc.sys.localStorage.setItem(USER_TOKEN, "");
        globalNetwork.triggerUserLogout();
    };
    return {
        settingPusher: settingPusher,
        leavePusher: leavePusher
    };
}

module.exports = new connectingPusher();

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
        //# sourceMappingURL=authenPusher.js.map
        