(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-network/globalNetwork.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '08a53PC/bNEkpAj9DlmQEy8', 'globalNetwork', __filename);
// cc-common/cc-network/globalNetwork.js

'use strict';

var globalNetwork = require('globalNetworkV3');

var network = new globalNetwork();

module.exports = network;

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
        //# sourceMappingURL=globalNetwork.js.map
        