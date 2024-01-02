"use strict";
cc._RF.push(module, '6a4c9vEynRO17eBftuSeTfv', 'SmallToolTip');
// cc-common/cc-slotbase-v2/portrailGame/SmallToolTip.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        listSprites: [cc.Sprite]
    },

    onLoad: function onLoad() {
        this.node.on('SHOW_SMALL_TOOL_TIP', this.showSmallToolTip.bind(this));
    },
    showSmallToolTip: function showSmallToolTip() {
        var listFrames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


        var minLength = listFrames.length < this.listSprites.length ? listFrames.length : this.listSprites.length;
        if (minLength == 0) return;
        this.listSprites.forEach(function (it) {
            it.node.active = false;
        });
        for (var i = 0; i < minLength; i++) {
            this.listSprites[i].spriteFrame = listFrames[i];
            this.listSprites[i].node.active = true;
        }
        this.node.opacity = 255;
        this.node.scale = 1;
        if (this.tween) this.tween.stop();
        this.tween = cc.tween(this.node);
        this.tween.to(0.1, { scale: 1.2 }).to(0.1, { scale: 1 }).delay(2).to(0.5, { opacity: 0 }).start();
    }
});

cc._RF.pop();