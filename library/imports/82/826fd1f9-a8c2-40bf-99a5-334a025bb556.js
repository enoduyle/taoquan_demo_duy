"use strict";
cc._RF.push(module, '826fdH5qMJAv5mlM0oCW7VW', 'MakePersistent');
// cc-common/cc-share-v1/common/viewComponent/MakePersistent.js

"use strict";

cc.Class({
    extends: cc.Component,

    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
    }
});

cc._RF.pop();