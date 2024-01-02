(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/LoadingScreen.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '03094K42qdBvLF4vhdKeCwg', 'LoadingScreen', __filename);
// cc-common/cc-slotbase-v2/component/LoadingScreen.js

'use strict';

var _require = require('utils'),
    registerLoadHowl = _require.registerLoadHowl,
    unregisterLoadHowl = _require.unregisterLoadHowl;

cc.Class({
    extends: cc.Component,
    properties: {
        sceneName: '',
        sdSceneName: '',
        sceneNameIframe: '',
        sceneNameHistory: '',
        processBar: cc.Node,
        loadingBG: cc.Node,
        barWidth: 0,
        loadingGlow: cc.Node,
        homeBtn: cc.Node,
        percentLabel: cc.Label
    },
    onLoad: function onLoad() {
        var _this = this;

        this.customInitLang();
        if (this.sceneName === '') return;
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC.LOGIN_IFRAME;

        var _require2 = require("gameCommonUtils"),
            handleFlowOutGame = _require2.handleFlowOutGame,
            handleCloseGameIframe = _require2.handleCloseGameIframe;

        var sceneName = this.sceneName;

        if (cc.sys.isBrowser) {
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var history = urlParams.get('history');
            // var language = urlParams.get('l');
            // var currency = urlParams.get('c');
            // language = language ? language.toUpperCase() : null;
            // currency = currency ? currency.toUpperCase() : null;
            //`${language}-${currency}`;
            var extName = cc.director.getScene().name.split('-');
            var extSceneName = null;
            if (extName.length >= 3) {
                extSceneName = extName[1] + '-' + extName[2];
            }
            if (this.sceneNameHistory && history) {
                sceneName = this.sceneNameHistory;
            } else if (this.sceneNameIframe) {
                sceneName = this.sceneNameIframe;
            }
            if (extSceneName) {
                var redirectScene = sceneName + '-' + extSceneName;
                var sceneList = cc.game._sceneInfos.map(function (scene) {
                    return scene.url;
                });
                for (var i = 0; i < sceneList.length; i++) {
                    if (sceneList[i].indexOf(redirectScene) > -1) {
                        sceneName = sceneName + '-' + extSceneName;
                        break;
                    }
                }
            }
        }

        if (LOGIN_IFRAME && window.Howl) {
            this.switchHowlLoader = true;
            registerLoadHowl();
        }

        if (cc.sys.isMobile && this.sdSceneName) {
            sceneName = this.sdSceneName;
        }

        if (this.homeBtn) {
            this.homeBtn.active = false;

            if (!LOGIN_IFRAME) {
                this.node.runAction(cc.sequence(cc.delayTime(10), cc.callFunc(function () {
                    _this.homeBtn.active = true;
                    _this.homeBtn.off('click');
                    _this.homeBtn.on('click', function () {
                        if (_this.isBackToLobby) return;
                        var eventHandler = _this.node.getComponent("KtekEventHandler");
                        if (eventHandler) {
                            eventHandler.getInstance().sendToUs("clear_cache", {
                                scene: sceneName
                            });
                        }
                        handleCloseGameIframe();
                        _this.isBackToLobby = true;
                    });
                })));
            }
        }
        this.node.active = true;
        this.node.opacity = 255;

        this.updatedScene = sceneName;
        this.preloadGameScene = true;
        this.isLoadingCompleted = false;
        this.progressBarComp = this.processBar.getComponent(cc.ProgressBar);
        this.progressBarComp.progress = 0;
        if (this.percentLabel) {
            this.percentLabel.string = '0%';
        }

        cc.director.preloadScene(sceneName, function (completedCount, totalCount) {
            if (totalCount > 0) {
                _this.totalPercent = completedCount / totalCount;
            }
        }, function (error) {
            if (error) {
                handleFlowOutGame();
            } else {
                _this.isLoadingCompleted = true;
            }
        });
    },
    update: function update() {
        var _this2 = this;

        if (this.preloadGameScene && this.progressBarComp && this.totalPercent > 0) {
            var percent = (this.totalPercent - this.progressBarComp.progress) / 20;
            if (percent > 0) {
                this.progressBarComp.progress += percent;
                if (this.loadingGlow) {
                    this.loadingGlow.x = Math.max(this.loadingGlow.x, this.barWidth * this.progressBarComp.progress);
                }
                if (this.percentLabel) {
                    this.percentLabel.string = Math.ceil(this.progressBarComp.progress * 100) + '%';
                }
            }
            if (this.progressBarComp.progress > 0.99 && this.isLoadingCompleted) {
                this.isLoadingCompleted = false;
                this.preloadGameScene = false;
                var delayTime = this.isSlowLoading ? 15 : 0;
                this.node.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(function () {
                    cc.director.loadScene(_this2.updatedScene);
                })));
                if (this.percentLabel) {
                    this.percentLabel.string = '100%';
                }
            }
        }
    },
    customInitLang: function customInitLang() {
        // init for fish language
    },
    setSlowLoading: function setSlowLoading(val) {
        this.isSlowLoading = val;
    },
    onDisable: function onDisable() {
        this.node.stopAllActions();
    },
    onDestroy: function onDestroy() {
        if (this.switchHowlLoader) {
            unregisterLoadHowl();
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
        //# sourceMappingURL=LoadingScreen.js.map
        