cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad() {
        this._updateLanguageConfig();
    },

    _updateLanguageConfig() {
        this.languageCode = this._getLanguage();
        window.languageCode = this.languageCode;
    },
    _getLanguage() {
        const loadConfigAsync = require('loadConfigAsync');
        const { LOGIN_IFRAME } = loadConfigAsync.getConfig();
        const defaultLanguage = window.defaultLanguage || 'VI';
        let language = '';
        if (LOGIN_IFRAME) {
            if (!CC_PREVIEW) {
                const folderLanguage = settings ? settings.folderLanguage : undefined;
                if (folderLanguage && folderLanguage !== 'all') { //priority get folder language on preprod
                    language = folderLanguage;
                }
            }
        } else {
            language = cc.sys.localStorage.getItem('l') || defaultLanguage;
        }
        return language.toUpperCase();
    },
});
