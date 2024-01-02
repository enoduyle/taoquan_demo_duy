(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/dynamicLoadingAssets/DynamicLoadingSprites.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '35a5caMNHxPCph1MOhHVzkU', 'DynamicLoadingSprites', __filename);
// cc-common/cc-slot-base-test/dynamicLoadingAssets/DynamicLoadingSprites.js

'use strict';

/* global cc */

var _require = require('utils'),
    convertAssetArrayToObject = _require.convertAssetArrayToObject;

cc.Class({
    extends: cc.Component,
    properties: {
        symbolIds: '2,3,4,5,6,7,8,9,10,K,K1,K2,K3,J,Q,JP,A,R',
        defaultUrl: 'https://static.ktek.io/animTool/sprites/',
        blurSymbolPrefix: ''
    },

    onLoad: function onLoad() {
        var _this = this;

        this.listIds = this.symbolIds.split(',');
        this.staticSymbolUrls = this.listIds.map(function (value) {
            return '' + _this.defaultUrl + value + '.png';
        }) || [];
        this.blurSymbolUrls = this.listIds.map(function (value) {
            return _this.defaultUrl + 'blur' + value + '.png';
        }) || [];
        this.updatedSprites = [];
        this.updatedBlurs = [];

        this.getStaticSymbols();
        this.getBlurSymbols();
    },
    getStaticSymbols: function getStaticSymbols() {
        var _this2 = this;

        cc.loader.load(this.staticSymbolUrls, function (errors, resources) {
            if (errors) {
                for (var i = 0; i < errors.length; i++) {
                    // cc.log('Error url [' + errors[i] + ']: ' + result.getError(errors[i]));
                }
            }
            for (var _i = 0; _i < _this2.staticSymbolUrls.length; _i++) {
                var texture = resources.getContent(_this2.staticSymbolUrls[_i]);
                if (texture instanceof cc.Texture2D) {
                    var spriteFrame = new cc.SpriteFrame(texture);
                    spriteFrame.name = _this2.listIds[_i];
                    _this2.updatedSprites.push(spriteFrame);
                }
            }
            _this2.node.assets = convertAssetArrayToObject(_this2.updatedSprites);
            _this2.node.emit('REPLACE_SYMBOL_ASSETS', _this2.node.assets);
        });
    },
    getBlurSymbols: function getBlurSymbols() {
        var _this3 = this;

        cc.loader.load(this.blurSymbolUrls, function (errors, resources) {
            if (errors) {
                for (var i = 0; i < errors.length; i++) {
                    // cc.log('Error url [' + errors[i] + ']: ' + results.getError(errors[i]));
                }
            }
            for (var _i2 = 0; _i2 < _this3.blurSymbolUrls.length; _i2++) {
                var texture = resources.getContent(_this3.blurSymbolUrls[_i2]);
                if (texture instanceof cc.Texture2D) {
                    var spriteFrame = new cc.SpriteFrame(texture);
                    spriteFrame.name = '' + _this3.blurSymbolPrefix + _this3.listIds[_i2];
                    _this3.updatedBlurs.push(spriteFrame);
                }
            }
            _this3.node.blurAssets = convertAssetArrayToObject(_this3.updatedBlurs);
            _this3.node.emit('REPLACE_SYMBOL_BLUR_ASSETS', _this3.node.blurAssets);
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
        //# sourceMappingURL=DynamicLoadingSprites.js.map
        