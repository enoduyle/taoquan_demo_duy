(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/FishFlyingAnimation9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0e8c7qJGVFDp72jpYLnWDXj', 'FishFlyingAnimation9983', __filename);
// cc-taoquan-9983/scripts/common/FishFlyingAnimation9983.js

'use strict';

var FLYING_DIRECTION = ['L', 'R', 'M'];
cc.Class({
    extends: cc.Component,

    properties: {
        fishFlyingHolder: cc.Node,
        vfxWaterLight: cc.Node,
        fishFlyingPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        this.node.on("PLAY_FISH_FLYING_EFFECT", this.playFishFlyingEffect, this);
        this.node.on("SPEED_UP_FISH_FLYING_EFFECT", this.speedUpFishFlyingEffect, this);
        this.node.on("STOP_FISH_FLYING_EFFECT", this.stopFishFlyingEffect, this);
        this.node.on("PLAY_SOUND_FISH_FLYING_END", this.playSoundFishFlyingEnd, this);
        window.fishFlying = this;
        this.allFishFlyingData = new Array(5).fill(null);
        // this.calculateAllAnimationTime();
    },
    playFishFlyingEffect: function playFishFlyingEffect(fishFlyingData) {
        var _this = this;

        var _getAnimationInfo = this.getAnimationInfo(fishFlyingData),
            animationName = _getAnimationInfo.animationName,
            delayTime = _getAnimationInfo.delayTime,
            timeScaleRate = _getAnimationInfo.timeScaleRate,
            skinName = _getAnimationInfo.skinName;

        var fishSpine = this.getFishFlyingSkeleton();
        var fishSkeleton = fishSpine.getComponent(sp.Skeleton);
        fishSpine.opacity = 0;
        this.allFishFlyingData[fishFlyingData.col] = fishFlyingData;
        fishSpine.col = fishFlyingData.col;
        fishSpine.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(function () {
            if (_this.vfxWaterLight.opacity === 0) {
                _this.vfxWaterLight.opacity = 255;
                _this.vfxWaterLight.getComponent(cc.Animation).play();
            }
            _this.playSoundFishFlying(fishFlyingData, skinName === 'Gold');
            fishSpine.isPlayingAnim = true;
            fishSpine.opacity = 255;
            fishSkeleton.timeScale = timeScaleRate;
            fishSkeleton.setSkin(skinName);
            fishSkeleton.setAnimation(0, animationName, false);
            fishSkeleton.setCompleteListener(function () {
                _this.fishFlyingHolder.removeChild(fishSpine);
            });
        })));
    },
    playSoundFishFlying: function playSoundFishFlying(fishFlyingData) {
        var isGoldFish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var isTurbo = fishFlyingData.isTurbo,
            lastWildColumn = fishFlyingData.lastWildColumn,
            col = fishFlyingData.col;

        if (isTurbo) {
            if (lastWildColumn === col) {
                this.node.soundPlayer.playSfxFishFlying(isGoldFish);
            }
        } else {
            this.node.soundPlayer.playSfxFishFlying(isGoldFish);
        }
    },
    playSoundFishFlyingEnd: function playSoundFishFlyingEnd(col) {
        if (!this.allFishFlyingData[col]) return;
        var _allFishFlyingData$co = this.allFishFlyingData[col],
            isWinWild = _allFishFlyingData$co.isWinWild,
            isMultiple = _allFishFlyingData$co.isMultiple,
            multipleValue = _allFishFlyingData$co.multipleValue;

        if (isMultiple && multipleValue > 5) {
            this.node.soundPlayer.playSfxGoldFishWin();
        } else if (isWinWild) {
            this.node.soundPlayer.playSfxSilverFishWin();
        }
    },
    speedUpFishFlyingEffect: function speedUpFishFlyingEffect(fishFlyingData) {
        var _this2 = this;

        var _getAnimationInfo2 = this.getAnimationInfo(fishFlyingData),
            animationName = _getAnimationInfo2.animationName,
            timeScaleRate = _getAnimationInfo2.timeScaleRate,
            skinName = _getAnimationInfo2.skinName;

        if (this.fishFlyingHolder.children && this.fishFlyingHolder.children.length) {
            var listFishFlying = this.fishFlyingHolder.children.slice();
            listFishFlying.forEach(function (fishSpine) {
                if (!fishSpine.isSpeedUp && fishSpine.col === fishFlyingData.col) {
                    fishSpine.stopAllActions();
                    fishSpine.opacity = 255;
                    fishSpine.isSpeedUp = true;
                    var fishSkeleton = fishSpine.getComponent(sp.Skeleton);
                    fishSkeleton.setCompleteListener(function () {});
                    if (!fishSpine.isPlayingAnim) {
                        fishSpine.isPlayingAnim = true;
                        fishSkeleton.setSkin(skinName);
                        fishSkeleton.setAnimation(0, animationName, false);
                        fishSkeleton.setCompleteListener(function () {
                            _this2.fishFlyingHolder.removeChild(fishSpine);
                        });
                    }
                    fishSkeleton.timeScale = timeScaleRate;
                }
            });
        }
    },
    getFishFlyingSkeleton: function getFishFlyingSkeleton() {
        var fishSpine = cc.instantiate(this.fishFlyingPrefab);
        fishSpine.parent = this.fishFlyingHolder;
        return fishSpine;
    },
    getAnimationInfo: function getAnimationInfo(_ref) {
        var timeStop = _ref.timeStop,
            row = _ref.row,
            col = _ref.col,
            isWinWild = _ref.isWinWild,
            isMultiple = _ref.isMultiple,
            multipleValue = _ref.multipleValue;

        var randomIndex = Math.floor(Math.random() * FLYING_DIRECTION.length);
        var animationName = 'row' + (row + 1) + '_col' + (col + 1) + '_' + FLYING_DIRECTION[randomIndex];
        var skinName = isMultiple && multipleValue > 5 ? 'Gold' : 'Silver';
        // if (!isWinWild) {
        //     animationName = 'miss_' + FLYING_DIRECTION[randomIndex];
        //     skinName = Math.random() < 0.5 ? 'Gold' : 'Silver';
        // }
        var fishFlyingTime = 1.35;
        var fishFlyingMissTime = 1.5;
        var animationTime = isWinWild ? fishFlyingTime : fishFlyingMissTime;
        var delayTime = 0;
        var timeScaleRate = 1;
        if (timeStop >= animationTime) {
            delayTime = timeStop - animationTime;
        } else {
            timeScaleRate = animationTime / timeStop;
        }
        return { animationName: animationName, delayTime: delayTime, timeScaleRate: timeScaleRate, skinName: skinName, animationTime: animationTime };
    },
    stopFishFlyingEffect: function stopFishFlyingEffect() {
        this.allFishFlyingData = new Array(5).fill(null);
        this.vfxWaterLight.runAction(cc.fadeOut(0.3));
    },
    calculateAllAnimationTime: function calculateAllAnimationTime() {
        this.animationDataStore = {};
        this.listAnimations = [];
        for (var animationName in this.fishSkeleton.skeletonData.skeletonJson.animations) {
            this.listAnimations.push(animationName);
        }
        this.playAnimation(0);
    },
    playAnimation: function playAnimation(count) {
        var _this3 = this;

        if (!this.listAnimations[count]) {
            cc.log(this.animationDataStore, 'finish calculate all animation time');
            return;
        }
        this.fishSkeleton.setAnimation(0, this.listAnimations[count], false);
        var startTime = new Date().getTime();
        this.fishSkeleton.setCompleteListener(function () {
            var endTime = new Date().getTime();
            var changeTime = (endTime - startTime) / 1000;
            _this3.animationDataStore[_this3.listAnimations[count]] = changeTime;
            _this3.fishSkeleton.setCompleteListener(function () {});
            _this3.playAnimation(count + 1);
        });
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
        //# sourceMappingURL=FishFlyingAnimation9983.js.map
        