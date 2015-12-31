Crafty.c("Frame", {
    init: function () {
        this.requires("__spr_sheet, Collision");
    },

    setSprite: function (x, y) {
		this.spritex = x;
		this.spritey = y;
		this.sprite(x, y);
	}
});

Crafty.c("SpriteFrame", {
	init: function () {
		this.requires('HighlightedButton, Frame, Draggable');
		this.bind("StartDrag", function () {
			this.initialx = this.x;
			this.initialy = this.y;
            this.dragging = true;
            if (this.label) {
                this.label.destroy();
                this.labelBackground.destroy();
            }
		});
		this.bind("StopDrag", function () {
			var collisions = this.hit("AnimationFrame");
			if (collisions) {
				var hitFrame = collisions[0].obj;
				hitFrame.setSprite(this.spritex, this.spritey);
			}
			this.y = this.initialy;
			this.x = this.initialx;
            this.dragging = false;
		});
		this.bind('MouseUp', function (e) {
			if (e.mouseButton === Crafty.mouseButtons.RIGHT) {
				if (AnimationEditor.curAni !== -1) {
					AnimationEditor.animations[AnimationEditor.curAni].addFrame(this.spritex, this.spritey);
				}
			}
		});
        this.bind('MouseOver', function () {
            if (!this.dragging && AnimationEditor.labels &&
                    AnimationEditor.labels[this.spritey][this.spritex]) {
                this.labelBackground = Crafty.e("2D, Canvas, Color");
                this.labelBackground.x = this.x + this.w;
                this.labelBackground.y = this.y;
                this.labelBackground.h = 20;
                var context = Crafty.canvasLayer.context;
                context.font = Settings.Text.smallStyle;
                this.labelBackground.w = context.measureText(AnimationEditor.labels[this.spritey][this.spritex]).width + 15;
                this.labelBackground.color('black');
                this.label = Crafty.e("SmallAltText");
                this.label.x = this.x + this.w + 4;
                this.label.y = this.y + 4;
                this.label.setText(AnimationEditor.labels[this.spritey][this.spritex]);
            }
        });
        this.bind('MouseOut', function () {
            if (this.label) {
                this.label.destroy();
                this.labelBackground.destroy();
            }
        });
	}
});

Crafty.c("AnimationFrame", {
	init: function () {
		this.requires('UIOverlay, HighlightedButton, Frame');
		this.bind('MouseUp', function (e) {
			if (e.mouseButton === Crafty.mouseButtons.RIGHT) {
				for (var i = this.listpos+1; i < this.parent.frames.length; i++) {
					this.parent.frames[i-1] = this.parent.frames[i];
					this.parent.frames[i-1].listpos--;
                    this.parent.frames[i-1].setPosition();
				}
				this.parent.frames.pop();
				this.parent.updateFrameCount();
				this.destroy();
			}
		})
	},

    setPosition: function (listpos) {
        if (!listpos) {
            listpos = this.listpos;
        }
        y = listpos * AnimationEditor.tileHeight;
        x = AnimationEditor.tileWidth * Math.floor(y / (256-AnimationEditor.tileHeight));
        y = y % (256-AnimationEditor.tileHeight);
        y = y - (y % AnimationEditor.tileHeight);
        this._globalZ = AnimationEditor.animationBackground._globalZ + 1;
        this.setCenteredPos(x,-248+y,"left","bottom");
    }
});
