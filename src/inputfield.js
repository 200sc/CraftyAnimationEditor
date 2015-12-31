Crafty.c('InputField', {
	init: function () {
		this.requires('HighlightedButton, Keyboard, Color');
        this.color("rgb(255,255,255)");
        this.h = 30;
        this.name = "default";
        this.defaultText = "default";
        this.bind("UploadPrep", function(){if (this.textbox) {this._saveField(null,true)}});
		this.bind('Click', this._initField);
	},

    _initField: function() {
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
        this.bind('KeyDown', function(e) {this._saveField(e,false)});
    },

	_saveField: function (e,force) {
		if (document.getElementById(this.name) &&
			(document.getElementById(this.name) === document.activeElement || force)) {
            if (this.isDown("ENTER") || force) {
                this.unbind('KeyDown', this._saveField)
                AnimationEditor[this.name] = document.getElementById(this.name).value;
                this.textbox.destroy();
                this.textbox = null;
                this.drawText(AnimationEditor[this.name]);
                if (this.parent) {
                    this.parent.trigger("FieldSaved", this.name);
                }
            }
            if (this.isDown("TAB") && this.tabField) {
                e.originalEvent.preventDefault();
                if (document.getElementById(this.tabField.name)) {
                    this.one("EnterFrame", function() {
                        document.getElementById(this.tabField.name).focus();
                        document.getElementById(this.tabField.name).select();
                    });
                } else {
                    this.one("EnterFrame", function() {
                        this.tabField._initField();
                    });
                }
            }
        }
	},

    drawText: function (text, offsetx, offsety) {
		if (!this.label) {
			this.label = Crafty.e('UIOverlay, Text');
		}
		if (!offsetx){
			offsetx = 0;
		}
		if (!offsety){
			offsety = 0;
		}
		this.label.text(text);
		this.label.textColor(AnimationEditor.Text.defaultColor);
		this.label.textFont(AnimationEditor.Text.defaultStyle);

		this.label.setCenteredPos(this.screenoffsetx + offsetx,
								 this.screenoffsety + 5 + offsety,
								 this.xBorder, this.yBorder);
        this.label._globalZ = this._globalZ + 1;
	}

});
