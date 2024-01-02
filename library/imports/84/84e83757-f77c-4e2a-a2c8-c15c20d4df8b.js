"use strict";
cc._RF.push(module, '84e83dX93xOKqLIwVwg1N+L', 'DynamicLoadingSpines');
// cc-common/cc-slot-base-test/dynamicLoadingAssets/DynamicLoadingSpines.js

'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global cc,sp */

cc.Class({
    extends: cc.Component,

    properties: {
        symbolIds: '2,3,4,5,6,7,8,9,10,K,K1,K2,K3,J,Q,JP,A,R',
        defaultUrl: 'https://static.ktek.io/animTool/spines/',
        prefix: 'Symbol_'
    },

    onLoad: function onLoad() {
        var _this = this;

        this.node.controller = this;
        var types = ['png', 'atlas', 'json'];
        this.spineSymbolUrls = [];
        this.spineObject = {};

        this.symbolIds.split(',').forEach(function (id) {
            types.forEach(function (type) {
                var url = '' + _this.defaultUrl + _this.prefix + id + '.' + type;
                _this.spineSymbolUrls.push(url);
                if (_this.spineObject[id]) {
                    _this.spineObject[id][type] = url;
                } else {
                    _this.spineObject[id] = _defineProperty({}, type, url);
                }
            });
        });

        this.updatedSpines = [];
        var thiz = this;
        cc.loader.load(this.spineSymbolUrls, function (errors, result) {
            if (errors) {
                for (var i = 0; i < errors.length; i++) {
                    cc.log('Error url [' + errors[i] + ']: ' + result.getError(errors[i]));
                }
            }

            for (var id in _this.spineObject) {
                var spine = _this.spineObject[id];
                var atlasText = void 0,
                    skeletonJson = void 0,
                    texture = void 0;
                for (var type in spine) {
                    var content = result.getContent(spine[type]);
                    if (content) {
                        if (type === 'png') texture = content;else if (type === 'json') skeletonJson = content;else atlasText = content;
                    }
                    if (texture && skeletonJson && atlasText) {
                        var skeletonData = new sp.SkeletonData();
                        skeletonData.atlasText = atlasText;
                        skeletonData.skeletonJson = skeletonJson;
                        skeletonData.textures.push(texture);
                        skeletonData.textureNames.push('' + _this.prefix + id + '.png');
                        _this.updatedSpines.push({ name: id, spine: skeletonData });
                    }
                }
            }
            thiz.node.symbolPayline.getComponent("SlotSymbolPayline").spineList = _this.updatedSpines;
        });
    }
});

cc._RF.pop();