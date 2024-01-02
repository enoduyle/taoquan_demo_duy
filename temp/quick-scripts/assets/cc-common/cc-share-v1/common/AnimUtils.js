(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/AnimUtils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '50d1fAMVpFIgoVF/oLEQOwu', 'AnimUtils', __filename);
// cc-common/cc-share-v1/common/AnimUtils.js

"use strict";

var TweenShaking = function TweenShaking(node, dur, repeat) {
    var tween = cc.tween(node);
    if (repeat === -1) {
        tween.repeatForever(cc.tween().by(dur, { position: cc.v2(-10, 0) }).by(dur, { position: cc.v2(10, 0) }).by(dur, { position: cc.v2(10, 0) }).by(dur, { position: cc.v2(-10, 0) }));
    }

    return tween;
};

var lightBlinking = function lightBlinking(node, _ref) {
    var _ref$minOpacity = _ref.minOpacity,
        minOpacity = _ref$minOpacity === undefined ? 100 : _ref$minOpacity,
        _ref$maxOpacity = _ref.maxOpacity,
        maxOpacity = _ref$maxOpacity === undefined ? 255 : _ref$maxOpacity,
        _ref$dur = _ref.dur,
        dur = _ref$dur === undefined ? 0.02 : _ref$dur;

    node.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(dur, minOpacity), cc.fadeTo(dur, maxOpacity))));
};

module.exports = {
    TweenShaking: TweenShaking,
    lightBlinking: lightBlinking
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
        //# sourceMappingURL=AnimUtils.js.map
        