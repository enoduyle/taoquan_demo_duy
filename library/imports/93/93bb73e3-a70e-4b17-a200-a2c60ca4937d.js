"use strict";
cc._RF.push(module, '93bb7Pjpw5LF6IAosYMpJN9', 'CacheChildrenRender');
// cc-common/cc-share-v1/common/CacheChildrenRender.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        pageIndex: 1,
        isCustomView: false,
        customWidth: 720,
        customHeight: 1280
    },

    onLoad: function onLoad() {
        var _this = this;

        this.positionCache = this.node.position;
        this.node.opacity = 0;
        this.node.x = 3000;
        this.camera = this.node.addComponent(cc.Camera);
        this.camera.cullingMask = this.node._cullingMask;
        this.node.children.forEach(function (child) {
            child.group = _this.node.group;
        });
    },
    start: function start() {
        var _this2 = this;

        this.scheduleOnce(function () {
            _this2.node.opacity = 255;
            var renderTexture = new cc.RenderTexture();
            if (!_this2.isCustomView) {
                renderTexture.initWithSize(cc.winSize.width, cc.winSize.height);
            } else {
                renderTexture.initWithSize(_this2.customWidth, _this2.customHeight);
            }
            _this2.camera.targetTexture = renderTexture;
            _this2.camera.render(_this2.node);
            var spriteFrame = new cc.SpriteFrame(renderTexture);

            var sprieComp = _this2.node.getComponent(cc.Sprite);
            if (!sprieComp) sprieComp = _this2.node.addComponent(cc.Sprite);
            sprieComp.spriteFrame = spriteFrame;

            _this2.node.removeAllChildren();
            _this2.node.scaleY = -1;
            _this2.node.removeComponent(cc.Camera);
            _this2.node.position = _this2.positionCache;
        }, Number(0.017 * (this.pageIndex > 0 ? this.pageIndex : 1)));
    }
});

cc._RF.pop();