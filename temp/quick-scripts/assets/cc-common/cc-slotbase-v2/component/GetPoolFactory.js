(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/GetPoolFactory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ee195sjWupAH52F87cFqvpl', 'GetPoolFactory', __filename);
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
        //# sourceMappingURL=GetPoolFactory.js.map
        