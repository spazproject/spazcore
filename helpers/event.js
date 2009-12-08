/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc;
 
/**
 * a constant that defines the attribute where we'll store extra data in the event 
 */
var SPAZCORE_EVENTDATA_ATTRIBUTE = 'sc_data';


/**
 * add an event listener to a target (element, window, etc). Uses target.addEventListener
 * 
 * @param {object} target
 * @param {string} event_type
 * @param {function} handler  a method that will take the event as a param, and "this" refers to target
 * @param {Object} scope the scope to execute the handler within (what "this" refers to)
 * @param {boolean} use_capture  defaults to false
 * @function
 */
sc.helpers.addListener = function(target, event_type, handler, scope, use_capture) {

	sch.dump('listening for '+event_type);
	sch.dump('on target nodeName:'+target.nodeName);


	function scope_perserver(e) {
		handler.call(scope, e);
	}
	
	if (use_capture !== true) {
		use_capture = false;
	}
	
	if (scope) {
		target.addEventListener(event_type, scope_perserver, use_capture);
	} else {
		target.addEventListener(event_type, handler, use_capture);
	}
	
	
};


/**
 * removes an event listener on a target (element, window, etc). uses Uses target.removeEventListener
 * 
 * Note that you must match all of the parameters to successfully remove the listener
 * 
 * @param {object} target
 * @param {string} event_type
 * @param {function} handler  a method that will take the event as a param, and "this" refers to target
 * @param {Object} scope the scope to execute the handler
 * @param {boolean} use_capture  defaults to false
 * @function
 */
sc.helpers.removeListener = function(target, event_type, handler, scope, use_capture) {

	sch.dump('removing listener for '+event_type);
	sch.dump('on target nodeName:'+target.nodeName);


	function scope_perserver(e) {
		handler.call(scope, e);
	}

	if (use_capture !== true) {
		use_capture = false;
	}
	
	if (scope) {
		target.removeEventListener(event_type, scope_perserver, use_capture);
	} else {
		target.removeEventListener(event_type, handler, use_capture);
	}
};

/**
 * @param {DOMElement} base_target The base target where the delegated listener will be set-up
 * @param {string} selector The CSS Selector that will be used to match incoming events. Matching is done with jQuery
 * @param {string} event_type The event type 
 * @param {Function} handler a method that will take the event as a param, and "this" refers to target
 * @param {Object} [scope] the scope to execute the handler
 * @param {Boolean} [use_capture] Describe this parameter
 */
sc.helpers.addDelegatedListener = function(base_target, selector, event_type, handler, scope, use_capture) {
	
};

/**
 * @param {DOMElement} base_target The base target where the delegated listener will be set-up
 * @param {string} selector The CSS Selector that will be used to match incoming events. Matching is done with jQuery
 * @param {string} event_type The event type 
 * @param {Function} handler a method that will take the event as a param, and "this" refers to target
 * @param {Object} [scope] the scope to execute the handler
 * @param {Boolean} [use_capture] Describe this parameter
 */
sc.helpers.removeDelegatedListener = function(base_target, selector, event_type, handler, scope, use_capture) {
	
};

/**
 * This triggers a custom event using document.createEvent('Events') and target.dispatchEvent()
 * 
 * @param {string}  event_type
 * @param {DOMElement}  target   the target for the event (element, window, etc)
 * @param {object}  data     data to pass with event
 * @param {boolean} bubble   whether the event should bubble or not. defaults to true
 * @function
 */
sc.helpers.triggerCustomEvent = function(event_type, target, data, bubble) {
	
	sch.dump('triggering '+event_type);
	sch.dump('on target nodeName:'+target.nodeName);
	
	if (bubble !== false) {
		bubble = true;
	}

	var ev = document.createEvent("Events"); // use the Events event module

	ev.initEvent(event_type, bubble, true);

	ev[SPAZCORE_EVENTDATA_ATTRIBUTE] = data;

	target.dispatchEvent(ev);
	
};

/**
 * retrieves the data added to this event object
 * @param {DOMEvent} event_obj 
 */
sc.helpers.getEventData = function(event_obj) {
	return event_obj[SPAZCORE_EVENTDATA_ATTRIBUTE];
};

/**
 * Alias for sc.helpers.addListener 
 * @function
 */
sc.helpers.listen = sc.helpers.addListener;

/**
 * Alias for sc.helpers.removeListener
 * @function
 */
sc.helpers.unlisten = sc.helpers.removeListener;

/**
 * Alias for sc.helpers.addDelegatedListener
 * @function 
 */
sc.helpers.live = sc.helpers.addDelegatedListener;

/**
 * Alias for sc.helpers.removeDelegatedListener
 * @function 
 */
sc.helpers.die = sc.helpers.removeDelegatedListener;


/**
 * Alias for sc.helpers.triggerCustomEvent 
 * @function
 */
sc.helpers.trigger  = sc.helpers.triggerCustomEvent;