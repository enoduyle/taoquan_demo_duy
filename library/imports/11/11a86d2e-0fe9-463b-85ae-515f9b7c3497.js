"use strict";
cc._RF.push(module, '11a860uD+lGO4WuUV+bfDSX', 'ClosePopups');
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