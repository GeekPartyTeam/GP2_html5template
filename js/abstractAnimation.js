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
        var AbstractAnimation = function( frameTimes )
        {
            this.initialize( frameTimes );
        }

        var p = AbstractAnimation.prototype = {};

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
            this.state = {
                timer : 0.0
                , loops : loopsCount
                , currentFrame : 0
                , loopsDone : 0
            };
        }




        p.getFrame = function (dt)
        {
            if (this.state == null) return NaN;

            var currentFrame = this.state.currentFrame;
            var frameEndTime = this.endTimes[ currentFrame ];

            this.state.timer += dt;
            if (this.state.timer < frameEndTime) return currentFrame;

            //enter next frame

            if ( currentFrame < this._frameTimes.length - 1 )
            {
                currentFrame++;
            }
            else
            {
                currentFrame = 0;
                this.state.timer = 0.0;
                this.loopsDone++;
            }

            this.state.currentFrame = currentFrame;

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
        }

        geekpartyjs.AbstractAnimation = AbstractAnimation;

    }()
);