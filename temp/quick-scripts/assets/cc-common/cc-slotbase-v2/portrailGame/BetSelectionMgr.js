(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/portrailGame/BetSelectionMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0edf5ZopGFC6rQqK3ONfzNF', 'BetSelectionMgr', __filename);
// cc-common/cc-slotbase-v2/portrailGame/BetSelectionMgr.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        overlay: cc.Node,
        betSelectionPanel: cc.Node
    },

    onLoad: function onLoad() {
        this.node.show = this.show.bind(this);
        this.node.hide = this.hide.bind(this);
        this.node.on("SHOW", this.show, this);
        this.node.on("HIDE", this.hide, this);
    },
    start: function start() {
        this.overlay.active = false;
        this.betSelectionPanel.active = false;
        this.node.isShowing = false;
    },
    show: function show() {
        var _this = this;

        var onCallBackStart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var onCallBackEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        this.node.isShowing = true;
        this.overlay.active = true;
        this.betSelectionPanel.active = true;
        this.betSelectionPanel.emit('UPDATE_VALUE');
        this.overlay.show(0, function () {
            _this.betSelectionPanel.opacity = 255;
            _this.betSelectionPanel.show(onCallBackStart, onCallBackEnd);
        });
    },
    hide: function hide() {
        var _this2 = this;

        this.node.isShowing = false;
        this.betSelectionPanel.hide(0, function () {
            _this2.betSelectionPanel.emit('CLEAR_ALL_BET');
            _this2.betSelectionPanel.opacity = 0;
            _this2.overlay.hide(0, function () {
                _this2.overlay.active = false;
            });
        });
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
        //# sourceMappingURL=BetSelectionMgr.js.map
        