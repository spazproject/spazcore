/*
	A preferences lib for AIR JS apps. This requires the json2.js library
*/
var SpazPrefs = function(defaults) {
	
	if (defaults) {
		this.defaults = defaults;
	} else {
		this.defaults = {};
	}

	this.prefs    = clone(this.defaults);

	/*
		returns the application storage directory air.File object
	*/
	this.getPrefsDir = function() {
		return air.File.applicationStorageDirectory;
	}
	
	/*
		returns the prefs air.File object. 
	*/
	this.getPrefsFile = function(name) {
		if (!name) {name='preferences';}
		
		var prefsDir = this.getPrefsDir();
		prefsFile = prefsDir.resolvePath(name+".json");
		return prefsFile;
	}
	
	/*
		loads the prefs file and parses the prefs into this.prefs,
		or initializes the file and loads the defaults
	*/
	this.load = function(name) {
		var prefsFile = this.getPrefsFile(name);

		// if file DNE, init file with defaults
		if (prefsFile.exists) {
			var prefsJSON = get_file_contents(prefsFile.url);
			air.trace(prefsJSON);
			var loaded_prefs = JSON.parse(prefsJSON);
			for (var key in loaded_prefs) {
	            this.set(key, loaded_prefs[key]);
        	}

		} else {
			init_file(prefsFile.url);
			set_file_contents(prefsFile.url, this.defaults, true);
			this.prefs = clone(this.defaults); // we have to pass by value, not ref
		}

		return prefsFile;
	}
	
	
	/*
		
	*/
	this.save = function(name) {
		var prefsFile = this.getPrefsFile(name);
		set_file_contents(prefsFile.url, this.prefs, true);
	};
	
	
	/*
		Get a preference
	*/
	this.get = function(key, encrypted) {
		if (encrypted) {
			return this.getEncrypted(key);
		} 
		
		if (this.prefs[key]) {
			return this.prefs[key];
		} else {
			return false
		}
	}
	
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
	
	
	/*
		get an encrypted preference
	*/
	this.getEncrypted = function(key) {
		return get_encrypted_value(key);
	};
	
	
	/*
		set a preference
	*/
	this.set = function(key, val, encrypted) {
		if (encrypted) {
			return this.setEncrypted(key, val);
		} 

		this.prefs[key] = val;
	}
	
	
	/*
		Sets an encrypted pref
	*/
	this.setEncrypted = function(key, val) {
		return set_encrypted_value(key, val);
	};
	
	
	/*
		Gets the contents of a file
	*/
	function get_file_contents(path) {
		var f = new air.File(path);
		if (f.exists) {
			var fs = new air.FileStream();
			fs.open(f, air.FileMode.READ);
			var str = fs.readMultiByte(f.size, air.File.systemCharset);
			fs.close();
			return str;
		} else {
			return false;
		}
	}

	/*
		Saves the contents to a specified path. Serializes a passed object if 
		serialize == true
	*/
	function set_file_contents(path, content, serialize) {

		if (serialize) {
			content = JSON.stringify(content);
		}

		// Spaz.dump('setFileContents for '+path+ ' to "' +content+ '"');

		try { 
			var f = new air.File(path);
			var fs = new air.FileStream();
			fs.open(f, air.FileMode.WRITE);
			fs.writeUTFBytes(content);
			fs.close();
		} catch (e) {
			air.trace(e.errorMsg)
		}
	};
	
	
	
	/*
		Loads a value for a key from EncryptedLocalStore
	*/
	function get_encrypted_value(key) {
		var storedValue = air.EncryptedLocalStore.getItem(key);
		var val = storedValue.readUTFBytes(storedValue.length);
		return val;
	}

	/*
		Sets a value in the EncryptedLocalStore of AIR
	*/
	function set_encrypted_value(key, val) {
		var bytes = new air.ByteArray();
	    bytes.writeUTFBytes(val);
	    return air.EncryptedLocalStore.setItem(key, bytes);
	}
	
	/*
		initializes a file at the given location. set overwrite to true
		to clear out an existing file.
		returns the air.File object or false
	*/
	function init_file(path, overwrite) {
		var file = new air.File(path);
		if ( !file.exists || (file.exists && overwrite) ) {
			var fs = new air.FileStream();
			fs.open(file, air.FileMode.WRITE);
			fs.writeUTFBytes('');
			fs.close();
			return file;
		} else {
			return false;
		}

	}
	
}





