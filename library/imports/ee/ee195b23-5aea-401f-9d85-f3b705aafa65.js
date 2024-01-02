"use strict";
cc._RF.push(module, 'ee195sjWupAH52F87cFqvpl', 'GetPoolFactory');
// cc-common/cc-slotbase-v2/component/GetPoolFactory.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        directorIndex: 1
    },

    onLoad: function onLoad() {
        var director = void 0;
        if (this.node.ROOT) {
            director = this.node.ROOT;
        } else {
            director = cc.find('Canvas').children[this.directorIndex];
        }

        if (director) this.node.poolFactory = director.poolFactory;
    }
});

cc._RF.pop();