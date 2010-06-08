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

SpazPrefs.prototype.load = function() {
	
	var thisPrefs = this;
	
	
	if (Titanium.App.Properties.hasProperty(SPAZCORE_PREFS_TI_KEY)) {
		var prefs_json = Titanium.App.Properties.getString(SPAZCORE_PREFS_TI_KEY);
		try {
			var loaded_prefs = sc.helpers.deJSON(prefs_json);
		} catch (e) {
			sch.error('Could not load prefs JSON… using defaults');
			this.save();
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
	// jQuery().trigger('spazprefs_loaded');
}

SpazPrefs.prototype.save = function() {
	// save the file to a default place
	var prefs_json = sc.helpers.enJSON(this._prefs);
	Titanium.App.Properties.setString(SPAZCORE_PREFS_TI_KEY, prefs_json);
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