Crafty.c("AltText", {
    init: function () {
        this.requires("UIOverlay, Text");
    },

    setText: function(input) {
        this.text(input);
        this.textColor(Settings.Text.altColor);
        this.textFont(Settings.Text.defaultStyle);
    }
});

Crafty.c("DefText", {
	init: function () {
		this.requires("UIOverlay, Text");
	},

	setText: function(input) {
		this.text(input);
		this.textColor(Settings.Text.defaultColor);
		this.textFont(Settings.Text.defaultStyle);
	}
});

Crafty.c("SmallDefText", {
	init: function () {
		this.requires("UIOverlay, Text");
	},

	setText: function(input) {
		this.text(input);
		this.textColor(Settings.Text.defaultColor);
		this.textFont(Settings.Text.smallStyle);
	}
});

Crafty.c("SmallAltText", {
	init: function () {
		this.requires("UIOverlay, Text");
	},

	setText: function(input) {
		this.text(input);
		this.textColor(Settings.Text.altColor);
		this.textFont(Settings.Text.smallStyle);
	}
});
