
var SpazTimeline = function(opts) {
	
	/*
		By breaking this out, we can more easily override the 
		constructor process
	*/
	this._init(opts)
};


SpazTimeline.prototype._init = function(opts) {
	
	this.max_items    = 100;	
	this.refresh_time = 0; // seconds
	this.refresher    = null;
	
};

SpazTimeline.prototype.getData = function() {};

SpazTimeline.prototype.startRefresher = function() {};

SpazTimeline.prototype.stopRefresher = function() {};

SpazTimeline.prototype.addItems = function(items) {};

SpazTimeline.prototype.addItem = function(itemobj) {};

SpazTimeline.prototype.removeItems = function(selector) {};

SpazTimeline.prototype.removeItem = function(selector) {};

SpazTimeline.prototype.itemExists = function(selector) {};