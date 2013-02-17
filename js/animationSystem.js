/*
 * Author: nulldivide
 * Date: 17.02.13
 * Time: 12:55
 */

//namespace
this.geekpartyjs = this.geekpartyjs || {};

( function() {

    var AnimationSystem = function() {
        this.initialize();
    }

    var p = AnimationSystem.prototype = new geekpartyjs.ComponentContainer();

    p.initialize = function()
    {
        this.entities = [];
    }

    p.processComponent = function(e, dt)
    {
         e.animate(dt);
    }

    geekpartyjs.AnimationSystem = AnimationSystem;

}())