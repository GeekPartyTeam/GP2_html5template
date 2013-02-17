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

    var Scene = function() {
        this.initialize();
    }

    var p = Scene.prototype = {};

    p.initialize = function()
    {
        this.entities = [];
    }

    p.enterScene = this.enterScene;

    p.drawBack = function(ctx) {}



    geekpartyjs.Scene = Scene;



}())