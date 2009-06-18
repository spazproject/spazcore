/**
 * a constant that defines the attribute where we'll store extra data in the event 
 */
const SPAZCORE_EVENTDATA_ATTRIBUTE = 'sc_data';


/**
 * add an event listener to a target (element, window, etc). Uses target.addEventListener
 * 
 * @param {object} target
 * @param {string} event_type
 * @param {function} handler  a method that will take the event as a param, and "this" refers to target
 * @param {boolean} use_capture  defaults to false
 * @function
 */
sc.helpers.addListener = function(target, event_type, handler, use_capture) {
	if (use_capture !== true) {
		use_capture = false;
	}
	target.addEventListener(event_type, handler, use_capture);
};


/**
 * removes an event listener on a target (element, window, etc). uses Uses target.removeEventListener
 * 
 * Note that you must match all of the parameters to successfully remove the listener
 * 
 * @param {object} target
 * @param {string} event_type
 * @param {function} handler  a method that will take the event as a param, and "this" refers to target
 * @param {boolean} use_capture  defaults to false
 * @function
 */
sc.helpers.removeListener = function(target, event_type, handler, use_capture) {
	if (use_capture !== true) {
		use_capture = false;
	}
	target.removeEventListener(event_type, handler, use_capture);
};


/**
 * This triggers a custom event using document.createEvent('Events') and target.dispatchEvent()
 * 
 * @param {string}  event_type
 * @param {target}  target   the target for the event (element, window, etc)
 * @param {object}  data     data to pass with event
 * @param {boolean} bubble   whether the event should bubble or not. defaults to true
 * @function
 */
sc.helpers.triggerCustomEvent = function(event_type, target, data, bubble) {
	
	if (bubble !== false) {
		bubble = true;
	}
	
	var ev = document.createEvent("Events"); // use the Events event module
	
	ev.initEvent(event_type, bubble, true);

    ev[SPAZCORE_EVENTDATA_ATTRIBUTE] = data;

	target.dispatchEvent(ev);
	
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
 * Alias for sc.helpers.triggerCustomEvent 
 * @function
 */
sc.helpers.trigger  = sc.helpers.triggerCustomEvent;