(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/globalAnimationLibrary.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '59f07eK2q5E9o8QC+2nQTvq', 'globalAnimationLibrary', __filename);
// cc-common/cc-share-v1/common/globalAnimationLibrary.js

'use strict';

var tweenLooping = function tweenLooping(target, param) {
    var startActionListArr = [];
    var endActionListArr = [];
    var sequenceActionArr = [];
    var actionArr = [];
    var dur = param.dur == undefined ? .5 : param.dur;
    var easing = param.easing == undefined ? cc.easeSineInOut() : param.easing;

    //opacity
    if (param.opacity !== undefined) {
        startActionListArr.push(cc.fadeTo(dur, param.opacity.to).easing(easing));
        endActionListArr.push(cc.fadeTo(dur, param.opacity.from).easing(easing));
    }

    //scale
    if (param.scale !== undefined) {
        startActionListArr.push(cc.scaleTo(dur, param.scale.to).easing(easing));
        endActionListArr.push(cc.scaleTo(dur, param.scale.from).easing(easing));
    }

    //start
    if (startActionListArr.length >= 2) {
        actionArr[0] = cc.spawn(startActionListArr);
    } else {
        if (startActionListArr.length >= 1) {
            actionArr[0] = startActionListArr[0];
        }
    }

    //end
    if (endActionListArr.length >= 2) {
        actionArr[1] = cc.spawn(endActionListArr);
    } else {
        if (endActionListArr.length >= 1) {
            actionArr[1] = endActionListArr[0];
        }
    }

    //
    if (actionArr.length > 0) {
        var sequenceFading = cc.sequence(actionArr[0], actionArr[1]).repeatForever();
        sequenceActionArr.push(sequenceFading);
    }

    //
    var sequenceLooping = cc.sequence(new cc.DelayTime(.00001), new cc.CallFunc(function () {
        //rotation
        if (param.rota != undefined) {
            target.angle += param.rota;
        }

        //randomSC
        if (param.randomSC != undefined) {
            target.scaleX = target.scaleY = target.initSC + (Math.random() - Math.random()) * param.randomSC;
        }
    })).repeatForever();
    sequenceActionArr.push(sequenceLooping);

    //run all actions;
    for (var i = 0; i < sequenceActionArr.length; i++) {
        target.runAction(sequenceActionArr[i]);
    }
};

var tweenVolume = function tweenVolume(interval, soundID, volume, dur, callback) {

    var curVolume = cc.audioEngine.getVolume(soundID);
    clearInterval(interval);
    var BGInterval = setInterval(function () {
        curVolume += (volume - curVolume) / (dur * 100);
        checkToEndTween(curVolume, volume);
        cc.audioEngine.setVolume(soundID, curVolume);
    }, 60 / 100);

    //check to end this tween.
    var checkToEndTween = function checkToEndTween(curValue, endValue) {
        var checkValue = Math.floor(Math.abs(curValue - (endValue + 0.001)));
        if (checkValue <= .1) {
            curValue = endValue;
            clearInterval(BGInterval);
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    };

    return BGInterval;
};

var tweenSizeOfObject = function tweenSizeOfObject(object, param, callback) {
    var curW = object.width;
    var curH = object.height;
    var finalWidth = param.width;
    var finalHeight = param.height;
    var dur = param.dur != undefined ? param.dur * 100 : 50;
    var delay = param.delay != undefined ? param.delay : 0;

    clearInterval(object.interval);
    object.stopAllActions();
    object.runAction(cc.sequence(cc.delayTime(delay), cc.callFunc(function () {
        enterframe();
    })));

    //end every time
    var enterframe = function enterframe() {
        object.interval = setInterval(function () {
            //width
            if (finalWidth != undefined) {
                curW += (finalWidth - curW) / dur;
                object.width = curW;
                checkToEndTween(curW, finalWidth);
            }

            //height
            if (finalHeight != undefined) {
                curH += (finalHeight - curH) / dur;
                object.height = curH;
                checkToEndTween(curH, finalHeight);
            }
        }, 60 / 100);
    };

    //check to end this tween.
    var checkToEndTween = function checkToEndTween(curValue, endValue) {
        var checkValue = Math.floor(Math.abs(curValue - (endValue + 0.001)));
        if (checkValue <= .1) {
            curValue = endValue;
            clearInterval(object.interval);
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    };
};

var tweenObject = function tweenObject(target, param) {
    var delay = param.delay == undefined ? 0 : param.delay;
    var dur = param.dur == undefined ? .5 : param.dur;
    var easing = param.easing == undefined ? cc.easeSineOut() : param.easing;

    var actionListArr = [];
    var action = null;
    var dx = param.dx == undefined ? target.x : param.dx;
    var dy = param.dy == undefined ? target.y : param.dy;

    //position
    if (param.dx !== undefined || param.dy !== undefined) {
        actionListArr.push(cc.moveTo(dur, cc.v2(dx, dy)).easing(easing));
    }

    //scale
    if (param.scale !== undefined) {
        actionListArr.push(cc.scaleTo(dur, param.scale).easing(easing));
    }

    //scaleX
    if (param.scaleX !== undefined) {
        actionListArr.push(cc.scaleTo(dur, param.scaleX, target.scaleY).easing(easing));
    }

    //scaleY
    if (param.scaleY !== undefined) {
        actionListArr.push(cc.scaleTo(dur, target.scaleX, param.scaleY).easing(easing));
    }

    //skewTo
    if (param.skew !== undefined) {
        actionListArr.push(cc.skewTo(dur, param.skew, param.skew).easing(easing));
    }

    //rotation
    if (param.rotate !== undefined) {
        actionListArr.push(cc.rotateTo(dur, param.rotate).easing(easing));
    }

    //opacity
    if (param.opacity !== undefined) {
        actionListArr.push(cc.fadeTo(dur, param.opacity).easing(easing));
    }

    if (actionListArr.length >= 2) {
        action = cc.spawn(actionListArr);
    } else {
        action = actionListArr[0];
    }

    var delayTime = cc.delayTime(delay);
    var callFunc = cc.callFunc(function () {
        if (param.callback && typeof param.callback === 'function') {
            param.callback();
        }
    });

    var sequenceAction = cc.sequence(delayTime, action, callFunc);
    target.runAction(sequenceAction);
};

var showScoreOnScreen = function showScoreOnScreen(parentNode, scoreNodePrefab, param) {
    var scoreNode = cc.instantiate(scoreNodePrefab);
    var delay = param.delay !== undefined ? param.delay : 0;
    var dur = param.dur !== undefined ? param.dur : .5;
    var limitedX = param.limitedX !== undefined ? param.limitedX : 100;
    var limitedY = param.limitedY !== undefined ? param.limitedY : 300;
    var maxSC = param.maxSC !== undefined ? param.maxSC : scoreNode.scale + 1;
    var endSC = param.endSC !== undefined ? param.endSC : scoreNode.scale / 2;
    var startX = param.startX;
    var startY = param.startY;
    var endX = param.endX;
    var endY = param.endY;
    var midX = startX + (endX - startX) / 3;
    var midY = startY - (endY - startY) / 3;

    //limited distance
    if (midX > startX + limitedX) {
        midX = startX + limitedX;
    }

    if (midY > startY + limitedY) {
        midY = startY + limitedY;
    }

    scoreNode.getChildByName("score").getComponent(cc.Label).string = param.score;
    scoreNode.x = startX;
    scoreNode.y = startY;
    scoreNode.parent = parentNode;

    tweenObject(scoreNode, { "dur": dur / 4, "delay": delay, "dx": midX, "dy": midY, "scale": maxSC, "easing": new cc.easeSineOut(), "callback": function callback() {
            tweenObject(scoreNode, { "dur": dur, "delay": .2, "dx": endX, "dy": endY, "scale": endSC, "easing": new cc.easeSineInOut() });
            tweenObject(scoreNode, { "dur": dur, "delay": dur / 1.5, "opacity": 0, "easing": new cc.easeSineInOut(), "callback": function callback() {
                    scoreNode.destroy();
                    if (param.callback && typeof param.callback === 'function') {
                        param.callback();
                    }
                } });
        } });
};

var tweenVolumeV2 = function tweenVolumeV2(node) {
    return function (lastAction, soundId, volume, dur, callback) {
        if (lastAction) node.stopAction(lastAction);

        var currentVolume = cc.audioEngine.getVolume(soundId);
        var interval = 100; // 100ms
        var repeatTimes = Math.floor(dur * 1000 / interval);
        var volumeDelta = (volume - currentVolume) / repeatTimes;

        var updateVolume = cc.sequence(cc.callFunc(function () {
            currentVolume += volumeDelta;
            cc.audioEngine.setVolume(soundId, currentVolume);
        }), cc.delayTime(interval / 1000));

        var action = cc.sequence(cc.repeat(updateVolume, repeatTimes - 1), cc.callFunc(function () {
            cc.audioEngine.setVolume(soundId, volume);
            if (callback && typeof callback === 'function') {
                callback();
            }
        }));
        node.runAction(action);
        return action;
    };
};

var reverseEasing = function reverseEasing(easing) {
    return function (t) {
        return 1 - easing(1 - t);
    };
};

module.exports = {
    tweenLooping: tweenLooping,
    tweenVolume: tweenVolume,
    tweenObject: tweenObject,
    tweenSizeOfObject: tweenSizeOfObject,
    showScoreOnScreen: showScoreOnScreen,
    tweenVolumeV2: tweenVolumeV2,
    reverseEasing: reverseEasing
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
        //# sourceMappingURL=globalAnimationLibrary.js.map
        