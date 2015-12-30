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
		frame.listpos = this.frames.length;
		frame._globalZ -= 1000;
        frame.setPosition(this.frames.length);
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
