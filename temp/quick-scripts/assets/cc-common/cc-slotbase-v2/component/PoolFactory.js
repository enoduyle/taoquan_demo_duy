(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/PoolFactory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '60ad2e1wNZL0L8t3zKqDP+0', 'PoolFactory', __filename);
// cc-common/cc-slotbase-v2/component/PoolFactory.js

'use strict';

var PoolPrefab = cc.Class({
    name: 'PoolPrefab',
    properties: {
        prefabName: {
            default: ''
        },

        objectPrefab: {
            type: cc.Prefab,
            default: null
        },

        initialCount: 5
    }
});
cc.Class({
    extends: cc.Component,

    properties: {
        poolPrefabList: {
            type: PoolPrefab,
            default: []
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.pools = [];
        for (var i = 0; i < this.poolPrefabList.length; i++) {
            var compName = this.poolPrefabList[i].prefabName;
            var aPool = new cc.NodePool(compName);

            for (var j = 0; j < this.poolPrefabList[i].initialCount; j++) {
                var obj = cc.instantiate(this.poolPrefabList[i].objectPrefab);
                obj.name = compName;
                obj.active = false;
                aPool.put(obj);
            }
            var poolObject = {
                prefabName: this.poolPrefabList[i].prefabName,
                objectPrefab: this.poolPrefabList[i].objectPrefab,
                pool: aPool
            };
            this.pools[i] = poolObject;
        }
        this.node.poolFactory = this;
    },
    getObject: function getObject(_prefabName) {
        var obj = null;
        for (var i = 0; i < this.pools.length; i++) {
            var _pools$i = this.pools[i],
                prefabName = _pools$i.prefabName,
                objectPrefab = _pools$i.objectPrefab,
                pool = _pools$i.pool;

            if (prefabName == _prefabName) {
                if (pool.size() > 0) {
                    obj = pool.get();
                } else {
                    obj = cc.instantiate(objectPrefab);
                    obj.name = prefabName;
                    obj.active = false;
                }
                break;
            }
        }
        return obj;
    },
    removeObject: function removeObject(node) {
        var name = node.name;
        for (var i = 0; i < this.pools.length; i++) {
            var _pools$i2 = this.pools[i],
                prefabName = _pools$i2.prefabName,
                pool = _pools$i2.pool;

            if (name == prefabName) {
                node.active = false;
                pool.put(node);
                break;
            }
        }
    },
    onDestroy: function onDestroy() {
        for (var i = 0; i < this.pools.length; i++) {
            var pool = this.pools[i].pool;

            if (pool) {
                pool.clear();
            }
            this.poolPrefabList[i].objectPrefab = null;
        }
        this.pools = [];
        this.pools = null;
        this.poolPrefabList = [];
        this.poolPrefabList = null;
        this.node.poolFactory = null;
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
        //# sourceMappingURL=PoolFactory.js.map
        