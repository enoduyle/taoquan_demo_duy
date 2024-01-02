(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/AlignmentControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '36c2alLktpFF6viIqKg4fiK', 'AlignmentControl', __filename);
// cc-common/cc-share-v1/common/AlignmentControl.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        maxWidth: 1440,
        maxHeight: 2436,
        maxAlignByOrient: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._thisOnResized = this.onScreenResized.bind(this);
        if (cc.sys.isMobile) {
            window.addEventListener('resize', this._thisOnResized);
        } else {
            cc.view.on('canvas-resize', this._thisOnResized);
        }
        this._widget = this.node.getComponent(cc.Widget);
    },
    start: function start() {
        this.onScreenResized();
    },
    onScreenResized: function onScreenResized() {
        if (this.node) {
            var visibleViewSize = cc.view.getVisibleSize();
            // cc.log(`Visible size: ${visibleViewSize}`);
            if (this._widget != null) {
                this._widget.enabled = true;
                this._widget.updateAlignment();
            } else {
                this._widget = this.node.getComponent(cc.Widget);
            }

            if (visibleViewSize.width > this.maxWidth) {
                if (this._widget != null) {
                    this._widget.enabled = false;
                }

                this.node.width = this.maxWidth;
                // cc.log(`Align with Max Width`);
            }

            if (visibleViewSize.height > this.maxHeight) {
                if (this._widget != null) {
                    this._widget.enabled = false;
                }

                this.node.height = this.maxHeight;
                cc.log('Align with Max Height');
            }

            if (this.maxAlignByOrient) {
                if (this.node.height >= this.node.width * 3 / 4) {
                    if (this._widget != null) {
                        this._widget.enabled = false;
                    }
                    this.node.height = this.node.width * 3 / 4;
                }
            }
        }
    },
    onDestroy: function onDestroy() {
        if (cc.sys.isMobile) {
            window.removeEventListener('resize', this._thisOnResized);
        } else {
            cc.view.off('canvas-resize', this._thisOnResized);
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
        //# sourceMappingURL=AlignmentControl.js.map
        