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
 * 
 * @param {object} opts options	
 * @param {array}  opts.items menu item objects
 * @param {array}  opts.items.label item label (shown to user)
 * @param {string} [opts.items.id] item element id - not used if not present
 * @param {string} [opts.items.class] item element class - generated if not present
 * @param {function} opts.items.handler click event handler, will be listening via delegation
 * @param {object} [opts.items.data] passed as second param to onClick handler
 * 
 * @param {string} [opts.base_id] the id attribute for the menu's base element. default is 'spaz_menu'
 * @param {string} [opts.base_class] the class attribute for the menu's base element. default is 'spaz_menu'
 * @param {string} [opts.li_class] the class attribute for the menu's base element. default is 'spaz_menu_li'
 * @param {string} [opts.show_immediately] whether or not to immediately show the menu on creation. Default is TRUE
 */
SpazMenu = function(trigger_event, opts) {
	this.trigger_event = trigger_event;
	this.opts = sch.defaults({
		'items'     :[],
		'base_id'   :'spaz_menu',
		'base_class':'spaz_menu',
		'li_class'  :'spaz_menu_li',
		'show_immediately':true
	}, opts);
	
	this.items = this.opts.items;
	
	this.create();
	
	if (this.opts.show_immediately) {
		this.show(this.trigger_event);
	}
};



/**
 * Creates the menu, but doesn't show 
 */
SpazMenu.prototype.create = function() {
	
	var that = this;
	
	// create base DOM elements
	jQuery('body').append(this._tplBase());
	
	
	// iterate over items
	var item, itemhtml;
	for (var i=0; i < this.items.length; i++) {
		item = this.items[i];
		if (!item['class']) {
			item['class'] = this._generateItemClass(item);
		}
		itemhtml = this._tplItem(item);
		
		// -- add item DOM element
		jQuery('#'+this.opts.base_id).append(itemhtml);
		
		// -- add delegated handler
		jQuery(document).delegate('.'+item['class'], 'click', {'item':item, 'spazmenu':this}, function(e, data) {
			e.data.item.handler.call(this, e, e.data.item.data||data);
			e.data.spazmenu.hide();
			e.data.spazmenu.destroy();
		});
		
	}
};

/**
 * shows a created menu 
 */
SpazMenu.prototype.show = function(e, data) {
	sch.debug('show');
	this._postionBeforeShow(e, data);
	jQuery('#'+this.opts.base_id).show();
	this._reposition(e, data);
};

/**
 * hides a created menu 
 */
SpazMenu.prototype.hide = function() {
	sch.debug('hide');
	jQuery('#'+this.opts.base_id).hide();
};

/**
 * destroys a menu completely (DOM and JS object) 
 */
SpazMenu.prototype.destroy = function() {
	sch.debug('destroy');
	
	// iterate over item hash
	var item;
	for (var i=0; i < this.items.length; i++) {
		item = this.items[i];
		if (!item['class']) {
			item['class'] = this._generateItemClass(item);
		}
		
		// -- remove each delegated handler
		jQuery(document).undelegate('.'+item['class'], 'click');	
	}
		
	// remove base DOM element
	jQuery('#'+this.opts.base_id).remove();
};

/**
 * sets the position of the menu right before we show it 
 */
SpazMenu.prototype._postionBeforeShow = function(e, data) {
	sch.debug('_postionBeforeShow');
	var jqtrigger = jQuery(e.target);
	var top  = jqtrigger.position().top + jqtrigger.height();
	var left = jqtrigger.position().left+ jqtrigger.width();
	jQuery('#'+this.opts.base_id).css('top', top);
	jQuery('#'+this.opts.base_id).css('left', left);
};

/**
 * Repositions the menu after showing in case we're outside the viewport boundaries
 */
SpazMenu.prototype._reposition = function(e, data) {
	sch.debug('_reposition');
};


SpazMenu.prototype._generateItemClass = function(item) {
	return item.label.replace(/[^a-z]/gi, '_').toLowerCase();
};


SpazMenu.prototype._tplBase = function() {
	
	var html = '';
	
	html += '<div id="'+(this.opts.base_id||'')+'" class="'+this.opts.base_class+'">';
	html += '	<ul>';
	html += '	</ul>';
	html += '</div>';
	
	sch.debug(html);
	
	return html;	
};


SpazMenu.prototype._tplItem = function(i) {
	var html = '';
	
	html += '<li class="'+this.opts.li_class+' '+i['class']+'" id="'+(i.id||'')+'">'+i.label+'</li>';
	
	sch.debug(html);
	
	return html;
};