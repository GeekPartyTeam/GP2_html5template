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
     var IntroMenu = function(x,y) {
         this.initialize(x,y);
     }

    var p = IntroMenu.prototype = {};

    p.initialize = function(x, y)
    {
        this.x = x;
        this.y = y;

        this.menuItems = [ new geekpartyjs.MenuItem('play', this.x, this.y)
                         , new geekpartyjs.MenuItem('credits', this.x, canvas.height/2 + 40) ];

        this.pointer = new geekpartyjs.Sprite('img/menuArrow.png',this.x-40, this.y);

        this.validatePosition();
    }

    p.validatePosition = function()
    {
        for (var i=0; i<this.menuItems.length;i++)
        {
            this.menuItems[i].x = this.x;
            this.menuItems[i].y = this.y + i * 40;
        }
    }


    p.render = function(dt,ctx)
    {
        for (var i=0;i<this.menuItems.length;i++)
        {
            var item = this.menuItems[i];
            item.render(dt,ctx);
        }

        this.pointer.draw(ctx);
    }

    geekpartyjs.intro.Menu =  IntroMenu;

}());

( function() {

    var IntroScene = function(canvas) {
        this.initialize(canvas);
    }

    var p = IntroScene.prototype = new geekpartyjs.Scene();

    p.enterScene = function()
    {
        //this.menu = new geekpartyjs.intro.Menu(canvas.width/2, canvas.height/2);
        //geekpartyjs.Game.prototype.addEntity(this.menu);

        this.background = new geekpartyjs.DisplayObject(0, 0, 0, 0, this.width, this.height);

        this.background.render = function(ctx)
        {
            ctx.fillStyle = "cyan";
            ctx.fillRect(0, 0, this.width, this.height);
        }
        this.addChild(this.background);


        var scene = this;



        geekpartyjs.helper_spriteCreateSimple("img/sprite.png"
                        , 6 //cols
                        , 4 //rows
                        , 2 //fps
                        , function(spr)
                        {
                            scene.sprite = spr;
                            scene.addChild(spr);
                            spr.play(-1);
                            spr.x = 100;
                        })
    }

    p.update = function(dt)
    {
        if(this.sprite) this.sprite.update(dt/1000);
    }



    geekpartyjs.IntroScene = IntroScene;

}())