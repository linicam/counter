// var $ = require('jquery');

(function( global, factory ) {

    if ( typeof module === "object" && typeof module.exports === "object" ) {
        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "jQuery requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
    var ajax = function (options) {
        if (options.block === undefined || options.block === true) {
            globalBlocker();
        }
        var defaults = {
            type: "post"
        };
        options = $.extend(defaults, options);
        if (options.type === 'json') {
            options.method = 'post';
            options.data = JSON.stringify(options.data);
            options.contentType = 'application/json';
        }

        var success = options.success;
        options.success = function (response) {
            if (options.block === undefined || options.block === true) {
                globalBlocker(0);
            }
            if (response.success) return success.apply(this, arguments);
        };

        var error = options.error;
        options.error = function (xhr) {
            if (options.block === undefined || options.block === true) {
                globalBlocker(0);
            }
            if (error) error.apply(this, arguments);
        };

        options.cache = false;

        if (options.timeout !== -1) {
            options.timeout = options.timeout || 60000;
        }
        return $.ajax(options);
    }

    var ajax_loading = false;

    function globalBlocker(show) {
        if (show === 0) {
            $('#global_blocker').remove();
            ajax_loading = false;
        } else if (!ajax_loading) {
            ajax_loading = true;
            $('<div id="global_blocker" class="global-blocker"></div>').appendTo('body');
        }
    }

    var top_notifier, has_notification, notifier_timer;

    var topNotify = function (msg, duration) {
        var notifier = top_notifier;
        if (!notifier) {
            notifier = $('<div id="top_notify" class="top-notify"><div class="notify-msg">' + msg + '</div><i class="icon icon-notify-close"></i></div>').appendTo('body');
            notifier.find('i').click(function () {
                hideNotifier();
            });
            top_notifier = notifier;
        }

        showNotifier(msg, duration);
    };

    function showNotifier(msg, duration) {
        if (has_notification) {
            if (notifier_timer) {
                clearTimeout(notifier_timer);
            } else {
                top_notifier.stop()
            }
            top_notifier.animate({
                top: 120,
                opacity: 0.1
            }, 300, function () {
                top_notifier.find('.notify-msg').text(msg);
                top_notifier.animate({
                    top: 100,
                    opacity: 1
                }, 400);
            });
        } else {
            top_notifier.find('.notify-msg').text(msg);
            top_notifier.show().animate({
                top: 100,
                opacity: 1
            }, 600);
        }

        has_notification = true;
        notifier_timer = setTimeout(function () {
            hideNotifier();
        }, (duration || 3) * 1000);
    };

    function hideNotifier() {
        notifier_timer && clearTimeout(notifier_timer);
        top_notifier.animate({
            top: 120,
            opacity: 'hide'
        }, 1000, function () {
            has_notification = false;
        });
        notifier_timer = null;
    };

    var mod = {};
    mod.ajax = ajax;
    mod.topNotify = topNotify;
    return mod;
}))