AnimationEditor = {
    
    animations: [],
    
    currentSprite: null,
    
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
            "icons.png": {
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
        
        var filename = Crafty.e("InputField, UIOverlay");
        filename.setCenteredPos(fileUp.xoff,fileUp.yoff,fileUp.xside,fileUp.yside);
        filename.w = 200;
        filename.defaultText = "filename.png";
        filename.name = "filename";
        
        var filenameLabel = Crafty.e("AltText");
        filenameLabel.setCenteredPos(fileUp.xoff,fileUp.yoff-24,fileUp.xside,fileUp.yside);
        filenameLabel.setText("Filename");
        
        var tileWidth = Crafty.e("InputField, UIOverlay");
        tileWidth.setCenteredPos(fileUp.xoff+70,fileUp.yoff+32,fileUp.xside,fileUp.yside);
        tileWidth.w = 50;
        tileWidth.defaultText = "32";
        tileWidth.name = "tileWidth";
        
        var widthLabel = Crafty.e("AltText");
        widthLabel.setCenteredPos(fileUp.xoff,fileUp.yoff+40,fileUp.xside,fileUp.yside);
        widthLabel.setText("TileW");
        
        var tileHeight = Crafty.e("InputField, UIOverlay");
        tileHeight.setCenteredPos(fileUp.xoff+70,fileUp.yoff+64,fileUp.xside,fileUp.yside);
        tileHeight.w = 50;
        tileHeight.defaultText = "32";
        tileHeight.name = "tileHeight";

        var heightLabel = Crafty.e("AltText");
        heightLabel.setCenteredPos(fileUp.xoff,fileUp.yoff+72,fileUp.xside,fileUp.yside);
        heightLabel.setText("TileH");
        
        var padding = Crafty.e('InputField, UIOverlay');
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
        
        var save_ico = Crafty.e("UIOverlay, __spr_floppy");
        save_ico.setCenteredPos(fileUp.xoff+10, fileUp.yoff+202,fileUp.xside,fileUp.yside);
        
        var downloadLabel = Crafty.e("AltText");
        downloadLabel.setCenteredPos(fileUp.xoff+74, fileUp.yoff+232,fileUp.xside,fileUp.yside);
        downloadLabel.setText("Download");
        
        // End File Upload UI
        /////////
        
        var splitterBar = Crafty.e("UIOverlay, Color");
        splitterBar.w = AnimationEditor.width();
        splitterBar.bind('ViewportResize', function() {
            this.w = AnimationEditor.width();
        });
        splitterBar.h = 16;
        splitterBar.color("rgb(120,100,120)");
        splitterBar.setCenteredPos(0,64,"left","center");
        
        
        var delete_ico = Crafty.e("UIOverlay, __spr_cross");
        var add_ico = Crafty.e("UIOverlay, __spr_check");
        delete_ico.setCenteredPos(-128,-64,"right","bottom");
        add_ico.setCenteredPos(-64,-64,"right","bottom");
        
    });
});

Crafty.c("UploadButton", {
    init: function() {
        this.requires("UIOverlay, __spr_arrow, Mouse");
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
                    for (var x = 0; x < 2; x++) {
                        for (var y = 0; y < 2; y++) {
                            var e = Crafty.e("2D, Canvas, __spr_sheet");
                            e.x = (x*AnimationEditor.tileWidth) + 32;
                            e.y = (y*AnimationEditor.tileHeight) + 32;
                            console.log(e);
                            e.sprite(x,y);
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

Crafty.c('InputField', {
	init: function () {
		this.requires('2D, Canvas, Keyboard, Mouse, Color');
        this.color("rgb(255,255,255)");
        this.h = 30;
        this.name = "default";
        this.defaultText = "default";
        this.bind("UploadPrep", function(){if (this.textbox) {this._saveField(true)}});
		this.bind('Click', function () {
			if (this.textbox){
				return;	
			}
			this.textbox = Crafty.e('HTML').attr({x:this._x, y:this._y})
			.append("<form name='"+this.name+"'>" + 
						"</div>" + 
							"<input type='text' id='"+this.name+"' style='width:" + (this._w-3) +"px; height: 24px; text-align: left;'" + 
							"maxlength='40' value='"+this.defaultText+"'>" +
							"<input type='button' hidden='hidden'>" + 
					"</form>");
            document.getElementById(this.name).focus();
            document.getElementById(this.name).select();
			this.bind('KeyDown', function() {this._saveField(false)});
		});
	},
	
	_saveField: function (force) {
		if (this.isDown("ENTER") || force){
            this.unbind('KeyDown', this._saveField)
			AnimationEditor[this.name] = document.getElementById(this.name).value;
            this.textbox.destroy();
			this.textbox = null;
            if (this.label) {
                this.label.destroy();
            }
            this.drawText(AnimationEditor[this.name]);
        }
	},
    
    drawText: function (text, offsetx, offsety) {
		if (!offsetx){
			offsetx = 0;	
		}
		if (!offsety){
			offsety = 0;	
		}
		this.label = Crafty.e('UIOverlay, Text');
		this.label.text(text);
		this.label.textColor(AnimationEditor.Text.defaultColor);
		this.label.textFont(AnimationEditor.Text.defaultStyle);
		
		this.label.setCenteredPos(this.screenoffsetx + offsetx,
								 this.screenoffsety + 5 + offsety,
								 this.xBorder, this.yBorder);
	}
	
});