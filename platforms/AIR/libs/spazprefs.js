/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, air;

/**
 * AIR
 * platform-specific definitions for prefs lib 
 */

SpazPrefs.prototype.load = function() {
	var filename = this.id || SPAZCORE_PREFS_AIR_FILENAME;
	
	var prefsFile = air.File.applicationStorageDirectory;
	prefsFile = prefsFile.resolvePath(filename);

	var fs = new air.FileStream();

	if (prefsFile.exists) {
		sch.debug('prefsfile exists');
		fs.open(prefsFile, air.FileMode.READ);
		var prefsJSON = fs.readUTFBytes(prefsFile.size);
		sch.debug(prefsJSON);

		try {
			var loaded_prefs = JSON.parse(prefsJSON);
		} catch (e) {
			sch.error('Could not load prefs JSON… using defaults');
			this.save();
			return;
		}

		for (var key in loaded_prefs) {
			sc.helpers.dump('Copying loaded pref "' + key + '":"' + this._prefs[key] + '" (' + typeof(this._prefs[key]) + ')');
			this._prefs[key] = loaded_prefs[key];
		}
	} else { // init the file
		sch.debug('prefs file does not exist; saving with defaults');
		this.save();
	}
	fs.close();
};

SpazPrefs.prototype.save = function() {
	var jsonPrefs = sch.enJSON(this._prefs);
	sch.debug(jsonPrefs);

	var filename = this.id || SPAZCORE_PREFS_AIR_FILENAME;

	var prefsFile = air.File.applicationStorageDirectory;
	prefsFile = prefsFile.resolvePath(filename);

	var fs = new air.FileStream();

	fs.open(prefsFile, air.FileMode.WRITE);
	fs.writeUTFBytes(sc.helpers.enJSON(this._prefs));
	fs.close();
};


SpazPrefs.prototype.getEncrypted = function(key) {
	var storedValue = air.EncryptedLocalStore.getItem(key);
	var val = storedValue.readUTFBytes(storedValue.length);
	return val;
};


SpazPrefs.prototype.setEncrypted = function(key, val) {
	var bytes = new air.ByteArray();
	bytes.writeUTFBytes(val);
	return air.EncryptedLocalStore.setItem(key, bytes);
};



SpazPrefs.prototype.saveWindowState = function() {
	this.set('__window-height', window.nativeWindow.width);
	this.set('__window-height', window.nativeWindow.height);
	this.set('__window-x', window.nativeWindow.x);
	this.set('__window-y', window.nativeWindow.y);
};


SpazPrefs.prototype.loadWindowState = function() {
	var width  = this.get('__window-height');
	var height = this.get('__window-height');
	var x	   = this.get('__window-x');
	var y	   = this.get('__window-y');
	
	if (x && y && width && height) {
		window.nativeWindow.width  = width;
		window.nativeWindow.height = height;
		window.nativeWindow.x = x;
		window.nativeWindow.y = y;
	}
};

