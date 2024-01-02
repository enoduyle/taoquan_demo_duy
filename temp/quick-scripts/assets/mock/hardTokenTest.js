(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/mock/hardTokenTest.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '05b05edwJ5Jw4Ole+xbwCN3', 'hardTokenTest', __filename);
// mock/hardTokenTest.js

'use strict';

var globalNetwork = require('globalNetwork');
globalNetwork.token = 'CLIENT_TEST';

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
        //# sourceMappingURL=hardTokenTest.js.map
        