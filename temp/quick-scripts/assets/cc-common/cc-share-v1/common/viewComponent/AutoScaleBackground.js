(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/viewComponent/AutoScaleBackground.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6cabacFlLFObrsWP7gSjCXV', 'AutoScaleBackground', __filename);
// cc-common/cc-share-v1/common/viewComponent/AutoScaleBackground.js

'use strict';

cc.Class({
    extends: cc.Component,

    onLoad: function onLoad() {
        this._thisOnResized = this.onScreenResized.bind(this);
        if (cc.sys.isMobile) {
            window.addEventListener('resize', this._thisOnResized);
        } else {
            cc.view.on('canvas-resize', this._thisOnResized);
        }

        this.scaleCanvasByOrientation();
    },
    scaleCanvasByOrientation: function scaleCanvasByOrientation() {
        var widthBackground = 960;
        var heightBackground = 640;

        // let isPortrait = false;
        // if (widthView > heightView) {
        //     isPortrait = false; // landscape
        // } else {
        //     isPortrait = true;
        // }

        var heightDefaultCanvas = 1280;
        var widthView = cc.view.getFrameSize().width;
        var heightView = cc.view.getFrameSize().height;

        var scaleHeightDevice = heightView / heightDefaultCanvas;
        var scaleWidthDevice = widthView / heightDefaultCanvas;

        var realScaleDevice = scaleHeightDevice > scaleWidthDevice ? scaleWidthDevice : scaleHeightDevice;

        var convertWithBG = widthBackground * realScaleDevice;
        var convertHeightBG = heightBackground * realScaleDevice;

        var ratioW = widthView / convertWithBG;
        var ratioH = heightView / convertHeightBG;

        if (ratioW > ratioH) this.node.scale = ratioW;else this.node.scale = ratioH;
    },
    onDestroy: function onDestroy() {
        if (cc.sys.isMobile) {
            window.removeEventListener('resize', this._thisOnResized);
        } else {
            cc.view.off('canvas-resize', this._thisOnResized);
        }
    },
    onScreenResized: function onScreenResized() {
        this.scaleCanvasByOrientation();
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
        //# sourceMappingURL=AutoScaleBackground.js.map
        