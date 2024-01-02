"use strict";
cc._RF.push(module, 'ba60dxFHwhLKJRBec7ljR4T', 'ButtonScaler');
// cc-common/cc-share-v1/common/viewComponent/ButtonScaler.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        pressedScale: 1,
        transDuration: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.initScale = this.node.scale;
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);
        function onTouchDown() {
            if (!self.enabled) return;
            this.stopAllActions();
            this.runAction(self.scaleDownAction);
        }
        function onTouchUp() {
            if (!self.enabled) return;
            this.stopAllActions();
            this.runAction(self.scaleUpAction);
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }
});

cc._RF.pop();