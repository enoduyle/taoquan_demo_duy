"use strict";
cc._RF.push(module, 'dea1ag90KVP+aJg5tng2yY2', 'baseAssetsManager');
// cc-common/cc-share-v1/common/baseComponent/baseAssetsManager.js

"use strict";

cc.Class({

    properties: {},

    onCheckAllResource: function onCheckAllResource(resourcePrefix, callbackProgress, callbackLoaded) {
        var _this = this;

        this.loaded = false;
        this.loadSpine = 0;
        this.loadSound = 0;
        this.loadPrefab = 0;
        this.loadSharePrefab = 0;
        this.loadSprite = 0;
        this.loadParticle = 0;
        this.prefabData = {};
        this.spriteData = {};
        this.spineData = {};
        this.particleData = {};
        this.soundData = {};

        this.total = 6;

        cc.loader.loadResDir(resourcePrefix + "/Sprite", cc.SpriteFrame, function (loaded, total) {
            _this.loadSprite = total ? loaded / total : 1;
            _this.checkResourceProgress(callbackProgress);
        }, function (err, assets) {

            for (var i = 0; i < assets.length; i++) {
                _this.spriteData[assets[i]._name] = assets[i];
            }
            _this.loadSprite = 1;
            _this.checkResourceFinish(callbackLoaded);
        });

        cc.loader.loadResDir(resourcePrefix + "/Particle", cc.Particle, function (loaded, total) {
            _this.loadParticle = total ? loaded / total : 1;
            _this.checkResourceProgress(callbackProgress);
        }, function (err, assets, urls) {
            for (var i = 0; i < assets.length; i++) {
                var symbolText = urls[i].replace(resourcePrefix + '/Particle/', '').split('/');
                if (!_this.particleData[symbolText[0]]) {
                    _this.particleData[symbolText[0]] = {};
                }
                _this.particleData[symbolText[0]][symbolText[1]] = assets[i];
            }
            _this.loadParticle = 1;
            _this.checkResourceFinish(callbackLoaded);
        });

        cc.loader.loadResDir(resourcePrefix + "/SFX", cc.AudioClip, function (loaded, total) {
            _this.loadSound = total ? loaded / total : 1;
            _this.checkResourceProgress(callbackProgress);
        }, function (err, assets) {
            for (var i = 0; i < assets.length; i++) {
                _this.soundData[assets[i]._name] = assets[i];
            }
            _this.loadSound = 1;
            _this.checkResourceFinish(callbackLoaded);
        });

        cc.loader.loadResDir(resourcePrefix + "/Prefab", cc.Prefab, function (loaded, total) {
            _this.loadPrefab = total ? loaded / total : 1;
            _this.checkResourceProgress(callbackProgress);
        }, function (err, assets) {
            for (var i = 0; i < assets.length; i++) {
                _this.prefabData[assets[i]._name] = assets[i];
            }
            _this.loadPrefab = 1;
            _this.checkResourceFinish(callbackLoaded);
        });

        cc.loader.loadResDir("share/Prefab", cc.Prefab, function (loaded, total) {
            _this.loadSharePrefab = total ? loaded / total : 1;
            _this.checkResourceProgress(callbackProgress);
        }, function (err, assets) {
            for (var i = 0; i < assets.length; i++) {
                _this.prefabData[assets[i]._name] = assets[i];
            }
            _this.loadSharePrefab = 1;
            _this.checkResourceFinish(callbackLoaded);
        });

        cc.loader.loadResDir(resourcePrefix + "/Spine", sp.SkeletonData, function (loaded, total) {
            _this.loadSpine = total ? loaded / total : 1;
            _this.checkResourceProgress(callbackProgress);
        }, function (err, assets, urls) {
            for (var i = 0; i < assets.length; i++) {
                var symbolText = urls[i].replace(resourcePrefix + '/Spine/', '').replace('/skeleton', '');
                _this.spineData[symbolText] = assets[i];
            }
            _this.loadSpine = 1;
            _this.checkResourceFinish(callbackLoaded);
        });
    },
    checkResourceProgress: function checkResourceProgress(callbackProgress) {
        var percent = (this.loadSprite + this.loadSpine + this.loadSound + this.loadPrefab + this.loadSharePrefab + this.loadParticle) / this.total * 100;
        callbackProgress(Math.floor(percent));
    },
    checkResourceFinish: function checkResourceFinish(callbackLoaded) {
        if (this.loaded) return;
        if (this.loadSprite + this.loadSpine + this.loadSound + this.loadPrefab + this.loadSharePrefab + this.loadParticle == this.total) {
            this.loaded = true;
            callbackLoaded();
        }
    }
});

cc._RF.pop();