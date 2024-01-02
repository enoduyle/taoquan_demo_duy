(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/EventListenerManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '61bf0JpkhBPlqNF5Dfsi4Dv', 'EventListenerManager', __filename);
// cc-common/cc-share-v1/common/EventListenerManager.js

"use strict";

var EventListenerManager = function () {
    var instanceObject = {};
    function createInstance(serviceId) {
        var _serviceId = serviceId;
        var _listeners = new cc.EventTarget();
        return {
            on: function on(type, callback, target) {
                if (!_listeners) _listeners = new cc.EventTarget();
                return _listeners.on(type, callback, target);
            },

            once: function once(type, callback, target) {
                if (_listeners) _listeners.once(type, callback, target);
            },

            off: function off(type, callback, target) {
                if (_listeners) _listeners.off(type, callback, target);
            },

            emit: function emit(type, arg1, arg2, arg3, arg4, arg5) {
                if (_listeners) _listeners.emit(type, arg1, arg2, arg3, arg4, arg5);
            },

            dispatchEvent: function dispatchEvent(event) {
                if (_listeners) _listeners.dispatchEvent(event);
            },

            targetOff: function targetOff(target) {
                if (_listeners) _listeners.targetOff(target);
            },

            getServiceId: function getServiceId() {
                return _serviceId;
            }
        };
    }
    function hasInstance(serviceId) {
        return instanceObject[serviceId];
    }
    return {
        getInstance: function getInstance(serviceId) {
            var _instance = hasInstance(serviceId);
            if (!_instance) {
                _instance = new createInstance(serviceId);
                delete _instance.constructor;
                instanceObject[serviceId] = _instance;
            }
            return _instance;
        }
    };
}();

module.exports = EventListenerManager;

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
        //# sourceMappingURL=EventListenerManager.js.map
        