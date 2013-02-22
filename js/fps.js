/**
 * Created with IntelliJ IDEA.
 * User: nullD
 * Date: 20.02.13
 * Time: 09:45
 */

//namespace
this.geekpartyjs = this.geekpartyjs || {};


( function() {

    var FPSMeter = function (cls, root) {

        this.fpsArray = new Array();
        this.fpsIndex = 0;
        this.fps = document.createElement("div");
        this.fps.setAttribute("class", cls);
        root.appendChild(this.fps);

        this.str_fps = " ";

        this.fpst = new Array();

        for (var i = 0; i < 3; ++i)
        {
            this.fpst.push(this.fps.appendChild(document.createElement("p")));
        }

    }

    var p = FPSMeter.prototype = {};
    p.constructor = FPSMeter;
    //FPSMeter.prototype.constructor = FPSMeter;

    p.update = function (elapsed)
    {
        if (this.fpsArray.length < 100)
        {
            this.fpsArray.push(elapsed);
        }
        else
        {
            this.fpsArray[this.fpsIndex] = elapsed;
            this.fpsIndex = (this.fpsIndex + 1) % this.fpsArray.length;
        }
        var min = this.fpsArray[0], max = this.fpsArray[0], avg = 0;
        this.fpsArray.forEach(function(o, i, a) {
            if (min > o) min = o;
            if (max < o) max = o;
            avg += o;
        });
        avg /= this.fpsArray.length;

        this.str_fps = (1/avg).toFixed(0);
    }

    geekpartyjs.FPSMeter = FPSMeter;

}()

);