/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, Titanium, air, jQuery, Mojo;

/**
 * @constant 
 */
var SPAZCORE_PREFS_TI_KEY = 'preferences_json';

/**
 * @constant 
 */
var SPAZCORE_PREFS_AIR_FILENAME = 'preferences.json';

/**
 * @constant 
 */
var SPAZCORE_PREFS_MOJO_COOKIENAME = 'preferences.json';

/**
 * @constant 
 */
var SPAZCORE_PREFS_STANDARD_COOKIENAME = 'preferences_json';
 
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
 * 		onGet:function(key, value) {};
 * 		onSet:function(key, value) {};
 * 	},
 * 	bar:{
 * 		onGet:function(key, value) {};
 * 		onSet:function(key, value) {};
 * 	}
 * }
 * 
 * events raised:
 * 'spazprefs_loaded'
 * 
 * @TODO we need to pull out the platform-specifc stuff into the /platforms/... hierarchy
 * @class SpazPrefs
 * @constructor
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
		sch.debug('adding sanity methods to prefs');
		this._sanity_methods = sanity_methods;
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
		sc.helpers.debug('Copying default "' + key + '":"' + this._defaults[key] + '" (' + typeof(this._defaults[key]) + ')');
		this._prefs[key] = this._defaults[key];
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
 * Note that undefined is returned if the key does not exist
 */
SpazPrefs.prototype.get = function(key, encrypted) {
	var value;
	
	if (encrypted) {
		value = this.getEncrypted(key);
	} else {
		sc.helpers.debug('Looking for pref "'+key+'"');

		if (this._prefs[key] !== undefined) {
			sc.helpers.debug('Found pref "'+key+'" of value "'+this._prefs[key]+'" ('+typeof(this._prefs[key])+')');
			value = this._prefs[key];
		} else {
			value = undefined;
		}
	}
	
	if (this._sanity_methods[key] && this._sanity_methods[key].onGet) {
		sc.helpers.debug("Calling "+key+".onGet()");
		value = this._sanity_methods[key].onGet.call(this, key, value);
	}
		
	return value;
};


/**
 * set a preference and save automatically
 */
SpazPrefs.prototype.set = function(key, val, encrypted) {
	
	sc.helpers.debug('Setting and saving "'+key+'" to "'+val+'" ('+typeof(val)+')');
	
	if (this._sanity_methods[key] && this._sanity_methods[key].onSet) {
		sc.helpers.debug("Calling "+key+".onSet()");
		val = this._sanity_methods[key].onSet.call(this, key, val);
	}
	
	if (encrypted) {
		this.setEncrypted(key, val);
	} else {
		this._prefs[key] = val;
	}

	
	
	this.save();
};







/**
 * @param {string} key the name of the pref
 * @param {string} type the type of method. Currently either 'onGet' or 'onSet'
 * @param {function} method the method definition
 */
SpazPrefs.prototype.setSanityMethod = function(key, type, method) {
	
	if (type !== 'onGet' && type !== 'onSet') {
		sch.error('sanity method type must be onGet or onSet');
	}
	
	if (!this._sanity_methods[key]) {
		this._sanity_methods[key] = {};
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
