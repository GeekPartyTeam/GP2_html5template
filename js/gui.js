/**
 * Author: nulldivide
 * Date: 17.02.13
 * Time: 14:50
 */

//namespace
this.geekpartyjs = this.geekpartyjs || {};

( function() {

    var MenuItem = function(label) {
        this.initialize(label);
    }

    p = MenuItem.prototype = new geekpartyjs.DisplayObject();

    p.initialize = function(label)
    {
        this.label  = label;
        this.active = false;
    }


    p.render = function(ctx)
    {
        ctx.save();

        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.font="30px Arial";
        ctx.fillText(this.label,0,0);

        ctx.restore();
    }

    geekpartyjs.MenuItem =  MenuItem;

}());
