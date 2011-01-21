/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, DOMParser, shortcut;

/**
 * this is really a wrapper for shortcut.add in shortcut.js 
 * @param {string} shortcut The shortcut key combination should be specified in this format: Modifier[+Modifier..]+Key
 * @param {Object} func	The function to be called when key is pressed
 * @param {Object} opts A hash of options
 * @param {string} [opts.type] The event type - can be 'keydown','keyup','keypress'. Default: 'keydown' 
 * @param {Boolean} [opts.disable_in_input] If this is set to true, keyboard capture will be disabled in input and textarea fields. Default is TRUE
 * @param {Object} [opts.target] The dom node that should be watched for the keyboard event. Default is the document element
 * @param {Boolean} [opts.propagate] If the key event should propagate. Default is FALSE
 * @param {Number} [opts.keycode] Watch for the given keycode
 * @member sc.helpers
 */
sc.helpers.key_add = function(keystroke, func, opts) {
	opts = sch.defaults({
		'type':'keydown',
		'disable_in_input':'true'

	}, opts);
	
	shortcut.add(keystroke, func, opts);
};

/**
 * this is really a wrapper for shortcut.remove in shortcut.js 
 * @member sc.helpers
 */
sc.helpers.key_remove = function(keystroke) {
	shortcut.remove(keystroke);
};

/**
 * @todo 
 * @member sc.helpers
 */
sc.helpers.getModKey = function() {
	// get the primary modkey based on the OS
	// if OS X, use 'Meta'
	// if Win or Linux, use 'Ctrl'
};