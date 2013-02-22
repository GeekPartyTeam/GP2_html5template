/**
 * Created with IntelliJ IDEA.
 * User: nulldivide
 * Date: 17.02.13
 * Time: 0:26
 * To change this template use File | Settings | File Templates.
 */

//namespace
this.geekpartyjs = this.geekpartyjs || {};



//Display Object -
( function() {
    var DisplayObject = function( x,y )
    {
        this.initialize(x,y);
    }

    var p = DisplayObject.prototype = {};

    p.initialize = function( x,y )
    {
        this.childs = [];

        this.x = x  || 0;
        this.y = y  || 0;
        this.ox = 0;
        this.oy = 0;
        this.sx = 1.0;
        this.sy = 1.0;
        this.rotation = 0.0;
    }

    p.addChild = function(child)
    {
        this.childs.push(child);
    }

    p.removeChildAt = function(ind)
    {
        this.childs.slice(ind,1);
    }

    p.remvoveChild = function(child)
    {
        var ind = this.childs.indexOf(child);

        if (ind >=0) p.removeChildAt(ind);
    }

    p.draw = function(ctx)
    {
        ctx.save();

        //set transformation (Note: javascript multiplies in reversed order);

        //translate to position
        if ((this.x) || (this.y))
            ctx.translate(this.x, this.y);

        //scale
        if ((this.sx != 1.0) || (this.sy != 1.0))
            ctx.scale(this.sx, this.sy);

        //rotate
        if (this.rotation)
            ctx.rotate(this.rotation);

        // translate to origin
        if ((this.ox) || (this.oy))
            ctx.translate(-this.ox, -this.oy);


        this.render(ctx);

        //draw childs recursive
        for (i in this.childs)
        {
            this.childs[i].draw(ctx)
        }

        ctx.restore();
    }


    p.render = function(ctx) {}

    geekpartyjs.DisplayObject = DisplayObject;
}() );

( function() {


    var Scene = function(canvas) {
        this.initialize(canvas);
    }

    var p = Scene.prototype = new geekpartyjs.DisplayObject(0,0);

    p.initialize = function(canvas)
    {
        if (!canvas) return;
    }

    p.enterScene = this.enterScene;
    p.update = this.update;



    p.onmousemove = function(e) {};
    p.onmousedown = function(e) {};
    p.onmouseup   = function(e) {};

    geekpartyjs.Scene = Scene;



}())