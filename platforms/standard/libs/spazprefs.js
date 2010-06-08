/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc;

/**
 * standard
 * platform-specific definitions for prefs lib 
 */

/**
 * this requires the cookies library <http://code.google.com/p/cookies/> 
 */
SpazPrefs.prototype.load = function() {
	var cookie_key = this.id || SPAZCORE_PREFS_STANDARD_COOKIENAME;
	var prefsval = jaaulde.utils.cookies.get(cookie_key);
		
	if (prefsval) {
		sch.debug('prefsval exists');
		for (var key in prefsval) {
			sc.helpers.dump('Copying loaded pref "' + key + '":"' + this._prefs[key] + '" (' + typeof(this._prefs[key]) + ')');
			this._prefs[key] = prefsval[key];
		}
	} else { // init the file
		sch.debug('prefsval does not exist; saving with defaults');
		this.save();
	}
};

/**
 * this requires the cookies library <http://code.google.com/p/cookies/> 
 */
SpazPrefs.prototype.save = function() {
	var cookie_key = this.id || SPAZCORE_PREFS_STANDARD_COOKIENAME;
	jaaulde.utils.cookies.set(cookie_key, this._prefs);
	sch.debug('stored prefs in cookie');
};


