/**
 * Author: nulldivide
 * Date: 17.02.13
 * Time: 13:52
 */

//namespace
this.geekpartyjs = this.geekpartyjs || {};

( function() {

    var RenderSystem = function() {
        this.initialize();
    }

    var p = RenderSystem.prototype = new geekpartyjs.ComponentContainer();

    p.initialize = function()
    {
        this.entities = [];
    }

    p.processComponent= function(e, dt)
    {
        var ctx = canvas.getContext('2d');
        //todo check cliping
        e.render(  dt,ctx  );
    }



    geekpartyjs.RenderSystem = RenderSystem;

}())