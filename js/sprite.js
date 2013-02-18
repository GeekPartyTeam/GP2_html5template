/**
 * Author: nulldivide
 * Date: 17.02.13
 * Time: 18:10
 */


//namespace
this.geekpartyjs = this.geekpartyjs || {};

( function() {

    var Sprite = function(url,x,y) {
        this.initialize(url,x,y);
    }

    var p = Sprite.prototype = {};

    var valid = false;

    p.initialize = function(url,x,y)
    {
        this.img = new Image();
        this.x = x;
        this.y = y;

        this.img.onload = function()
        {
            valid = true;
        }
        this.img.src = url;

    }


    p.draw = function(ctx)
    {
        if (!valid ) return;

        ctx.save();
        ctx.drawImage(this.img,this.x,this.y);
        ctx.restore();
    }

    geekpartyjs.Sprite = Sprite;

}())