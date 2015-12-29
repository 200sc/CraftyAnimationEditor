AnimationEditor = {

	curAni: -1,

    animations: [],

    start: function() {
        Crafty.init();
        Crafty.background('rgb(50,50,50)');
        Crafty.scene("AnimationEditor");
    },

    _uiGlobalZ: Math.pow(2,16),

    uiGlobalZ: function() {
        this._uiGlobalZ += 10;
        return this._uiGlobalZ;
    },

    width: function() {
        return Crafty.viewport._width;
    },

    height: function() {
        return Crafty.viewport._height;
    },

    Text: {
		defaultColor: 'black',
        altColor: 'white',
		defaultStyle: {family: 'Verdana', size: '16px'}
	}

};

Crafty.defineScene("AnimationEditor", function(){
    Crafty.load({
        "sprites": {
            "assets/icons.png": {
                "tile": 64,
                "tileh": 64,
                "map": {"__spr_floppy": [0,0], "__spr_cross": [1,0], "__spr_check": [0,1], "__spr_arrow": [1,1]},
                "paddingX": 2,
                "paddingY": 2
            }
        }
    },function(){

        var sidebarBackground = Crafty.e("UIOverlay, Color");
        sidebarBackground.w = 256;
        sidebarBackground.h = AnimationEditor.height();
        sidebarBackground.bind('ViewportResize', function() {
            this.h = AnimationEditor.height();
        });
        sidebarBackground.color("rgb(100,100,100)");
        sidebarBackground.setCenteredPos(-256,0,"right","top");

        /////////
        // File Upload UI
        var fileUp = {
            xoff: -240,
            yoff: 90,
            xside: "right",
            yside: "top"
        };
		AnimationEditor.fileUp = fileUp;

        var filename = Crafty.e("UIOverlay, InputField");
        filename.setCenteredPos(fileUp.xoff,fileUp.yoff,fileUp.xside,fileUp.yside);
        filename.w = 200;
        filename.defaultText = "filename.png";
        filename.name = "filename";

        var filenameLabel = Crafty.e("AltText");
        filenameLabel.setCenteredPos(fileUp.xoff,fileUp.yoff-24,fileUp.xside,fileUp.yside);
        filenameLabel.setText("Filename");

        var tileWidth = Crafty.e("UIOverlay, InputField");
        tileWidth.setCenteredPos(fileUp.xoff+70,fileUp.yoff+32,fileUp.xside,fileUp.yside);
        tileWidth.w = 50;
        tileWidth.defaultText = "32";
        tileWidth.name = "tileWidth";

        var widthLabel = Crafty.e("AltText");
        widthLabel.setCenteredPos(fileUp.xoff,fileUp.yoff+40,fileUp.xside,fileUp.yside);
        widthLabel.setText("TileW");

        var tileHeight = Crafty.e("UIOverlay, InputField");
        tileHeight.setCenteredPos(fileUp.xoff+70,fileUp.yoff+64,fileUp.xside,fileUp.yside);
        tileHeight.w = 50;
        tileHeight.defaultText = "32";
        tileHeight.name = "tileHeight";

        var heightLabel = Crafty.e("AltText");
        heightLabel.setCenteredPos(fileUp.xoff,fileUp.yoff+72,fileUp.xside,fileUp.yside);
        heightLabel.setText("TileH");

        var padding = Crafty.e('UIOverlay, InputField');
        padding.setCenteredPos(fileUp.xoff+70,fileUp.yoff+96,fileUp.xside,fileUp.yside);
        padding.w = 50;
        padding.defaultText = "2";
        padding.name = "padding";

        var paddingLabel = Crafty.e("AltText");
        paddingLabel.setCenteredPos(fileUp.xoff,fileUp.yoff+104,fileUp.xside,fileUp.yside);
        paddingLabel.setText("Padding");

        var arrow_ico = Crafty.e("UploadButton");
        arrow_ico.setCenteredPos(fileUp.xoff+10,fileUp.yoff+138,fileUp.xside,fileUp.yside);

        var uploadLabel = Crafty.e("AltText");
        uploadLabel.setCenteredPos(fileUp.xoff+74,fileUp.yoff+168,fileUp.xside,fileUp.yside);
        uploadLabel.setText("Upload");

        var save_ico = Crafty.e("DownloadButton");
        save_ico.setCenteredPos(fileUp.xoff+10, fileUp.yoff+202,fileUp.xside,fileUp.yside);

        var downloadLabel = Crafty.e("AltText");
        downloadLabel.setCenteredPos(fileUp.xoff+74, fileUp.yoff+232,fileUp.xside,fileUp.yside);
        downloadLabel.setText("Download");

        // End File Upload UI
        /////////

		var animationTab = Crafty.e("UIOverlay, Color");
		animationTab.w = 128;
		animationTab.h = 32;
		animationTab.color("rgba(90,60,90,.75)");
		animationTab.setCenteredPos(-256,-288,"right","bottom");

		var animationLabel = Crafty.e("UIOverlay, DefText");
		animationLabel.setCenteredPos(-248,-280,"right","bottom");
		animationLabel.setText("Animations");

		var animationBackground = Crafty.e("UIOverlay, Color");
		animationBackground.w = AnimationEditor.width();
		animationBackground.h = 256;
		animationBackground.bind('ViewportResize', function() {
            this.w = AnimationEditor.width();
        });
		animationBackground.color("rgba(100,60,60,.5)");
		animationBackground.setCenteredPos(0,-256,"left","bottom");

		var lowSidebarBackground = Crafty.e("UIOverlay, Color");
        lowSidebarBackground.w = 256;
        lowSidebarBackground.h = 256;
        lowSidebarBackground.color("rgb(90,60,90)");
        lowSidebarBackground.setCenteredPos(-256,-256,"right","bottom");

		var splitterBar = Crafty.e("UIOverlay, Color");
        splitterBar.w = AnimationEditor.width();
        splitterBar.bind('ViewportResize', function() {
            this.w = AnimationEditor.width();
        });
        splitterBar.h = 8;
        splitterBar.color("rgb(90,60,90)");
        splitterBar.setCenteredPos(0,-256,"left","bottom");

        var delete_ico = Crafty.e("DeleteAnimationButton");
        var add_ico = Crafty.e("AddAnimationButton");
        delete_ico.setCenteredPos(-128,-64,"right","bottom");
        add_ico.setCenteredPos(-64,-64,"right","bottom");

    });
});

Crafty.c("HighlightedButton", {
	init: function() {
		this.requires('2D, Canvas, Mouse');
		this.outline = Crafty.e('2D, Canvas, Color');
		if (this.has("UI")) {
			this.outline.requires('UI');
		}
		this.outline.w = this._w;
		this.outline.h = this._h;
		this.outline.color('rgb(200,200,255)');
		this.outline.alpha = .01;
		this.attach(this.outline);
		this.bind('MouseOver', function() {
			this.outline.alpha = .33;
		});
		this.bind('MouseOut', function() {
			this.outline.alpha = .01;
		});
		this.bind('MouseDown', function() {
			this.outline.alpha = .5;
		});
		this.bind('MouseUp', function() {
			this.outline.alpha = .33;
	    });
	}
});

Crafty.c("AnimationController", {
	init: function(){
		this.requires("UIOverlay, HighlightedButton, Color");
		this.w = 240;
		this.h = 16;
	}
})

Crafty.c("AddAnimationButton", {
	init: function() {
		this.requires("UIOverlay, HighlightedButton, __spr_check");
		this.bind("Click", function() {
			AnimationEditor.curAni = AnimationEditor.animations.length;
			var controller = Crafty.e("AnimationController");
			controller.setCenteredPos(-248,-248+AnimationEditor.curAni*16,"right","bottom");
			if (AnimationEditor.curAni % 2 == 0) {
				controller.color("rgb(160,100,160)");
			} else {
				controller.color("rgb(140,100,100)");
			}
			AnimationEditor.animations.push(controller);
		});
	}
});

Crafty.c("DeleteAnimationButton", {
	init: function() {
		this.requires("UIOverlay, HighlightedButton, __spr_cross");
	}
});

Crafty.c("DownloadButton", {
	init: function() {
		this.requires("UIOverlay, HighlightedButton, __spr_floppy");
	}
});

Crafty.c("UploadButton", {
    init: function() {
        this.requires("UIOverlay, HighlightedButton, __spr_arrow");
        this.bind("Click", function() {
            Crafty.trigger("UploadPrep");
            if (AnimationEditor.filename && AnimationEditor.tileWidth &&
               AnimationEditor.tileHeight && AnimationEditor.padding) {
                var spriteString = "{\"sprites\"\: {" +
                    "\""+AnimationEditor.filename +"\"\: {" +
                        "\"tile\"\: "+ AnimationEditor.tileWidth + "," +
                        "\"tileh\"\: "+ AnimationEditor.tileHeight + "," +
                        "\"map\"\: { \"__spr_sheet\"\: [0,0]}," +
                        "\"paddingX\"\: "+ AnimationEditor.padding + "," +
                        "\"paddingY\"\: "+ AnimationEditor.padding +
                    "}"+
                "}}";
                console.log(spriteString);
                Crafty.load(spriteString, function() {
                    for (var x = 0; x < 32; x++) {
                        for (var y = 0; y < 32; y++) {
                            var e = Crafty.e("AnimationFrame");
							if (e.img.height <= (y+1)*AnimationEditor.tileHeight ||
							    e.img.width <= (x+1)*AnimationEditor.tileWidth) {
								e.destroy();
								continue;
							}
                            e.x = (x*AnimationEditor.tileWidth) + 32;
                            e.y = (y*AnimationEditor.tileHeight) + 32;
                            e.sprite(x,y);
							e.spritex = x;
							e.spritey = y;
                        }
                    }
                    AnimationEditor.spriteString = spriteString;
                });
            }
        });
    }
});

Crafty.c("Animation", {
	init: function() {

	}
});

Crafty.c("AnimationFrame", {
	init: function() {
		this.requires('HighlightedButton, __spr_sheet');
		this.bind('Click', function() {
			if (AnimationEditor.curAni !== -1) {
				AnimationEditor.animations[AnimationEditor.curAni].addFrame(this.spritex,this.spritey);
			}
		})
	}
});

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
