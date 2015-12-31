# CraftyAnimationEditor
This is a graphical editor for animations and sprites for CraftyJS. This will output crafty component files and json strings as desired for uploaded sprite sheets and animation sets.

Demo animation from first build:
[https://imgur.com/ETbw0b5]

# How to use

Name a local file and it's sheet dimensions as expected by a Crafty.load call (paddingx and paddingy are combined into just padding, and there isn't a padding around border). 
Hit upload, then add animations with the green plus.
You can't delete animations yet.

Hit the plus next to 'Labels' to add sprite labels, such as you'd require in a component to set its default sprite to that position. Right now you need a label pointing to [0][0] on the sprite sheet to save a file-- it bases the name of the component on that label's name.

Right click on frames in the sprite sheet to push them to the current frames in the animation.
Right click on frames in the animation to remove them from the animation.

Click and drag on frames in the sprite sheet to manually replace individual frames in the animation.

Hit clear to scrap all current animations and labels and unload the current sheet. There is no confirmation button for this yet, be careful.

# License info

WTFPL
