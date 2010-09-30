
/**
 * @param {Object} opts options
 * @param {string} [opts.timleine_id] the id of the timeline we're navigating. Default is 'timeline'
 * @param {string} [opts.selected_class] the class of the currently selected entry. default is 'ui-selected'
 * @param {string} [opts.entry_class] the class of an entry in the timeline. default is 'entry'
 * @param {string} [opts.keyup] the shortcut code for the up navigation. default is 'up' (the up arrow)
 * @param {string} [opts.keydown] the shortcut code for the down navigation. default is 'down' (the down arrow)
 * @constructor
 */
var SpazTimelineNav = function(opts) {
	
	var thisNav = this;
	
	opts = sch.defaults({
		'timeline_id'   :'timeline',
		'selected_class':'ui-selected',
		'entry_class'   :'entry',
		'keyup':'up',
		'keydown':'down'
	}, opts);
	
	this.selected_class = opts.selected_class;
	this.timeline_id    = opts.timeline_id;
	this.entry_class    = opts.entry_class;
	this.scroll_offset  = opts.scroll_offset;
	this.keyup			= opts.keyup;
	this.keydown		= opts.keydown;
	
	this.enabled		= false;
	
	this.init();
};


SpazTimelineNav.prototype.init = function() {
	var thisNav = this;
	
	this.enabled = true;
	
	this.jqtl      = jQuery('#'+this.timeline_id);
	this.jqentries = jQuery('.'+this.entry_class, this.jqtl);
	
	/*
		bind keyboard shortcuts
	*/
	sch.key_add(this.keyup, function()   { thisNav.move('up'); });
	sch.key_add(this.keydown, function() { thisNav.move('down'); });
	
	/*
		add numbers for fun
	*/
	this.jqentries.each(function(i) {
		this.innerHTML = i+':'+this.innerHTML;
	});
};



SpazTimelineNav.prototype.enable = function(state) {
	state = !!state; // cast to boolean
	this.enabled = state;
};


/**
 *  
 */
SpazTimelineNav.prototype.setTimelineId = function(tlid) {
	if (tlid.indexOf('#') === 0) {
		tlid = tlid.replace('#', '');
	}
	this.timeline_id = tlid;
};


SpazTimelineNav.prototype.setSelectedClass = function(sel_class) {
	if (sel_class.indexOf('.') === 0) {
		sel_class = sel_class.replace('.', '');
	}
	this.selected_class = sel_class;
};


SpazTimelineNav.prototype.setEntryClass = function(entry_class) {
	if (entry_class.indexOf('.') === 0) {
		entry_class = entry_class.replace('.', '');
	}
	this.entry_class = entry_class;
};

/**
 *  
 */
SpazTimelineNav.prototype.move = function(dir) {
	
	var thisNav = this;
	
	if (this.enabled !== true) {
		sch.debug('SpazTimelineNav object disabled');
		return;
	}
	
	// sch.debug(dir);
	
	var i_first = 0;
	var i_last  = this.jqentries.length-1;
	var i_sel   = -1;
	
	/*
		find selected
	*/
	this.jqentries.each(function(i) {
		if (jQuery(this).is('.'+thisNav.selected_class)) {
			i_sel = i;
			return false;
		}
	});

	// sch.debug("first:\t"+i_first);
	// sch.debug("last:\t"+i_last);
	// sch.debug("old selected:\t"+i_sel);
	
	switch(dir) {
		
		case 'up':
			
			if (i_sel < 0 || i_sel > i_last) {
				i_sel = i_last;
				// sch.debug('start at bottom!');
			} else if (i_sel === i_first) {
				i_sel = i_sel; // do not wrap!
				// sch.debug('do not wrap!');
			} else {
				i_sel--;
				// sch.debug('move down!');
			}
			
			
			break;
		
		case 'down':

			if (i_sel < 0 || i_sel > i_last) {
				i_sel = i_first;
				// sch.debug('start at top!');
			} else if (i_sel === i_last) {
				i_sel = i_sel; // do not wrap!
				// sch.debug('do not wrap!');
			} else {
				i_sel++;
				// sch.debug('move up!');
			}
		
			break;
			
		default:
			break;
			
	}

	this.select(this.jqentries.get(i_sel));
	
	// sch.debug("new selected:\t"+i_sel);
	
};


/**
 * selects a given element by applying a class 
 */
SpazTimelineNav.prototype.select = function(element) {
	/*
		Deselect all
	*/
	this.jqentries.removeClass(this.selected_class);
	
	/*
		select passed element
	*/
	jQuery(element).addClass(this.selected_class);
	
	this.reveal(element);
};


/**
 * if necessary, scrolls the container to reveal the passed element
 */
SpazTimelineNav.prototype.reveal = function(element) {
	
	sch.debug('====================================');
	
	var jqel = jQuery(element);
	
	/*
		first, figure out if element is visible in porthole
	*/
	var viewport_bottom    = parseInt(this.jqtl.innerHeight(), 10);
	var selected_bottom    = parseInt(jqel.position().top + jqel.height(), 10);
	var viewport_top       = parseInt(this.jqtl.position().top, 10);
	var selected_top       = parseInt(jqel.position().top, 10);
	var viewport_height    = parseInt(this.jqtl.outerHeight(), 10);
	var selected_height    = parseInt(jqel.outerHeight(), 10);
	var viewport_scrolltop = parseInt(this.jqtl.scrollTop(), 10);
	var selected_offset    = parseInt(jqel.offset().top, 10);
	

	sch.debug('viewport_bottom:'+viewport_bottom);
	sch.debug('selected_bottom:'+selected_bottom);
	sch.debug('viewport_top   :'+viewport_top);
	sch.debug('selected_top   :'+selected_top);
	sch.debug('viewport_height   :'+viewport_height);
	sch.debug('selected_height   :'+selected_height);
	sch.debug("viewport_scrolltop:"+viewport_scrolltop);
	sch.debug("selected_offset.top:"+selected_offset);

	/*
		below the fold
	*/
	var diff;
	if ( selected_height+selected_top > viewport_bottom ) {
		sch.debug("el.bottom is > tl.bottom");
		diff = (viewport_height - viewport_top - selected_bottom) * -1;
		this.jqtl.scrollTop(viewport_scrolltop + diff);
	}

	/*
		above the fold
	*/
	if ( selected_top < 0 ) {
		sch.debug("el.top is < tl.top");
		diff = selected_top * -1;
		this.jqtl.scrollTop(viewport_scrolltop - diff);
	}
	
	sch.debug("New scrolltop:"+this.jqtl.scrollTop());
	
	
};
