(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-network/v3/connectNetworkV3.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '78a76bBbNBHWpmp8qvy+oN+', 'connectNetworkV3', __filename);
// cc-common/cc-network/v3/connectNetworkV3.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var globalNetwork = require('globalNetwork');

var _require = require('mock'),
    userText = _require.userText,
    pwText = _require.pwText;

var serviceRest = require('serviceRest');
var gameNetwork = window.GameNetwork || require('game-network');
var uuid = gameNetwork.lib.uuid;

var vjsb = window['vjsb'];
var tokenClient = '';

var CC_CMD = (_temp = _class = function () {
  function CC_CMD() {
    _classCallCheck(this, CC_CMD);
  }

  _createClass(CC_CMD, [{
    key: 'onSend',
    value: function onSend() {
      vjsb && vjsb.js2cMessage(JSON.stringify({
        cmd: CC_CMD.CMD_TEST,
        msg: this.msgTf.string
      }));
    }
  }, {
    key: 'sendGetToken',
    value: function sendGetToken() {
      vjsb && vjsb.js2cMessage(JSON.stringify({
        cmd: CC_CMD.CMD_AUTH
      }));
    }
  }, {
    key: 'sendGetSoundEnable',
    value: function sendGetSoundEnable() {
      vjsb && vjsb.js2cMessage(JSON.stringify({
        cmd: CC_CMD.CMD_GET_SOUND_ENABLE
      }));
    }
  }, {
    key: 'sendSetSoundEnable',
    value: function sendSetSoundEnable() {
      vjsb && vjsb.js2cMessage(JSON.stringify({
        cmd: CC_CMD.CMD_SET_SOUND_ENABLE,
        enable: true
      }));
    }
  }]);

  return CC_CMD;
}(), _class.CMD_HOME = 1, _class.CMD_TEST = 2, _class.CMD_AUTH = 3, _class.CMD_GET_SOUND_ENABLE = 4, _class.CMD_SET_SOUND_ENABLE = 5, _class.CMD_GET_MUSIC_ENABLE = 6, _class.CMD_SET_MUSIC_ENABLE = 7, _temp);


if (vjsb) vjsb.c2jsMessage = function (msg) {
  cc.log('c2jsMessage: ' + msg);
  var jso = JSON.parse(msg);
  switch (jso.cmd) {
    case CC_CMD.CMD_AUTH:
      cc.log('token: ' + jso.token);
      tokenClient = jso.token;
      cc.sys.localStorage.setItem('user_token', tokenClient);
      break;
    case CC_CMD.CMD_GET_SOUND_ENABLE:
      cc.log('enable: ' + jso.enable);
      break;
    case CC_CMD.CMD_GET_MUSIC_ENABLE:
      cc.log('enable: ' + jso.enable);
      break;
  }
};
var bridgeAppClient = new CC_CMD();
bridgeAppClient.sendGetToken();

cc.Class({
  getToken: function getToken() {
    var loadConfigAsync = require('loadConfigAsync');

    var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
        LOGIN_IFRAME = _loadConfigAsync$getC.LOGIN_IFRAME,
        URL_TOKEN = _loadConfigAsync$getC.URL_TOKEN,
        USER_TOKEN = _loadConfigAsync$getC.USER_TOKEN,
        TOKEN = _loadConfigAsync$getC.TOKEN;

    var token = '';
    // if (vjsb && tokenClient) {
    //     token = tokenClient;
    // }
    // else
    if (TOKEN) {
      token = TOKEN;
    } else if (LOGIN_IFRAME) {
      var _require2 = require('gameCommonUtils'),
          getUrlParam = _require2.getUrlParam,
          addUrlParam = _require2.addUrlParam;

      var TRIAL_PARAM = 'trialMode';

      var trialMode = false;
      token = getUrlParam(URL_TOKEN);
      trialMode = getUrlParam(TRIAL_PARAM) === 'true';
      if (!token && trialMode) {
        token = 'tr-' + uuid();
        addUrlParam('token', token);
      }
      cc.sys.localStorage.setItem(USER_TOKEN, token);
    } else if (typeof window !== 'undefined' && typeof window['__Game_Bridge'] !== 'undefined' && typeof window['__Game_Bridge'].getUSS === 'function') {
      token = window['__Game_Bridge'].getUSS();
    } else {
      token = cc.sys.localStorage.getItem(USER_TOKEN);
    }
    token = 'mob97';
    return token;
  },
  getRefreshToken: function getRefreshToken() {
    var loadConfigAsync = require('loadConfigAsync');

    var _loadConfigAsync$getC2 = loadConfigAsync.getConfig(),
        LOGIN_IFRAME = _loadConfigAsync$getC2.LOGIN_IFRAME,
        _loadConfigAsync$getC3 = _loadConfigAsync$getC2.URL_REFRESH_TOKEN,
        URL_REFRESH_TOKEN = _loadConfigAsync$getC3 === undefined ? 'refresh-token' : _loadConfigAsync$getC3,
        _loadConfigAsync$getC4 = _loadConfigAsync$getC2.USER_REFRESH_TOKEN,
        USER_REFRESH_TOKEN = _loadConfigAsync$getC4 === undefined ? 'user-refresh-token' : _loadConfigAsync$getC4;

    var refreshToken = '';
    if (LOGIN_IFRAME) {
      var _require3 = require('gameCommonUtils'),
          getUrlParam = _require3.getUrlParam;

      refreshToken = getUrlParam(URL_REFRESH_TOKEN);
      cc.sys.localStorage.setItem(USER_REFRESH_TOKEN, refreshToken);
    } else {
      refreshToken = cc.sys.localStorage.getItem(USER_REFRESH_TOKEN);
    }
    return refreshToken;
  },
  loginScene: function loginScene(_ref) {
    var _this = this;

    var _callback = _ref.callback,
        gameId = _ref.gameId,
        userIndex = _ref.userIndex,
        callbackAuthFailed = _ref.callbackAuthFailed;

    // cc.log("Login using V3");
    var loadConfigAsync = require('loadConfigAsync');

    var _loadConfigAsync$getC5 = loadConfigAsync.getConfig(),
        IS_FINISHED_REMOTE = _loadConfigAsync$getC5.IS_FINISHED_REMOTE,
        DEV_ENV = _loadConfigAsync$getC5.DEV_ENV,
        USER_TOKEN = _loadConfigAsync$getC5.USER_TOKEN;

    cc.log('Login using V3', cc.sys.localStorage.getItem(USER_TOKEN));
    cc.log('Login using V3', vjsb);
    cc.log('Login using V3', tokenClient);

    // if (vjsb && !cc.sys.localStorage.getItem(USER_TOKEN)) {
    //     setTimeout(() => {
    //         this.loginScene({callback, gameId, userIndex, callbackAuthFailed});
    //     }, 100);
    //     return;
    // } else
    if (!IS_FINISHED_REMOTE) {
      setTimeout(function () {
        _this.loginScene({ callback: _callback, gameId: gameId, userIndex: userIndex, callbackAuthFailed: callbackAuthFailed });
      }, 100);
      return;
    }
    this.gameId = gameId;
    var token = this.getToken();

    var _loadConfigAsync$getC6 = loadConfigAsync.getConfig(),
        LOGIN_IFRAME = _loadConfigAsync$getC6.LOGIN_IFRAME;

    var envId = LOGIN_IFRAME ? 'iframe' : 'portal';
    var gameIdSocket = LOGIN_IFRAME ? gameId : 'all';
    // token = '2f8b65390e1d19c38e86394bb6b928c2';
    if (token || !DEV_ENV) {
      if (token) {
        globalNetwork.init(token, envId, gameIdSocket);
        _callback();
      } else {
        callbackAuthFailed();
      }
    } else {
      var dataPost = {
        userName: userText,
        password: pwText,
        fingerPrint: 'test'
      };
      if (cc.USER_INDEX) {
        dataPost = {
          userName: 'user' + cc.USER_INDEX,
          password: 'pwduser' + cc.USER_INDEX,
          fingerPrint: 'test'
        };
      }
      serviceRest.post({
        url: 'auth/login',
        data: dataPost,
        callback: function callback(_ref2) {
          var data = _ref2.data;

          cc.sys.localStorage.setItem(USER_TOKEN, data.data.token);
          globalNetwork.init(data.data.token, '', envId, gameIdSocket);
          _callback();
        },
        callbackErr: function callbackErr() {
          callbackAuthFailed && callbackAuthFailed();
        }
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
        //# sourceMappingURL=connectNetworkV3.js.map
        