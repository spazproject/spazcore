/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
plusplus: false,
undef: true,
white: false,
onevar: false 
 */
var sc, jQuery;

/**
 * @fileOverview File containing the SpazTimeline object definition
 * @author <a href="mailto:coj@funkatron.com">coj@funkatron.com</a>
 */


/**
 * This object provides an API for managing the content of a timeline 
 * Currently this requires jQuery, but that could change or be overwritten
 * on a per-app basis
 * @requires jQuery
 * @constructor
 */
var SpazTimeline = function(opts) {
	
	var thisTL = this;	
	/**
	 * This is a wrapper function for the refresher interval
	 * we define this here and use a closure to solve a scope issue when the interval fires
	 * @function
	 */
	this.refresh = function() {
		sch.debug('Refreshing timeline');
		thisTL.requestData.call(thisTL);
	};
	
	
	/**
	 * Again, due to scope issues, we define this here to take advantage of the closure 
	 */
	this.onSuccess = function(e) {
		sch.debug('onSuccess timeline');
		var data = sc.helpers.getEventData(e);
		thisTL.data_success.call(thisTL, e, data);
		thisTL.startRefresher();	
	};

	/**
	 * Again, due to scope issues, we define this here to take advantage of the closure 
	 */
	this.onFailure = function(e) {
		sch.debug('onFailure timeline');
		var data = sc.helpers.getEventData(e);
		thisTL.data_failure.call(thisTL, e, data);
		thisTL.startRefresher();	
	};
	
	
	/*
		By breaking this out, we can more easily override the 
		constructor process
	*/
	this._init(opts);
};


SpazTimeline.prototype._init = function(opts) {
	
	opts = opts || {};
	
	this.max_items                   = opts.max_items     || 100;	
	this.refresh_time                = opts.refresh_time  || 1000*60*2; // mseconds
	
	this.timeline_container_selector = opts.timeline_container_selector || '#timeline';
	this.timeline_item_selector      = opts.timeline_item_selector		|| 'div.timeline-entry';
	// this.entry_relative_time_selector= opts.entry_relative_time_selector|| '.date';
	this.event_target				 = opts.event_target || jQuery(this.timeline_container_selector).get(0);
	
	this.add_method			 		 = opts.add_method    || 'prepend';  // prepend or append
	
	this.success_event				 = opts.success_event || 'timeline-success';
	this.failure_event				 = opts.failure_event || 'timeline-failure';
	
	this.renderer	                 = opts.renderer      || null;  // required
	this.request_data				 = opts.request_data  || null;  // required
	this.data_success				 = opts.data_success  || null;  // required
	this.data_failure				 = opts.data_failure  || null;
	this.refresher                   = opts.refresher     || null;
	
	if (!this.renderer) {
		throw new Error ("renderer is required");
	}
	if (!this.request_data) {
		throw new Error ("request_data is required");
	}
	if (!this.data_success) {
		throw new Error ("data_success is required");
	}

	this.container = jQuery(this.timeline_container_selector).get(0);


};

/**
 * the timeline 
 */
SpazTimeline.prototype.last_id = -1;

/**
 * an array of data items that are represented in the timeline 
 */
SpazTimeline.prototype.model = [];

/**
 * call this after initialization 
 */
SpazTimeline.prototype.start = function() {
	sch.debug('Starting timeline');
	this.requestData();
};

/**
 * right now this does the same as start(), but could change in the future 
 */
SpazTimeline.prototype.refresh = function() {
	sch.debug('Refreshing timeline (prototype)');
	this.requestData();
};


/**
 * This is the method that gets data from the model and calls addItems() on what is returned 
 * 
 * @todo needs to be written to handle async call
 */
SpazTimeline.prototype.requestData = function() {
	sch.debug('Requesting data timeline');
	this.stopRefresher();
	
	this.stopListening();
	this.startListening();
	
	// call an appropriate model function
	var items = this.request_data();	
};



SpazTimeline.prototype.startListening = function() {
	var thisTL = this;
	sc.helpers.debug("Listening for "+thisTL.success_event);
	sc.helpers.listen(thisTL.event_target, thisTL.success_event, thisTL.onSuccess);
	sc.helpers.listen(thisTL.event_target, thisTL.failure_event, thisTL.onFailure);
};


SpazTimeline.prototype.stopListening = function() {
	var thisTL = this;
	sc.helpers.debug("Stopping listening for "+thisTL.success_event);
	sc.helpers.unlisten(thisTL.event_target, thisTL.success_event, thisTL.onSuccess);
	sc.helpers.unlisten(thisTL.event_target, thisTL.failure_event, thisTL.onFailure);
};

SpazTimeline.prototype.startRefresher = function() {
	this.stopRefresher();
	
	sc.helpers.debug('Starting refresher');
	if (this.refresh_time > 1000) { // the minimum refresh is 1000ms. Otherwise we don't auto-refresh
		sc.helpers.debug('Refresh time is '+this.refresh_time+'ms');
		this.refresher = setInterval(this.refresh, this.refresh_time);
	} else {
		sc.helpers.debug('Not starting refresher; refresh time is '+this.refresh_time+'ms');
	}
};


SpazTimeline.prototype.stopRefresher = function() {
	sc.helpers.debug('Stopping refresher');
	clearInterval(this.refresher);
};






/**
 * Stuff we should do when we're done using this, including
 * removing event listeners an stopping the refresher 
 */
SpazTimeline.prototype.cleanup = function() {
	sch.debug('Cleaning up timeline');
	this.stopListening();
	this.stopRefresher();
};

/**
 * given an array of objects, this will render them and add them to the timeline
 * @param {array} items
 */
SpazTimeline.prototype.addItems = function(items) {
	sch.debug('Adding items to timeline');
	
	var items_html    = [];
	var timeline_html = '';
	
	for (var x=0; x<items.length; x++) {
		items_html.push( this.renderItem(items[x], this.renderer) );
	}
	
	if (this.add_method === 'append') {
		items_html.reverse();
		timeline_html = '<div>'+items_html.join('')+'</div>';
		this.append(timeline_html);
	} else {
		timeline_html = '<div>'+items_html.join('')+'</div>';
		this.prepend(timeline_html);
	}
	
	this.removeExtraItems();
	
};


SpazTimeline.prototype.renderItem = function(item, templatefunc) {
	sch.debug('Rendering item in timeline');
	
	var html = templatefunc(item);
	
	return html;
	
};


SpazTimeline.prototype.removeExtraItems = function() {
	
	sch.debug('Removing extra items in timeline');
	
	if (this.add_method === 'append') {
		var remove_from_top = true;
	} else {
		remove_from_top = false;
	}
	
	sc.helpers.removeExtraElements(this.getEntrySelector(), this.max_items, remove_from_top);
};


SpazTimeline.prototype.removeItems = function(selector) {};


SpazTimeline.prototype.removeItem = function(selector) {};

/**
 * @param {string} selector
 * @return {boolean} 
 */
SpazTimeline.prototype.itemExists = function(selector) {
	
	sch.debug('Checking it item ('+selector+') exists in timeline');
	
	var items = this.select(selector);
	if (items.length>0) {
		return true;
	} else {
		return false;
	}
	
};


SpazTimeline.prototype.hideItems = function(selector) {
	sch.debug('Hiding items in timeline');
	
	this.filterItems(selector, 'blacklist');
};


SpazTimeline.prototype.showItems = function(selector) {
	sch.debug('Showing items in timeline');
	
	this.filterItems(selector, 'whitelist');
};


/**
 * @param {string} selector 
 * @param {string} type  "whitelist" or "blacklist"
 */
SpazTimeline.prototype.filterItems = function(selector, type) {};


/**
 * sorts the elements in the timeline according to the sorting function 
 */
SpazTimeline.prototype.sortItems = function(selector, sortfunc) {
	
	sch.debug('Sorting items in timeline');
	
	var items = this.select(selector);
	items.sort(sortfunc);
};



/**
 * This is a wrapper for the selector engine, so someone could swap in 
 * their own recipe if necessary. By default we use jQuery, and return the 
 * array of HTML elements (not the jQuery object)
 * @type DOMelement[]
 */
SpazTimeline.prototype.select = function(selector, container) {
	if (!container) {
		container = this.timeline_container_selector;
	}
	return jQuery(selector, container).get();
};

/**
 * wrapper for prepending to timeline 
 */
SpazTimeline.prototype.prepend = function(htmlitem) {
	jQuery(this.timeline_container_selector).prepend(htmlitem);
};
SpazTimeline.prototype.append = function(htmlitem) {
	jQuery(this.timeline_container_selector).append(htmlitem);
};

SpazTimeline.prototype.getEntrySelector = function() {
	return this.timeline_container_selector + ' ' + this.timeline_item_selector;
};
