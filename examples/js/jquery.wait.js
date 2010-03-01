// Delay Plugin for jQuery
// - http://www.evanbot.com
// - copyright 2008 Evan Byrne
/*
 * Jonathan Howard
 * jQuery Pause
 * version 0.2
 * Requires: jQuery 1.0 (tested with svn as of 7/20/2006)
 * Feel free to do whatever you'd like with this, just please give credit where
 * credit is do.
 * pause() will hold everything in the queue for a given number of milliseconds,
 * or 1000 milliseconds if none is given.
 */
// Wait Plugin for jQuery
// http://www.inet411.com
// based on the Delay and Pause Plugin
 (function($) {
    $.fn.wait = function(option, options) {
        milli = 1000; 
        if (option && (typeof option == 'function' || isNaN(option)) ) { 
            options = option;
        } else if (option) { 
            milli = option;
        }
        // set defaults
        var defaults = {
            msec: milli,
            onEnd: options
        },
        settings = $.extend({},defaults, options);

        if(typeof settings.onEnd == 'function') {
            this.each(function() {
                setTimeout(settings.onEnd, settings.msec);
            });
            return this;
        } else {
            return this.queue('fx',
            function() {
                var self = this;
                setTimeout(function() { $.dequeue(self); },settings.msec);
            });
        }

    }
})(jQuery);