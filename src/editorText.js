Crafty.c("AltText", {
    init: function () {
        this.requires("UIOverlay, Text");
    },

    setText: function(input) {
        this.text(input);
        this.textColor(AnimationEditor.Text.altColor);
        this.textFont(AnimationEditor.Text.defaultStyle);
    }
});

Crafty.c("DefText", {
	init: function () {
		this.requires("UIOverlay, Text");
	},

	setText: function(input) {
		this.text(input);
		this.textColor(AnimationEditor.Text.defaultColor);
		this.textFont(AnimationEditor.Text.defaultStyle);
	}
});

Crafty.c("SmallDefText", {
	init: function () {
		this.requires("UIOverlay, Text");
	},

	setText: function(input) {
		this.text(input);
		this.textColor(AnimationEditor.Text.defaultColor);
		this.textFont(AnimationEditor.Text.smallStyle);
	}
});

Crafty.c("SmallAltText", {
	init: function () {
		this.requires("UIOverlay, Text");
	},

	setText: function(input) {
		this.text(input);
		this.textColor(AnimationEditor.Text.altColor);
		this.textFont(AnimationEditor.Text.smallStyle);
	}
});
