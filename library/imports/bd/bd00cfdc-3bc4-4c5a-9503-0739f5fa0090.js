"use strict";
cc._RF.push(module, 'bd00c/cO8RMWpUDBzn1+gCQ', 'DimFocusControl');
// cc-common/cc-share-v1/common/gOverlay/DimFocusControl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        overlay: cc.Node,
        overlayOpacity: 150,
        game: cc.Node,
        gameOpacity: 150
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.dimControl = this;
        this.overlay.opacity = this.overlayOpacity;
    },
    dim: function dim() {
        this.node.parent.emit("PLT_BLUR");
        this.overlay.active = false;
        this.game.opacity = this.gameOpacity;
        if (this.game.soundPlayer) {
            this.game.soundPlayer.stopAllAudio();
            this.game.soundPlayer.setEffectEnable(false);
        }
    },
    focus: function focus() {
        this.node.parent.emit("PLT_FOCUS");
        this.overlay.active = true;
        this.game.opacity = 255;
        if (this.game.soundPlayer) {
            this.game.soundPlayer.setEffectEnable(true);
        }
    }

    // update (dt) {},

});

cc._RF.pop();