/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, Titanium;
 
/**
 * TITANIUM
 * platform-specific definitions for prefs lib 
 */

SpazPrefs.prototype.load = function(callback) {
	
	var thisPrefs = this;
	var prefs_file = sch.getFileObject(sch.joinPaths([sch.getAppStorageDir(), SPAZCORE_PREFS_TI_KEY]));

	if (prefs_file.exists() && (prefs_file.size() > 0)) {
		var fs = prefs_file.open(Titanium.Filesystem.MODE_READ);
		var prefs_json = fs.read();
		fs.close();
		try {
			var loaded_prefs = sc.helpers.deJSON(prefs_json);
		} catch (e) {
			sch.error('Could not load prefs JSON… using defaults');
			this.save();
			
			if( typeof callback == 'function' )
				callback(this);
				
			return;
		}

		for (var key in loaded_prefs) {
			sc.helpers.dump('Copying loaded pref "' + key + '":"' + this._prefs[key] + '" (' + typeof(this._prefs[key]) + ')');
			this._prefs[key] = loaded_prefs[key];
		}
	} else {
		// save the defaults if this is the first time
		this.save();
	}
	
	if( typeof callback == 'function' )
		callback(this);
};

SpazPrefs.prototype.save = function() {
	// save the file to a default place
	var prefs_json = sc.helpers.enJSON(this._prefs);
	var prefs_file = sch.getFileObject(sch.joinPaths([sch.getAppStorageDir(), SPAZCORE_PREFS_TI_KEY]));
	
	Titanium.App.Properties.setString(SPAZCORE_PREFS_TI_KEY, prefs_json);
	
	if (!prefs_file.exists()) {
		prefs_file.touch();
	}
	var fs = prefs_file.open(Titanium.Filesystem.MODE_WRITE);
	fs.write(prefs_json);
	fs.close();
};


/**
 * @todo 
 */
SpazPrefs.prototype.getEncrypted = function(key) {
	
};

/**
 * @todo 
 */
SpazPrefs.prototype.setEncrypted = function(key, val) {

};


/**
 * @todo 
 */
SpazPrefs.prototype.saveWindowState = function() {

};


/**
 * @todo 
 */
SpazPrefs.prototype.loadWindowState = function() {

};