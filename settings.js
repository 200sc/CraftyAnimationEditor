var Settings = {
    // editor settings
    // field defaults
    filename_default: "filename.png",
    tile_width_default: 32,
    tile_height_default: 32,
    padding_default: 2,
    sprite_label_default: "label",
    sprite_label_x_default: 0,
    sprite_label_y_default: 0,
    animation_name_default: "anim",
    animation_frames_default: 10,
    animation_fps_default: 10,
    // implicit prefixes
    label_prefix: "spr_",
    file_directory_prefix: "assets/",
    // components required by generated components, comma-seperated
    def_components: "SpriteAnimation",
    baseColor: {
        r: 20,
        g: 100,
        b: 140
    },
    maxSheetWidth: 32,
    maxSheetHeight: 32
};

var Colors = {
    bg: 'rgb(' + Settings.baseColor.r + ',' + Settings.baseColor.g + ',' + Settings.baseColor.b + ')',
    side: 'rgb(' + (Settings.baseColor.r + 50) + ',' + (Settings.baseColor.g + 50) + ',' + (Settings.baseColor.b + 50) + ')',
    side2: 'rgb(' + (Settings.baseColor.r + 20) + ',' + (Settings.baseColor.g + 10) + ',' + (Settings.baseColor.b + 20) + ')',
    itm1: 'rgb(' + (Settings.baseColor.r + 90) + ',' + (Settings.baseColor.g + 50) + ',' + (Settings.baseColor.b + 90) + ')',
    itm2: 'rgb(' + (Settings.baseColor.r + 30) + ',' + (Settings.baseColor.g + 50) + ',' + (Settings.baseColor.b + 70) + ')',
    anim: 'rgba(' + (Settings.baseColor.r + 80) + ',' + (Settings.baseColor.g) + ',' + (Settings.baseColor.b + 80) + ',.75)',
    tab: 'rgba(' + (Settings.baseColor.r + 20) + ',' + (Settings.baseColor.g + 10) + ',' + (Settings.baseColor.b + 20) + ',.75)',
    bot: 'rgba(' + (Settings.baseColor.r - 10) + ',' + (Settings.baseColor.g - 30) + ',' + (Settings.baseColor.b - 10) + ',.75)',
    shd: 'rgb(200,200,255)',
    blk: "rgb(0,0,0)",
    wht: "rgb(255,255,255)"
};

Settings.Text = {
    defaultColor: Colors.blk,
    altColor: Colors.wht,
    defaultStyle: {family: 'Verdana', size: '16px'},
    smallStyle: {family: 'Verdana', size: '10px'}
};
