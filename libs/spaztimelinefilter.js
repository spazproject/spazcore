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




SpazTimelineFilter.prototype.getBaseSelector = function() {
	var base_sel = this.settings.timeline_selector+
		    "."+this.settings.filter_class_prefix+
			this.settings.name+
		    " "+this.settings.entry_selector;
	return base_sel;
};

SpazTimelineFilter.prototype.getUserCSS = function() {
	var base_sel = '', rule = '', rules = [], thisuser;
	
	base_sel = this.getBaseSelector();
	
	/*
		start with white or black
	*/
	if (this.type === 'whitelist') {
		rule = base_sel+" { display:none; }";
		rules.push(rule);
	}
	else if (this.type === 'blacklist') {
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



SpazTimelineFilter.prototype.parseUsersFromString = function(str, hide_or_show) {};
SpazTimelineFilter.prototype.parseUsersFromArray = function(str, hide_or_show) {};
SpazTimelineFilter.prototype.addUser = function(str, hide_or_show) {};


SpazTimelineFilter.prototype.parseContentStringsFromString = function(str, hide_or_show) {};
SpazTimelineFilter.prototype.parseContentStringsFromArray = function(str, hide_or_show) {};
SpazTimelineFilter.prototype.addContentStrings = function(str, hide_or_show) {};


SpazTimelineFilter.prototype.settingsToJSON = function() {};
SpazTimelineFilter.prototype.settingsFromJSON = function() {};


SpazTimelineFilter.prototype.applyUserCSS = function() {
	jQuery(this.settings.style_selector).text( this.getUserCSS() );
};


SpazTimelineFilter.prototype.applyContentFilters = function() {
	var thiscontent;
	
	var jq_entries = jQuery(this.getBaseSelector());
	for (var i=0; i < this.settings.content_hide.length; i++) {
		thiscontent = this.settings.content_hide[i];
		jq_entries.filter(':contains("'+thiscontent+'")').hide();
	}
	for (var i=0; i < this.settings.content_show.length; i++) {
		thiscontent = this.settings.content_show[i];
		jq_entries.filter(':contains("'+thiscontent+'")').show();
	}
};

SpazTimelineFilter.prototype.apply = function() {
	this.applyUserCSS();
	this.applyContentFilters();
};


