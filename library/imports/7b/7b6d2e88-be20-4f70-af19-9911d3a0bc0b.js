"use strict";
cc._RF.push(module, '7b6d26IviBPcK8ZmRHToLwL', 'UpdatePanel');
// cc-common/cc-lobby-999/HotUpdate/UpdatePanel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UpdatePanel = /** @class */ (function (_super) {
    __extends(UpdatePanel, _super);
    function UpdatePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.info = null;
        _this.byteProgress = null;
        return _this;
    }
    __decorate([
        property(cc.Label)
    ], UpdatePanel.prototype, "info", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], UpdatePanel.prototype, "byteProgress", void 0);
    UpdatePanel = __decorate([
        ccclass
    ], UpdatePanel);
    return UpdatePanel;
}(cc.Component));
exports.UpdatePanel = UpdatePanel;
;

cc._RF.pop();