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
    var DisplayObject = function( x, y, ox, oy, w, h)
    {
        this.initialize(x, y, w, h, ox, oy);
    }

    var p = DisplayObject.prototype = {};

    p.initialize = function( x, y, w, h, ox, oy, sx, sy )
    {
        this.childs = [];

        this.x = x || 0;
        this.y = y || 0;
        this.width = w || 0;
        this.height = h || 0;
        this.ox = isNaN(ox) ?  this.width/2 : ox;
        this.oy = isNaN(oy) ?  this.height/2 : oy;
        this.sx = isNaN(sx) ?  1.0 : sx;
        this.sy = isNaN(sy) ?  1.0 : sy;
        this.rotation = 0.0;

        this.validate();
    }

    p.validate = function()
    {
        this.x = isNaN(this.x) ? 0 : this.x;
        this.y = isNaN(this.y) ? 0 : this.y;
        this.ox = isNaN(this.ox) ? this.width/2 : this.ox;
        this.oy = isNaN(this.oy) ? this.height/2 : this.oy;
        this.sx = isNaN(this.sx) ?  1.0 : this.sx;
        this.sy = isNaN(this.sy) ?  1.0 : this.sy;
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

        ctx.translate(this.x, this.y);
        ctx.scale(this.sx, this.sy);
        ctx.rotate(this.rotation);
        ctx.translate(-this.ox, -this.oy);


        this.render(ctx);

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
        //this.entities = [];

        p.width  = canvas.width;
        p.height = canvas.height;
        p.validate();

    }

    p.enterScene = this.enterScene;
    p.update = this.update;



    geekpartyjs.Scene = Scene;



}())