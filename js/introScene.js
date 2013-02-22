/**
 * Created with IntelliJ IDEA.
 * User: nulldivide
 * Date: 17.02.13
 * Time: 0:26
 * To change this template use File | Settings | File Templates.
 */

//namespace
this.geekpartyjs = this.geekpartyjs || {};
this.geekpartyjs.intro = this.geekpartyjs.intro || {};

( function(){
     var IntroMenu = function() {
         this.initialize();
     }

    var p = IntroMenu.prototype = new geekpartyjs.DisplayObject();

    p.initialize = function()
    {
        this.menuItems = [ new geekpartyjs.MenuItem('play')
                         , new geekpartyjs.MenuItem('credits')];

        this.currentItem = 0;


        for (i in this.menuItems)
        {
            this.menuItems[i].x = 20;
            this.menuItems[i].y = i * 40;
            this.addChild(this.menuItems[i]);
        }


        this.pointer = new geekpartyjs.Image('img/menuArrow.png');
        this.addChild(this.pointer);
    }


    p.update = function (dt)
    {
        var active = this.menuItems[this.currentItem];
        this.pointer.y = active.y;
    }

    p.moveUp = function()
    {
        this.currentItem--;
        if (this.currentItem < 0)
            this.currentItem = 0;
    }

    p.moveDown = function()
    {
        this.currentItem++;
        if (this.currentItem > (this.menuItems.length - 1))
        {
            this.currentItem = this.menuItems.length - 1;
        }
    }

    geekpartyjs.intro.Menu =  IntroMenu;

}());

( function() {

    var IntroScene = function(canvas) {
        this.initialize(canvas);
    }




    var p = IntroScene.prototype = new geekpartyjs.Scene();


    p.initialize = function(canvas)
    {
        var that = this;
        this.background = new geekpartyjs.DisplayObject();

        this.background.render = function(ctx)
        {
            ctx.fillStyle = "#111111";
            ctx.fillRect(0, 0, canvas.width, canvas.width);
        }
        this.addChild(this.background);


        this.menu = new geekpartyjs.intro.Menu();
        this.menu.x = canvas.width/2;
        this.menu.y = canvas.height/2;
        this.menu.ox = 50;
        this.menu.oy = 50;

        this.checkKeys = {
            '37' : -1
            , '38' : -1
            , '39' : -1
            , '40' : -1
        };

        this.addChild(this.menu);

        var spriteConfig = {
            "baseUrl"  : "img/hero/"
            , "fps"    : 6
            , "animations" : {
                "moveDown" : ["hero_01.png", "hero_02.png", "hero_03.png","hero_04.png", "hero_05.png", "hero_06.png"]
                , "moveUp"  : ["hero_13.png", "hero_14.png", "hero_15.png","hero_16.png", "hero_17.png", "hero_18.png"]
                , "moveLeft" : ["hero_07.png", "hero_08.png", "hero_09.png","hero_10.png", "hero_11.png", "hero_12.png"]
                , "moveRight" : ["hero_19.png", "hero_20.png", "hero_21.png","hero_22.png", "hero_23.png", "hero_24.png"]
            }
        };

        that.hero = new geekpartyjs.Sprite(spriteConfig);
        that.hero.x = 270;
        that.hero.y = 250;
        that.hero.velocityX = 40.0;
        that.hero.velocityY = 0.0;


        this.heroAnimator = new geekpartyjs.Animator([2,2]); //2 frames by 2secs
        this.heroAnimator.start(-1).onFrame( function( frame )
            {
                that.hero.velocityX = -that.hero.velocityX;
                that.hero.playAnimation((that.hero.velocityX > 0) ? "moveRight" : "moveLeft");
            }
        );

        that.addChild(that.hero);
    }

    p.enterScene = function()
    {
        this.snd =  new buzz.sound("snd/sound.ogg");
        this.snd.loop().play();
    }


    p.processInput = function()
    {
        for (key in this.checkKeys)
        {
            if (Keys.hasOwnProperty(key))
            {
                var pressTime = Keys[key];
                if (pressTime > this.checkKeys[key])
                {
                    this.onKeyPressed(key);
                    this.checkKeys[key] = pressTime;
                }
            }
        }
    }

    p.onKeyPressed = function(key)
    {
        switch (key)
        {
            case '37': //left
                break;
            case '38': //up
                this.menu.moveUp();
                break;
            case '39': //right
                break;
            case '40': //down
                this.menu.moveDown();
                break;


        }
    }

    p.onmousedown = function(e)
    {
        e.layerX;
        e.layerY;
    }

    p.update = function(dt)
    {
        this.processInput();


        this.menu.update(dt);

        if(this.hero)
        {
            this.heroAnimator.update(dt);
            this.hero.x += dt * this.hero.velocityX;
            this.hero.update(dt);
        }
    }




    geekpartyjs.IntroScene = IntroScene;

}())