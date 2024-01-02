"use strict";
cc._RF.push(module, '4e002qwnwFMarPQnNQUR34d', 'ActionEffect');
// cc-common/cc-share-v1/common/ActionEffect.js

"use strict";

var ActionEffect = {
    shake: function shake(obj, time) {
        var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        var timeFrame = time / 10;
        var posX = obj.x;
        var posY = obj.y;
        var effect = cc.sequence(cc.spawn(cc.moveTo(timeFrame, posX - 1, posY - 2), cc.rotateTo(timeFrame, -1)), //10%
        cc.spawn(cc.moveTo(timeFrame, posX - 3, posY + 0), cc.rotateTo(timeFrame, 1)), //20%
        cc.spawn(cc.moveTo(timeFrame, posX + 3, posY + 2), cc.rotateTo(timeFrame, 0)), //30%
        cc.spawn(cc.moveTo(timeFrame, posX + 1, posY - 1), cc.rotateTo(timeFrame, 1)), //40%
        cc.spawn(cc.moveTo(timeFrame, posX - 1, posY + 2), cc.rotateTo(timeFrame, -1)), //50%
        cc.spawn(cc.moveTo(timeFrame, posX - 3, posY + 1), cc.rotateTo(timeFrame, 0)), //60%
        cc.spawn(cc.moveTo(timeFrame, posX + 3, posY + 1), cc.rotateTo(timeFrame, -1)), //70%
        cc.spawn(cc.moveTo(timeFrame, posX - 1, posY - 1), cc.rotateTo(timeFrame, 1)), //80%
        cc.spawn(cc.moveTo(timeFrame, posX + 1, posY + 2), cc.rotateTo(timeFrame, 0)), //90%
        cc.spawn(cc.moveTo(timeFrame, posX + 1, posY - 2), cc.rotateTo(timeFrame, -1)), //100%
        cc.spawn(cc.moveTo(timeFrame, posX, posY), cc.rotateTo(timeFrame, 0)), //100%
        cc.delayTime(delay));
        return effect;
    },
    jelloHorizontal: function jelloHorizontal(obj, time) {
        var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        var timeFrame = time / 10;
        var effect = cc.sequence(cc.scaleTo(timeFrame * 3, 1, 1), //10
        cc.scaleTo(timeFrame, 1.25, 0.75), //40
        cc.scaleTo(timeFrame, 0.75, 1.25), //50
        cc.scaleTo(timeFrame * 1.5, 1.15, 0.85), //50
        cc.scaleTo(timeFrame, 1.05, 0.95), //50
        cc.scaleTo(timeFrame * 2.5, 1, 1), //50
        cc.delayTime(delay));
        return effect;
    },
    jelloVertical: function jelloVertical(obj, time) {
        var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        var timeFrame = time / 10;
        var effect = cc.sequence(cc.scaleTo(timeFrame * 3, 1, 1), //10
        cc.scaleTo(timeFrame, 0.75, 1.25), //40
        cc.scaleTo(timeFrame, 1.25, 0.75), //50
        cc.scaleTo(timeFrame * 1.5, 0.85, 1.15), //50
        cc.scaleTo(timeFrame, 0.95, 1.05), //50
        cc.scaleTo(timeFrame * 2.5, 1, 1), //50
        cc.delayTime(delay));
        return effect;
    },
    jelloDiagonal: function jelloDiagonal(obj, time) {
        var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        var timeFrame = time / 10;
        var effect = cc.sequence(cc.skewTo(timeFrame * 3, 0, 0), cc.skewTo(timeFrame, -25, -25), cc.skewTo(timeFrame, -15, -15), cc.skewTo(timeFrame * 1.5, 5, 5), cc.skewTo(timeFrame, -5, -5), cc.skewTo(timeFrame * 2.5, 0, 0), cc.delayTime(delay));
        return effect;
    },
    heartBeat: function heartBeat(obj, time) {
        var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        var timeFrame = time / 10;
        var effect = cc.sequence(cc.scaleTo(timeFrame, 1, 1), cc.scaleTo(timeFrame, 0.91, 0.91), cc.scaleTo(timeFrame * 0.7, 0.98, 0.98), cc.scaleTo(timeFrame * 1.6, 0.87, 0.87), cc.scaleTo(timeFrame * 2.2, 1, 1), cc.delayTime(delay));
        return effect;
    },
    wobbleHorBottom: function wobbleHorBottom(obj, time) {
        var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        var timeFrame = time / 10;
        var posX = obj.x;
        var posY = obj.y;

        var effect = cc.sequence(cc.spawn(cc.moveTo(timeFrame * 1.5, posX - 30, posY), cc.rotateTo(timeFrame * 1.5, -6)), cc.spawn(cc.moveTo(timeFrame * 1.5, posX + 15, posY), cc.rotateTo(timeFrame * 1.5, 6)), cc.spawn(cc.moveTo(timeFrame * 1.5, posX - 15, posY), cc.rotateTo(timeFrame * 1.5, -3.6)), cc.spawn(cc.moveTo(timeFrame * 1.5, posX + 9, posY), cc.rotateTo(timeFrame * 1.5, 2.4)), cc.spawn(cc.moveTo(timeFrame * 1.5, posX - 6, posY), cc.rotateTo(timeFrame * 1.5, -1.2)), cc.spawn(cc.moveTo(timeFrame * 1.5, posX, posY), cc.rotateTo(timeFrame * 1.5, 0)), cc.delayTime(delay));
        return effect;
    },
    wobbleHorTop: function wobbleHorTop(obj, time) {
        var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        var timeFrame = time / 10;
        var posX = obj.x;
        var posY = obj.y;

        var effect = cc.sequence(cc.spawn(cc.moveTo(timeFrame * 1.5, posX - 30, posY), cc.rotateTo(timeFrame * 1.5, 6)), cc.spawn(cc.moveTo(timeFrame * 1.5, posX + 15, posY), cc.rotateTo(timeFrame * 1.5, -6)), cc.spawn(cc.moveTo(timeFrame * 1.5, posX - 15, posY), cc.rotateTo(timeFrame * 1.5, 3.6)), cc.spawn(cc.moveTo(timeFrame * 1.5, posX + 9, posY), cc.rotateTo(timeFrame * 1.5, -2.4)), cc.spawn(cc.moveTo(timeFrame * 1.5, posX - 6, posY), cc.rotateTo(timeFrame * 1.5, 1.2)), cc.spawn(cc.moveTo(timeFrame * 1.5, posX, posY), cc.rotateTo(timeFrame * 1.5, 0)), cc.delayTime(delay));
        return effect;
    },
    swildOutFwd: function swildOutFwd(obj, time) {
        var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;


        var effect = cc.sequence(cc.spawn(cc.rotateTo(0, 0), cc.scaleTo(0, 1, 1), cc.fadeIn(0)), cc.spawn(cc.rotateTo(time, 540), cc.scaleTo(time, 5), cc.fadeOut(time)), cc.delayTime(delay));
        return effect;
    },
    randomBenzier: function randomBenzier(obj, target, time) {
        var distanceX = Math.abs(obj.x - target.x);
        var curvePoint1 = cc.v2(Math.random() * distanceX + Math.min(target.x, obj.x), obj.y);
        var curvePoint2 = cc.v2(Math.random() * distanceX + Math.min(target.x, obj.x), target.y);
        var effect = cc.bezierTo(time, [curvePoint1, curvePoint2, target]);
        return effect;
    }
};

module.exports = ActionEffect;

cc._RF.pop();