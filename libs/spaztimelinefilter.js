/**
 * This is a library to handle custom filtering of Twitter timelines based on
 * usernames and message content
 * 
 */
SpazTimelineFilter = function(opts) {
	
	if (!opts) { opts = {} };
	
	if (opts.type !== 'whitelist') { opts.type = 'blacklist' };
	
	this.settings = {
		name : opts.name || 'unnamed',
		type : opts.type,
		usernames_show : opts.usernames_show   || [],
		usernames_hide : opts.usernames_hide   || [],
		content_show   : opts.content_show     || [],
		content_hide   : opts.content_hide     || [],
		filter_class_prefix: opts.filter_class_prefix || 'customfilter-',
		timeline_selector: opts.timeline_selector || 'div.timeline',
		entry_selector : opts.entry_selector   || 'div.timeline-entry',
		username_attr  : opts.username_attr    || 'data-user-screen_name',
		content_selector:opts.content_selector || 'div.timeline-entry status-text',
		style_selector : opts.style_selector   || 'style[title="custom-timeline-filters"]'
	}
	// this.settings = {
	// 	name : 'php-people',
	// 	type : 'whitelist', // whitelist | blacklist
	// 	usernames_show : [],
	// 	usernames_hide : [],
	// 	content_show : [],
	// 	content_hide : [],
	// 	filter_class_prefix: 'customfilter-',
	// 	timeline_selector: 'div.timeline',
	// 	entry_selector : 'div.timeline-entry',
	// 	username_attr  : 'data-user-screen_name',
	// 	content_selector:'div.timeline-entry status-text',
	// 	style_selector : 'style[title="custom-timeline-filters"]'
	// }
	
}



/**
 * this generates the base selector for timeline entries based on 
 * the opts given to the constructor 
 * @return {string}
 */
SpazTimelineFilter.prototype.getBaseSelector = function() {
	var base_sel = this.settings.timeline_selector+
		    "."+this.getTimelineClass()+
		    " "+this.settings.entry_selector;
	return base_sel;
};

/**
 * this returns the timeline class we'll apply to the timeline container 
 */
SpazTimelineFilter.prototype.getTimelineClass = function() {
	return this.settings.filter_class_prefix+this.settings.name;
};

/**
 * This generates the user-filtering CSS rules
 * @return {array} 
 */
SpazTimelineFilter.prototype.getUserCSS = function() {
	var base_sel = '', rule = '', rules = [], thisuser;
	
	base_sel = this.getBaseSelector();
	
	/*
		start with white or black
	*/
	if (this.settings.type === 'whitelist') {
		rule = base_sel+" { display:none; }";
		rules.push(rule);
	}
	else if (this.settings.type === 'blacklist') {
		rule = base_sel+" { display:block; }";
		rules.push(rule);
	} else {
		return null;
	}
	
	/*
		add usernames to show
	*/
	for (var i=0; i < this.settings.usernames_show.length; i++) {
		thisuser = this.settings.usernames_show[i];
		rule = base_sel+"["+this.settings.username_attr+"='"+thisuser+"'] { display:block; }";
		rules.push(rule);
	};

	/*
		add usernames to hide
	*/
	for (var i=0; i < this.settings.usernames_hide.length; i++) {
		thisuser = this.settings.usernames_show[i];
		rule = base_sel+"["+this.settings.username_attr+"='"+thisuser+"'] { display:none; }";
		rules.push(rule);
	};

	return rules.join("\n");
}


/**
 * This takes a string of comma-delimited usernames and "hide" OR "show" and 
 * parses it into the arrays used in this.settings
 * @param {string} str  string of usernames, separated by commas
 * @param {string} hide_or_show  'hide' or 'show'. defaults to 'show' 
 */
SpazTimelineFilter.prototype.parseUsersFromString = function(str, hide_or_show) {
	
	if (hide_or_show !== 'hide') { hide_or_show = 'show'; }
	var users = str.split(',');
	for (var i=0; i < users.length; i++) {
		users[i] = sch.trim(users[i]);
	};
	
	this.parseUsersFromArray(users, hide_or_show);
};

/**
 * This takes an array of usernames and "hide" OR "show" and 
 * parses it into the arrays used in this.settings
 * @param {array} user_arr  array of usernames
 * @param {string} hide_or_show  'hide' or 'show'. defaults to 'show' 
 */
SpazTimelineFilter.prototype.parseUsersFromArray = function(user_arr, hide_or_show) {

	if (hide_or_show !== 'hide') { hide_or_show = 'show'; }

	if (hide_or_show === 'hide') {
		this.usernames_hide = user_arr;
	} else {
		this.usernames_show = user_arr;
	}
};


/**
 * This takes a username and "hide" or "show" and adds it to the appropriate
 * array in this.settings
 * @param {string} str  the username
 * @param {string} hide_or_show  'hide' or 'show'. defaults to 'show' 
 */
SpazTimelineFilter.prototype.addUser = function(str, hide_or_show) {
	
	if (hide_or_show !== 'hide') { hide_or_show = 'show'; }
	
	var username = sch.trim(str);
	
	if (hide_or_show === 'hide') {
		this.usernames_hide.push(username);
	} else {
		this.usernames_show.push(username);
	}
	
};

/**
 * This takes a string of comma-delimited strings and "hide" OR "show" and 
 * parses it into the content string filter arrays used in this.settings
 * @param {string} str  string of strings, separated by commas
 * @param {string} hide_or_show  'hide' or 'show'. defaults to 'show' 
 */
SpazTimelineFilter.prototype.parseContentStringsFromString = function(str, hide_or_show) {
	if (hide_or_show !== 'hide') { hide_or_show = 'show'; }
	var contentstrings = str.split(',');
	for (var i=0; i < contentstrings.length; i++) {
		contentstrings[i] = sch.trim(contentstrings[i]);
	};
	
	this.parseContentStringsFromArray(contentstrings, hide_or_show);
};

/**
 * This takes an array of comma-delimited strings and "hide" OR "show" and 
 * parses it into the content string filter arrays used in this.settings
 * @param {array} str_arr  array of strings
 * @param {string} hide_or_show  'hide' or 'show'. defaults to 'show' 
 */
SpazTimelineFilter.prototype.parseContentStringsFromArray = function(str_arr, hide_or_show) {
	
	if (hide_or_show !== 'hide') { hide_or_show = 'show'; }

	if (hide_or_show === 'hide') {
		this.content_hide = str_arr;
	} else {
		this.content_show = str_arr;
	}
	
};

/**
 * This takes a string and "hide" or "show" and adds it to the appropriate
 * content string filter array in this.settings
 * @param {string} str  the string
 * @param {string} hide_or_show  'hide' or 'show'. defaults to 'show' 
 */
SpazTimelineFilter.prototype.addContentString = function(str, hide_or_show) {
	if (hide_or_show !== 'hide') { hide_or_show = 'show'; }
	
	var contentstring = sch.trim(str);
	
	if (hide_or_show === 'hide') {
		this.content_hide.push(contentstring);
	} else {
		this.content_show.push(contentstring);
	}
};

/**
 * returns the current this.settings object as JSON. Mainly this is for
 * saving the settings to some permanent data store
 */
SpazTimelineFilter.prototype.settingsToJSON = function() {
	
	return sch.enJSON(this.settings);
	
};

/**
 * takes JSON, decodes it, and assigns it to this.settings. Mainly this is 
 * for loading the settings from a file or DB
 * @param {string} json 
 */
SpazTimelineFilter.prototype.settingsFromJSON = function(json) {
	
	this.settings = sch.deJSON(json);
	
};

/**
 * This applies the user filtering CSS by inserting it into the <style>
 * tag designated by this.settings.style_selector 
 */
SpazTimelineFilter.prototype.applyUserCSS = function() {
	jQuery(this.settings.style_selector).text( this.getUserCSS() );
};

/**
 * this clears the CSS code inside the <style> tag 
 */
SpazTimelineFilter.prototype.disableUserCSS = function() {
	jQuery(this.settings.style_selector).text('');
};

/**
 * This applies the content filters by hiding and showing elements via jQuery
 */
SpazTimelineFilter.prototype.applyContentFilters = function() {
	var thiscontent;
	
	var contentfilters = this.buildContentFilterSelectors();
	var jq_entries = jQuery(this.getBaseSelector());
	
	for (var i=0; i < contentfilters.hide.length; i++) {
		jq_entries.filter(contentfilters.hide[i]).hide();
	}
	for (var i=0; i < contentfilters.show.length; i++) {
		jq_entries.filter(contentfilters.show[i]).show();
	}
};

/**
 * This disables the content filters by showing *everything* 
 */
SpazTimelineFilter.prototype.disableContentFilters = function() {
	var jq_entries = jQuery(this.getBaseSelector());
	jq_entries.filter().show();
}

/**
 * this builds the content filtering selectors used by jQuery to hide and 
 * show elements based on content 
 */
SpazTimelineFilter.prototype.buildContentFilterSelectors = function() {
	
	var contentfilters = {
		'hide':[],
		'show':[]
	}
	
	for (var i=0; i < this.settings.content_hide.length; i++) {
		thiscontent = this.settings.content_hide[i];
		contentfilters.hide.push(':contains("'+thiscontent+'")');
	}
	for (var i=0; i < this.settings.content_show.length; i++) {
		thiscontent = this.settings.content_show[i];
		contentfilters.show.push(':contains("'+thiscontent+'")');
	}
	return contentfilters;
};

/**
 * Apply user and content filtering 
 */
SpazTimelineFilter.prototype.apply = function() {
	this.applyUserCSS();
	this.applyContentFilters();
};

/**
 * Disable user and content filtering 
 */
SpazTimelineFilter.prototype.disable = function() {
	this.disableUserCSS();
	this.disableContentFilters();
};
