(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/3DParticle9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '18494XxhUtNdrFp195rVs0/', '3DParticle9983', __filename);
// cc-taoquan-9983/scripts/common/3DParticle9983.js

'use strict';

var _require = require('utils'),
    getRandomInt = _require.getRandomInt;

var NodePool = require('NodePool9983');
var configParticle9983 = cc.Class({
    name: 'configParticle9983',
    properties: {
        start: 0,
        end: 0
    }
});
cc.Class({
    extends: cc.Component,

    properties: {
        particleNode: cc.Node,
        particlePerSpawn: 0,
        spawnInterval: 0.1,
        speed: {
            type: configParticle9983,
            default: {}
        },
        gravity: 0,
        angle: {
            type: configParticle9983,
            default: {}
        },
        size: {
            type: configParticle9983,
            default: {}
        },
        radius: 0,
        duration: -1
    },
    onLoad: function onLoad() {
        this.nodePool = new NodePool('ParticleItem9983');
        this.nodePool.init(this.particleNode);
        this.node.exit = this.exit.bind(this);
        this.node.setSpawnRate = this.setSpawnRate.bind(this);
        this.node.setItemSpeed = this.setItemSpeed.bind(this);
        this.node.setSpawnInterval = this.setSpawnInterval.bind(this);
    },
    start: function start() {
        this.spawnTimer = 0;
        this.timer = 0;
    },
    exit: function exit() {
        this.node.removeAllChildren(true);
        this.timer = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var child = _step.value;

                child.stopAnimation();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        this.nodePool.clearPool();
    },
    setSpawnRate: function setSpawnRate(perSpawn) {
        this.particlePerSpawn = perSpawn;
    },
    setItemSpeed: function setItemSpeed(minSpeed, maxSpeed) {
        this.speed = {
            start: minSpeed,
            end: maxSpeed
        };
    },
    setSpawnInterval: function setSpawnInterval(interval) {
        this.spawnInterval = interval;
    },
    update: function update(dt) {
        if (this.duration < 0 || this.timer <= this.duration) {
            this.timer += dt;
            this.spawnTimer += dt;
            if (this.spawnTimer >= this.spawnInterval) {
                this.spawnTimer -= this.spawnInterval;
                for (var i = 0; i < this.particlePerSpawn; i++) {
                    var node = this.nodePool.getObj();
                    node.parent = this.node;
                    // node.active = true;
                    node.angle = getRandomInt(0, 360);
                    node.scale = this.size.start + Math.random() * (this.size.end - this.size.start) * 2;
                    var angle = cc.misc.degreesToRadians(this.angle.start) + Math.random() * (cc.misc.degreesToRadians(this.angle.end) - cc.misc.degreesToRadians(this.angle.start));
                    node.position = this.radius === 0 ? cc.v2(0, 0) : this.generatePoint(angle);
                    var speed = this.speed.start + Math.random() * (this.speed.end - this.speed.start);
                    node.startAnimation(Math.cos(angle) * speed, Math.sin(angle) * speed, 0, this.gravity);
                }
            }
        }
    },
    generatePoint: function generatePoint(angle) {
        // let angle = cc.misc.degreesToRadians(this.angle.start) + Math.random() * (cc.misc.degreesToRadians(this.angle.end) - cc.misc.degreesToRadians(this.angle.start));
        var x = Math.cos(angle) * this.radius;
        var y = Math.sin(angle) * this.radius;
        return cc.v2(x, y);
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
        //# sourceMappingURL=3DParticle9983.js.map
        