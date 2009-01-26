/**
 * View helper methods for Twitter apps
 *  
 */

/**
 * This removes any extra items from a ser of elements. Intended to be used for
 * limiting the sice of timelines
 * 
 * @param {string} item_selector a jquery-compatible selector to get items
 * @param {integer} max_items the max # of item we should have
 * @param {boolean} remove_from_top whether or not to remove extra items from the top. default is FALSE
 */
sc.helpers.removeExtraElements = function(item_selector, max_items, remove_from_top) {
	
	if (!remove_from_top) {
		remove_from_top = false;
	}
	
	jqitems = jQuery(item_selector);
	var diff = jqitems.length - max_items;
	if (diff > 0) {
		
		if (!remove_from_top) {
			dump("numEntries is " + jqitems.length + " > " + max_items + "; removing last " + diff + " entries");
	        jqitems.slice(diff * -1).remove();
		} else {
			dump("numEntries is " + jqitems.length + " > " + max_items + "; removing first " + diff + " entries");
	        jqitems.slice(diff).remove();
		}
	}
}


/**
 * This removes any extra items from a ser of elements. Intended to be used for
 * limiting the sice of timelines
 * 
 * @param {string} item_selector a jquery-compatible selector to get items
 * @param {integer} max_items the max # of item we should have
 * @param {boolean} remove_from_top whether or not to remove extra items from the top. default is FALSE
 */
sc.helpers.removeDuplicateElements = function(item_selector, max_items, remove_from_top) {
	
	if (!remove_from_top) {
		remove_from_top = false;
	}
	
	jqitems = jQuery(item_selector);
	var diff = jqitems.length - max_items;
	if (diff > 0) {
		
		if (!remove_from_top) {
			dump("numEntries is " + jqitems.length + " > " + max_items + "; removing last " + diff + " entries");
	        jqitems.slice(diff * -1).remove();
		} else {
			dump("numEntries is " + jqitems.length + " > " + max_items + "; removing first " + diff + " entries");
	        jqitems.slice(diff).remove();
		}
	}
}



/**
 * This updates relative times in elements. Each element has to have an attribute
 * that contains the created_at value provided by Twitter
 * 
 * @param {string} item_selector the jQuery selector for the elements which will contain the relative times
 * @param {string} time_attribute the attribute of the element that contains the created_at value
 */
sc.helpers.updateRelativeTimes = function(item_selector, time_attribute) {
	jQuery(item_selector).each(function(i) {
		var time = jQuery(this).attr(time_attribute);
		var relative_time = sch.getRelativeTime(time);
		jQuery(this).html( relative_time );
	});
}


/**
 * this marks all items in the selected set of elements as read. It does this by removing
 * the 'new' class
 * 
 * @param {string} item_selector
 */
sc.helpers.markAllAsRead = function(item_selector) {
	jQuery(item_selector).removeClass('new');
}
