"use strict";
cc._RF.push(module, 'f7164pb+2xM+p9Efub/+/nJ', 'LoadLanguageSceneH');
// cc-common/cc-slotbase-v2/g9000/LoadLanguageSceneH.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this._updateLanguageConfig();
    },
    _updateLanguageConfig: function _updateLanguageConfig() {
        this.languageCode = this._getLanguage();
        window.languageCode = this.languageCode;
    },
    _getLanguage: function _getLanguage() {
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC.LOGIN_IFRAME;

        var defaultLanguage = window.defaultLanguage || 'VI';
        var language = '';
        if (LOGIN_IFRAME) {
            if (!CC_PREVIEW) {
                var folderLanguage = settings ? settings.folderLanguage : undefined;
                if (folderLanguage && folderLanguage !== 'all') {
                    //priority get folder language on preprod
                    language = folderLanguage;
                }
            }
        } else {
            language = cc.sys.localStorage.getItem('l') || defaultLanguage;
        }
        return language.toUpperCase();
    }
});

cc._RF.pop();