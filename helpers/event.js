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
 * add an event listener to a target (element, window, etc). Uses target.addEventListener
 * 
 * @param {object} target
 * @param {string} event_type
 * @param {function} handler  a method that will take the event as a param, and "this" refers to target
 * @param {Object} [scope] the scope to execute the handler within (what "this" refers to)
 * @param {boolean} [use_capture]  defaults to false
 * @returns {function} the handler that was passed -- or created, if we passed a scope. You can use this to remove the listener later on
 * @member sc.helpers 
 */
sc.helpers.addListener = function(target, event_type, handler, scope, use_capture) {
	
	if (scope) {
		sch.warn('scope no longer supported! use a closure or reference "scope" in your event handler');
	}
	if (use_capture) {
		sch.warn('use_capture no longer supported!');
	}
	
	sch.debug('listening for '+event_type);
	sch.debug('on target nodeName:'+target.nodeName);
	
	jQuery(target).bind(event_type, handler);
	
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
 * @member sc.helpers 
 */
sc.helpers.removeListener = function(target, event_type, handler, use_capture) {

	sch.debug('removing listener for '+event_type);
	sch.debug('on target nodeName:'+target.nodeName);

	if (use_capture) {
		sch.warn('use_capture no longer supported!');
	}
	
	jQuery(target).unbind(event_type, handler);
};

/**
 * @param {DOMElement} base_target The base target where the delegated listener will be set-up
 * @param {string} selector The CSS Selector that will be used to match incoming events. Matching is done with jQuery
 * @param {string} event_type The event type 
 * @param {Function} handler a method that will take the event as a param, and "this" refers to target
 * @param {Object} [scope] the scope to execute the handler
 * @param {Boolean} [use_capture] Describe this parameter
 */
sc.helpers.addDelegatedListener = function(base_target, selector, event_type, handler, scope) {
	
	sch.warn('scope no longer supported! use a closure or reference "scope" in your event handler');
	
	sch.debug('listening for '+event_type);
	sch.debug('on target nodeName:'+target.nodeName);
	sch.debug('for selector:'+selector);
	
	jQuery(base_target).delegate(selector, event_type, handler);

	
};

/**
 * @param {DOMElement} base_target The base target where the delegated listener will be set-up
 * @param {string} selector The CSS Selector that will be used to match incoming events. Matching is done with jQuery
 * @param {string} event_type The event type 
 * @param {Function} handler a method that will take the event as a param, and "this" refers to target
 * @param {Object} [scope] the scope to execute the handler
 */
sc.helpers.removeDelegatedListener = function(base_target, selector, event_type, handler, scope) {
	sch.warn('scope no longer supported! use a closure or reference "scope" in your event handler');
	
	jQuery(base_target).delegate(selector, event_type, handler);
	
};

/**
 * This triggers a custom event using document.createEvent('Events') and target.dispatchEvent()
 * 
 * @param {string}  event_type
 * @param {DOMElement}  target   the target for the event (element, window, etc)
 * @param {object}  data     data to pass with event. it is always passed as the second parameter to the handler (after the event object)
 * @param {boolean} bubble   whether the event should bubble or not. defaults to true
 * @member sc.helpers 
 */
sc.helpers.triggerCustomEvent = function(event_type, target, data, bubble) {
	
	sch.error('triggering '+event_type);
	sch.error('on target nodeName:'+target.nodeName);
	sch.error('event data:');
	// sch.error(sch.enJSON(data));
	
	if (bubble) {
		sch.warn('bubble is no longer supported!');
	}
	
	if (data) {
		data = [data];
	}
	
	jQuery(target).trigger(event_type, data);
	
};

/**
 * retrieves the data added to this event object
 * @param {DOMEvent} event_obj 
 * @deprecated
 */
sc.helpers.getEventData = function(event_obj) {
	sch.error('getEventData is DEPRECATED. Use second param on event handler');
	return null;
};

/**
 * Alias for sc.helpers.addListener 
 * @member sc.helpers 
 * @function
 */
sc.helpers.listen = sc.helpers.addListener;

/**
 * Alias for sc.helpers.removeListener
 * @member sc.helpers 
 * @function
 */
sc.helpers.unlisten = sc.helpers.removeListener;

/**
 * Alias for sc.helpers.addDelegatedListener
 * @member sc.helpers  
 * @function
 */
sc.helpers.delegate = sc.helpers.addDelegatedListener;

/**
 * Alias for sc.helpers.removeDelegatedListener
 * @member sc.helpers  
 * @function
 */
sc.helpers.undelegate = sc.helpers.removeDelegatedListener;


/**
 * Alias for sc.helpers.triggerCustomEvent 
 * @member sc.helpers 
 * @function
 */
sc.helpers.trigger  = sc.helpers.triggerCustomEvent;