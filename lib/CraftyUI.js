Crafty.c('UI', {
	init: function () {
        this.requires("Canvas");
		this._globalZ = AnimationEditor.uiGlobalZ();
	},
});

// Allows a component to attach to the screen as the viewport moves.
Crafty.c('UIOverlay', {
	init: function () {
		this.requires("2D, UI")
			.bind('ViewportScroll', function () {
				this._moveWithViewport();
			})
			.bind('ViewportResize', function () {
				if (this.screenSizeBound){
					this._bindScreenPos();
				}
			})
			.bind('ViewportZoomed', function (){
				this._bindScreenPos();
			});

		this.screenx = 0;
		this.screeny = 0;
		this.screenoffsetx = 0;
		this.screenoffsety = 0;
		this.yBorder = 1;
		this.xBorder = 1;
		this.screenSizeBound = false;
		this._moveWithViewport();
	},


	// Private functions
	// Not intended to be called
	_bindScreenPos: function () {
		this.screenx = (this.screenoffsetx + (AnimationEditor.width()/2 * this.xBorder));
		this.screeny = (this.screenoffsety + (AnimationEditor.height()/2 * this.yBorder));
		this._moveWithViewport();
	},

	_moveWithViewport: function () {
		this.x = (-Crafty.viewport._x) + this.screenx;
		this.y = (-Crafty.viewport._y) + this.screeny;
	},


	// Use setCentered if you want to set something
	// and have it follow the screen as the screen size changes.
	// Default behavior, if given no xside or yside, is to
	// center the element.
	// xOffset and yOffset must be provided.
	setCenteredPos: function(xOffset, yOffset, xside, yside){
		this.screenSizeBound = true;
		if (xside === "left" || xside === 0){
			this.xBorder = 0;
		} else if (xside === "right" || xside === 2) {
			this.xBorder = 2;
		} else if (xside === "center" || xside === 1) {
			this.xBorder = 1;
		}
		this.screenoffsetx = xOffset;
		if (yside === "top" || yside === "up" || yside === 0){
			this.yBorder = 0;
		} else if (yside === "bottom" || yside === "down" || yside === 2) {
			this.yBorder = 2;
		} else if (yside === "center" || yside === 1) {
			this.yBorder = 1;
		}
		this.screenoffsety = yOffset;
		this._bindScreenPos();
	},

	setCenteredX: function (xOffset, side) {
		this.screenSizeBound = true;
		if (side === "left" || side === 0){
			this.xBorder = 0;
		} else if (side === "right" || side === 2) {
			this.xBorder = 2;
		} else if (side === "center" || side === 1){
			this.xBorder = 1;
		}
		this.screenoffsetx = xOffset;
		this._bindScreenPos();
	},

	setCenteredY: function (yOffset, side) {
		this.screenSizeBound = true;
		if (side === "top" || side === "up" || side === 0){
			this.yBorder = 0;
		} else if (side === "bottom" || side === "down" || side === 2) {
			this.yBorder = 2;
		} else if (side === "center" || side === 1) {
			this.yBorder = 1;
		}
		this.screenoffsety = yOffset;
		this._bindScreenPos();
	},

	// Use SetScreenPos if you do not want the elements
	// to move with the screen size changing
	setScreenPos: function (newx, newy) {
		this.screenSizeBound = false;
		this.screenx = newx;
		this.screeny = newy;
		this._moveWithViewport();
	},

	setScreenX: function (newx) {
		this.screenSizeBound = false;
		this.screenx = newx;
		this._moveWithViewport();
	},

	setScreenY: function (newy) {
		this.screenSizeBound = false;
		this.screeny = newy;
		this._moveWithViewport();
	}

});
