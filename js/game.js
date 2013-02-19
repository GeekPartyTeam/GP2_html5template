
//namespace
this.geekpartyjs = this.geekpartyjs || {};

( function(){


    var Game = function(canvas) {
       this.initialize(canvas);
    }

    var p = Game.prototype = {};
    var time;
    var c;
    var ctx;
    var fps;

    var currentScene;

    p.initialize = function(canvas) {
        c = (typeof canvas == "string") ? document.getElementById(canvas) : canvas;
        ctx = canvas.getContext("2d");
        fps = 60;

        p.introScene = new geekpartyjs.IntroScene(c);
    }

    p.clear = function() {
        if (!c) { return; }

        //var ctx = this.canvas.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, c.width, c.height);
    }

    p.update = function(dt) {
        if (!c) { return; }

        p.clear();
        ctx.save();

        if (currentScene)
        {
            currentScene.update(dt);
            currentScene.draw(ctx);
        }

        ctx.restore();
    }

    p.setFPS = function(val) {
        this.fps = val;
    }

    var tick = function() {
        setTimeout(function() {
            requestAnimationFrame(tick);
            var now = new Date().getTime(),
                dt = now - (time || now);

            time = now;

            p.update(dt);

        }, 1000 / p.fps);
    }

    p.startGameLoop = function()
    {
        tick();
    }

    p.setCurrentScene = function(scene) {
        currentScene = scene;
        scene.enterScene();
    }


    geekpartyjs.Game = Game;

}())