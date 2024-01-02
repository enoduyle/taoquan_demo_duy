(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/g9000/template-minigame/mini-table/MiniBaseItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '979d5aaIT9DvaV7chJ8AhJM', 'MiniBaseItem', __filename);
// cc-common/cc-slotbase-v2/g9000/template-minigame/mini-table/MiniBaseItem.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        staticNode: cc.Node,
        symbolNode: cc.Node,
        labelScore: cc.Node,
        spriteSymbols: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    onLoad: function onLoad() {
        this.node.itemController = this;
        this.node.isOpen = false;
        this.mapValue = {
            100: 1,
            200: 2,
            400: 3
        };
        this.node.disableClick = this.disableClick.bind(this);
        this.node.enableClick = this.enableClick.bind(this);
        this.node.showScore = this.showScore.bind(this);
    },
    start: function start() {
        // effect idle
    },
    onClickItem: function onClickItem(e) {
        var isAutoTrigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        this.clickItemEvent = new cc.Event.EventCustom('CLICK_ITEM', true);
        this.clickItemEvent.setUserData({ isAutoTrigger: isAutoTrigger });
        this.node.dispatchEvent(this.clickItemEvent);
    },


    /**
     * @shaking_node
     * @override-for-change-anim
     **/
    playAnimClick: function playAnimClick() {
        if (!this.tweenClick) {
            this.tweenClick = cc.tween(this.node).repeatForever(cc.tween(this.node).by(0.02, { position: cc.v2(-10, 0) }).by(0.02, { position: cc.v2(10, 0) }).by(0.02, { position: cc.v2(10, 0) }).by(0.02, { position: cc.v2(-10, 0) }));
        }
        this.tweenClick.start();
    },


    /**
     * @override-for-implement-anim
     * just hide static and show symbol
     **/
    playAnimOpen: function playAnimOpen(value, callback) {
        var _this = this;

        this.node.isOpen = true;
        cc.tween(this.node).delay(0.5)
        // tat rung
        .call(function () {
            // stop shaking
            if (_this.tweenClick) _this.tweenClick.stop();

            _this.staticNode.opacity = 0;
            var indexSprite = _this.mapValue[value];
            _this.symbolNode.getComponent(cc.Sprite).spriteFrame = _this.spriteSymbols[indexSprite];
            _this.symbolNode.opacity = 255;
        })
        // show ket qua
        .call(function () {
            _this.showScore(value);
        }).delay(0.5).call(function () {
            if (callback && typeof callback === 'function') {
                callback();
            }
        }).start();
    },
    showScore: function showScore(value) {
        this.labelScore.getComponent(cc.Label).string = 'x' + (value || 0);
    },
    setScore: function setScore(value) {
        this.symbolNode.active = false;
        this.labelScore.getComponent(cc.Label).string = 'x' + (value || 0);
        this.labelScore.opacity = 255;
    },
    enableClick: function enableClick() {
        this.node.getComponent(cc.Button).interactable = true;
    },
    disableClick: function disableClick() {
        this.node.getComponent(cc.Button).interactable = false;
    },
    resetItem: function resetItem() {
        this.symbolNode.opacity = 0;
        this.staticNode.opacity = 255;
        this.node.opacity = 255;
        this.node.isOpen = false;
        this.labelScore.getComponent(cc.Label).string = "";
        this.enableClick();
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
        //# sourceMappingURL=MiniBaseItem.js.map
        