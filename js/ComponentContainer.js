/**
 * Author: nulldivide
 * Date: 17.02.13
 * Time: 13:00
 */

//namespace
this.geekpartyjs = this.geekpartyjs || {};

( function() {

    var ComponentContainer = function() {
        this.initialize();
    }

    var p = ComponentContainer.prototype = {};

    p.initialize = function()
    {
        this.components = [];
    }

    p.addComponent = function (c)
    {
       this.components.push(c);
       //return added component index
       c.myInd = this.components.length - 1;
    }

    p.removeComponentAt = function(ind)
    {
        this.components.splice(ind,1);
    }

    p.removeComponent = function(c)
    {
        var ind = (c.myInd >= 0) ? c.myInd : this.components.indexOf(c);
        if (ind >= 0) p.removeComponentAt(ind);
    }

    p.update = function(dt)
    {
        for (i=0;i<this.components.length;i++)
        {
            var c = this.components[i];
            this.processComponent(c, dt);
        }
    }



    geekpartyjs.ComponentContainer = ComponentContainer;



}())