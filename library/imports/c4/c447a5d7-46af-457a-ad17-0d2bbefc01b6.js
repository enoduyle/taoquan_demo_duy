"use strict";
cc._RF.push(module, 'c447aXXRq9Feq0XDSu+/AG2', 'BlinkSpine9983');
// cc-taoquan-9983/scripts/common/BlinkSpine9983.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        delay: 1,
        animationName: "animation",
        loop: false
    },
    onLoad: function onLoad() {
        //this.node.getComponent(sp.Skeleton).setAnimation(0, this.animationName, this.loop);
    },
    start: function start() {
        var _this = this;

        this.node.runAction(cc.sequence(cc.callFunc(function () {
            _this.node.getComponent(sp.Skeleton).setAnimation(0, _this.animationName, _this.loop);
        }), cc.delayTime(this.delay)).repeatForever());
    }
});

cc._RF.pop();