/**
 * Created with IntelliJ IDEA.
 * User: nulldivide
 * Date: 17.02.13
 * Time: 0:26
 * To change this template use File | Settings | File Templates.
 */

//namespace
this.geekpartyjs = this.geekpartyjs || {};


( function() {

    var IntroScene = function() {
        this.initialize();
    }

    var p = IntroScene.prototype = new geekpartyjs.Scene();

    p.enterScene = function()
    {
        this.menuItems = [ new geekpartyjs.MenuItem('play1', canvas.width/2, canvas.height/2)
                          , new geekpartyjs.MenuItem('credits', canvas.width/2, canvas.height/2 + 40) ];

        this.currentItemInd = 0;

        for (var i=0;i<this.menuItems.length; i++)
        {
            geekpartyjs.Game.prototype.addEntity(this.menuItems[i]);
        }

        //geekpartyjs.Game.prototype.addEntity()
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