/**
 * Author: nulldivide
 * Date: 17.02.13
 * Time: 14:50
 */

//namespace
this.geekpartyjs = this.geekpartyjs || {};

( function() {

    var MenuItem = function(label, x, y) {
        this.initialize(label, x, y);
    }

    p = MenuItem.prototype = {};

    p.initialize = function(label, x, y)
    {
        this.label  = label;
        this.x = x;
        this.y = y;
        this.active = false;
    }


    p.render = function(dt,ctx)
    {
        ctx.save();

        ctx.textBaseline = "middle";
        ctx.font="30px Arial";
        ctx.fillText(this.label,this.x,this.y);

        ctx.restore();
    }

    geekpartyjs.MenuItem =  MenuItem;

}());
