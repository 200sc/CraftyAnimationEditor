AnimationEditor = {

	curAni: -1,

    animations: [],

    labels: null,

    start: function() {
        Crafty.init();
        Crafty.background(Colors.bg);
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
		defaultColor: Colors.blk,
        altColor: Colors.wht,
		defaultStyle: {family: 'Verdana', size: '16px'},
		smallStyle: {family: 'Verdana', size: '10px'}
	},

    maxSheetWidth: 32,

    maxSheetHeight: 32

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
        sidebarBackground.color(Colors.side);
        sidebarBackground.setCenteredPos(-256,0,"right","top");

        AnimationEditor.baseGlobalZ = sidebarBackground._globalZ;

        /////////
        // File Upload UI
        var fileUp = {
            xoff: -244,
            yoff: 60,
            xside: "right",
            yside: "top"
        };
		AnimationEditor.fileUp = fileUp;

		var uploadLabel = Crafty.e("UIOverlay, AltText");
		uploadLabel.setCenteredPos(fileUp.xoff,fileUp.yoff-54,fileUp.xside,fileUp.yside);
		uploadLabel.setText("Sprite Sheet Control");

        var uploadBorder = Crafty.e("RectangleBorder");
        uploadBorder.setup(248, 158, 2);
        uploadBorder.color("black");
        uploadBorder.b_setCenteredPos(fileUp.xoff-6,fileUp.yoff-26,fileUp.xside,fileUp.yside);

        var filename = Crafty.e("UIOverlay, InputField");
        filename.setCenteredPos(fileUp.xoff,fileUp.yoff,fileUp.xside,fileUp.yside);
        filename.w = 230;
        filename.defaultText = Settings.filename_default;
        filename.name = "filename";

        var filenameLabel = Crafty.e("AltText");
        filenameLabel.setCenteredPos(fileUp.xoff,fileUp.yoff-24,fileUp.xside,fileUp.yside);
        filenameLabel.setText("Filename");

        var tileWidth = Crafty.e("UIOverlay, InputField");
        tileWidth.setCenteredPos(fileUp.xoff+70,fileUp.yoff+32,fileUp.xside,fileUp.yside);
        tileWidth.w = 50;
        tileWidth.defaultText = String(Settings.tile_width_default);
        tileWidth.name = "tileWidth";
        filename.tabField = tileWidth;

        var widthLabel = Crafty.e("AltText");
        widthLabel.setCenteredPos(fileUp.xoff,fileUp.yoff+40,fileUp.xside,fileUp.yside);
        widthLabel.setText("TileW");

        var tileHeight = Crafty.e("UIOverlay, InputField");
        tileHeight.setCenteredPos(fileUp.xoff+70,fileUp.yoff+64,fileUp.xside,fileUp.yside);
        tileHeight.w = 50;
        tileHeight.defaultText = String(Settings.tile_height_default);
        tileHeight.name = "tileHeight";
        tileWidth.tabField = tileHeight;

        var heightLabel = Crafty.e("AltText");
        heightLabel.setCenteredPos(fileUp.xoff,fileUp.yoff+72,fileUp.xside,fileUp.yside);
        heightLabel.setText("TileH");

        var padding = Crafty.e('UIOverlay, InputField');
        padding.setCenteredPos(fileUp.xoff+70,fileUp.yoff+96,fileUp.xside,fileUp.yside);
        padding.w = 50;
        padding.defaultText = String(Settings.padding_default);
        padding.name = "padding";
        tileHeight.tabField = padding;
        padding.tabField = filename;

        var paddingLabel = Crafty.e("AltText");
        paddingLabel.setCenteredPos(fileUp.xoff,fileUp.yoff+104,fileUp.xside,fileUp.yside);
        paddingLabel.setText("Padding");

        var arrow_ico = Crafty.e("UploadButton");
        arrow_ico.setCenteredPos(fileUp.xoff+123,fileUp.yoff+31,fileUp.xside,fileUp.yside);

        var uploadLabel = Crafty.e("AltText");
        uploadLabel.setCenteredPos(fileUp.xoff+158,fileUp.yoff+38,fileUp.xside,fileUp.yside);
        uploadLabel.setText("Upload");

        var save_ico = Crafty.e("DownloadButton");
        save_ico.setCenteredPos(fileUp.xoff+123, fileUp.yoff+63,fileUp.xside,fileUp.yside);

        var downloadLabel = Crafty.e("AltText");
        downloadLabel.setCenteredPos(fileUp.xoff+158, fileUp.yoff+70,fileUp.xside,fileUp.yside);
        downloadLabel.setText("Download");

        var reset_ico = Crafty.e("ResetButton");
        reset_ico.setCenteredPos(fileUp.xoff+123, fileUp.yoff+95,fileUp.xside,fileUp.yside);

        var resetLabel = Crafty.e("AltText");
        resetLabel.setCenteredPos(fileUp.xoff+158, fileUp.yoff+102,fileUp.xside,fileUp.yside);
        resetLabel.setText("Clear");

        // End File Upload UI
        /////////

        /////////
        // Sheet Labels UI
        var sheetLabels = {
            xoff: -244,
            yoff: 201,
            xside: "right",
            yside: "top"
        };
		AnimationEditor.sheetLabels = sheetLabels;

        var sheetLabelsLabel = Crafty.e("UIOverlay, AltText");
		sheetLabelsLabel.setCenteredPos(sheetLabels.xoff,sheetLabels.yoff,
                                        sheetLabels.xside,sheetLabels.yside);
		sheetLabelsLabel.setText("Labels");

        var addLabelButton = Crafty.e("AddLabelButton");
        addLabelButton.setCenteredPos(sheetLabels.xoff+52,sheetLabels.yoff-6,
                                     sheetLabels.xside,sheetLabels.yside);

        // End Sheet Labels UI
        /////////

        /////////
        // Animation UI

		var animationTab = Crafty.e("UIOverlay, Color");
		animationTab.w = 196;
		animationTab.h = 32;
		animationTab.color(Colors.tab);
		animationTab.setCenteredPos(-248,-288,"right","bottom");

		var animationLabel = Crafty.e("UIOverlay, DefText");
		animationLabel.setCenteredPos(-240,-280,"right","bottom");
		animationLabel.setText("Animations");

		var animationBackground = Crafty.e("UIOverlay, Color");
		animationBackground.w = AnimationEditor.width();
		animationBackground.h = 256;
		animationBackground.bind('ViewportResize', function() {
            this.w = AnimationEditor.width();
        });
		animationBackground.color(Colors.bot);
		animationBackground.setCenteredPos(0,-256,"left","bottom");
        //animationBackground._globalZ = 100;

		var lowSidebarBackground = Crafty.e("UIOverlay, Color");
        lowSidebarBackground.w = 256;
        lowSidebarBackground.h = 256;
        lowSidebarBackground.color(Colors.side2);
        lowSidebarBackground.setCenteredPos(-256,-256,"right","bottom");

//        var delete_ico = Crafty.e("DeleteAnimationButton");
//        delete_ico.setCenteredPos(-130,-286,"right","bottom");

        var add_ico = Crafty.e("AddAnimationButton");
        add_ico.setCenteredPos(-98,-286,"right","bottom");


        // End Animation UI
        //////////


		var splitterBar = Crafty.e("UIOverlay, Color");
        splitterBar.w = AnimationEditor.width();
        splitterBar.bind('ViewportResize', function() {
            this.w = AnimationEditor.width();
        });
        splitterBar.h = 8;
        splitterBar.color(Colors.side2);
        splitterBar.setCenteredPos(0,-256,"left","bottom");

        AnimationEditor.splitterBar = splitterBar;
        AnimationEditor.animationBackground = animationBackground;
        splitterBar.visible = false;
        animationBackground.visible = false;
    });
});

//TODO: Make sure input names are valid with spr_, or add spr_ to all things.
Crafty.c("SpriteLabel", {
    init: function() {
        this.requires("UIOverlay, InputField");
        this.ID = AnimationEditor.getID();
        this.w = 110;
        this.defaultText = Settings.sprite_label_default;
        this.name = "label" + this.ID;
        this._globalZ = AnimationEditor.baseGlobalZ + 1;

        this.outline = Crafty.e("RectangleBorder");
        this.outline.setup(118, 70, 2);
        this.outline.color(Colors.blk);

        this.xBox = Crafty.e("UIOverlay, InputField");
        this.xBox.w = 30;
        this.xBox.name = "x" + this.ID;
        this.xBox.defaultText = String(Settings.sprite_label_x_default);
        this.xBox.parent = this;
        this.tabField = this.xBox;

        this.xBoxLabel = Crafty.e("UIOverlay, AltText");
        this.xBoxLabel.setText("X:");

        this.yBox = Crafty.e("UIOverlay, InputField");
        this.yBox.w = 30;
        this.yBox.defaultText = String(Settings.sprite_label_y_default);
        this.yBox.name = "y" + this.ID;
        this.yBox.parent = this;
        this.xBox.tabField = this.yBox;
        this.yBox.tabField = this;

        this.yBoxLabel = Crafty.e("UIOverlay, AltText");
        this.yBoxLabel.setText("Y:");

        this.one("EnterFrame", function() {
            this.xBoxLabel.relativeCenter(this,0,40);
            this.xBox.relativeCenter(this,20,32);
            this.yBoxLabel.relativeCenter(this,60,40);
            this.yBox.relativeCenter(this,80,32);
            this.outline.b_relativeCenter(this,-4,-4);

            this.xBox._globalZ = this._globalZ;
            this.xBoxLabel._globalZ = this._globalZ;
            this.yBox._globalZ = this._globalZ;
            this.yBoxLabel._globalZ = this._globalZ;
            this.outline.setGlobalZ(this._globalZ);
        });
        this.bind("FieldSaved", function() {
            if (AnimationEditor["y"+this.ID] && AnimationEditor["x"+this.ID] &&
                AnimationEditor["label"+this.ID] && AnimationEditor.labels) {
                AnimationEditor.labels[AnimationEditor["y"+this.ID]][AnimationEditor["x"+this.ID]] = Settings.label_prefix+AnimationEditor["label"+this.ID];
            }
        });
    },

    reset: function() {
        this.xBox.destroy();
        if (this.xBox.label) {
            this.xBox.label.destroy();
        }
        this.xBoxLabel.destroy();
        this.yBox.destroy();
        if (this.yBox.label) {
            this.yBox.label.destroy();
        }
        this.yBoxLabel.destroy();
        this.outline.destroy();
        if (this.label) {
            this.label.destroy();
        }
        this.destroy();
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

	setup: function(w,h,thickness) {
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

        this.width = w;
        this.height = h;
        this.thickness = thickness;
	},

	color: function(color){
		for (var i = 0; i < this.sides.length; i++) {
			this.sides[i].requires("Color");
			this.sides[i].color(color);
		}
	},

    b_setCenteredPos: function(xoff,yoff,xside,yside) {
        for (var i = 0; i < this.sides.length; i++) {
			this.sides[i].requires("UIOverlay");
		}
        this.top.setCenteredPos(xoff,yoff,xside,yside);
        this.left.setCenteredPos(xoff,yoff,xside,yside);

        this.right.setCenteredPos(xoff+this.width-this.thickness,yoff,xside,yside);
        this.bottom.setCenteredPos(xoff,yoff+this.height-this.thickness,xside,yside);
    },

    b_relativeCenter: function(e,xoff,yoff) {
        for (var i = 0; i < this.sides.length; i++) {
			this.sides[i].requires("UIOverlay");
		}

        this.top.relativeCenter(e,xoff,yoff);
        this.left.relativeCenter(e,xoff,yoff);

        this.right.relativeCenter(e,xoff+this.width-this.thickness,yoff);
        this.bottom.relativeCenter(e,xoff,yoff+this.height-this.thickness);
    },

    setGlobalZ: function(z) {
        for (var i = 0; i < this.sides.length; i++) {
			this.sides[i]._globalZ = z;
		}
    }
});
