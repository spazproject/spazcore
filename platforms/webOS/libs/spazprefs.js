/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, Mojo;


/**
 * WEBOS
 * platform-specific definitions for prefs lib 
 */

SpazPrefs.prototype.load = function(callback) {
	
	var thisPrefs = this;
	
	
	sc.helpers.dump('this is webOS');
	if (!this.mojoCookie) {
		sc.helpers.dump('making cookie');
		this.mojoCookie = new Mojo.Model.Cookie(SPAZCORE_PREFS_MOJO_COOKIENAME);
	}
	var loaded_prefs = this.mojoCookie.get();
	if (loaded_prefs) {
		sc.helpers.dump('Prefs loaded');
		for (var key in loaded_prefs) {
			//sc.helpers.dump('Copying loaded pref "' + key + '":"' + thisPrefs._prefs[key] + '" (' + typeof(thisPrefs._prefs[key]) + ')');
            thisPrefs._prefs[key] = loaded_prefs[key];
       	}
	}
	
	jQuery(document).trigger('spazprefs_loaded');

	if( typeof callback == 'function' )
		callback(this);
	

};

SpazPrefs.prototype.save = function(callback) {
	if (sc.helpers.iswebOS()) {
		if (!this.mojoCookie) {
			this.mojoCookie = new Mojo.Model.Cookie(SPAZCORE_PREFS_MOJO_COOKIENAME);
		}
		
		this.mojoCookie.put(this._prefs);
	}
	
	if( typeof callback == 'function' )
		callback(this);

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



SpazPrefs.prototype.saveWindowState = function() {
	sch.error('saveWindowState not available');
	return undefined;
};


SpazPrefs.prototype.loadWindowState = function() {
	sch.error('loadWindowState not available');
	return undefined;
};
