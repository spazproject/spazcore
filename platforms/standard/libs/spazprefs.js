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


if (!window.localStorage) { // if localStorage is not available, we fall back to cookies. Ick
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
	
} else {

	SpazPrefs.prototype.load = function() {
		var cookie_key = this.id || SPAZCORE_PREFS_STANDARD_COOKIENAME;
		var prefsjson = window.localStorage.getItem(cookie_key);
		
		if (prefsjson) {
			var prefsval = sch.deJSON(prefsjson);
			sch.debug('prefsval exists');
			for (var key in prefsval) {
				sc.helpers.dump('Copying loaded pref "' + key + '":"' + prefsval[key] + '" (' + typeof(prefsval[key]) + ')');
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
		try {
			window.localStorage.setItem(cookie_key, sch.enJSON(this._prefs));
			sch.debug('stored prefs in localStorage');
		} catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				sch.error('LocalStorage quota exceeded!');
			}
		}

	};
	

}
