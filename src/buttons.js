Crafty.c("HighlightedButton", {
	init: function() {
		this.requires('2D, Canvas, Mouse');
		this._outline = Crafty.e('2D, Canvas, Color');
		if (this.has("UI")) {
			this._outline.requires('UI');
		}
		this._outline.w = this._w;
		this._outline.h = this._h;
		this._outline.color('rgb(200,200,255)');
		this._outline.alpha = .0;
		this.defAlpha = .0;
		this.attach(this._outline);
		this.bind('MouseOver', function() {
			this._outline.alpha = .33;
		});
		this.bind('MouseOut', function() {
			this._outline.alpha = this.defAlpha;
		});
		this.bind('MouseDown', function() {
			this._outline.alpha = .5;
		});
		this.bind('MouseUp', function() {
			this._outline.alpha = .33;
	    });
	},

	setDefaultTransparency: function(alpha) {
		this.defAlpha = alpha;
	}
});

Crafty.c("AddAnimationButton", {
	init: function() {
		this.requires("UIOverlay, HighlightedButton, __spr_check");
		this.h = 32;
		this.w = 32;
		this.bind("Click", function() {
			if (AnimationEditor.animations.length === 15) {
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

Crafty.c("AddLabelButton", {
    init: function() {
        this.requires("UIOverlay, HighlightedButton, __spr_check");
        this.h = 32;
        this.w = 32;
        this.xPlace = 0;
        this.yPlace = 30;
        this.bind("Click", function() {
            var label = Crafty.e("SpriteLabel");
            label.setCenteredPos(AnimationEditor.sheetLabels.xoff + this.xPlace,
                                AnimationEditor.sheetLabels.yoff + this.yPlace,
                                AnimationEditor.sheetLabels.xside,
                                AnimationEditor.sheetLabels.yside);
            if (this.xPlace === 122) {
                this.yPlace += 72;
                this.xPlace = 0;
            } else {
                this.xPlace = 122;
            }
        });
    }
});

Crafty.c("ResetButton", {
	init: function() {
		this.requires("UIOverlay, HighlightedButton, __spr_cross");
		this.h = 32;
		this.w = 32;
        this.bind("Click", function() {
            //Todo: give an 'are you sure' message
            Crafty("SpriteLabel").each(function(){
                this.reset();
            });
            Crafty("AddLabelButton").each(function() {
                this.xPlace = 0;
                this.yPlace = 30;
            });
            Crafty("__spr_sheet").destroy();
            AnimationEditor.animations = [];
            Crafty("AnimationController").each(function() {
                this.reset();
            });
            Crafty.curAni = -1;
            Crafty.removeAssets(AnimationEditor.spriteString);
            Crafty.spriteString = null;
        });
	}
});

Crafty.c("DownloadButton", {
	init: function() {
		this.requires("UIOverlay, HighlightedButton, __spr_floppy");
        this.h = 32;
		this.w = 32;
        this.bind("Click", function() {
            if (AnimationEditor.labels && AnimationEditor.labels[0][0]) {
                var hiddenElement = document.createElement('a');
                // write the loadstring
                spriteString = "{\"sprites\"\: {" +
                    "\""+AnimationEditor.filename +"\"\: {" +
                        "\"tile\"\: "+ AnimationEditor.tileWidth + "," +
                        "\"tileh\"\: "+ AnimationEditor.tileHeight + "," +
                        "\"map\"\: { \""+ AnimationEditor.labels[0][0]+"\"\: [0,0]}," +
                        "\"paddingX\"\: "+ AnimationEditor.padding + "," +
                        "\"paddingY\"\: "+ AnimationEditor.padding +
                    "}"+
                "}}";
                // write the components
                componentString = "Crafty.c(\""+AnimationEditor.labels[0][0].substring(4)+"\", {" + String.fromCharCode(13);
                    componentString += "\tinit: function() {" + String.fromCharCode(13);
                        componentString += "\t\tthis.loadString =" + spriteString + String.fromCharCode(13);
                        componentString += "\t\tthis.requires(\""+AnimationEditor.labels[0][0]+"\");" + String.fromCharCode(13);
                        for (var i = 0; i < AnimationEditor.animations.length; i++){
                            a = AnimationEditor.animations[i].animationDetails;
                            if (AnimationEditor["animation"+a.animationID]) {
                                componentString += "\t\tthis.reel(\"";
                                    componentString += AnimationEditor["animation"+a.animationID]+"\"," + String.fromCharCode(13);
                                    componentString += "\t\t"+((1/(a.FPS/a.frames.length))*1000)+"," + String.fromCharCode(13);
                                    componentString += "\t\t[";
                                    for (var j = 0; j < a.frames.length; j++) {
                                        if (j !== 0) {
                                            componentString += ",";
                                        }
                                        f = a.frames[j];
                                        componentString += "["+f.spritex+","+f.spritey+"]";
                                    }
                                    componentString += "]";
                                componentString += ");" + String.fromCharCode(13);
                            }
                        }
                    componentString += "\t}" + String.fromCharCode(13);
                componentString += "});" + String.fromCharCode(13);

                hiddenElement.href = "data:attachment/txt;charset=utf-8," + encodeURIComponent(componentString);
                hiddenElement.target = '_blank';
                hiddenElement.download = 'component.txt';
                hiddenElement.click();
            }
        });
	}
});

Crafty.c("UploadButton", {
    init: function() {
        this.requires("UIOverlay, HighlightedButton, __spr_arrow");
        this.h = 32;
		this.w = 32;
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
                    var maxx = 0;
                    var maxy = 0;
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
                            if (x > maxx) {
                                maxx = x;
                            } else if (y > maxy) {
                                maxy = y;
                            }
                        }
                    }
                    AnimationEditor.labels = [];
                    for (var y = 0; y <= maxy; y++) {
                        AnimationEditor.labels.push([]);
                        for (var x = 0; x <= maxx; x++) {
                            AnimationEditor.labels[y].push(null);
                        }
                    }
                    AnimationEditor.spriteString = spriteString;
                });
            }
        });
    }
});
