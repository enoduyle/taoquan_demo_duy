(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/shareServices/loadConfigAsync.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aed49QVHF1DsZkTyHIUzoLl', 'loadConfigAsync', __filename);
// cc-common/cc-share-v1/shareServices/loadConfigAsync.js

'use strict';

/* global globalDomainSupport,Sentry, CC_DEV */

var serviceRest = require('serviceRest');
var lodash = require('lodash');
var appConfig = require('appConfig');
var XOCypher = require("XOCypher");

var decryptData = function decryptData(data) {
    var keyEncrypt = 'Không Biết Đặt Tên Gì';
    if (data.IS_DECODE) {
        Object.keys(data).forEach(function (key) {
            if (key === 'API_URL' || key === 'SOCKET_URL' || key.indexOf('IPMaster') > -1) {
                if (lodash.isArray(data[key])) {
                    for (var i = 0; i < data[key].length; i++) {
                        data[key][i] = XOCypher.decode(keyEncrypt, data[key][i]);
                    }
                } else {
                    data[key] = XOCypher.decode(keyEncrypt, data[key]);
                }
            }
        });
    }
    delete data.IS_DECODE;
    return data;
};

function loadConfigAsync() {
    var _this = this;

    this.dataUpdate = lodash.cloneDeep(appConfig);
    var isDebugMode = cc.sys.isBrowser && window.location.hostname === 'localhost';

    if (this.dataUpdate.REMOTE_CONFIG_URL_FULL && !cc.sys.isBrowser && !isDebugMode) {
        setTimeout(function () {
            serviceRest.get({
                apiUrl: _this.dataUpdate.REMOTE_CONFIG_URL_FULL,
                url: '',
                callback: handleDataSuccess.bind(_this),
                callbackErr: handleDataError.bind(_this)
            });
        }, 100);
    } else if (this.dataUpdate.REMOTE_CONFIG_URL_FULL && cc.sys.isBrowser && !isDebugMode) {
        setTimeout(function () {
            serviceRest.getRawDataWeb({
                fullURL: _this.dataUpdate.REMOTE_CONFIG_URL_FULL,
                callback: handleDataSuccess.bind(_this),
                callbackErr: handleDataError.bind(_this)
            });
        }, 100);
    } else if (this.dataUpdate.REMOTE_CONFIG_URL && cc.sys.isBrowser && !isDebugMode) {
        if (window && window.dataConfigM) {
            this.dataUpdate = lodash.cloneDeep(window.dataConfigM);
            this.dataUpdate = decryptData(this.dataUpdate);
            this.dataUpdateProd = lodash.cloneDeep(this.dataUpdate);
            cc.sys.localStorage.setItem('appConfigLocalStore', JSON.stringify(this.dataUpdateProd));
            this.dataUpdate.IS_FINISHED_REMOTE = true;
        } else {
            var timeStampBuild = window.buildTime ? parseInt(window.buildTime) : new Date().getTime();
            setTimeout(function () {
                var domainName = typeof globalDomainSupport !== 'undefined' ? globalDomainSupport : window.location.origin;
                serviceRest.get({
                    apiUrl: domainName + _this.dataUpdate.REMOTE_CONFIG_URL,
                    params: { t: timeStampBuild },
                    url: '',
                    callback: handleDataSuccess.bind(_this),
                    callbackErr: handleDataError.bind(_this)
                });
            }, 100);
        }
    } else {
        if (cc.sys.localStorage.getItem("enviroment") != null) {
            try {
                if (cc.sys.localStorage.getItem("enviroment").indexOf("test") >= 0) {
                    var appConfigDebug = require('appConfig-debug');
                    if (appConfigDebug) {
                        this.dataUpdate = lodash.cloneDeep(appConfigDebug);
                        this.dataUpdate = decryptData(this.dataUpdate);
                    } else {
                        this.dataUpdate = lodash.cloneDeep(appConfig);
                        this.dataUpdate = decryptData(this.dataUpdate);
                    }
                } else {
                    this.dataUpdate = lodash.cloneDeep(appConfig);
                    this.dataUpdate = decryptData(this.dataUpdate);
                }
            } catch (e) {
                this.dataUpdate = lodash.cloneDeep(appConfig);
                this.dataUpdate = decryptData(this.dataUpdate);
            }
        } else {
            this.dataUpdate = lodash.cloneDeep(appConfig);
            this.dataUpdate = decryptData(this.dataUpdate);
        }
        this.dataUpdate.IS_FINISHED_REMOTE = true;
    }

    var handleDataSuccess = function handleDataSuccess(data) {
        _this.dataUpdate = lodash.cloneDeep(data);
        _this.dataUpdate = decryptData(_this.dataUpdate);
        _this.dataUpdateProd = lodash.cloneDeep(_this.dataUpdate);
        cc.sys.localStorage.setItem('appConfigLocalStore', JSON.stringify(_this.dataUpdateProd));
        _this.dataUpdate.IS_FINISHED_REMOTE = true;
    };

    var handleDataError = function handleDataError() {
        var appConfigLocal = cc.sys.localStorage.getItem('appConfigLocalStore');
        if (appConfigLocal) {
            appConfigLocal = JSON.parse(appConfigLocal);
            _this.dataUpdate = lodash.cloneDeep(appConfigLocal);
        } else {
            _this.dataUpdate = lodash.cloneDeep(appConfig);
        }
        _this.dataUpdate = decryptData(_this.dataUpdate);
        _this.dataUpdateProd = lodash.cloneDeep(_this.dataUpdate);
        _this.dataUpdate.IS_FINISHED_REMOTE = true;
    };

    var getConfig = function getConfig() {
        _this.dataUpdate.TOKEN = _this.TOKEN;
        return _this.dataUpdate;
    };

    var switchEnv = function switchEnv(isProd) {
        if (isProd) {
            var _appConfig = require('appConfig');
            if (_this.dataUpdateProd) {
                _this.dataUpdate = lodash.cloneDeep(_this.dataUpdateProd);
            } else {
                _this.dataUpdate = lodash.cloneDeep(_appConfig);
            }
            _this.dataUpdate = decryptData(_this.dataUpdate);
            _this.dataUpdate.IS_FINISHED_REMOTE = true;
        } else {
            var _appConfigDebug = require('appConfig-debug');
            _this.dataUpdate = lodash.cloneDeep(_appConfigDebug);
            _this.dataUpdate = decryptData(_this.dataUpdate);
            _this.dataUpdate.IS_FINISHED_REMOTE = true;
        }
    };

    var setUpSentry = function setUpSentry() {
        var _dataUpdate = _this.dataUpdate,
            IS_PRODUCTION = _dataUpdate.IS_PRODUCTION,
            IS_SHOW_STATS = _dataUpdate.IS_SHOW_STATS;

        if (typeof Sentry !== 'undefined') {
            if (IS_PRODUCTION) {
                Sentry.init({ dsn: 'https://32ab507534bc4befbd5e1b20e223c93d@sentry.io/1780011' });
            } else {
                if (IS_SHOW_STATS) {
                    cc.debug.setDisplayStats(true);
                }
                Sentry.init({ dsn: 'https://b034a1c4d32e42af90071e62d2bf3290@sentry.io/2655786' });
            }
        }
    };

    var setToken = function setToken(token) {
        _this.TOKEN = token;
    };

    return {
        setToken: setToken,
        setUpSentry: setUpSentry,
        switchEnv: switchEnv,
        getConfig: getConfig
    };
}

module.exports = new loadConfigAsync();

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
        //# sourceMappingURL=loadConfigAsync.js.map
        