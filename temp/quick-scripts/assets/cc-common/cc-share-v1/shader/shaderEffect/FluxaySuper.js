(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/shader/shaderEffect/FluxaySuper.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aeb7413HydH26gWvypLn0mV', 'FluxaySuper', __filename);
// cc-common/cc-share-v1/shader/shaderEffect/FluxaySuper.ts

/**
 *
 * https://github.com/ShawnZhang2015/ShaderHelper/blob/master/assets/shader/FluxaySuper.js
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FluxaySuper = /** @class */ (function (_super) {
    __extends(FluxaySuper, _super);
    function FluxaySuper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    FluxaySuper.prototype.start = function () {
        this.material = this.sprite.getMaterial(0);
        this._start = Date.now();
    };
    FluxaySuper.prototype.update = function (dt) {
        var now = Date.now();
        var time = ((now - this._start) / 1000);
        this.material.setProperty('time', time);
    };
    __decorate([
        property(cc.Sprite)
    ], FluxaySuper.prototype, "sprite", void 0);
    FluxaySuper = __decorate([
        ccclass
    ], FluxaySuper);
    return FluxaySuper;
}(cc.Component));
exports.default = FluxaySuper;

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
        //# sourceMappingURL=FluxaySuper.js.map
        