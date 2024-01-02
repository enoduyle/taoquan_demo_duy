(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/viewComponent/MobileDetectLoad.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2a8davipBxHUaBCZweZyXd4', 'MobileDetectLoad', __filename);
// cc-common/cc-share-v1/common/viewComponent/MobileDetectLoad.js

"use strict";

var MobileDetect = require('mobile-detect');
cc.Class({
    extends: cc.Component,
    properties: {
        sceneName: "",
        sceneNamePortrait: ""
    },
    onLoad: function onLoad() {
        if (this.sceneName === "") return;
        var isPhone = false;
        if ((cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER) && window) {
            var md = new MobileDetect(window.navigator.userAgent);
            isPhone = md.phone();
            cc.log(md);
        }
        var sceneGame = this.sceneName;
        cc.log(cc.sys.isMobile, isPhone);
        if (cc.sys.isMobile && isPhone && this.sceneNamePortrait != "") {
            sceneGame = this.sceneNamePortrait;
        }

        cc.director.loadScene(sceneGame);
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
        //# sourceMappingURL=MobileDetectLoad.js.map
        