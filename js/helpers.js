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

        var helper_spriteCreateSimple = function( url, cols, rows, fps, callback )
        {
            var img = new Image();
            img.onload = function()
            {
                var imgW = img.width;
                var imgH = img.height;

                var fW = imgW / cols;
                var fH = imgH / rows;

                var frames = geekpartyjs.helper_ConstructFrames( 0 //startX
                    , 0 //startY
                    , imgW
                    , imgH
                    , fW
                    , fH
                    , cols * rows
                    , 1 );

                var ta  = new geekpartyjs.TextureAtlas(img, frames);
                var times = geekpartyjs.helper_MakeTimesByFPS( fps, cols * rows);

                var animFrames = [];
                for (var i=0; i < cols * rows; i++)
                {
                    animFrames.push(i);
                }


                callback( new geekpartyjs.AnimatedSprite(ta, animFrames, times));
            }
            img.src = url;


        }

        geekpartyjs.helper_ConstructFrames    = helper_ConstructFrames;
        geekpartyjs.helper_MakeTimesByFPS     = helper_MakeTimesByFPS;
        geekpartyjs.helper_spriteCreateSimple = helper_spriteCreateSimple;

    }()
);