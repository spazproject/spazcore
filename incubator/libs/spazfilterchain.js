/**
 * The SpazFilterChain is intended to create a chain of filters for processing some input.
 * There are no restrictions on the type of input, but all filter functions must expect
 * the same type of input, and return the same type of output
 * 
 * All filter functions must be synchronous -- they need to take input and return the
 * modified version
 * 
 * @constructor 
 */
var SpazFilterChain = function () {
	
	this._filters = [];
	
};

/**
 * add a filter to the chain
 * @param {string} label the label for this filter. REQUIRED
 * @param {function} func the filter function. REQUIRED
 */
SpazFilterChain.prototype.addFilter = function(label, func, position) {
	var filter_obj = {
		'label':label,
		'func':func
	};
	
	if (position) {
		this._filters.splice(position, 0, filter_obj);
	} else {
		this._filters.push(filter_obj);
	}
	
	sch.debug('added filter "'+label+'"');
};

/**
 * remove a filter from the chain 
 */
SpazFilterChain.prototype.removeFilter = function(label) {
	
	var i = this.getFilterIndex(label);
	var removed = this._filters.splice(i,1);
	sch.debug('removed filter "'+label+'": '+removed);
};


/**
 * removes all filters in the chain 
 */
SpazFilterChain.prototype.nukeFilters = function() {
	this._filters = [];
	sch.debug("filters nuked");
};


/**
 * move the identified filter to the front of the chain
 * @param {string} label the filter's label
 */
SpazFilterChain.prototype.makeFilterFirst = function(label) {
	var i = this.getFilterIndex(label);
	if (i !== 0) { // don't move it if it's already there
		var removed = this._filters.splice(i,1);
		this._filters.unshift(removed);
	}
};


/**
 * takes a filter label and moves that filter to last in the chain
 * @param {string} label the label for a filter in the chain 
 */
SpazFilterChain.prototype.makeFilterLast = function(label) {
	var i = this.getFilterIndex(label);
	if (i !== (this._filters.langth - 1)) { // don't move it if it's already there
		var removed = this._filters.splice(i,1);
		this._filters.push(removed);
	}
};


/**
 * Returns an array of all the labels of filters in the chain
 * @returns {array} 
 */
SpazFilterChain.prototype.getFilterList = function() {
	var filter_list = [];
	for (var i=0; i < this._filters.length; i++) {
		filter_list.push(this._filters[i].label);
	}
	return filter_list;
};


/**
 * takes input and processes it through each filter in the chain, returning the final result
 * @param {Mixed} input The input
 * @returns {Mixed} the output 
 */
SpazFilterChain.prototype.process = function(input) {
	var filter_obj;
	for (var i=0; i < this._filters.length; i++) {
		filter_obj = this._filters[i];
		sch.debug('Calling filter '+filter_obj.label);
		input = filter_obj.func(input);
	}
	return input;
};


/**
 * find the array index of a given filter
 * @param {string} label the label for a filter in the chain
 * @returns {Number|Boolean} the position of the filter, or FALSE if not found 
 */
SpazFilterChain.prototype.getFilterIndex = function(label) {
	for (var i=0; i < this._filters.length; i++) {
		if (this._filters[i].label === label) {
			return i;
		}
	}
	return false;
};