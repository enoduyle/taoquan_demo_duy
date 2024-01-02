"use strict";
cc._RF.push(module, '3aba4KDU2dLSLL0zKhv+Jh7', 'authenPusher');
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