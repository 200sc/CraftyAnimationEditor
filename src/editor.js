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

	_nextID: -1,

	getID: function() {
		this._nextID++;
		return this._nextID;
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
		defaultStyle: {family: 'Verdana', size: '16px'},
		smallStyle: {family: 'Verdana', size: '10px'}
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

		var uploadLabel = Crafty.e("UIOverlay, AltText");
		uploadLabel.setCenteredPos(fileUp.xoff,fileUp.yoff-64,fileUp.xside,fileUp.yside);
		uploadLabel.setText("Sprite Sheet Upload");

        var filename = Crafty.e("UIOverlay, InputField");
        filename.setCenteredPos(fileUp.xoff,fileUp.yoff,fileUp.xside,fileUp.yside);
        filename.w = 230;
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
		animationBackground.color("rgba(100,60,60,.75)");
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
        delete_ico.setCenteredPos(-96,-36,"right","bottom");
        add_ico.setCenteredPos(-50,-36,"right","bottom");

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
		this.outline.alpha = .0;
		this.defAlpha = .0;
		this.attach(this.outline);
		this.bind('MouseOver', function() {
			this.outline.alpha = .33;
		});
		this.bind('MouseOut', function() {
			this.outline.alpha = this.defAlpha;
		});
		this.bind('MouseDown', function() {
			this.outline.alpha = .5;
		});
		this.bind('MouseUp', function() {
			this.outline.alpha = .33;
	    });
	},

	setDefaultTransparency: function(alpha) {
		this.defAlpha = alpha;
	}
});

Crafty.c("AnimationDetails", {
	init: function() {
		this.requires('UIOverlay, Color, Keyboard');
		this.w = 196;
		this.h = 208;
		this.color('rgb(255,50,50)');
		this.setCenteredPos(-452,-248,"right","bottom");
		this.visible = false;
		this.animationID = AnimationEditor.getID();

		this.nameBox = Crafty.e("UIOverlay, InputField");
		this.nameBox.w = 130;
		this.nameBox.name = "animation" + this.animationID;
		this.nameBox.parent = this;
		this.nameBox.defaultText = "animation";

		this.nameLabel = Crafty.e("AltText");
		this.nameLabel.setText("Name");

		this.frames = [];

		this.frameCountBox = Crafty.e("UIOverlay, InputField");
		this.frameCountBox.w = 32;
		this.frameCountBox.name = 'frameCount' + this.animationID;
		this.frameCountBox.parent = this;
		this.frameCountBox.defaultText = "10";

		this.frameLabel = Crafty.e("AltText");
		this.frameLabel.setText("#Frames");

		this.FPSBox = Crafty.e("UIOverlay, InputField");
		this.FPSBox.w = 32;
		this.FPSBox.name = 'fps' + this.animationID;
		this.FPSBox.parent = this;
		this.FPSBox.defaultText = "10";

		this.FPSLabel = Crafty.e("AltText");
		this.FPSLabel.setText("FPS");

		this.animationTarget = null;

		this.one("EnterFrame", function() {
			this.nameLabel.relativeCenter(this,6,12);
			this.nameBox.relativeCenter(this,58,8);
			this.frameCountBox.relativeCenter(this,82,40);
			this.frameLabel.relativeCenter(this,6,44);
			this.FPSBox.relativeCenter(this,156,40);
			this.FPSLabel.relativeCenter(this,120,44);
		});
		this.bind('FieldSaved', function(data) {
			if (data === this.nameBox.name) {
				this.parent.setText(AnimationEditor["animation"+this.animationID]);
				this.parent.text.textColor(AnimationEditor.Text.altColor);
			} else if (data === this.FPSBox.name) {
				this.FPS = AnimationEditor["fps"+this.animationID];
				if (this.frames.length !== 0) {
					this.beginAnimation();
				}
			} else if (data === this.frameCountBox.name) {
				if (AnimationEditor.spriteString){
					while (this.frames.length < AnimationEditor["frameCount" + this.animationID]) {
						this.addFrame(0,0);
					}
				}
			}
		});
	},

	beginAnimation: function(){
		if (this.animationTarget) {
			this.animationTarget.destroy();
		}
		reelframes = [];
		for (var i = 0; i < this.frames.length; i++) {
			reelframes.push([this.frames[i].spritex,this.frames[i].spritey])
		}
		console.log(reelframes);
		this.animationTarget = Crafty.e("UIOverlay, __spr_sheet, SpriteAnimation");
		this.animationTarget.relativeCenter(this,6,70);
		this.animationTarget.reel("animation", (1/(this.FPS / this.frames.length))*1000, reelframes);
		this.animationTarget.animate('animation', -1);
	},

	setVisible: function(boolean) {
		for (var i = 0; i < this.frames.length; i++){
			this.frames[i].visible = boolean;
		}
		this.nameBox.visible = boolean;
		if (this.nameBox.label) {
			this.nameBox.label.visible = boolean;
		}
		this.nameLabel.visible = boolean;
		this.frameCountBox.visible = boolean;
		if (this.frameCountBox.label) {
			this.frameCountBox.label.visible = boolean;
		}
		this.frameLabel.visible = boolean;
		this.FPSBox.visible = boolean;
		if (this.FPSBox.label) {
			this.FPSBox.label.visible = boolean;
		}
		this.FPSLabel.visible = boolean;
		if (this.animationTarget) {
			this.animationTarget.visible = boolean;
		}
		this.visible = boolean;
	},

	show: function() {
		this.setVisible(true);
	},

	hide: function() {
		this.nameBox.trigger("UploadPrep");
		this.FPSBox.trigger("UploadPrep");
		this.frameCountBox.trigger("UploadPrep");
		this.setVisible(false);
	},

	addFrame: function(x,y) {
		frame = Crafty.e("AnimationFrame");
		frame.spritex = x;
		frame.spritey = y;
		frame.sprite(x,y);
		frame.setCenteredPos(this.frames.length*AnimationEditor.tileWidth,
							 -248,"left","bottom");
		frame.listpos = this.frames.length;
		frame.parent = this;
		this.frames.push(frame);
		this.updateFrameCount();
	},

	updateFrameCount: function() {
		this.frameCountBox.drawText(String(this.frames.length));
		this.frameCountBox.defaultText = String(this.frames.length);
	}
})

Crafty.c("AnimationController", {
	init: function(){
		this.requires("UIOverlay, HighlightedButton, Color");
		this.w = 240;
		this.h = 16;
		this.bind("Click", function() {
			this.selected = !this.selected;
			if (this.selected) {
				this.showAnimation();
			} else {
				this.hideAnimation();
			}
		});
		this.text = Crafty.e("UIOverlay, SmallDefText");
		this.animationDetails = Crafty.e("AnimationDetails");
		this.animationDetails.parent = this;
	},

	setColor: function(color) {
		this.color(color);
		this.colorVal = color;
	},

	showAnimation: function() {
		this.color("rgb(255,50,50)");
		if (AnimationEditor.curAni !== this.index && AnimationEditor.curAni !== -1) {
			AnimationEditor.animations[AnimationEditor.curAni].hideAnimation();
		}
		AnimationEditor.curAni = this.index;
		this.animationDetails.show();
		this.text.textColor(AnimationEditor.Text.altColor);
		this.selected = true;
		if (this.w === 240) {
			this.w = 248;
			this.x = AnimationEditor.width()-256;
		}
	},

	hideAnimation: function() {
		if (this.w === 248) {
			this.w = 240;
			this.x = AnimationEditor.width()-248;
		}
		this.color(this.colorVal);
		if (AnimationEditor.curAni === this.index) {
			AnimationEditor.curAni = -1;
		}
		this.text.textColor(AnimationEditor.Text.defaultColor);
		this.animationDetails.hide();
		this.selected = false;
	},

	addFrame: function(x,y) {
		this.animationDetails.addFrame(x,y);
	},

	setText: function(input) {
		this.text.relativeCenter(this,2,2);
		this.text.setText(input);
	}
});

Crafty.c("SpriteFrame", {
	init: function() {
		this.requires('HighlightedButton, __spr_sheet, Collision, Draggable');
		this.bind("StartDrag", function() {
			this.initialx = this.x;
			this.initialy = this.y;
		});
		this.bind("StopDrag", function() {
			collisions = this.hit("AnimationFrame");
			if (collisions) {
				hitFrame = collisions[0].obj;
				hitFrame.setSprite(this.spritex,this.spritey);
			}
			this.y = this.initialy;
			this.x = this.initialx;
		});
		this.bind('MouseUp', function(e) {
			if (e.mouseButton === Crafty.mouseButtons.RIGHT) {
				if (AnimationEditor.curAni !== -1) {
					AnimationEditor.animations[AnimationEditor.curAni].addFrame(this.spritex,this.spritey);
				}
			}
		})
	},

	setSprite: function(x,y){
		this.spritex = x;
		this.spritey = y;
		this.sprite(x,y);
	}
});

Crafty.c("AnimationFrame", {
	init: function() {
		this.requires('UIOverlay, HighlightedButton, __spr_sheet, Collision');
		this.bind('MouseUp', function(e) {
			if (e.mouseButton === Crafty.mouseButtons.RIGHT) {
				for (var i = this.listpos+1; i < this.parent.frames.length; i++) {
					this.parent.frames[i-1] = this.parent.frames[i];
					this.parent.frames[i-1].x -= AnimationEditor.tileWidth;
					this.parent.frames[i-1].listpos--;
				}
				this.parent.frames.pop();
				this.parent.updateFrameCount();
				this.destroy();
			}
		})
	},

	setSprite: function(x,y){
		this.spritex = x;
		this.spritey = y;
		this.sprite(x,y);
	}
});


Crafty.c("AddAnimationButton", {
	init: function() {
		this.requires("UIOverlay, HighlightedButton, __spr_check");
		this.h = 32;
		this.w = 32;
		this.bind("Click", function() {
			if (AnimationEditor.animations.length === 13) {
				return;
			}
			if (AnimationEditor.curAni !== -1) {
				AnimationEditor.animations[AnimationEditor.curAni].hideAnimation();
			}
			AnimationEditor.curAni = AnimationEditor.animations.length;
			var controller = Crafty.e("AnimationController");
			controller.index = AnimationEditor.curAni;
			controller.setCenteredPos(-248,-248+AnimationEditor.curAni*16,"right","bottom");
			if (AnimationEditor.curAni % 2 == 0) {
				controller.setColor("rgb(160,100,160)");
			} else {
				controller.setColor("rgb(100,100,140)");
			}
			controller.setText("animation " + AnimationEditor.curAni);
			AnimationEditor.animations.push(controller);
			controller.showAnimation();
		});
	}
});

Crafty.c("DeleteAnimationButton", {
	init: function() {
		this.requires("UIOverlay, HighlightedButton, __spr_cross");
		this.h = 32;
		this.w = 32;
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
                            var e = Crafty.e("SpriteFrame");
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

Crafty.c("RectangleBorder", {
	init: function() {
		this.requires('2D');
		this.top = Crafty.e("2D, Canvas");
		this.right = Crafty.e("2D, Canvas");
		this.left = Crafty.e("2D, Canvas");
		this.bottom = Crafty.e("2D, Canvas");
		this.attach(this.top);
		this.attach(this.right);
		this.attach(this.bottom);
		this.attach(this.left);
		this.sides = [this.top,this.bottom,this.left,this.right];
	},

	setup: function(requirements,w,h,thickness) {
		this.requires(requirements);
		this.top.w = w;
		this.top.h = thickness;

		this.bottom.h = thickness;
		this.bottom.w = w;
		this.bottom.y = h - thickness;

		this.right.w = thickness;
		this.right.h = h;
		this.right.x = w - thickness;

		this.left.w = thickness;
		this.left.h = h;
	},

	color: function(color){
		for (var i = 0; i < this.sides.length; i++) {
			this.sides[i].requires("Color");
			this.sides[i].color(color);
		}
	}
});
