"use strict";
cc._RF.push(module, '5a8c2sJ0YRGL5ruoxwKN42I', 'SwitchScene');
// cc-common/cc-slot-base-test/Streaming/scripts/SwitchScene.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewClass.prototype.switchScene = function (ev, sceneName) {
        cc.director.loadScene(sceneName);
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();