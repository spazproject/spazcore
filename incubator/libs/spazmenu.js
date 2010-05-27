/**
 * A class for dynamically generating menus.
 * 
 * hash structure:
 * var hash = [
 * 	{
 * 		'label':"Menu label",
 * 		'id':"a_unique_id", // optional, not used if not present
 * 		'class':"menu_label", // optional, generated if not present
 * 		'handler':function(e, data) {}, // a handler. will be listening via delegation
 * 		'data':{} // some data, passed as second param to onClick handler
 * 		}
 * 
 * ];
 * 
 * 
 * @param {object} trigger_event the event that is triggering the creation of this menu. needed for positioning
 * 
 * @param {object} opts options	
 * 
 * @param {array}  opts.items_func a function that generates a hash of item objects. takes one parameter "data"
 * @param {string} [opts.base_id] the id attribute for the menu's base element. default is 'spaz_menu'
 * @param {string} [opts.base_class] the class attribute for the menu's base element. default is 'spaz_menu'
 * @param {string} [opts.li_class] the class attribute for the menu's base element. default is 'spaz_menu_li'
 * @param {string} [opts.show_immediately] whether or not to immediately show the menu on creation. Default is TRUE
 */
SpazMenu = function(opts) {
	this.opts = sch.defaults({
		'items_func':function(data){ return null; },
		'base_id'   :'spaz_menu',
		'base_class':'spaz_menu',
		'li_class'  :'spaz_menu_li',
		'show_immediately':true
	}, opts);
	
	// close on ANY clicks
	jQuery(document).bind('click', {'spazmenu':this}, this.hide);
	
	/**
	 * dismiss with escape 
	 */
	jQuery(document).bind('keydown', {'spazmenu':this}, this.keypressHide);
	
	
	
	// just in case, we need to destroy any existing menus before creating new ones
	// with the same settings
	jQuery('div.'+this.opts.base_class).remove();
};



/**
 * Creates the menu, but doesn't show 
 * @param {object} trigger_event the event that triggered the show
 * @param {object} itemsdata a data structure that will be passed to the items_func 
 */
SpazMenu.prototype.show = function(trigger_event, itemsdata) {
	sch.debug('creating');
	
	var that = this;
	
	// map the triggering event
	this.trigger_event = trigger_event;

	// create items with items_func
	this.items = this.opts.items_func(itemsdata);

 	// create base DOM elements
	if (jQuery('#'+this.opts.base_id).length < 1) {
		jQuery('body').append(this._tplBase());
	} else { // if exists, empty it
		jQuery('#'+this.opts.base_id + ' ul').empty();
	}
	
	// iterate over items
	var item, itemhtml = '';
	for (var i=0; i < this.items.length; i++) {
		item = this.items[i];
		if (!item['class']) {
			item['class'] = this._generateItemClass(item);
		}
		
		// create the item HTML
		itemhtml = this._tplItem(item);
		
		// -- add item DOM element
		jQuery('#'+this.opts.base_id + ' ul').append(itemhtml);
		
		// -- remove any existing handlers (in case this menu was shown before)
		jQuery('#'+this.opts.base_id + ' ul').undelegate('.'+item['class'], 'click');
		
		// -- add delegated handler
		jQuery('#'+this.opts.base_id + ' ul').delegate('.'+item['class'], 'click', {'item':item, 'spazmenu':this}, function(e, data) {
			e.data.item.handler.call(this, e, e.data.item.data||itemsdata);
			that.hide();
		});
	}
	

	sch.debug('show');
	
	this._postionBeforeShow(trigger_event);
	jQuery('#'+this.opts.base_id).show();
	this._reposition(trigger_event);
};

/**
 * hides a created menu 
 */
SpazMenu.prototype.hide = function(e) {
	sch.debug('hide');
	var that; 
	
	if (e && e.data && e.data.spazmenu) {
		that = e.data.spazmenu;
	} else {
		that = this;
	}
		
	jQuery('#'+that.opts.base_id).hide();
};

/**
 * handler if esc is hit 
 */
SpazMenu.prototype.keypressHide = function(e) {
	if (e.keyCode == 27) {
		e.data.spazmenu.hide();
	} // escape
};

/**
 * destroys a menu completely (DOM and JS object) 
 */
SpazMenu.prototype.destroy = function() {
	sch.debug('destroy');
	

	
	// close on ANY clicks
	jQuery(document).unbind('click', {'spazmenu':this}, this.hide);
	
	
	jQuery(document).unbind('keydown', {'spazmenu':this}, this.keypressHide);
	
	// remove base DOM element
	jQuery('#'+this.opts.base_id).remove();
};

/**
 * hides AND destroys 
 */
SpazMenu.prototype.hideAndDestroy = function(e) {
	
	if (this.hide && this.destroy) {
		this.hide();
		this.destroy();
	} else if (e && e.data && e.data.spazmenu) {
		e.data.spazmenu.hide();
		e.data.spazmenu.destroy();	
	} else {
		sch.error('couldn\'t hide and destroy');
	}
};



/**
 * sets the position of the menu right before we show it 
 */
SpazMenu.prototype._postionBeforeShow = function(e, data) {
	sch.debug('_postionBeforeShow');
	var jqtrigger = jQuery(e.target);
	
	// var top  = jqtrigger.position().top + jqtrigger.height();
	// var left = jqtrigger.position().left+ jqtrigger.width();
	
	var top  = e.clientY;
	var left = e.clientX;
	
	jQuery('#'+this.opts.base_id).css('top', top);
	jQuery('#'+this.opts.base_id).css('left', left);
};

/**
 * Repositions the menu after showing in case we're outside the viewport boundaries
 */
SpazMenu.prototype._reposition = function(e, data) {
	sch.debug('_reposition');
};

/**
 * this generates the item class if one has not been provided 
 */
SpazMenu.prototype._generateItemClass = function(item) {
	return item.label.replace(/[^a-z]/gi, '_').toLowerCase();
};

/**
 * generates the html for the base DOM elements 
 */
SpazMenu.prototype._tplBase = function() {
	
	var html = '';
	
	html += '<div id="'+(this.opts.base_id||'')+'" class="'+this.opts.base_class+'">';
	html += '	<ul>';
	html += '	</ul>';
	html += '</div>';
	
	sch.debug(html);
	
	return html;	
};

/**
 * generates the HTML for a menu item
 * @param {object} i the item object 
 */
SpazMenu.prototype._tplItem = function(i) {
	var html = '';
	
	html += '<li class="'+this.opts.li_class+' '+i['class']+'" id="'+(i.id||'')+'">'+i.label+'</li>';
	
	sch.debug(html);
	
	return html;
};