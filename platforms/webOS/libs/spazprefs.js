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

SpazPrefs.prototype.load = function() {
	
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
		jQuery().trigger('spazprefs_loaded');
	} else {
		sc.helpers.dump('Prefs loading failed in onGet');
		this.migrateFromMojoDepot();
		// thisPrefs.resetPrefs();
	}
	

	

};

SpazPrefs.prototype.save = function() {
	if (sc.helpers.iswebOS()) {
		if (!this.mojoCookie) {
			this.mojoCookie = new Mojo.Model.Cookie(SPAZCORE_PREFS_MOJO_COOKIENAME);
		}
		
		this.mojoCookie.put(this._prefs);
	}

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

/**
 * We used to store the data in a Depot, so we may need
 * to migrate data out of there 
 */
SpazPrefs.prototype.migrateFromMojoDepot = function() {
	
	var thisPrefs = this;
	
	sch.error('MIGRATING FROM DEPOT! ============================ ');
	
	sc.helpers.dump('this is webOS');
	if (!this.mojoDepot) {
		sc.helpers.dump('making depot');
		this.mojoDepot = new Mojo.Depot({
			name:'SpazDepotPrefs',
			replace:false
		});
	}
	
	var onGet = function(loaded_prefs) {
		if (loaded_prefs) {
			sc.helpers.dump('Prefs loaded');
			for (var key in loaded_prefs) {
				//sc.helpers.dump('Copying loaded pref "' + key + '":"' + thisPrefs._prefs[key] + '" (' + typeof(thisPrefs._prefs[key]) + ')');
	            thisPrefs._prefs[key] = loaded_prefs[key];
	       	}
		} else {
			sc.helpers.dump('Prefs loading failed in onGet');
			thisPrefs.resetPrefs();
		}
		thisPrefs.save(); // write to cookie
		jQuery().trigger('spazprefs_loaded');
	};

	var onFail = function() {
		sc.helpers.dump('Prefs loading failed in onFail');
		thisPrefs.resetPrefs();
		jQuery().trigger('spazprefs_loaded');
	};
	
	sc.helpers.dump('simpleget depot');
	this.mojoDepot.simpleGet('SpazPrefs', onGet, onFail);
	sc.helpers.dump('sent simpleget');
	
};