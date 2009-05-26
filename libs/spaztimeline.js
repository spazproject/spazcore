/**
 * @fileOverview File containing the SpazTimeline object definition
 * @author <a href="mailto:coj@funkatron.com">coj@funkatron.com</a>
 * @version 0.1 
 */



/**
 * This object provides an API for managing the content of a timeline 
 * Currently this requires jQuery, but that could change or be overwritten
 * on a per-app basis
 * @requires jQuery
 * @constructor
 */
var SpazTimeline = function(opts) {
	
	/*
		By breaking this out, we can more easily override the 
		constructor process
	*/
	this._init(opts)
};


SpazTimeline.prototype._init = function(opts) {
	
	this.max_items    = 100;	
	this.refresh_time = 1000*60*2; // mseconds
	this.refresher    = null;
	this.timeline_container_selector = '#timeline';
	
	
	
};


/**
 * This is the method that gets data from the model and calls addItems() on what is returned 
 * 
 * @todo needs to be written to handle async call
 */
SpazTimeline.prototype.getData = function() {
	this.stopRefresher();
	
	// call an appropriate model function
	var items = Model.getData();
	
	// bind a listener to wait for this
	this.addItems(items);
	this.startRefresher();
	
};





SpazTimeline.prototype.startRefresher = function() {
	this.stopInterval();
	this.refresher = setInterval(this.getData, this.refresh_time);
};


SpazTimeline.prototype.stopRefresher = function() {
	clearInterval(this.refresher);
};


SpazTimeline.prototype.addItems = function(items) {
	for (var x=0; x<items.length, x++) {
		this.addItem(item);
	}
};


SpazTimeline.prototype.addItem = function(itemobj) {
	
	// 1. render the item to html with a templating call
	View.tpl.render('timeline_item', itemobj);
	// 2. add the html item to the timeline
	
	
};


SpazTimeline.prototype.removeItems = function(selector) {};


SpazTimeline.prototype.removeItem = function(selector) {};

/**
 * @type {boolean} 
 */
SpazTimeline.prototype.itemExists = function(selector) {
	var items = this.select(selector);
	if (items.length>0) {
		return true;
	} else {
		return false;
	}
	
};


SpazTimeline.prototype.hideItems = function(selector) {
	this.filterItems(selector, 'blacklist');
};


SpazTimeline.prototype.showItems = function(selector) {
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
		container = this.timeline_container_selector
	}
	return jQuery(selector, container).get();
};

/**
 * wrapper for prepending to timeline 
 */
SpazTimeline.prototype.prepend = function(htmlitem) {
	jQuery(container).prepend(htmlitem);
};
SpazTimeline.prototype.append = function(htmlitem) {
	jQuery(container).append(htmlitem);
};