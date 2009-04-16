const SPAZCORE_PREFS_TI_KEY = 'preferences_json';
 
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
 */
var SpazPrefs = function(defaults, sanity_methods) {	

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
		dump('need to add sanity_method parsing');
	}
	
	if (defaults) {
		this.setDefaults(defaults);
		this._applyDefaults();
	}
	
	this.loaded = false;
};


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
	for (key in this._defaults) {
		dump('Copying default "' + key + '":"' + this._defaults[key] + '" (' + typeof(this._defaults[key]) + ')');
		this._prefs[key] = this._defaults[key];

		if (this._sanity_methods[key] && this._sanity_methods[key].onSet) {
			dump("Calling "+key+".onSet()");
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
	
	if (this._prefs[key]) {
		return this._prefs[key];
	} else {
		return false;
	}
}


/**
 * set a preference and save automatically
 */
SpazPrefs.prototype.set = function(key, val, encrypted) {
	
	dump('Setting and saving "'+key+'" to "'+val+'" ('+typeof(val)+')');
	
	if (encrypted) {
		return this.setEncrypted(key, val);
	} 

	this._prefs[key] = val;
	
	this.save();
}







/**
 * @param {string} key the name of the pref
 * @param {string} type the type of method. Currently either 'onGet' or 'onSet'
 * @param {function} method the method definition
 */
SpazPrefs.prototype.setSanityMethod = function(key, type, method) {
	
	if (type != 'onGet' && type != 'onSet') {
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
 * @todo
 */
SpazPrefs.prototype.load = function(name) {
	
	/*
		webOS implementation
	*/
	if (sc.helpers.iswebOS()) {
		if (!this.mojoDepot) {
			this.mojoDepot = new Mojo.Depot({
				name:'SpazDepotPrefs',
				replace:false
			});
		}
		

		this.mojoDepot.simpleGet('SpazPrefs', onGet, onFail);
		
		var thisPrefs = this;
		function onGet(loaded_prefs) {
			if (loaded_prefs) {
				dump('Prefs loaded');
				for (var key in loaded_prefs) {
					dump('Copying loaded pref "' + key + '":"' + thisPrefs._prefs[key] + '" (' + typeof(thisPrefs._prefs[key]) + ')');
		            thisPrefs._prefs[key] = loaded_prefs[key];
		       	}
			} else {
				dump('Prefs loading failed in onGet')
				thisPrefs.resetPrefs();
			}
			jQuery().trigger('spazprefs_loaded');
		}
		
		function onFail() {
			dump('Prefs loading failed in onFail');
			thisPrefs.resetPrefs();
		}
	}
	
	/*
		Titanium implementation
		@TODO
	*/
	if (sc.helpers.isTitanium()) {
		if (Titanium.App.Properties.hasProperty(SPAZCORE_PREFS_TI_KEY)) {
			var prefs_json = Titanium.App.Properties.getString(SPAZCORE_PREFS_TI_KEY);
			this._prefs = sc.helpers.deJSON(prefs_json);
		} else {
			// save the defaults if this is the first time
			this.save();
		}
		jQuery().trigger('spazprefs_loaded');
	}
	
}



/**
 * saves the current preferences
 * @todo
 */
SpazPrefs.prototype.save = function(name) {

	if (sc.helpers.iswebOS()) {
		if (!this.mojoDepot) {
			this.mojoDepot = new Mojo.Depot({
				name:'SpazDepotPrefs',
				replace:false
			});
		}
		
		this.mojoDepot.simpleAdd('SpazPrefs', this._prefs);
	}
	
	/*
		Titanium implementation
		@TODO
	*/
	if (sc.helpers.isTitanium()) {
		// save the file to a default place
		var prefs_json = sc.helpers.enJSON(this._prefs);
		Titanium.App.Properties.setString(SPAZCORE_PREFS_TI_KEY, prefs_json);
	}
		
	
};



/**
 * shortcut for SpazPrefs
 */
if (sc) {
	scPrefs = SpazPrefs;
}








/**
 * methods for Titanium
 */
if (sc.helpers.isTitanium()) {

	/*
		Saves the size and placement of the window this executes in
	*/
	SpazPrefs.prototype.saveWindowState = function() {
		var width  = Titanium.UI.currentWindow.getWidth();
		var height = Titanium.UI.currentWindow.getHeight();
		var x      = Titanium.UI.currentWindow.getX();
		var y      = Titanium.UI.currentWindow.getY();
		
		if (x && y && width && height) {
			Titanium.App.Properties.setInt('__window-width',  width);
			Titanium.App.Properties.setInt('__window-height', height);
			Titanium.App.Properties.setInt('__window-x',      x);
			Titanium.App.Properties.setInt('__window-y',      y);
		}
	}

	/*
		Loads the size and placement of the window this executes in
	*/
	SpazPrefs.prototype.loadWindowState = function() {
		if (!Titanium.App.Properties.hasProperty('__window-width')) { // we assume if this isn't set, none are set
			this.saveWindowState(); // save the current state
			return;
		}
		
		var width  = Titanium.App.Properties.getInt('__window-width');
		var height = Titanium.App.Properties.getInt('__window-height');
		var x      = Titanium.App.Properties.getInt('__window-x');
		var y      = Titanium.App.Properties.getInt('__window-y');
		
		if (x && y && width && height) {
			Titanium.UI.currentWindow.setWidth(width);
			Titanium.UI.currentWindow.setHeight(height);
			Titanium.UI.currentWindow.setX(x);
			Titanium.UI.currentWindow.setY(y);
		}
	}
}



/**
 * methods for AIR 
 * @TODO
 */
if (sc.helpers.isAIR()) {

	/*
		Saves the size and placement of the window this executes in
	*/
	this.saveWindowState = function() {
		this.set('__window-height', window.nativeWindow.width);
		this.set('__window-height', window.nativeWindow.height);
		this.set('__window-x', window.nativeWindow.x);
		this.set('__window-y', window.nativeWindow.y);
	}

	/*
		Loads the size and placement of the window this executes in
	*/
	this.loadWindowState = function() {
		var width  = this.get('__window-height');
		var height = this.get('__window-height');
		var x      = this.get('__window-x');
		var y      = this.get('__window-y');
		
		if (x && y && width && height) {
			window.nativeWindow.width  = width;
			window.nativeWindow.height = height;
			window.nativeWindow.x = x;
			window.nativeWindow.y = y;
		}
		
	}
	
}





// var SpazPrefs = function(defaults) {
// 	
// 	if (defaults) {
// 		this.defaults = defaults;
// 	} else {
// 		this.defaults = {};
// 	}
// 
// 	this.prefs    = clone(this.defaults);
// 
// 	/*
// 		returns the application storage directory air.File object
// 	*/
// 	this.getPrefsDir = function() {
// 		return air.File.applicationStorageDirectory;
// 	}
// 	
// 	/*
// 		returns the prefs air.File object. 
// 	*/
// 	this.getPrefsFile = function(name) {
// 		if (!name) {name='preferences';}
// 		
// 		var prefsDir = this.getPrefsDir();
// 		prefsFile = prefsDir.resolvePath(name+".json");
// 		return prefsFile;
// 	}
// 	
// 	/*
// 		loads the prefs file and parses the prefs into this.prefs,
// 		or initializes the file and loads the defaults
// 	*/
// 	this.load = function(name) {
// 		var prefsFile = this.getPrefsFile(name);
// 
// 		// if file DNE, init file with defaults
// 		if (prefsFile.exists) {
// 			var prefsJSON = get_file_contents(prefsFile.url);
// 			air.trace(prefsJSON);
// 			var loaded_prefs = JSON.parse(prefsJSON);
// 			for (var key in loaded_prefs) {
// 	            this.set(key, loaded_prefs[key]);
//         	}
// 
// 		} else {
// 			init_file(prefsFile.url);
// 			set_file_contents(prefsFile.url, this.defaults, true);
// 			this.prefs = clone(this.defaults); // we have to pass by value, not ref
// 		}
// 
// 		return prefsFile;
// 	}
// 	
// 	
// 	/*
// 		
// 	*/
// 	this.save = function(name) {
// 		var prefsFile = this.getPrefsFile(name);
// 		set_file_contents(prefsFile.url, this.prefs, true);
// 	};
// 	
// 	
// 	/*
// 		Get a preference
// 	*/
// 	this.get = function(key, encrypted) {
// 		if (encrypted) {
// 			return this.getEncrypted(key);
// 		} 
// 		
// 		if (this.prefs[key]) {
// 			return this.prefs[key];
// 		} else {
// 			return false
// 		}
// 	}
// 	
// 	/*
// 		Saves the size and placement of the window this executes in
// 	*/
// 	this.saveWindowState = function() {
// 		this.set('__window-height', window.nativeWindow.width);
// 		this.set('__window-height', window.nativeWindow.height);
// 		this.set('__window-x', window.nativeWindow.x);
// 		this.set('__window-y', window.nativeWindow.y);
// 	}
// 
// 	/*
// 		Loads the size and placement of the window this executes in
// 	*/
// 	this.loadWindowState = function() {
// 		var width  = this.get('__window-height');
// 		var height = this.get('__window-height');
// 		var x      = this.get('__window-x');
// 		var y      = this.get('__window-y');
// 		
// 		if (x && y && width && height) {
// 			window.nativeWindow.width  = width;
// 			window.nativeWindow.height = height;
// 			window.nativeWindow.x = x;
// 			window.nativeWindow.y = y;
// 		}
// 		
// 	}
// 	
// 	
// 	/*
// 		get an encrypted preference
// 	*/
// 	this.getEncrypted = function(key) {
// 		return get_encrypted_value(key);
// 	};
// 	
// 	
// 	/*
// 		set a preference
// 	*/
// 	this.set = function(key, val, encrypted) {
// 		if (encrypted) {
// 			return this.setEncrypted(key, val);
// 		} 
// 
// 		this.prefs[key] = val;
// 	}
// 	
// 	
// 	/*
// 		Sets an encrypted pref
// 	*/
// 	this.setEncrypted = function(key, val) {
// 		return set_encrypted_value(key, val);
// 	};
// 	
// 	
// 	/*
// 		Gets the contents of a file
// 	*/
// 	function get_file_contents(path) {
// 		var f = new air.File(path);
// 		if (f.exists) {
// 			var fs = new air.FileStream();
// 			fs.open(f, air.FileMode.READ);
// 			var str = fs.readMultiByte(f.size, air.File.systemCharset);
// 			fs.close();
// 			return str;
// 		} else {
// 			return false;
// 		}
// 	}
// 
// 	/*
// 		Saves the contents to a specified path. Serializes a passed object if 
// 		serialize == true
// 	*/
// 	function set_file_contents(path, content, serialize) {
// 
// 		if (serialize) {
// 			content = JSON.stringify(content);
// 		}
// 
// 		// Spaz.dump('setFileContents for '+path+ ' to "' +content+ '"');
// 
// 		try { 
// 			var f = new air.File(path);
// 			var fs = new air.FileStream();
// 			fs.open(f, air.FileMode.WRITE);
// 			fs.writeUTFBytes(content);
// 			fs.close();
// 		} catch (e) {
// 			air.trace(e.errorMsg)
// 		}
// 	};
// 	
// 	
// 	
// 	/*
// 		Loads a value for a key from EncryptedLocalStore
// 	*/
// 	function get_encrypted_value(key) {
// 		var storedValue = air.EncryptedLocalStore.getItem(key);
// 		var val = storedValue.readUTFBytes(storedValue.length);
// 		return val;
// 	}
// 
// 	/*
// 		Sets a value in the EncryptedLocalStore of AIR
// 	*/
// 	function set_encrypted_value(key, val) {
// 		var bytes = new air.ByteArray();
// 	    bytes.writeUTFBytes(val);
// 	    return air.EncryptedLocalStore.setItem(key, bytes);
// 	}
// 	
// 	/*
// 		initializes a file at the given location. set overwrite to true
// 		to clear out an existing file.
// 		returns the air.File object or false
// 	*/
// 	function init_file(path, overwrite) {
// 		var file = new air.File(path);
// 		if ( !file.exists || (file.exists && overwrite) ) {
// 			var fs = new air.FileStream();
// 			fs.open(file, air.FileMode.WRITE);
// 			fs.writeUTFBytes('');
// 			fs.close();
// 			return file;
// 		} else {
// 			return false;
// 		}
// 
// 	}
// 	
// }

