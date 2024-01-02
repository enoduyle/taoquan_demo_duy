(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/AlignFullScreenButton.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '128b3DV9GxNDKEYlYkc/FY8', 'AlignFullScreenButton', __filename);
// cc-common/cc-share-v1/common/AlignFullScreenButton.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        position: "TOP_RIGHT" //set your align here
    },

    start: function start() {
        if (cc.sys.isBrowser && cc.sys.isMobile) {
            var loadConfigAsync = require('loadConfigAsync');

            var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
                LOGIN_IFRAME = _loadConfigAsync$getC.LOGIN_IFRAME;

            if (LOGIN_IFRAME) {
                if (this.position == "TOP_RIGHT") {
                    this.alignFunc = this.alignTopRight.bind(this);
                } else if (this.position == "BOT_LEFT") {
                    this.alignFunc = this.alignBotLeft.bind(this);
                } else if (this.position == "BOT_LEFT_23") {
                    this.alignFunc = this.alignBotLeft23.bind(this);
                }
                //add your align here
                if (this.alignFunc) {
                    this.alignFunc();
                    window.addEventListener('resize', this.alignFunc);
                }
            }
        }
    },
    alignTopRight: function alignTopRight() {
        var enterFullscreen = document.getElementById('enterFullscreen');
        var exitFullscreen = document.getElementById('exitFullscreen');

        if (window.innerWidth > window.innerHeight) {
            if (enterFullscreen && exitFullscreen) {
                enterFullscreen.classList.add("alignTopRight");
                enterFullscreen.classList.remove("alignBotRight");
                exitFullscreen.classList.add("alignTopRight");
                exitFullscreen.classList.remove("alignBotRight");
            }
        } else {
            if (enterFullscreen && exitFullscreen) {
                enterFullscreen.classList.add("alignBotRight");
                enterFullscreen.classList.remove("alignTopRight");
                exitFullscreen.classList.add("alignBotRight");
                exitFullscreen.classList.remove("alignTopRight");
            }
        }
    },
    alignBotLeft: function alignBotLeft() {
        var enterFullscreen = document.getElementById('enterFullscreen');
        var exitFullscreen = document.getElementById('exitFullscreen');

        if (window.innerWidth > window.innerHeight) {
            if (enterFullscreen && exitFullscreen) {
                enterFullscreen.classList.add("alignBotLeft");
                enterFullscreen.classList.remove("alignTopLeft");
                exitFullscreen.classList.add("alignBotLeft");
                exitFullscreen.classList.remove("alignTopLeft");
            }
        } else {
            if (enterFullscreen && exitFullscreen) {
                enterFullscreen.classList.add("alignTopLeft");
                enterFullscreen.classList.remove("alignBotLeft");
                exitFullscreen.classList.add("alignTopLeft");
                exitFullscreen.classList.remove("alignBotLeft");
            }
        }
    },
    alignBotLeft23: function alignBotLeft23() {
        var enterFullscreen = document.getElementById('enterFullscreen');
        var exitFullscreen = document.getElementById('exitFullscreen');

        if (window.innerWidth > window.innerHeight) {
            if (enterFullscreen && exitFullscreen) {
                enterFullscreen.classList.add("alignBotLeft23");
                enterFullscreen.classList.remove("alignTopLeft23");
                exitFullscreen.classList.add("alignBotLeft23");
                exitFullscreen.classList.remove("alignTopLeft23");
            }
        } else {
            if (enterFullscreen && exitFullscreen) {
                enterFullscreen.classList.add("alignTopLeft23");
                enterFullscreen.classList.remove("alignBotLeft23");
                exitFullscreen.classList.add("alignTopLeft23");
                exitFullscreen.classList.remove("alignBotLeft23");
            }
        }
    },
    onDestroy: function onDestroy() {
        if (cc.sys.isBrowser && cc.sys.isMobile && this.alignFunc) {
            window.removeEventListener('resize', this.alignFunc);
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
        //# sourceMappingURL=AlignFullScreenButton.js.map
        