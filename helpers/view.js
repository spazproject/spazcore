/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, jQuery;
 
/**
 * View helper methods for Twitter apps
 *  
 */

/**
 * This removes any extra items from a set of elements. Intended to be used for
 * limiting the size of timelines
 * 
 * This does NOT remove bound event listeners in order to increase speed. Be careful!
 * 
 * @param {string} item_selector a jquery-compatible selector to get items
 * @param {integer} max_items the max # of item we should have
 * @param {boolean} remove_from_top whether or not to remove extra items from the top. default is FALSE
 * @requires jQuery
 */
sc.helpers.removeExtraElements = function(item_selector, max_items, remove_from_top) {

	if (!remove_from_top) {
		remove_from_top = false;
	}

	var jqitems = jQuery(item_selector);

	var parent = jqitems.parent().get(0);

	var diff = jqitems.length - max_items;

	if (diff > 0) {

		if (!remove_from_top) {
	        jqitems.slice(diff * -1).each( function() {
				this.parentNode.removeChild( this );
			} );
		} else {
	        jqitems.slice(diff).each( function() {
				this.parentNode.removeChild( this );
			} );
		}
	}
};



/**
 * This removes any duplicate items from a series of elements. Intended to be used for
 * limiting the sice of timelines
 * 
 * @param {string} item_selector a jquery-compatible selector to get items
 * @param {boolean} remove_from_top whether or not to remove extra items from the top. default is FALSE
 * @TODO
 */
sc.helpers.removeDuplicateElements = function(item_selector, remove_from_top) {
	sc.helpers.dump('removeDuplicateElements TODO');

};



/**
 * This updates relative times in elements. Each element has to have an attribute
 * that contains the created_at value provided by Twitter
 * 
 * @param {string} item_selector the jQuery selector for the elements which will contain the relative times
 * @param {string} time_attribute the attribute of the element that contains the created_at value
 * @requires jQuery
 */
sc.helpers.updateRelativeTimes = function(item_selector, time_attribute) {
	jQuery(item_selector).each(function(i) {
		var time = jQuery(this).attr(time_attribute);
		var relative_time = sc.helpers.getRelativeTime(time);
		jQuery(this).html( relative_time );
	});
};


/**
 * this marks all items in the selected set of elements as read. It does this by removing
 * the 'new' class
 * 
 * @param {string} item_selector
 * @requires jQuery
 */
sc.helpers.markAllAsRead = function(item_selector) {
	jQuery(item_selector).removeClass('new');
};
