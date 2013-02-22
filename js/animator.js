/**
 * Created with IntelliJ IDEA.
 * User: nullD
 * Date: 19.02.13
 * Time: 21:26
 */

//namespace
this.geekpartyjs = this.geekpartyjs || {};

(
    function()
    {
        var Animator = function( config )
        {
            var delays = [];
            if (config.hasOwnProperty('fps'))
            {
                var fps = config.fps;
                var frames = 1;
                if (config.hasOwnProperty('frames'))
                {
                    frames = config.frames;
                }

                var frameTimeSec = 1.0 / fps;

                for (var i=0; i < frames; i++)
                {
                    delays.push(frameTimeSec);
                }
            }
            else if (config.hasOwnProperty('delays'))
            {
                delays = config.delays;
            }
            else
            {
                delays = config;
            }

            if (Array.isArray(delays))
            {
                this.initialize( delays );
            }
        }


        var p = Animator.prototype = {};

        p.onFrame = function(cb)
        {
            this.onframecallback = cb;
            return this;
        }

        p.onComplete = function(cb)
        {
            this.oncompletecallback = cb;
            return this;
        }

        p.initialize = function( frameTimes )
        {
            this.setFrameTimes(frameTimes);
            this.state = null;
        }

        p.setFrameTimes = function( frameTimes )
        {
            this._frameTimes = frameTimes;

            this.endTimes = [];
            var offset = 0.0;
            for (i in this._frameTimes)
            {
                offset += this._frameTimes[i];
                this.endTimes[i] = offset;
            }
        }

        p.start = function ( loopsCount )
        {
            if (this._frameTimes == null) return;

            this.state = {
                timer : 0.0
                , loops : loopsCount
                , currentFrame : 0
                , nextFrame : 0
                , interpolation : 0
                , loopsDone : 0
            };

            return this;
        }

        p.stop = function(runComplete)
        {
            this.state = null;
            if (runComplete)
                this.animationComplete();

            return this;
        }


        function lerp(val, min, max)
        {

            return clamp01((val - min) / (max - min));
        }
        function clamp01(val)
        {
            if (val > 1) val = 1;
            if (val < 0) val = 0;
            return val;
        }

        p.update = function (dt)
        {
            if (this.state == null) return NaN;

            var currentFrame = this.state.currentFrame;
            var frameEndTime = this.endTimes[ currentFrame ];

            this.state.timer += dt;



            this.state.interpolation =  lerp( this.state.timer
                                            , frameEndTime - this._frameTimes[currentFrame]
                                            , frameEndTime);

            if (this.state.timer < frameEndTime) return currentFrame;
            //enter next frame

            if ( currentFrame < this._frameTimes.length - 1 )
            {
                currentFrame++;
            }
            else
            {
                currentFrame = 0;
                this.state.timer = this.state.timer - frameEndTime;
                this.loopsDone++;
            }



            if (this.onframecallback != null)
                this.onframecallback(currentFrame);



            this.state.currentFrame = currentFrame;

            if (currentFrame < this._frameTimes.length - 1)
            {
                this.state.nextFrame = currentFrame + 1;
            }
            else
            {
                this.state.nextFrame = 0;
            }


            if ( this.state.loops > 0 )
            {
                if (this.loopsDone >= this.state.loops)
                {
                    this.animationComplete();

                    return NaN;
                }
            }

            return this.state.currentFrame;
        }

        p.animationComplete = function()
        {
            this.state = null;
            if (this.oncompletecallback != null)
                this.oncompletecallback();
        }

        geekpartyjs.Animator = Animator;

    }()
);