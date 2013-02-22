/**
 * Author: nulldivide
 * Date: 17.02.13
 * Time: 18:10
 */


//namespace
this.geekpartyjs = this.geekpartyjs || {};

( function() {

    var Sprite = function( config )
    {

        this.initialize(config);
    }

    var p = Sprite.prototype = new geekpartyjs.DisplayObject();
    var that;

    p.initialize = function(config)
    {

        /*
         var spriteConfig = {
            "baseUrl"  : "img/hero/"
            , "fps"    : 12
            , "animations" : {
                "animName" : ["wd_0.png", "wd_1.png", "wd_2.png"]
                , "animName1" : ["wd_0.png", "wd_1.png", "wd_2.png"]
            }
         };
        */

        this.frames = [];
        this.valid  = false;
        this.currentFrame = null;
        this.fps = config.fps;


        var waiting = 0;
        var loaded  = 0;
        this.currentAnimation = null;

        this.animations = {};

        that  = this;


        for (a in config.animations)
        {
            var anim = config.animations[a];
            this.animations[a] = [];

            for (frame in anim)
            {
                waiting++;
                var img = new Image();
                this.animations[a].push(img);

                img.onload = function()
                {
                    loaded++;
                    if (loaded == waiting)
                        that.valid = true;
                }
                img.src = config.baseUrl + "/" +anim[frame];
            }

            //this.setFrame(0);
            //this.animator.start(-1).onFrame(this.setFrame);
        }

    }



    p.setFrame = function (frameNum)
    {
        if (that.currentAnimation == null) return;

        that.currentFrame = that.currentAnimation[frameNum];
    }


    p.update = function(dt)
    {
        if (this.animator == null) return;

        this.animator.update(dt);
    }

    p.playAnimation = function(name, loops)
    {
        if (!this.animations.hasOwnProperty(name)) return;
        this.currentAnimation = this.animations[name];

        this.animator = new geekpartyjs.Animator({ "fps" : this.fps
                                                  , "frames" : this.currentAnimation.length });
        this.animator.start(loops)
            .onFrame(this.setFrame)
            .onComplete(this.animFinished);

        p.setFrame(0);
    }

    p.animFinished = function()
    {
        that.currentAnimation = null;
    }

    p.render = function(ctx)
    {
        if (!that.valid) return;
        if ( this.currentFrame == null) return;

        ctx.drawImage( this.currentFrame,0,0);
    }

    geekpartyjs.Sprite = Sprite;
}());

(
    function() {

        var StaticImage = function( img )
        {
            var that = this;
            this.image = img;
            this.valid = true;

            if (typeof img === 'string')
            {
                this.valid = false;
                this.image = new Image();
                this.image.onload = function()
                {
                    that.valid = true;
                }
                this.image.src = img;
            }
        }

        var p = StaticImage.prototype = new geekpartyjs.DisplayObject();

        p.render = function(ctx)
        {
            if (!this.valid) return;

            ctx.drawImage( this.image, 0, 0);
        }


        geekpartyjs.Image = StaticImage;
    }()


);