"use strict";
cc._RF.push(module, '50d1fAMVpFIgoVF/oLEQOwu', 'AnimUtils');
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