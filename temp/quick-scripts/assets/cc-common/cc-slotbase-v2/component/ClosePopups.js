(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/ClosePopups.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '11a860uD+lGO4WuUV+bfDSX', 'ClosePopups', __filename);
// cc-common/cc-slotbase-v2/component/ClosePopups.js

"use strict";

cc.Class({
	extends: cc.Component,

	onLoad: function onLoad() {
		this.fadeSpeed = 0.2;
		this.isFading = false;
	},
	closePopups: function closePopups() {
		var _this = this;

		if (this.isFading) return;
		this.isFading = true;
		this.scheduleOnce(function () {
			_this.isFading = false;
		}, this.fadeSpeed);
		var mainDirector = this.node.mainDirector;
		if (!mainDirector || !mainDirector.director) return;
		var director = mainDirector.director;
		director.closePopups && director.closePopups();
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
        //# sourceMappingURL=ClosePopups.js.map
        