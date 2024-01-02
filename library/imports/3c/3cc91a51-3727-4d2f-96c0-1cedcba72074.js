"use strict";
cc._RF.push(module, '3cc91pRNydNL5bAHO3LpyB0', 'toast');
// cc-common/cc-share-v1/common/viewComponent/toast.js

'use strict';

cc.Class({
    extends: cc.Component,
    // use this for initialization
    init: function init(data) {
        this.getComponent(cc.RichText).string = data;
        this.getComponent(cc.Animation).play('toastMoving');
    }
});

cc._RF.pop();