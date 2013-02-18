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

    var IntroScene = function() {
        this.initialize();
    }

    var p = IntroScene.prototype = new geekpartyjs.Scene();

    p.enterScene = function()
    {
        this.menu = new geekpartyjs.intro.Menu(canvas.width/2, canvas.height/2);
        geekpartyjs.Game.prototype.addEntity(this.menu);
    }

    p.drawBack   = function(ctx)
    {

        ctx.save();
        ctx.fillStyle = "cyan";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }

    geekpartyjs.IntroScene = IntroScene;

}())