/**
 * Created with IntelliJ IDEA.
 * User: nullD
 * Date: 19.02.13
 * Time: 21:22
 */


//namespace
this.geekpartyjs = this.geekpartyjs || {};

(
    function() {

        var helper_ConstructFrames = function ( startX
            , startY
            , atlasWidth
            , atlasHeight
            , frameWidth
            , frameHeight
            , frameCount
            , border )
        {
            result = [];

            for (var i=0;i<frameCount;i++)
            {
                var _x = (startX + i * frameWidth) % atlasWidth;
                var _y = startY + Math.floor( (startX + i * frameWidth) / atlasWidth) * frameHeight;

                frame = {
                    x : _x
                    , y : _y
                    , w : frameWidth
                    , h : frameHeight
                }
                result.push(frame);
            }

            return result;
        }

        var helper_MakeTimesByFPS = function(fps, framesCount)
        {
            result = [];
            var frameTimeSec = 1.0 / fps;

            for (var i=0; i < framesCount; i++)
            {
                result.push(frameTimeSec);
            }

            return result;
        };
        geekpartyjs.helper_ConstructFrames    = helper_ConstructFrames;
        geekpartyjs.helper_MakeTimesByFPS     = helper_MakeTimesByFPS;


    }()
);