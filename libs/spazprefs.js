/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, Titanium, air, window, jQuery, Mojo;

var SPAZCORE_PREFS_TI_KEY = 'preferences_json';

var SPAZCORE_PREFS_AIR_FILENAME = 'preferences.json';

var SPAZCORE_PREFS_MOJO_COOKIENAME = 'preferences.json';
 
/**
 * A preferences lib for AIR JS apps. This requires the json2.js library
 * 
 * @param {object} defaults a JS object of key:value pairs used for the pref defaults. Example:
 * {
 * 	foo:124545,
 * 	bar:'Hello!',
 *  boo:false
 * };
 * @param {object} sanity_methods a JS object of key:object pairs that defines methods to be called when the pref is get() or set(). Example:
 * {
 * 	foo:{
 * 		onGet:function() {};
 * 		onSet:function() {};
 * 	},
 * 	bar:{
 * 		onGet:function() {};
 * 		onSet:function() {};
 * 	}
 * }
 * 
 * events raised:
 * 'spazprefs_loaded'
 * 
 * @TODO we need to pull out the platform-specifc stuff into the /platforms/... hierarchy
 * @class SpazPrefs
 */
function SpazPrefs(defaults, id, sanity_methods) {	

	/*
		init prefs
	*/
	this._prefs = {};
	
	/*
		init sanity check methods
		we use:
		* onGet()
		* onSet()
	*/
	this._sanity_methods = {};


	if (sanity_methods) {
		sc.helpers.dump('need to add sanity_method parsing');
	}
	
	if (id) {
		this.id = id;
	}
	
	if (defaults) {
		this.setDefaults(defaults);
		this._applyDefaults();
	}
	
	this.loaded = false;
}


/**
 * sets the passed object of key:val pairs as the default preferences
 * @param {object} defaults
 */ 
SpazPrefs.prototype.setDefaults = function(defaults) {
	this._defaults = defaults;
};


/**
 * this goes through the default prefs and applies them. It also will
 * call the onSet sanity method if it is defined for a given pref keys.
 */
SpazPrefs.prototype._applyDefaults = function() {
	var key;
	for (key in this._defaults) {
		sc.helpers.dump('Copying default "' + key + '":"' + this._defaults[key] + '" (' + typeof(this._defaults[key]) + ')');
		this._prefs[key] = this._defaults[key];

		if (this._sanity_methods[key] && this._sanity_methods[key].onSet) {
			sc.helpers.dump("Calling "+key+".onSet()");
			this._sanity_methods[key].onSet();
		}
	}
};

/**
 * resets all prefs to defaults and saves 
 */
SpazPrefs.prototype.resetPrefs = function() {
	
	this._applyDefaults();
	this.save();
};



/**
 * Get a preference
 * Note that FALSE is returned if the key does not exist
 */
SpazPrefs.prototype.get = function(key, encrypted) {
	if (encrypted) {
		return this.getEncrypted(key);
	} 
	
	sc.helpers.dump('Looking for pref "'+key+'"');
	
	if (this._prefs[key]) {
		sc.helpers.dump('Found pref "'+key+'" of value "'+this._prefs[key]+'" ('+typeof(this._prefs[key])+')');
		return this._prefs[key];
	} else {
		return false;
	}
};


/**
 * set a preference and save automatically
 */
SpazPrefs.prototype.set = function(key, val, encrypted) {
	
	sc.helpers.dump('Setting and saving "'+key+'" to "'+val+'" ('+typeof(val)+')');
	
	if (encrypted) {
		return this.setEncrypted(key, val);
	} 

	this._prefs[key] = val;
	
	this.save();
};







/**
 * @param {string} key the name of the pref
 * @param {string} type the type of method. Currently either 'onGet' or 'onSet'
 * @param {function} method the method definition
 */
SpazPrefs.prototype.setSanityMethod = function(key, type, method) {
	
	if (type !== 'onGet' && type !== 'onSet') {
		return false;
	}
	
	this._sanity_methods[key][type] = method;
	
};


/**
 * get an encrypted preference
 * @todo
 */
SpazPrefs.prototype.getEncrypted = function(key) {
	alert('not yet implemented');
};


/**
 * Sets an encrypted pref
 * @todo
 */
SpazPrefs.prototype.setEncrypted = function(key, val) {
	alert('not yet implemented');
};


/**
 * loads the prefs file and parses the prefs into this._prefs,
 * or initializes the file and loads the defaults
 * @stub
 */
SpazPrefs.prototype.load = function(name) {
};







/**
 * saves the current preferences
 * @todo
 */
SpazPrefs.prototype.save = function() {


	
};



/**
 * shortcut for SpazPrefs
 */
if (sc) {
	var scPrefs = SpazPrefs;
}
