
//namespace
this.geekpartyjs = this.geekpartyjs || {};


Keys = {

};

( function(){


    var Game = function(canvas) {
       this.initialize(canvas);
    }

    var p = Game.prototype = {};
    var time;
    var c;
    var ctx;
    var fps;
    var fpsMeter;



    var currentScene;

    p.initialize = function(canvas) {
        c = (typeof canvas == "string") ? document.getElementById(canvas) : canvas;
        ctx = canvas.getContext("2d");
        fps = 60;

        fpsMeter = new geekpartyjs.FPSMeter("fpsmeter", document.getElementById("fpscontainer"));

        p.introScene = new geekpartyjs.IntroScene(c);
    }

    p.clear = function() {
        if (!c) { return; }

        //var ctx = this.canvas.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, c.width, c.height);
    }

    p.update = function(dt) {
        fpsMeter.update(dt);

        if (!c) { return; }

        p.clear();
        ctx.save();

        if (currentScene)
        {
            currentScene.update(dt);
            currentScene.draw(ctx);
        }

        ctx.restore();

        //draw fps
        ctx.save();

        ctx.fillStyle = "#ffffff";
        ctx.font="12px Arial Black";
        ctx.fillText("FPS: "+ fpsMeter.str_fps,20,20);

        ctx.restore();
    }

    var tick = function() {
        requestAnimationFrame(tick);
        var now = new Date().getTime(),
        dt = now - (time || now);

        time = now;
        p.update(dt * 0.001);
    }

    p.startGameLoop = function()
    {
        tick();

        c.onmousedown = function (e) {
            currentScene.onmousedown(e);
        };
        c.onmousemove = function (e) {
            currentScene.onmousemove(e);
        };
        c.onmouseup = function (e) {
            currentScene.onmouseup(e);
        };


        document.onkeydown = function (e) {
            if (!Keys.hasOwnProperty(e.charCode))
            {
                Keys[e.which] = new Date().getTime();
            }
        };

        document.onkeypress = function (e) {
            if (!Keys.hasOwnProperty(e.charCode))
            {
                Keys[e.which] = new Date().getTime();
            }
        };
        document.onkeyup = function (e) {
            delete Keys[e.which];
        };
    }

    p.setCurrentScene = function(scene) {
        currentScene = scene;
        scene.enterScene();
    }


    geekpartyjs.Game = Game;

}())