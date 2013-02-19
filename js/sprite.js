/**
 * Author: nulldivide
 * Date: 17.02.13
 * Time: 18:10
 */


//namespace
this.geekpartyjs = this.geekpartyjs || {};

(
    function() {
        var me;
        var TextureAtlas = function(img, frames) {
            me = this;

            if (typeof img == "string")
            {
                this.initializeWithUrl(img, frames);
            }
            else
            {
                this.initializeWithImage(img, frames);
            }
        }



        var p = TextureAtlas.prototype = {};

        p.initializeWithUrl = function(url, frames)
        {
            this.valid = false;
            this.frames = frames;

            this.img = new Image();
            this.img.onload = function()
            {
                me.valid = true;
            }
            this.img.src = url;
        }

        p.initializeWithImage = function(img, frames)
        {
            this.img = img;
            this.frames = frames;
            this.valid = true;
        }


        geekpartyjs.TextureAtlas = TextureAtlas;

    }()
);

( function() {

    var AnimatedSprite = function(textureAtlas, frames, times)
    {
        this.initialize(textureAtlas, frames, times);
    }

    var p = AnimatedSprite.prototype = new geekpartyjs.DisplayObject();

    p.initialize = function(textureAtlas, frames, times)
    {
        this.source = textureAtlas;
        this.frames = frames;
        this.times  = times;


        this.anim = new geekpartyjs.AbstractAnimation(times);
        this.setFrame(0);
    }

    p.setFrame = function (frameNum)
    {
        this.rect = this.source.frames[this.frames[frameNum]];

        this.w = this.rect.w;
        this.h = this.rect.h;

        this.validate();
    }


    p.play = function(loops)
    {
        this.anim.start(loops);
    }

    p.update = function(dt)
    {
        var frame = this.anim.getFrame(dt);
        if (isNaN(frame)) return;

        this.setFrame(frame);
    }



    p.render = function(ctx)
    {
        if (!this.source.valid) return;


        var r = this.rect;
        var w = r.w -2;
        var h = r.h -2;
        ctx.drawImage( this.source.img, r.x, r.y, w, h, 0, 0,w,h);
    }

    geekpartyjs.AnimatedSprite = AnimatedSprite;
}());