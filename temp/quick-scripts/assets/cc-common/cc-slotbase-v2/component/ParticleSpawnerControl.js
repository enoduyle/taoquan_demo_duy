(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/ParticleSpawnerControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f2ed7rIFfVPE7hGrJSUGedl', 'ParticleSpawnerControl', __filename);
// cc-common/cc-slotbase-v2/component/ParticleSpawnerControl.js

'use strict';

var PoolFactory = require('PoolFactory');

cc.Class({
    extends: cc.Component,

    properties: {
        poolFactory: {
            type: PoolFactory,
            default: null
        },
        spawnPositions: [cc.Node],
        maxParticleCount: 20,
        minParticleCount: 15,
        minMovingSpeed: 10,
        maxMovingSpeed: 20,
        movingDirection: cc.Vec2.ONE,
        particlePrefabName: '',
        interval: 1,
        duration: 2,
        fromScale: 0.1,
        fromScaleVar: 0.1,

        toScale: 0.05,
        toScaleVar: 0.05,

        maxRotationYSpeed: 2,
        minRotationYSpeed: 0.5,
        maxRotationZSpeed: 2,
        minRotationZSpeed: -2,
        minInitAngle: -50,
        maxInitAngle: 50,
        _isPlaying: false,
        isPlaying: {
            get: function get() {
                return this._isPlaying;
            },
            set: function set(value) {
                this._isPlaying = value;
            },

            visible: false
        },
        spawnOnStart: false,
        isLoop: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._usingObjects = [];
        this._timer = 0;
        this.isPlaying = false;
    },
    start: function start() {
        if (this.spawnOnStart) {
            this.spawn();
        }
    },
    spawn: function spawn() {
        var quantity = this.getRandomInt(this.minParticleCount, this.maxParticleCount);
        for (var i = 0; i < quantity; i++) {
            if (this.poolFactory) {
                var particle = this.poolFactory.getObject(this.particlePrefabName);
                var speed = this.getRandomFloat(this.minMovingSpeed, this.maxMovingSpeed);
                var rotationYSpeed = this.getRandomFloat(this.minRotationYSpeed, this.maxRotationYSpeed);
                var _fromScale = this.fromScale + this.getRandomFloat(-this.fromScaleVar, this.fromScaleVar);
                var _toScale = this.toScale + this.getRandomFloat(-this.toScaleVar, this.toScaleVar);
                var scaleDelta = _toScale - _fromScale;
                var rotationZSpeed = this.getRandomFloat(this.minRotationZSpeed, this.maxRotationZSpeed);
                var initAngle = this.getRandomFloat(this.minInitAngle, this.maxInitAngle);
                if (particle) {
                    particle.active = true;
                    particle.speed = speed;
                    particle.direction = this.movingDirection;
                    particle.scaleDelta = scaleDelta;
                    particle.scale = _fromScale;
                    particle.rotationZSpeed = rotationZSpeed;
                    var j = i % this.spawnPositions.length;
                    var parentNode = this.spawnPositions[j];
                    if (parentNode) {
                        particle.x = Math.random() * parentNode.width - parentNode.width / 2;
                        particle.y = Math.random() * parentNode.height - parentNode.height / 2;
                        particle.parent = parentNode;
                    } else {
                        particle.x = Math.random() * this.node.width - this.node.width / 2;
                        particle.y = Math.random() * this.node.height - this.node.height / 2;
                        particle.parent = this.node;
                    }
                    particle.angle = initAngle;

                    var animationControl = particle.getComponent('AnimationControl');
                    if (animationControl) {
                        animationControl.playAnimation('', rotationYSpeed, true);
                    }
                    this._usingObjects.push(particle);
                }
            }
        }
        this.isPlaying = true;
    },
    update: function update(dt) {
        if (this._isPlaying) {
            this._timer += dt;
            if (this._timer >= this.interval) {
                for (var i = 0; i < this._usingObjects.length; i++) {
                    var particle = this._usingObjects[i];
                    if (particle) {
                        var direction = particle.direction;
                        var speed = particle.speed;
                        var scaleDelta = particle.scaleDelta;
                        var rotationZSpeed = particle.rotationZSpeed;
                        particle.scale += dt * scaleDelta / this.duration;
                        particle.x += direction.x * speed * dt;
                        particle.y += direction.y * speed * dt;
                        particle.angle += rotationZSpeed;
                    }
                }
            }
            if (this._timer >= this.duration + this.interval) {
                this.reset();
                if (this.isLoop) {
                    this.spawn();
                }
            }
        }
    },
    reset: function reset() {
        for (var i = 0; i < this._usingObjects.length; i++) {
            var particle = this._usingObjects[i];
            var animationControl = particle.getComponent('AnimationControl');
            if (animationControl) {
                animationControl.stopAnimation();
            }
            if (particle && this.poolFactory) {
                this.poolFactory.removeObject(particle);
            }
        }
        this._usingObjects = [];
        this._timer = 0;
        this._isPlaying = false;
    },
    getRandomFloat: function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    },
    getRandomInt: function getRandomInt(min, max) {
        return Math.floor(this.getRandomFloat(min, max));
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
        //# sourceMappingURL=ParticleSpawnerControl.js.map
        