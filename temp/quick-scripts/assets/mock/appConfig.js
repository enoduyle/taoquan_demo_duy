(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/mock/appConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '37333FieqpOxp7nSpV3N+9B', 'appConfig', __filename);
// mock/appConfig.js

'use strict';

cc.log('VERSION GAME', '1.0.0');

////////////////////////////////////////////////////

module.exports = {
    "API_URL": "https://api.staging.enostd.gay/",
    "SOCKET_URL": "wss://sock.staging.enostd.gay",
    "USER_TOKEN": "user_token",
    "URL_TOKEN": "token",
    "URL_CODE": "code",
    "LOGIN_IFRAME": true,
    "IPMaster12": "wss://staging.fish.enostd.gay/lobby-1985/",
    "IPMaster7": "wss://staging.fish.enostd.gay/lobby-1990/",
    "IPMaster1987": "wss://staging.fish.enostd.gay/lobby-1987/"

    ////////////////////////////////////////////////////

};

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
        //# sourceMappingURL=appConfig.js.map
        