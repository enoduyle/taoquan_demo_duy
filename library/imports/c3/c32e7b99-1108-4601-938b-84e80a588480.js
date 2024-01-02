"use strict";
cc._RF.push(module, 'c32e7uZEQhGAZOLhOgKWISA', 'MonoUpdate');
// cc-common/cc-share-v1/Flutter/MonoUpdate.js

"use strict";

/* global jsb */
var MD5 = require("jsb_runtime_md5");

var HOTUPDATE_STATUS = {
    GET_CONFIG: "GET_CONFIG",
    CHECK_UPDATE: "CHECK_UPDATE",
    READY_TO_UPDATE: "READY_TO_UPDATE",
    UPDATING: "UPDATING",
    UPDATE_FAILED: 'UPDATE_FAILED',
    ALREADY_UP_TO_DATE: "ALREADY_UP_TO_DATE",
    UPDATE_SUCCESS: "UPDATE_SUCCESS"
};

var NETWORK_STATUS = {
    CONNECTED: "CONNECTED",
    DISCONNECTED: "DISCONNECTED"
};

var LOCAL_KEY = "HOT_UPDATE_URL";
cc.Class({
    extends: cc.Component,

    properties: {
        manifestUrl: {
            type: cc.Asset,
            default: null
        },
        panel: cc.Node,
        info: cc.Label,
        detail: cc.Label,
        network: cc.Label,
        byteProgress: cc.ProgressBar,
        byteLabel: cc.Label,
        btnRetry: cc.Node,
        btnQuit: cc.Node,
        loadSceneName: '',
        gameId: {
            default: '',
            serializable: true
        },
        _am: null,
        _storagePath: '',
        _oldV: '',
        _newV: '',
        _remoteURL: '',
        _localManifestPath: '',
        _localKey: ''

    },

    onLoad: function onLoad() {
        // Hot update is only available in Native build
        if (!cc.sys.isNative) {
            return;
        }

        this._retryInfo = {
            reConnectInterval: null,
            reconnectCount: 0,
            downloadFailedAssetsInterval: null,
            downloadFailedAssetsCount: 0,
            reconnectionDelay: 3000,
            downloadFailedAssetsDelay: 3000,
            maxOfCount: 3
        };
        this._localKey = LOCAL_KEY + this.gameId;
        this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + this.gameId;
        this.log('Storage path for remote asset : ' + this._storagePath);

        // Init with empty manifest url for testing custom manifest

        //Find local manifest path
        this._localManifestPath = this.manifestUrl.nativeUrl;
        if (cc.loader.md5Pipe) {
            this._localManifestPath = cc.loader.md5Pipe.transformURL();
        }

        this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle.bind(this));
        this._am.setVerifyCallback(this._verifyFileHandle.bind(this));

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            this._am.setMaxConcurrentTask(2);
        } else {
            this._am.setMaxConcurrentTask(6);
        }
        this.reset();
        this.getConfig();
    },


    /**
     * Function for retrieving the remote config
     */
    getConfig: function getConfig() {
        var _this = this;

        this.panel.active = false;
        this.updateState(HOTUPDATE_STATUS.GET_CONFIG);
        if (this.isConnected()) {
            this.updateNetworkState(NETWORK_STATUS.CONNECTED);
            if (cc.sys.getNetworkType() === cc.sys.NetworkType.WWAN) {
                this.network.string = "Bạn đang kết nối dữ liêu di động";
                this.network.node.color = cc.Color.YELLOW;
                this.network.node.active = true;
            }
            var loadConfigAsync = require('loadConfigAsync');
            var CONFIG = loadConfigAsync.getConfig();
            var USER_TOKEN = CONFIG.USER_TOKEN,
                IS_FINISHED_REMOTE = CONFIG.IS_FINISHED_REMOTE,
                HOT_UPDATE_URL = CONFIG.HOT_UPDATE_URL;

            if (!IS_FINISHED_REMOTE) {
                setTimeout(function () {
                    _this.getConfig();
                }, 100);
                return;
            }
            var gameToken = void 0;
            gameToken = this.getParamFlutter('getGameToken');
            cc.sys.localStorage.setItem(USER_TOKEN, gameToken);
            this._remoteURL = HOT_UPDATE_URL;
            this.checkModifyManifest();
        } else {
            this.updateNetworkState(NETWORK_STATUS.DISCONNECTED);
            this.reconnectNetwork(function () {
                _this.updateNetworkState(NETWORK_STATUS.CONNECTED);
                _this.getConfig();
            });
        }
    },

    /**
     * Compare remote hot update url with local one
     * if local manifest does not exist, create one
     */
    checkModifyManifest: function checkModifyManifest() {
        var tempUpdateUrl = cc.sys.localStorage.getItem(this._localKey);
        if (!tempUpdateUrl) {
            var localManifest = jsb.fileUtils.getStringFromFile(this._localManifestPath);
            var manifestObject = JSON.parse(localManifest);
            cc.sys.localStorage.setItem(this._localKey, manifestObject.packageUrl);
        }
        tempUpdateUrl = cc.sys.localStorage.getItem(this._localKey);
        //Only modify manifest file if remote URL is changed
        if (this._remoteURL && tempUpdateUrl !== this._remoteURL) {
            this.modifyAppLoadUrlForManifestFile();
        } else {
            this.checkUpdate();
        }
    },

    /**
     * Modify the .manifest file
     * There are 2 cases that need to be mentioned: init package and updated game
     * In devices that update at least once, project.manifest will be stored in hot update directory
     * In init package, there will be no project.manifest file in storage path (this._storagePath)
     */
    modifyAppLoadUrlForManifestFile: function modifyAppLoadUrlForManifestFile() {
        try {
            var afterString = void 0,
                manifestObject = void 0;
            if (jsb.fileUtils.isFileExist(this._storagePath + '/project.manifest')) {
                var loadManifest = jsb.fileUtils.getStringFromFile(this._storagePath + '/project.manifest');
                manifestObject = JSON.parse(loadManifest);
            } else {
                if (!jsb.fileUtils.isDirectoryExist(this._storagePath)) jsb.fileUtils.createDirectory(this._storagePath);
                var originManifest = jsb.fileUtils.getStringFromFile(this._localManifestPath);
                manifestObject = JSON.parse(originManifest);
            }
            manifestObject.packageUrl = this._remoteURL;
            manifestObject.remoteManifestUrl = manifestObject.packageUrl + this.gameId + "/project.manifest";
            manifestObject.remoteVersionUrl = manifestObject.packageUrl + this.gameId + "/version.manifest";
            afterString = JSON.stringify(manifestObject);
            var isWritten = jsb.fileUtils.writeStringToFile(afterString, this._storagePath + '/project.manifest');
            if (isWritten) {
                cc.sys.localStorage.setItem(this._localKey, this._remoteURL);
            }
            // Init with empty manifest url for testing custom manifest
            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                var manifest = new jsb.Manifest(afterString, this._storagePath);
                this._am.loadLocalManifest(manifest, this._storagePath);
                this.log('Successfully load remote manifest');
            }
            this.checkUpdate();
        } catch (error) {
            this.log("Error modify manifest!! See Error -> " + error);
        }
    },
    getParamFlutter: function getParamFlutter(param) {
        var value = '';
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            value = jsb.reflection.callStaticMethod("com/base/getx/base_architecture/game/PlayGameActivity", param, "()Ljava/lang/String;");
            // value = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", param, "()Ljava/lang/String;");
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            value = jsb.reflection.callStaticMethod("AppController", param);
        }
        return value;
    },
    formatBytes: function formatBytes(bytes) {
        return (bytes / 1048576).toFixed(2) + "MB";
    },
    checkUpdate: function checkUpdate() {
        this.log("checkUpdate");
        if (!this._am) {
            this.log("Asset manager not found!");
        }
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            // Resolve md5 url
            this.log('Load local manifest');
            this._am.loadLocalManifest(this._localManifestPath);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            this.log("unable to get manifest");
            this.initLocalManifestFailed();
            return;
        }
        this._am.setEventCallback(this.checkCb.bind(this));
        this._am.checkUpdate();
        this.updateState(HOTUPDATE_STATUS.CHECK_UPDATE);
    },
    checkCb: function checkCb(event) {
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.getLocalManifestFailed();
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.downloadManifestFailed();
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.updateState(HOTUPDATE_STATUS.ALREADY_UP_TO_DATE);
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this.updateState(HOTUPDATE_STATUS.READY_TO_UPDATE);
                break;
            default:
                return;
        }
        this._am.setEventCallback(null);
    },
    hotUpdate: function hotUpdate() {
        if (this._am) {
            this._am.setEventCallback(this.updateCb.bind(this));
            this._am.update();
            this.updateState(HOTUPDATE_STATUS.UPDATING);
            this.network.string = "";
            this.network.node.active = false;
        }
    },
    updateState: function updateState(stateName) {
        var _this2 = this;

        this.log('Current state: ' + stateName);
        this._state = stateName;
        this.btnRetry.active = false;
        this.btnQuit.active = false;
        switch (this._state) {
            case HOTUPDATE_STATUS.GET_CONFIG:
                this.info.string = "Kiểm tra phiên bản";
                this.detail.string = "\nĐang kiểm tra phiên bản.";
                this.detail.node.active = true;
                break;
            case HOTUPDATE_STATUS.CHECK_UPDATE:
                this.info.string = "Kiểm tra phiên bản";
                this.detail.string = "\nĐang kiểm tra phiên bản.";
                this.detail.node.active = true;
                break;
            case HOTUPDATE_STATUS.READY_TO_UPDATE:
                {
                    this.panel.active = true;
                    // this.btnQuit.active = true;
                    var totalSize = this.calculateTotalSize();
                    this.info.string = "Có phiên bản cập nhật mới";
                    this.byteProgress.progress = 0;
                    var detailStr = "Phiên bản cũ: " + this._oldV + " | Phiên bản mới: " + this._newV + "\n" + "Dung lượng tải: " + totalSize;
                    this.detail.string = detailStr;
                    this.detail.node.active = true;
                    this.scheduleOnce(this.hotUpdate, 0.5);
                    break;
                }
            case HOTUPDATE_STATUS.UPDATING:
                this.info.string = "Đang cập nhật";
                this.detail.string = "Đang tải bản cập nhật\nXin chờ trong giây lát";
                this.detail.node.active = false;
                break;
            case HOTUPDATE_STATUS.UPDATE_FAILED:
                if (!this.isConnected()) {
                    this.updateNetworkState(NETWORK_STATUS.DISCONNECTED);
                    this.reconnectNetwork(function () {
                        _this2.updateNetworkState(NETWORK_STATUS.CONNECTED);
                        _this2.updateState(HOTUPDATE_STATUS.UPDATING);
                        _this2._am.downloadFailedAssets();
                        _this2.btnQuit.active = false;
                    });
                } else {
                    if (this._retryInfo.downloadFailedAssetsCount === 0) {
                        this.downloadFailedAssetsInterval();
                    } else {
                        this._retryInfo.downloadFailedAssetsCount++;
                        if (this._retryInfo.downloadFailedAssetsCount > this._retryInfo.maxOfCount) {
                            this.btnRetry.active = true;
                            this.btnQuit.active = true;
                        }
                    }
                }
                break;
            case HOTUPDATE_STATUS.ALREADY_UP_TO_DATE:
                this.onUpdateComplete();
                break;
            case HOTUPDATE_STATUS.UPDATE_SUCCESS:
                this._am.setEventCallback(null);
                this._updateListener = null;
                // Prepend the manifest's search path
                var searchPaths = jsb.fileUtils.getSearchPaths(); // eslint-disable-line
                var newPaths = this._am.getLocalManifest().getSearchPaths(); // eslint-disable-line
                // console.log(JSON.stringify(newPaths));
                Array.prototype.unshift.apply(searchPaths, newPaths);
                // This value will be retrieved and appended to the default search path during game startup,
                // please refer to samples/js-tests/main.js for detailed usage.
                // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
                cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
                jsb.fileUtils.setSearchPaths(searchPaths);

                cc.audioEngine.stopAll();
                cc.game.restart();
                break;
        }
    },
    updateNetworkState: function updateNetworkState(stateName) {
        this._netWorkState = stateName;
        switch (this._netWorkState) {
            case NETWORK_STATUS.CONNECTED:
                this.network.string = "";
                this.network.node.active = false;
                break;
            case NETWORK_STATUS.DISCONNECTED:
                this.network.string = "Không có kết nối...";
                this.network.node.active = true;
                this.network.node.color = new cc.Color(219, 53, 53, 255);

                break;
        }
    },
    initLocalManifestFailed: function initLocalManifestFailed() {
        var _this3 = this;

        this.log("initLocalManifestFailed " + this._state);
        this.btnRetry.active = false;
        this.btnQuit.active = false;
        this.info.string = "Kiểm tra phiên bản";
        this.detail.string = "Không có bản cập nhật mới.";
        this.detail.node.active = true;
        setTimeout(function () {
            _this3.onUpdateComplete();
        }, 100);
    },
    downloadManifestFailed: function downloadManifestFailed() {
        this.btnRetry.active = true;
        this.btnQuit.active = true;
        this.detail.string = "Có lỗi xảy ra, vui lòng thử lại.";
        this.detail.node.active = true;
    },
    reconnectNetwork: function reconnectNetwork(callback) {
        var _this4 = this;

        clearInterval(this._retryInfo.reConnectInterval);
        this._retryInfo.reconnectCount = 0;
        this._retryInfo.reConnectInterval = setInterval(function () {
            _this4._retryInfo.reconnectCount++;
            if (_this4.isConnected()) {
                clearInterval(_this4._retryInfo.reConnectInterval);
                _this4._retryInfo.reconnectCount = 0;
                _this4.btnQuit.active = false;
                callback();
            } else {
                if (_this4._retryInfo.reconnectCount > _this4._retryInfo.maxOfCount) {
                    _this4.btnRetry.active = false;
                    _this4.btnQuit.active = true;
                }
            }
        }, this._retryInfo.reconnectionDelay);
    },
    downloadFailedAssetsInterval: function downloadFailedAssetsInterval() {
        var _this5 = this;

        clearInterval(this._retryInfo.downloadFailedAssetsInterval);
        this._retryInfo.downloadFailedAssetsCount++;
        this._am.downloadFailedAssets();
        this._retryInfo.downloadFailedAssetsInterval = setInterval(function () {
            if (_this5._retryInfo.downloadFailedAssetsCount > _this5._retryInfo.maxOfCount) {
                clearInterval(_this5._retryInfo.downloadFailedAssetsInterval);
                _this5.btnRetry.active = true;
                _this5.btnQuit.active = true;
            } else {
                _this5._am.downloadFailedAssets();
            }
        }, this._retryInfo.downloadFailedAssetsDelay);
    },
    calculateTotalSize: function calculateTotalSize() {
        if (jsb.fileUtils.isFileExist(this._storagePath + "_temp/project.manifest.temp")) {
            var loadManifest = jsb.fileUtils.getStringFromFile(this._storagePath + "_temp/project.manifest.temp");
            var manifestObject = JSON.parse(loadManifest);
            var totalSize = 0;
            for (var key in manifestObject.assets) {
                var obj = manifestObject.assets[key];
                totalSize += obj.size;
            }
            totalSize = this.formatBytes(totalSize);
            this.log('Total size calculated:' + totalSize);
            return totalSize;
        } else {
            this.log('no temp manifest found');
            return null;
        }
    },
    updateCb: function updateCb(event) {
        var failed = false;
        this._failedCount = this._failedCount ? this._failedCount : 0;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.updateState(HOTUPDATE_STATUS.GET_LOCAL_MANIFEST_FAILED);
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                {
                    if (this._retryInfo.downloadFailedAssetsInterval) {
                        clearInterval(this._retryInfo.downloadFailedAssetsInterval);
                        this._retryInfo.downloadFailedAssetsInterval = null;
                        this._retryInfo.downloadFailedAssetsCount = 0;
                        this.updateState(HOTUPDATE_STATUS.UPDATING);
                    }

                    this.detail.string = "";
                    this.detail.node.active = false;
                    this.byteProgress.node.active = true;
                    var downloaded = event.getDownloadedBytes();
                    var total = event.getTotalBytes();
                    if (total > 0) {
                        this.byteProgress.progress = downloaded / total;
                    }
                    // this.log("Total size:" + this.formatBytes(total));
                    //this.byteLabel.string = this.formatBytes(downloaded) + "/" + this.formatBytes(total);
                    var percent = Math.floor(downloaded / total * 100);
                    this.byteLabel.string = percent ? percent + "%" : "0%";
                }
                break;
            case jsb.EventAssetsManager.ASSET_UPDATED:
                this._failedCount = 0;
                this.detail.string = "";
                this.detail.node.active = false;
                this.btnQuit.active = false;
                this.updateNetworkState(NETWORK_STATUS.CONNECTED);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.downloadManifestFailed();
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.updateState(HOTUPDATE_STATUS.ALREADY_UP_TO_DATE);
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.updateState(HOTUPDATE_STATUS.UPDATE_SUCCESS);
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.updateState(HOTUPDATE_STATUS.UPDATE_FAILED);
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this._failedCount++;
                this.log('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                if (!this.isConnected()) {
                    this.updateNetworkState(NETWORK_STATUS.DISCONNECTED);
                }
                if (this._failedCount > 3) {
                    this.detail.node.active = true;
                    this.detail.string = "Có lỗi xảy ra!";
                    this.btnQuit.active = true;
                }
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this.log('Asset decompress failed: ' + event.getAssetId() + ', ' + event.getMessage());
                break;
            default:
                break;
        }

        if (failed) {
            this._am.setEventCallback(null);
            this._updateListener = null;
        }
    },
    isConnected: function isConnected() {
        return cc.sys.getNetworkType() !== cc.sys.NetworkType.NONE;
    },
    onClickRetry: function onClickRetry() {
        this.btnRetry.active = false;
        this.btnQuit.active = false;
        switch (this._state) {
            case HOTUPDATE_STATUS.CHECK_UPDATE:
            case HOTUPDATE_STATUS.UPDATING:
                this.checkUpdate();
                this.info.string = "Kiểm tra phiên bản";
                this.detail.string = "\nĐang kiểm tra phiên bản.";
                this.detail.node.active = true;
                break;
            case HOTUPDATE_STATUS.UPDATE_FAILED:
                this.info.string = 'Đang thử tải lại';
                this.detail.string = "";
                this.detail.node.active = false;
                this._am.downloadFailedAssets();
                break;
        }
    },
    onClickQuit: function onClickQuit() {
        this.reset();

        var _require = require("gameCommonUtils"),
            handleCloseGameIframe = _require.handleCloseGameIframe;

        handleCloseGameIframe();
    },
    log: function log(msg) {
        console.log("::HOT UPDATE:: " + this.gameId + " - " + msg);
    },
    _verifyFileHandle: function _verifyFileHandle(path, asset) {
        // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
        if (asset.compressed) {
            return true;
        }
        var resMD5 = MD5(jsb.fileUtils.getDataFromFile(path));
        return asset.md5 == resMD5;
    },
    versionCompareHandle: function versionCompareHandle(versionA, versionB) {
        //this.panel.version.string = "Current Version: " + versionA;
        this._oldV = versionA;
        this._newV = versionB;
        this.log("Version Compare: version A is " + versionA + ', version B is ' + versionB);
        var vA = versionA.split('.');
        var vB = versionB.split('.');
        for (var i = 0; i < vA.length; ++i) {
            var a = parseInt(vA[i]);
            var b = parseInt(vB[i] || 0);
            if (a === b) {
                continue;
            } else {
                return a - b;
            }
        }
        if (vB.length > vA.length) {
            return -1;
        } else {
            return 0;
        }
    },
    onUpdateComplete: function onUpdateComplete() {
        this.log("onUpdateComplete - " + this.loadSceneName);
        cc.director.loadScene(this.loadSceneName);
    },
    reset: function reset() {
        clearInterval(this._retryInfo.downloadFailedAssetsInterval);
        clearInterval(this._retryInfo.reConnectInterval);
        this.byteProgress.progress = 0;
        this.byteProgress.node.active = false;
        this.byteLabel.string = "";
        this.detail.string = "";
        this.detail.node.active = false;
        this.btnRetry.active = false;
        this.btnQuit.active = false;
    },
    onDestroy: function onDestroy() {
        if (this._updateListener) {
            this._am.setEventCallback(null);
            this._updateListener = null;
        }
    }
});

cc._RF.pop();